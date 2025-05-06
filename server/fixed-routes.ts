// Temporary fixed version of the routes endpoint

import { storage } from './storage';

export async function setupFixedRoutes(app: any, getS3PresignedUrl: any) {
  // New fixed endpoint to get units for a specific book
  app.get("/api/books/:bookId/units", async (req, res) => {
    try {
      const pathBookId = req.params.bookId;
      
      if (!pathBookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }
      
      // Debug the available books
      const allBooks = await storage.getBooks();
      console.log("Available books in storage:", allBooks.map(b => ({ id: b.id, bookId: b.bookId, title: b.title })));

      // Find the book by the string bookId (0a, 0b, etc.)
      let book = allBooks.find(b => b.bookId === pathBookId);
      
      if (!book) {
        console.log(`Book with path ID ${pathBookId} not found, creating dynamically`);
        // Create book dynamically if it's a valid book ID
        if (['0a', '0b', '0c', '1', '2', '3', '4', '5', '6', '7'].includes(pathBookId)) {
          const bookTitle = {
            '0a': 'VISUAL ENGLISH BOOK 0A',
            '0b': 'VISUAL ENGLISH BOOK 0B',
            '0c': 'VISUAL ENGLISH BOOK 0C',
            '1': 'VISUAL ENGLISH BOOK 1',
            '2': 'VISUAL ENGLISH BOOK 2',
            '3': 'VISUAL ENGLISH BOOK 3',
            '4': 'VISUAL ENGLISH BOOK 4',
            '5': 'VISUAL ENGLISH BOOK 5',
            '6': 'VISUAL ENGLISH BOOK 6',
            '7': 'VISUAL ENGLISH BOOK 7',
          }[pathBookId] || `VISUAL ENGLISH BOOK ${pathBookId}`;
          
          const bookLevel = {
            '0a': 'Beginner',
            '0b': 'Beginner',
            '0c': 'Beginner',
            '1': 'Elementary',
            '2': 'Pre-intermediate',
            '3': 'Intermediate',
            '4': 'Upper Intermediate',
            '5': 'Advanced',
            '6': 'Advanced Plus',
            '7': 'Proficiency',
          }[pathBookId] || 'Unknown';
          
          // Create the book with the actual bookId string matching the path
          try {
            book = await storage.createBook({
              bookId: pathBookId,
              title: bookTitle,
              description: `${bookLevel} level book`,
              thumbnail: `/thumbnails/book${pathBookId}.jpg`,
              level: bookLevel,
              isPublished: true,
            });
            
            console.log(`Created dynamic book:`, book);
          } catch (error) {
            console.error(`Failed to create dynamic book:`, error);
            return res.status(500).json({ error: "Failed to create book" });
          }
        } else {
          console.log(`Book with ID ${pathBookId} is not a valid book ID`);
          return res.status(404).json({ error: "Book not found" });
        }
      }
      
      // Generate a standardized set of units based on the book ID
      // Books 0a/0b/0c have 20 units, Books 1-3 have 18 units, Books 4-7 have 16 units
      let unitCount = 16; // Default for Books 4-7
      
      if (pathBookId.startsWith('0')) {
        unitCount = 20; // For Books 0a, 0b, 0c
      } else if (['1', '2', '3'].includes(pathBookId)) {
        unitCount = 18; // For Books 1-3
      }
      
      const units = Array.from({ length: unitCount }, (_, i) => {
        const unitNumber = (i + 1).toString();
        return {
          unitNumber,
          title: `Unit ${unitNumber}`,
          thumbnailUrl: null,
          description: `Description for Book ${pathBookId} Unit ${unitNumber}`
        };
      });
      
      // Get the correct paths for a specific book
      const getBookSpecificPaths = (bookId: string, unitNumber: string): string[] => {
        // Base paths that work for most books
        const basePaths = [
          `book${bookId}/icons/thumbnailsuni${bookId}-${unitNumber}.png`,
          `book${bookId}/thumbnails/unit${unitNumber}.png`,
          `book${bookId}/icons/unit${unitNumber}.png`,
          `book${bookId}/unit${unitNumber}/thumbnail.png`,
          `thumbnails/book${bookId}-unit${unitNumber}.png`,
        ];

        // Book-specific path patterns based on our observations
        if (bookId === "4") {
          return [
            `book4/icons/thumbnailsuni4-${unitNumber}.png`,
            `book4/thumbnails/thumbnailsuni4-${unitNumber}.png`,
            `book4/unit${unitNumber}/cover.png`,
            ...basePaths
          ];
        } else if (bookId === "7") {
          return [
            `book7/icons/thumbnailsuni7-${unitNumber}.png`,
            `book7/thumbnails/thumbnailsuni7-${unitNumber}.png`,
            `book7/unit${unitNumber}/thumbnail.png`,
            ...basePaths
          ];
        } else if (bookId.startsWith('0')) {
          // Special case for books 0a, 0b, 0c
          return [
            `book${bookId}/icons/thumbnailsuni${bookId}-${unitNumber}.png`,
            `book${bookId}/thumbnails/thumbnailsuni${bookId}-${unitNumber}.png`,
            `book${bookId}/unit${unitNumber}/thumbnail.png`,
            `book${bookId}/units/unit${unitNumber}/thumbnail.png`,
            ...basePaths
          ];
        }
        
        // Default paths for other books
        return basePaths;
      }

      // Try to get thumbnail URLs for each unit
      const unitsWithThumbnails = await Promise.all(units.map(async (unit) => {
        // Get the correct paths for this specific book and unit
        const possiblePaths = getBookSpecificPaths(pathBookId, unit.unitNumber);
        
        // Log the book ID and unit number for debugging
        console.log(`Looking for thumbnails for book ID: ${pathBookId}, unit ${unit.unitNumber}`);
        console.log(`Trying these paths: ${possiblePaths.join(', ')}`);
        
        // Try each path to find a valid thumbnail URL
        let thumbnailUrl = null;
        for (const path of possiblePaths) {
          try {
            const url = await getS3PresignedUrl(path);
            if (url) {
              console.log(`Success: Generated thumbnail URL for unit ${unit.unitNumber}: ${path}`);
              thumbnailUrl = url;
              break;
            }
          } catch (error) {
            // Just log and continue to next path
            console.log(`No thumbnail found at: ${path}`);
          }
        }
        
        // Return the unit with thumbnail URL if found, otherwise without
        return { ...unit, thumbnailUrl: thumbnailUrl };
      }));
      
      return res.json(unitsWithThumbnails);
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ error: "Failed to fetch units" });
    }
  });
}
