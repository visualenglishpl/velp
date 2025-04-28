// Simple script to test Excel processing (CommonJS version)
const fs = require('fs');
const path = require('path');
const { processExcelAndGenerateTS } = require('../server/excel-processor');

const bookId = 'book1';
console.log(`Processing Excel sheets for book: ${bookId}`);

// Define paths - Note the extra space in file name for book 2
const bookNum = bookId.replace('book', '');
const excelPath = bookNum === '2' 
  ? path.join(__dirname, '..', 'attached_assets', `VISUAL ${bookNum}  QUESTIONS.xlsx`)
  : path.join(__dirname, '..', 'attached_assets', `VISUAL ${bookNum} QUESTIONS.xlsx`);
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
  const mapping = processExcelAndGenerateTS(excelPath, outputPath);
  
  // Count entries per unit
  const unitStats = {};
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