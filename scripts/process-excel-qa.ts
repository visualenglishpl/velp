// Script to process Excel sheets and generate unit-specific JSON mappings
import { processExcelToJson } from '../server/excel-to-json-processor';
import * as fs from 'fs';
import * as path from 'path';

// Check if a book ID was provided as command-line arg
const bookId = process.argv[2] || 'book1';
console.log(`Processing Excel sheets for book: ${bookId}`);

// Define paths using import.meta.url instead of __dirname
const __dirname = new URL('.', import.meta.url).pathname;
const excelPath = path.join(__dirname, '..', 'attached_assets', `VISUAL ${bookId.replace('book', '')} QUESTIONS.xlsx`);
const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define output path
const outputPath = path.join(outputDir, `qa-mapping-${bookId}.json`);

// Process the Excel file
console.log(`Reading Excel file from: ${excelPath}`);
try {
  const mapping = processExcelToJson(excelPath, outputPath);
  
  // Count entries per unit
  const unitStats: Record<string, number> = {};
  Object.values(mapping).forEach(qa => {
    if (qa.unitId) {
      unitStats[qa.unitId] = (unitStats[qa.unitId] || 0) + 1;
    } else {
      unitStats['no_unit'] = (unitStats['no_unit'] || 0) + 1;
    }
  });
  
  console.log('\nUnit statistics:');
  Object.entries(unitStats).sort().forEach(([unit, count]) => {
    console.log(`${unit}: ${count} entries`);
  });
  
  console.log(`\nTotal entries: ${Object.keys(mapping).length}`);
  console.log(`Mapping saved to: ${outputPath}`);
} catch (error) {
  console.error('Error processing Excel file:', error);
  process.exit(1);
}