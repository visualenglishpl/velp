import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const BASE_URL = 'http://localhost:3000';
  
  try {
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
    
    console.log('Using direct endpoint to add all books at once');
    
    // Add all books in a single API call
    const response = await fetch(`${BASE_URL}/api/direct/add-books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        adminKey: 'admin-secret-key',
        books: books
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add books: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`Successfully added ${result.addedBooks} books and ${result.addedUnits} units`);
      
      // Print out the first book added
      if (result.books && result.books.length > 0) {
        console.log('First book added:', result.books[0].title);
      }
    } else {
      console.error('Failed to add books:', result.error);
    }
    
    console.log('Finished adding books and units!');
  } catch (error) {
    console.error('Error adding books:', error);
    process.exit(1);
  }
}

// Run the script
main();