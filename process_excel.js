// A simple script to process Excel files and generate the updated mappings with unit information
const { exec } = require('child_process');
const path = require('path');

// Define book IDs to process
const bookIds = ['book1', 'book2'];

// Function to process an Excel file for a specific book
function processExcel(bookId) {
  return new Promise((resolve, reject) => {
    console.log(`Processing Excel for ${bookId}...`);
    
    // Build the command
    const command = `node -e "
      const { processExcelAndGenerateTS } = require('./server/excel-processor');
      const fs = require('fs');
      const path = require('path');
      
      // Define paths
      const bookNum = '${bookId}'.replace('book', '');
      const excelPath = path.join(__dirname, 'attached_assets', 
        bookNum === '2' 
          ? 'VISUAL ' + bookNum + '  QUESTIONS.xlsx'
          : 'VISUAL ' + bookNum + ' QUESTIONS.xlsx'
      );
      const outputDir = path.join(__dirname, 'client', 'src', 'data');
      
      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Define output path
      const outputPath = path.join(outputDir, 'qa-mapping-' + '${bookId}' + '.json');
      
      // Process the Excel file
      console.log('Reading Excel file from: ' + excelPath);
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
        
        console.log('\\nUnit statistics:');
        Object.entries(unitStats).sort().forEach(([unit, count]) => {
          console.log(unit + ': ' + count + ' entries');
        });
        
        console.log('\\nTotal entries: ' + Object.keys(mapping).length);
        console.log('Mapping saved to: ' + outputPath);
      } catch (error) {
        console.error('Error processing Excel file:', error);
        process.exit(1);
      }
    "`;
    
    // Execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error processing ${bookId}:`, error);
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr for ${bookId}:`, stderr);
      }
      
      console.log(stdout);
      resolve();
    });
  });
}

// Process all books
async function processAllBooks() {
  for (const bookId of bookIds) {
    try {
      await processExcel(bookId);
      console.log(`Successfully processed ${bookId}`);
    } catch (error) {
      console.error(`Failed to process ${bookId}:`, error);
    }
  }
  
  console.log('All books processed successfully!');
}

// Start processing
processAllBooks().catch(console.error);