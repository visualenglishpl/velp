import { db } from '../server/db';
import { books, units } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function updateUnitThumbnails() {
  try {
    console.log('Starting unit thumbnails update...');
    
    // Get all books
    const allBooks = await db.select().from(books);
    
    for (const book of allBooks) {
      console.log(`Processing book ${book.title} (${book.bookId})...`);
      
      // Get units for this book
      const bookUnits = await db.select().from(units).where(eq(units.bookId, book.id));
      
      for (const unit of bookUnits) {
        // Format the thumbnail path following the pattern:
        // For book0a-0c: s3://visualenglishmaterial/book0a/icons/thumbnailsuni0a-11.png
        // For book1-7: s3://visualenglishmaterial/thumbnails/thumbnailsuni1-1.png
        
        let thumbnailPath;
        if (book.bookId.startsWith('0')) {
          // Use the book0a/icons/... format for books 0a, 0b, 0c
          thumbnailPath = `book${book.bookId}/icons/thumbnailsuni${book.bookId}-${unit.unitNumber}.png`;
        } else {
          // Use the thumbnails/... format for books 1-7
          thumbnailPath = `thumbnails/thumbnailsuni${book.bookId}-${unit.unitNumber}.png`;
        }
        
        // Update the unit with the thumbnail path
        await db.update(units)
          .set({ thumbnail: thumbnailPath })
          .where(eq(units.id, unit.id));
        
        console.log(`  Unit ${unit.unitNumber}: Updated thumbnail to ${thumbnailPath}`);
      }
      
      console.log(`Completed processing for book ${book.title} (${book.bookId})`);
    }
    
    console.log('All unit thumbnails have been updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating unit thumbnails:', error);
    process.exit(1);
  }
}

// Run the update
updateUnitThumbnails();