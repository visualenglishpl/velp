import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertBookSchema, insertUnitSchema, insertMaterialSchema } from "@shared/schema";
import { z } from "zod";

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
      res.json(units);
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
      
      res.json(unit);
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

  const httpServer = createServer(app);

  return httpServer;
}
