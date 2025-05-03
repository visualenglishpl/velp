import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read TeacherResources.tsx
const filePath = path.join(__dirname, 'client', 'src', 'components', 'TeacherResources.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Function to find import statements for a specific book
function findImportsForBook(bookId) {
  const implImportPattern = new RegExp(`book${bookId}-unit\\d+-implementation`, 'g');
  const resourceImportPattern = new RegExp(`book${bookId}-unit\\d+-resources`, 'g');
  
  const implMatches = [...content.matchAll(implImportPattern)];
  const resourceMatches = [...content.matchAll(resourceImportPattern)];
  
  return {
    implementations: implMatches.map(m => m[0]),
    resources: resourceMatches.map(m => m[0])
  };
}

// Check each book
function checkBookImports(bookId, unitCount) {
  console.log(`\nBook ${bookId} imports:`);
  const imports = findImportsForBook(bookId);
  console.log(`- Implementation files: ${imports.implementations.length}/${unitCount}`);
  console.log(`- Resource files: ${imports.resources.length}/${unitCount}`);

  // Check for unique unit numbers
  const implUnits = new Set(imports.implementations.map(i => i.match(/unit(\d+)/)[1]));
  const resourceUnits = new Set(imports.resources.map(i => i.match(/unit(\d+)/)[1]));
  
  console.log(`- Unique implementation units: ${implUnits.size}/${unitCount}`);
  console.log(`- Unique resource units: ${resourceUnits.size}/${unitCount}`);
  
  const allComplete = implUnits.size === unitCount && resourceUnits.size === unitCount;
  if (allComplete) {
    console.log(`\u2713 Book ${bookId} has all ${unitCount} units properly imported!`);
    return true;
  } else {
    console.log(`\u274c Book ${bookId} has missing imports`);
    
    // List missing unit numbers
    const missingImpl = [];
    const missingRes = [];
    
    for (let i = 1; i <= unitCount; i++) {
      if (!implUnits.has(String(i))) missingImpl.push(i);
      if (!resourceUnits.has(String(i))) missingRes.push(i);
    }
    
    if (missingImpl.length > 0) console.log(`  Missing implementation units: ${missingImpl.join(', ')}`);
    if (missingRes.length > 0) console.log(`  Missing resource units: ${missingRes.join(', ')}`);
    
    return false;
  }
}

// Check books with specific unit counts
const bookStatus = {
  '0a': checkBookImports('0a', 20),
  '0b': checkBookImports('0b', 20),
  '0c': checkBookImports('0c', 20),
  '1': checkBookImports('1', 18),
  '2': checkBookImports('2', 18),
  '3': checkBookImports('3', 18),
  '4': checkBookImports('4', 16),
  '5': checkBookImports('5', 16),
  '6': checkBookImports('6', 16),
  '7': checkBookImports('7', 16),
};

// Print summary
console.log('\n\n--- SUMMARY ---');
console.log(`Total books checked: ${Object.keys(bookStatus).length}`);
console.log(`Books with complete imports: ${Object.values(bookStatus).filter(Boolean).length}`);
console.log(`Books with missing imports: ${Object.values(bookStatus).filter(v => !v).length}`);

if (Object.values(bookStatus).every(Boolean)) {
  console.log('\n\u2713 \u2713 \u2713 ALL BOOKS HAVE COMPLETE IMPORTS! \u2713 \u2713 \u2713');
} else {
  console.log('\n\u274c Some books have missing imports!');
}
