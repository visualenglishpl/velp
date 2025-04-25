/**
 * This file contains initial data for the in-memory storage
 * Import this file in storage.ts to populate the memory storage with initial data
 */

// Initial books to add
export const initialBooks = [
  {
    id: 1,
    bookId: '0a',
    title: 'VISUAL ENGLISH BOOK 0A',
    description: 'Beginner level - part A',
    thumbnail: '/thumbnails/book0a.jpg',
    level: 'Beginner',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    bookId: '0b',
    title: 'VISUAL ENGLISH BOOK 0B',
    description: 'Beginner level - part B',
    thumbnail: '/thumbnails/book0b.jpg',
    level: 'Beginner',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    bookId: '0c',
    title: 'VISUAL ENGLISH BOOK 0C',
    description: 'Beginner level - part C',
    thumbnail: '/thumbnails/book0c.jpg',
    level: 'Beginner',
    isPublished: true,
    createdAt: new Date(), 
    updatedAt: new Date()
  },
  {
    id: 4,
    bookId: '1',
    title: 'VISUAL ENGLISH BOOK 1',
    description: 'Elementary level',
    thumbnail: '/thumbnails/book1.jpg',
    level: 'Elementary',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    bookId: '2',
    title: 'VISUAL ENGLISH BOOK 2',
    description: 'Elementary level - advanced',
    thumbnail: '/thumbnails/book2.jpg',
    level: 'Elementary',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    bookId: '3',
    title: 'VISUAL ENGLISH BOOK 3',
    description: 'Pre-intermediate level',
    thumbnail: '/thumbnails/book3.jpg',
    level: 'Pre-intermediate',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    bookId: '4',
    title: 'VISUAL ENGLISH BOOK 4',
    description: 'Intermediate level',
    thumbnail: '/thumbnails/book4.jpg',
    level: 'Intermediate',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    bookId: '5',
    title: 'VISUAL ENGLISH BOOK 5',
    description: 'Intermediate level - advanced',
    thumbnail: '/thumbnails/book5.jpg',
    level: 'Intermediate',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    bookId: '6',
    title: 'VISUAL ENGLISH BOOK 6',
    description: 'Upper-intermediate level',
    thumbnail: '/thumbnails/book6.jpg',
    level: 'Upper-intermediate',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    bookId: '7',
    title: 'VISUAL ENGLISH BOOK 7',
    description: 'Advanced level',
    thumbnail: '/thumbnails/book7.jpg',
    level: 'Advanced',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Generate units for each book
export function generateInitialUnits() {
  const units = [];
  let unitId = 1;
  
  for (const book of initialBooks) {
    // Determine how many units based on book ID
    let numUnits = 16; // Default for books 4-7
    if (book.bookId.startsWith('0')) {
      numUnits = 20; // For books 0a, 0b, 0c
    } else if (['1', '2', '3'].includes(book.bookId)) {
      numUnits = 18; // For books 1-3
    }
    
    // Create units for this book
    for (let i = 1; i <= numUnits; i++) {
      units.push({
        id: unitId++,
        bookId: book.id,
        unitNumber: i,
        title: `UNIT ${i}`,
        description: `Unit ${i} for ${book.title}`,
        thumbnail: `/thumbnails/book${book.bookId}_unit${i}.jpg`,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  
  return units;
}

// Initial units
export const initialUnits = generateInitialUnits();