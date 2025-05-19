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

      // Improved approach: process units in batches to avoid overwhelming S3
      // and use a more efficient thumbnail lookup strategy
      const unitsWithThumbnails = [];
      const batchSize = 4; // Process 4 units at a time
      
      // Most likely path pattern for this book (based on observed data)
      const primaryPathPattern = 
        pathBookId.startsWith('0') ? `book${pathBookId}/icons/thumbnailsuni${pathBookId}-{unitNumber}.png` :
        pathBookId === '7' ? `book7/icons/thumbnailsuni7-{unitNumber}.png` :
        `book${pathBookId}/icons/thumbnailsuni${pathBookId}-{unitNumber}.png`;
      
      // Process units in batches to avoid overwhelming S3
      for (let i = 0; i < units.length; i += batchSize) {
        const batch = units.slice(i, i + batchSize);
        
        // Process batch in parallel
        const batchResults = await Promise.all(batch.map(async (unit) => {
          // Try the most likely path pattern first based on book ID
          const primaryPath = primaryPathPattern.replace('{unitNumber}', unit.unitNumber);
          
          try {
            const url = await getS3PresignedUrl(primaryPath);
            if (url) {
              console.log(`Success: Generated thumbnail URL for unit ${unit.unitNumber}: ${primaryPath}`);
              return { ...unit, thumbnailUrl: url };
            }
          } catch (error) {
            // Silent fail for primary path
          }
          
          // Fallback: Use colored background instead of trying multiple paths
          // Set color based on book ID for better visual appeal
          const bookColors = {
            '0a': '#FF40FF', // Pink
            '0b': '#FF7F27', // Orange
            '0c': '#00CEDD', // Teal
            '1': '#FFFF00',  // Yellow
            '2': '#9966CC',  // Purple
            '3': '#00CC00',  // Green
            '4': '#5DADEC',  // Blue
            '5': '#00CC66',  // Green
            '6': '#FF0000',  // Red
            '7': '#00FF00'   // Bright Green
          };
          
          // Use the book color or default to gray
          const fallbackColor = bookColors[pathBookId] || '#CCCCCC';
          
          return { 
            ...unit, 
            thumbnailUrl: null,
            fallbackColor: fallbackColor
          };
        }));
        
        unitsWithThumbnails.push(...batchResults);
      }
      
      return res.json(unitsWithThumbnails);
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ error: "Failed to fetch units" });
    }
  });
}
