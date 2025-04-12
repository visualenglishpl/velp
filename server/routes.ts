import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertBookSchema, insertUnitSchema, insertMaterialSchema } from "@shared/schema";
import { z } from "zod";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Authentication middleware to protect routes
function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
}

// Role-based access control middleware
function hasRole(roles: string[]) {
  return (req: Request, res: Response, next: Function) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Not authorized" });
    }
    
    next();
  };
}

// Admin-only middleware
const isAdmin = hasRole(["admin"]);

// Initialize S3 Client
const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

// Helper function to generate a presigned URL for S3 objects
async function getS3PresignedUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: "visualenglishmaterial",
    Key: key
  });
  
  try {
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error(`Error generating presigned URL for ${key}:`, error);
    return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Add request logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    if (req.method === 'POST') {
      console.log('Request body:', req.body);
    }
    next();
  });

  // Set up authentication routes
  setupAuth(app);

  // ----- CONTENT MANAGEMENT API ROUTES -----
  
  // S3 Assets API
  app.get("/api/assets/book-thumbnails", isAuthenticated, async (req, res) => {
    try {
      const books = await storage.getBooks();
      const bookThumbnails = [];
      
      // Generate presigned URLs for each book
      for (const book of books) {
        // Special case for book 3 which has a space before the extension in S3
        const filePath = book.bookId === "3" 
          ? `icons/VISUAL ${book.bookId} .gif` 
          : `icons/VISUAL ${book.bookId}.gif`;
          
        const gifUrl = await getS3PresignedUrl(filePath);
        if (gifUrl) {
          bookThumbnails.push({
            bookId: book.bookId,
            title: book.title,
            gifUrl
          });
        }
      }
      
      res.json(bookThumbnails);
    } catch (err) {
      console.error("Error fetching book thumbnails:", err);
      res.status(500).json({ error: "Failed to fetch book thumbnails" });
    }
  });
  
  // Books API
  app.get("/api/books", isAuthenticated, async (req, res) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });
  
  app.get("/api/books/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        const book = await storage.getBookByBookId(req.params.id);
        if (!book) {
          return res.status(404).json({ error: "Book not found" });
        }
        return res.json(book);
      }
      
      const book = await storage.getBookById(id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).json({ error: "Failed to fetch book" });
    }
  });
  
  app.post("/api/books", isAdmin, async (req, res) => {
    try {
      const bookData = insertBookSchema.parse(req.body);
      const book = await storage.createBook(bookData);
      res.status(201).json(book);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error("Error creating book:", err);
      res.status(500).json({ error: "Failed to create book" });
    }
  });
  
  app.put("/api/books/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }
      
      const existingBook = await storage.getBookById(id);
      if (!existingBook) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      // Partial validation of the update payload
      const bookData = insertBookSchema.partial().parse(req.body);
      const updatedBook = await storage.updateBook(id, bookData);
      res.json(updatedBook);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error("Error updating book:", err);
      res.status(500).json({ error: "Failed to update book" });
    }
  });
  
  app.delete("/api/books/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }
      
      const book = await storage.getBookById(id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      await storage.deleteBook(id);
      res.status(204).end();
    } catch (err) {
      console.error("Error deleting book:", err);
      res.status(500).json({ error: "Failed to delete book" });
    }
  });
  
  // Units API
  app.get("/api/books/:bookId/units", isAuthenticated, async (req, res) => {
    try {
      const bookId = parseInt(req.params.bookId);
      if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }
      
      const book = await storage.getBookById(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      const units = await storage.getUnits(bookId);
      
      // Get the book details to determine the correct thumbnail path format
      const currentBook = await storage.getBookById(bookId);
      
      // Generate presigned URLs for unit thumbnails
      const unitsWithThumbnails = await Promise.all(units.map(async (unit) => {
        let thumbnailUrl = null;
        if (unit.thumbnail) {
          try {
            thumbnailUrl = await getS3PresignedUrl(unit.thumbnail);
            console.log(`Success: Generated thumbnail URL for unit ${unit.unitNumber}: ${unit.thumbnail}`);
          } catch (error) {
            console.error(`Error generating URL for ${unit.thumbnail}:`, error);
            // Try alternate path format if first attempt fails
            if (currentBook) {
              // For book0a-0c: book0a/icons/thumbnailsuni0a-11.png
              // For books 1-7: book1/icons/thumbnailsuni1-14.png
              let alternatePath;
              if (currentBook.bookId.startsWith('0')) {
                alternatePath = `book${currentBook.bookId}/icons/thumbnailsuni${currentBook.bookId}-${unit.unitNumber}.png`;
              } else {
                // For books 1-7, use the format: book1/icons/thumbnailsuni1-14.png
                alternatePath = `book${currentBook.bookId}/icons/thumbnailsuni${currentBook.bookId}-${unit.unitNumber}.png`;
              }
              
              if (alternatePath !== unit.thumbnail) {
                console.log(`Trying alternate path: ${alternatePath}`);
                try {
                  thumbnailUrl = await getS3PresignedUrl(alternatePath);
                  console.log(`Success with alternate path for unit ${unit.unitNumber}`);
                } catch (altError) {
                  console.error(`Failed with alternate path for unit ${unit.unitNumber}`);
                }
              }
            }
          }
        } else {
          console.log(`No thumbnail found for unit ${unit.unitNumber}`);
        }
        return {
          ...unit,
          thumbnailUrl
        };
      }));
      
      res.json(unitsWithThumbnails);
    } catch (err) {
      console.error("Error fetching units:", err);
      res.status(500).json({ error: "Failed to fetch units" });
    }
  });
  
  app.get("/api/units/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid unit ID" });
      }
      
      const unit = await storage.getUnitById(id);
      if (!unit) {
        return res.status(404).json({ error: "Unit not found" });
      }
      
      // Generate presigned URL for the unit thumbnail if it exists
      let thumbnailUrl = null;
      if (unit.thumbnail) {
        try {
          thumbnailUrl = await getS3PresignedUrl(unit.thumbnail);
          console.log(`Success: Generated thumbnail URL for single unit ${unit.unitNumber}: ${unit.thumbnail}`);
        } catch (error) {
          console.error(`Error generating URL for single unit ${unit.thumbnail}:`, error);
          
          // Get the book to determine the correct path format
          const bookDetails = await storage.getBookById(unit.bookId);
          
          // Try alternate path format if first attempt fails
          if (bookDetails) {
            // For book0a-0c: book0a/icons/thumbnailsuni0a-11.png
            // For books 1-7: book1/icons/thumbnailsuni1-14.png
            let alternatePath;
            if (bookDetails.bookId.startsWith('0')) {
              alternatePath = `book${bookDetails.bookId}/icons/thumbnailsuni${bookDetails.bookId}-${unit.unitNumber}.png`;
            } else {
              // For books 1-7, use the format: book1/icons/thumbnailsuni1-14.png
              alternatePath = `book${bookDetails.bookId}/icons/thumbnailsuni${bookDetails.bookId}-${unit.unitNumber}.png`;
            }
            
            if (alternatePath !== unit.thumbnail) {
              console.log(`Trying alternate path for single unit: ${alternatePath}`);
              try {
                thumbnailUrl = await getS3PresignedUrl(alternatePath);
                console.log(`Success with alternate path for single unit ${unit.unitNumber}`);
              } catch (altError) {
                console.error(`Failed with alternate path for single unit ${unit.unitNumber}`);
              }
            }
          }
        }
      }
      
      res.json({
        ...unit,
        thumbnailUrl
      });
    } catch (err) {
      console.error("Error fetching unit:", err);
      res.status(500).json({ error: "Failed to fetch unit" });
    }
  });
  
  app.post("/api/books/:bookId/units", isAdmin, async (req, res) => {
    try {
      const bookId = parseInt(req.params.bookId);
      if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }
      
      const book = await storage.getBookById(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      const unitData = insertUnitSchema.parse({
        ...req.body,
        bookId
      });
      
      const unit = await storage.createUnit(unitData);
      res.status(201).json(unit);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error("Error creating unit:", err);
      res.status(500).json({ error: "Failed to create unit" });
    }
  });
  
  app.put("/api/units/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid unit ID" });
      }
      
      const unit = await storage.getUnitById(id);
      if (!unit) {
        return res.status(404).json({ error: "Unit not found" });
      }
      
      const unitData = insertUnitSchema.partial().parse(req.body);
      const updatedUnit = await storage.updateUnit(id, unitData);
      res.json(updatedUnit);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error("Error updating unit:", err);
      res.status(500).json({ error: "Failed to update unit" });
    }
  });
  
  app.delete("/api/units/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid unit ID" });
      }
      
      const unit = await storage.getUnitById(id);
      if (!unit) {
        return res.status(404).json({ error: "Unit not found" });
      }
      
      await storage.deleteUnit(id);
      res.status(204).end();
    } catch (err) {
      console.error("Error deleting unit:", err);
      res.status(500).json({ error: "Failed to delete unit" });
    }
  });
  
  // Materials API
  app.get("/api/units/:unitId/materials", isAuthenticated, async (req, res) => {
    try {
      const unitId = parseInt(req.params.unitId);
      if (isNaN(unitId)) {
        return res.status(400).json({ error: "Invalid unit ID" });
      }
      
      const unit = await storage.getUnitById(unitId);
      if (!unit) {
        return res.status(404).json({ error: "Unit not found" });
      }
      
      const materials = await storage.getMaterials(unitId);
      res.json(materials);
    } catch (err) {
      console.error("Error fetching materials:", err);
      res.status(500).json({ error: "Failed to fetch materials" });
    }
  });
  
  app.get("/api/materials/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid material ID" });
      }
      
      const material = await storage.getMaterialById(id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      
      res.json(material);
    } catch (err) {
      console.error("Error fetching material:", err);
      res.status(500).json({ error: "Failed to fetch material" });
    }
  });
  
  app.post("/api/units/:unitId/materials", isAdmin, async (req, res) => {
    try {
      const unitId = parseInt(req.params.unitId);
      if (isNaN(unitId)) {
        return res.status(400).json({ error: "Invalid unit ID" });
      }
      
      const unit = await storage.getUnitById(unitId);
      if (!unit) {
        return res.status(404).json({ error: "Unit not found" });
      }
      
      const materialData = insertMaterialSchema.parse({
        ...req.body,
        unitId
      });
      
      const material = await storage.createMaterial(materialData);
      res.status(201).json(material);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error("Error creating material:", err);
      res.status(500).json({ error: "Failed to create material" });
    }
  });
  
  app.put("/api/materials/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid material ID" });
      }
      
      const material = await storage.getMaterialById(id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      
      const materialData = insertMaterialSchema.partial().parse(req.body);
      const updatedMaterial = await storage.updateMaterial(id, materialData);
      res.json(updatedMaterial);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error("Error updating material:", err);
      res.status(500).json({ error: "Failed to update material" });
    }
  });
  
  app.delete("/api/materials/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid material ID" });
      }
      
      const material = await storage.getMaterialById(id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      
      await storage.deleteMaterial(id);
      res.status(204).end();
    } catch (err) {
      console.error("Error deleting material:", err);
      res.status(500).json({ error: "Failed to delete material" });
    }
  });
  
  // Unit thumbnails endpoint
  app.get("/api/assets/unit-thumbnails/:bookId", isAuthenticated, async (req, res) => {
    try {
      const { bookId } = req.params;
      
      if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }
      
      // Generate presigned URLs for unit thumbnails
      // Format for unit thumbnails is book[bookId]/icons/thumbnailsuni1-10.png
      // Different ranges based on book: 
      // - Books 0a-0c: units 1-20
      // - Books 1-3: units 1-18
      // - Books 4-7: units 1-16
      
      let unitCount = 0;
      
      // Determine unit count based on book ID
      if (bookId.startsWith('0')) {
        unitCount = 20; // Books 0a, 0b, 0c have 20 units
      } else {
        const bookNum = parseInt(bookId);
        if (bookNum >= 1 && bookNum <= 3) {
          unitCount = 18; // Books 1-3 have 18 units
        } else if (bookNum >= 4 && bookNum <= 7) {
          unitCount = 16; // Books 4-7 have 16 units
        }
      }
      
      const thumbnails = [];
      
      // Generate thumbnails in batches of 10 (as per the file naming pattern)
      for (let i = 1; i <= unitCount; i += 10) {
        const startUnit = i;
        const endUnit = Math.min(i + 9, unitCount);
        const range = `${startUnit}-${endUnit}`;
        
        // Use different path patterns for different books
        let thumbnailPath;
        if (bookId.startsWith('0')) {
          thumbnailPath = `book${bookId}/icons/thumbnailsuni${bookId}-${range}.png`;
        } else {
          // For books 1-7, use the format: book1/icons/thumbnailsuni1-14.png
          thumbnailPath = `book${bookId}/icons/thumbnailsuni${bookId}-${range}.png`;
        }
          
        try {
          console.log(`Attempting to get presigned URL for batch thumbnail: ${thumbnailPath}`);
          const thumbnailUrl = await getS3PresignedUrl(thumbnailPath);
          
          if (thumbnailUrl) {
            console.log(`Successfully generated URL for ${thumbnailPath}`);
            thumbnails.push({
              startUnit,
              endUnit, 
              url: thumbnailUrl
            });
          }
        } catch (error) {
          console.error(`Failed to generate URL for ${thumbnailPath}:`, error);
        }
      }
      
      res.json(thumbnails);
    } catch (err) {
      console.error("Error generating unit thumbnail URLs:", err);
      res.status(500).json({ error: "Failed to generate unit thumbnail URLs" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
