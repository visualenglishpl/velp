/**
 * Resource Verification Script
 * 
 * This script checks if resources exist for all books and units in the Visual English system.
 * It will report any missing resource files and help identify issues with the implementation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the structure of books and units
const BOOKS = [
  { id: '0a', name: 'VISUAL 0A', units: 20 },
  { id: '0b', name: 'VISUAL 0B', units: 20 },
  { id: '0c', name: 'VISUAL 0C', units: 20 },
  { id: '1', name: 'VISUAL 1', units: 18 },
  { id: '2', name: 'VISUAL 2', units: 18 },
  { id: '3', name: 'VISUAL 3', units: 18 },
  { id: '4', name: 'VISUAL 4', units: 16 },
  { id: '5', name: 'VISUAL 5', units: 16 },
  { id: '6', name: 'VISUAL 6', units: 16 },
  { id: '7', name: 'VISUAL 7', units: 16 }
];

// File paths
const DATA_DIR = path.resolve('./client/src/data');
const COMMON_RESOURCE_PATTERN = 'book{bookId}-resources-common.tsx';
const UNIT_RESOURCE_PATTERN = 'book{bookId}-unit{unitId}-resources.tsx';

function checkResourceFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Check for key components in the resource file
      const hasVideoResources = content.includes('VideoResources');
      const hasGameResources = content.includes('GameResources');
      const hasDefaultExport = content.includes('export default');
      
      if (!hasVideoResources || !hasGameResources || !hasDefaultExport) {
        return { exists: true, complete: false, issues: []
          .concat(!hasVideoResources ? ['Missing video resources'] : [])
          .concat(!hasGameResources ? ['Missing game resources'] : [])
          .concat(!hasDefaultExport ? ['Missing default export'] : [])
        };
      }
      
      return { exists: true, complete: true, issues: [] };
    }
    return { exists: false, complete: false, issues: ['File does not exist'] };
  } catch (error) {
    return { exists: false, complete: false, issues: [`Error checking file: ${error.message}`] };
  }
}

function checkCommonResourceFile(bookId) {
  const fileName = COMMON_RESOURCE_PATTERN.replace('{bookId}', bookId);
  const filePath = path.join(DATA_DIR, fileName);
  return {
    fileName,
    ...checkResourceFile(filePath)
  };
}

function checkUnitResourceFile(bookId, unitId) {
  const fileName = UNIT_RESOURCE_PATTERN
    .replace('{bookId}', bookId)
    .replace('{unitId}', unitId.toString());
  const filePath = path.join(DATA_DIR, fileName);
  return {
    fileName,
    ...checkResourceFile(filePath)
  };
}

function verifyResources() {
  const results = {
    commonResources: [],
    unitResources: [],
    missingCommon: 0,
    missingUnits: 0,
    incompleteCommon: 0,
    incompleteUnits: 0
  };

  // Check all books
  for (const book of BOOKS) {
    // Check common resource file for book
    const commonResult = checkCommonResourceFile(book.id);
    results.commonResources.push({
      book: book.name,
      bookId: book.id,
      ...commonResult
    });
    
    if (!commonResult.exists) results.missingCommon++;
    if (commonResult.exists && !commonResult.complete) results.incompleteCommon++;

    // Check unit resource files for book
    for (let unitId = 1; unitId <= book.units; unitId++) {
      const unitResult = checkUnitResourceFile(book.id, unitId);
      results.unitResources.push({
        book: book.name,
        bookId: book.id,
        unitId,
        ...unitResult
      });
      
      if (!unitResult.exists) results.missingUnits++;
      if (unitResult.exists && !unitResult.complete) results.incompleteUnits++;
    }
  }

  return results;
}

function printSummary(results) {
  console.log('\n===== RESOURCE VERIFICATION SUMMARY =====');
  console.log(`Total common resource files: ${results.commonResources.length}`);
  console.log(`  - Missing: ${results.missingCommon}`);
  console.log(`  - Incomplete: ${results.incompleteCommon}`);
  console.log(`Total unit resource files: ${results.unitResources.length}`);
  console.log(`  - Missing: ${results.missingUnits}`);
  console.log(`  - Incomplete: ${results.incompleteUnits}`);
  
  if (results.missingCommon > 0 || results.incompleteCommon > 0) {
    console.log('\n----- COMMON RESOURCE ISSUES -----');
    results.commonResources
      .filter(r => !r.exists || !r.complete)
      .forEach(r => {
        console.log(`${r.book} (${r.fileName}): ${r.exists ? 'Incomplete' : 'Missing'}`);
        if (r.exists && r.issues.length > 0) {
          r.issues.forEach(issue => console.log(`  - ${issue}`));
        }
      });
  }
  
  if (results.missingUnits > 0 || results.incompleteUnits > 0) {
    console.log('\n----- UNIT RESOURCE ISSUES -----');
    results.unitResources
      .filter(r => !r.exists || !r.complete)
      .forEach(r => {
        console.log(`${r.book} Unit ${r.unitId} (${r.fileName}): ${r.exists ? 'Incomplete' : 'Missing'}`);
        if (r.exists && r.issues.length > 0) {
          r.issues.forEach(issue => console.log(`  - ${issue}`));
        }
      });
  }
  
  console.log('\n===== VERIFICATION COMPLETE =====');
}

function printBookUnitStatus(results, targetBookId) {
  // Filter results for the specific book
  const bookUnits = results.unitResources.filter(r => r.bookId === targetBookId);
  const bookCommon = results.commonResources.find(r => r.bookId === targetBookId);
  const bookName = BOOKS.find(b => b.id === targetBookId)?.name || `Book ${targetBookId}`;
  
  console.log(`\n===== ${bookName} RESOURCE STATUS =====`);
  
  // Print common resources status
  console.log('\nCommon Resources:');
  if (bookCommon) {
    console.log(`  ${bookCommon.fileName}: ${bookCommon.exists ? (bookCommon.complete ? 'Complete' : 'Incomplete') : 'Missing'}`);
    if (bookCommon.exists && bookCommon.issues.length > 0) {
      bookCommon.issues.forEach(issue => console.log(`    - ${issue}`));
    }
  } else {
    console.log('  Common resource information not found');
  }
  
  // Print unit resources status
  console.log('\nUnit Resources:');
  bookUnits.forEach(unit => {
    console.log(`  Unit ${unit.unitId}: ${unit.exists ? (unit.complete ? 'Complete' : 'Incomplete') : 'Missing'}`);
    if (unit.exists && unit.issues.length > 0) {
      unit.issues.forEach(issue => console.log(`    - ${issue}`));
    }
  });
  
  // Calculate completion percentage
  const totalUnits = bookUnits.length;
  const completeUnits = bookUnits.filter(u => u.exists && u.complete).length;
  const percentage = (completeUnits / totalUnits) * 100;
  
  console.log(`\nCompletion: ${completeUnits}/${totalUnits} units (${percentage.toFixed(2)}%)`);
  console.log('\n=====================================');
}

// Main execution
const results = verifyResources();

// Print summary of all resources
printSummary(results);

// Check if a specific book was requested
const argv = process.argv.slice(2);
if (argv.length > 0 && argv[0] === '--book') {
  const bookId = argv[1];
  if (bookId && BOOKS.some(b => b.id === bookId)) {
    printBookUnitStatus(results, bookId);
  } else {
    console.log('\nSpecify a valid book ID to see detailed status');
    console.log('Available books:');
    BOOKS.forEach(b => console.log(`  - ${b.id}: ${b.name}`));
  }
}
