import { db } from './db';
import { books, units } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function syncThumbnails() {
  try {
    console.log('Starting thumbnail synchronization...');
    
    // Get all books
    const allBooks = await db.select().from(books);
    
    for (const book of allBooks) {
      console.log(`Processing book ${book.bookId}...`);
      
      // Get units for this book
      const bookUnits = await db.select().from(units).where(eq(units.bookId, book.id));
      
      for (const unit of bookUnits) {
        // Create the thumbnail path based on pattern: s3://visualenglishmaterial/book[id]/icons/thumbnailsuni[book-id]-[unit-number].png
        // We'll use a direct path since we're generating presigned URLs later
        const thumbnailPath = `book${book.bookId}/icons/thumbnailsuni${book.bookId}-${unit.unitNumber}.png`;
        
        // Update the unit with the thumbnail path
        await db.update(units)
          .set({ thumbnail: thumbnailPath })
          .where(eq(units.id, unit.id));
        
        console.log(`  Updated unit ${unit.unitNumber} with thumbnail: ${thumbnailPath}`);
      }
    }
    
    console.log('Thumbnail synchronization completed successfully!');
  } catch (error) {
    console.error('Error synchronizing thumbnails:', error);
  }
}

// Run the synchronization
syncThumbnails();