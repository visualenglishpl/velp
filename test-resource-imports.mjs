import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to check if a file exists
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// Define the books and their unit counts
const books = [
  { id: '0a', units: 20 },
  { id: '0b', units: 20 },
  { id: '0c', units: 20 },
  { id: '1', units: 18 },
  { id: '2', units: 18 },
  { id: '3', units: 18 },
  { id: '4', units: 16 },
  { id: '5', units: 16 },
  { id: '6', units: 16 },
  { id: '7', units: 16 },
];

// Directory to check
const dataDir = path.join(__dirname, 'client', 'src', 'data');

// Statistics
let totalFiles = 0;
let existingFiles = 0;
let missingFiles = 0;
let missingByBook = {};

// Check each book and its units
books.forEach(book => {
  missingByBook[book.id] = [];
  
  for (let unit = 1; unit <= book.units; unit++) {
    // Check resources file
    const resourcesFile = path.join(dataDir, `book${book.id}-unit${unit}-resources.tsx`);
    totalFiles++;
    
    if (fileExists(resourcesFile)) {
      existingFiles++;
      process.stdout.write('.');
    } else {
      missingFiles++;
      missingByBook[book.id].push(`Unit ${unit} Resources`);
      process.stdout.write('R');
    }
    
    // Check implementation file
    const implFile = path.join(dataDir, `book${book.id}-unit${unit}-implementation.tsx`);
    totalFiles++;
    
    if (fileExists(implFile)) {
      existingFiles++;
      process.stdout.write('.');
    } else {
      missingFiles++;
      missingByBook[book.id].push(`Unit ${unit} Implementation`);
      process.stdout.write('I');
    }
  }
});

// Print summary
console.log('\n\n--- Resource Files Check Summary ---');
console.log(`Total files checked: ${totalFiles}`);
console.log(`Files existing: ${existingFiles}`);
console.log(`Files missing: ${missingFiles}`);

// Print missing files by book
console.log('\nMissing files by book:');
for (const [bookId, missingFiles] of Object.entries(missingByBook)) {
  if (missingFiles.length > 0) {
    console.log(`Book ${bookId}: ${missingFiles.length} missing files`);
    missingFiles.forEach(file => console.log(`  - ${file}`));
  } else {
    console.log(`Book ${bookId}: All files present! ✓`);
  }
}
