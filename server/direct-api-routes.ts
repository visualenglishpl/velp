import { Express } from 'express';
import { db } from './db';
import { materials } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Registers direct API routes for accessing content
 */
export function registerDirectAPIRoutes(app: Express) {
  // Direct material access for a specific book and unit
  app.get('/api/direct/book:bookId/unit:unitNumber/materials', async (req, res) => {
    try {
      const { bookId, unitNumber } = req.params;
      
      console.log(`Fetching materials for Book ${bookId}, Unit ${unitNumber}`);
      
      // Find materials for this book and unit
      const result = await db.select()
        .from(materials)
        .where(
          and(
            eq(materials.bookId, Number(bookId)),
            eq(materials.unitNumber, Number(unitNumber))
          )
        );
      
      if (!result || result.length === 0) {
        return res.status(404).json({ 
          error: 'No materials found',
          message: `No materials found for Book ${bookId}, Unit ${unitNumber}`
        });
      }
      
      console.log(`Found ${result.length} materials for Book ${bookId}, Unit ${unitNumber}`);
      
      res.json(result);
    } catch (error) {
      console.error('Error fetching direct materials:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve materials', 
        message: error.message
      });
    }
  });
  
  // Health check endpoint
  app.get('/api/healthcheck', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Direct API is working', 
      timestamp: new Date().toISOString() 
    });
  });
  
  console.log("Direct API routes registered successfully");
}