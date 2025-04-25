import fetch from 'node-fetch';

/**
 * Script to add initial books to the system
 * This script:
 * 1. Adds Book 0a, Book 0b, Book 0c
 * 2. Adds Book 1-7
 * According to the book specifications
 */

async function main() {
  console.log('Starting to add initial books to the system...');
  
  // URL where the server is running
  const BASE_URL = 'http://localhost:5000';
  
  try {
    // First login as admin
    console.log('Logging in as admin...');
    const loginRes = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: '12345',
        role: 'admin'
      })
    });
    
    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
    }
    
    const user = await loginRes.json();
    console.log(`Logged in as ${user.username} with role ${user.role}`);
    
    // Define books to add
    const books = [
      {
        bookId: '0a',
        title: 'VISUAL ENGLISH BOOK 0A',
        description: 'Beginner level - part A',
        thumbnail: '/thumbnails/book0a.jpg',
        level: 'Beginner',
        isPublished: true
      },
      {
        bookId: '0b',
        title: 'VISUAL ENGLISH BOOK 0B',
        description: 'Beginner level - part B',
        thumbnail: '/thumbnails/book0b.jpg',
        level: 'Beginner',
        isPublished: true
      },
      {
        bookId: '0c',
        title: 'VISUAL ENGLISH BOOK 0C',
        description: 'Beginner level - part C',
        thumbnail: '/thumbnails/book0c.jpg',
        level: 'Beginner',
        isPublished: true
      },
      {
        bookId: '1',
        title: 'VISUAL ENGLISH BOOK 1',
        description: 'Elementary level',
        thumbnail: '/thumbnails/book1.jpg',
        level: 'Elementary',
        isPublished: true
      },
      {
        bookId: '2',
        title: 'VISUAL ENGLISH BOOK 2',
        description: 'Elementary level - advanced',
        thumbnail: '/thumbnails/book2.jpg',
        level: 'Elementary',
        isPublished: true
      },
      {
        bookId: '3',
        title: 'VISUAL ENGLISH BOOK 3',
        description: 'Pre-intermediate level',
        thumbnail: '/thumbnails/book3.jpg',
        level: 'Pre-intermediate',
        isPublished: true
      },
      {
        bookId: '4',
        title: 'VISUAL ENGLISH BOOK 4',
        description: 'Intermediate level',
        thumbnail: '/thumbnails/book4.jpg',
        level: 'Intermediate',
        isPublished: true
      },
      {
        bookId: '5',
        title: 'VISUAL ENGLISH BOOK 5',
        description: 'Intermediate level - advanced',
        thumbnail: '/thumbnails/book5.jpg',
        level: 'Intermediate',
        isPublished: true
      },
      {
        bookId: '6',
        title: 'VISUAL ENGLISH BOOK 6',
        description: 'Upper-intermediate level',
        thumbnail: '/thumbnails/book6.jpg',
        level: 'Upper-intermediate',
        isPublished: true
      },
      {
        bookId: '7',
        title: 'VISUAL ENGLISH BOOK 7',
        description: 'Advanced level',
        thumbnail: '/thumbnails/book7.jpg',
        level: 'Advanced',
        isPublished: true
      }
    ];
    
    // Add each book
    for (const book of books) {
      console.log(`Adding book ${book.bookId}: ${book.title}...`);
      
      const bookRes = await fetch(`${BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });
      
      if (!bookRes.ok) {
        console.warn(`Failed to add book ${book.bookId}: ${bookRes.status} ${bookRes.statusText}`);
        continue;
      }
      
      const newBook = await bookRes.json();
      console.log(`Successfully added book ${book.bookId} with database ID ${newBook.id}`);
      
      // Add units for this book
      await addUnitsForBook(newBook, BASE_URL);
    }
    
    console.log('Finished adding books and units!');
  } catch (error) {
    console.error('Error adding books:', error);
    process.exit(1);
  }
}

async function addUnitsForBook(book, baseUrl) {
  // Determine how many units based on book ID
  let numUnits = 16; // Default for books 4-7
  if (book.bookId.startsWith('0')) {
    numUnits = 20; // For books 0a, 0b, 0c
  } else if (['1', '2', '3'].includes(book.bookId)) {
    numUnits = 18; // For books 1-3
  }
  
  console.log(`Adding ${numUnits} units for book ${book.bookId}...`);
  
  for (let i = 1; i <= numUnits; i++) {
    const unit = {
      bookId: book.id, // Database ID of the book
      unitNumber: i,
      title: `UNIT ${i}`,
      description: `Unit ${i} for ${book.title}`,
      thumbnail: `/thumbnails/book${book.bookId}_unit${i}.jpg`,
      isPublished: true
    };
    
    const unitRes = await fetch(`${baseUrl}/api/units`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(unit)
    });
    
    if (!unitRes.ok) {
      console.warn(`Failed to add unit ${i} for book ${book.bookId}: ${unitRes.status} ${unitRes.statusText}`);
      continue;
    }
    
    const newUnit = await unitRes.json();
    console.log(`Successfully added unit ${i} for book ${book.bookId}`);
  }
}

// Run the script
main();