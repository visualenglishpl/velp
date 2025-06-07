/**
 * Script to update Q&A mapping files to use complete filenames as patterns
 * instead of just extracted codes
 */

import fs from 'fs';
import path from 'path';

function updateMappingFile(filePath) {
  console.log(`Updating mapping file: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const updatedData = {};
  
  Object.entries(data).forEach(([key, value]) => {
    // If the key is just a short pattern (like "04 A" or "02 N A")
    // and we have a filename, use the filename as the new key
    if (value.filename && value.filename !== key) {
      // Clean up the filename to remove extra parts like "..." or "-"
      let cleanFilename = value.filename
        .replace(/\.\.\.$/, '') // Remove trailing ...
        .replace(/^(.+?)\s*-\s*(.+)$/, '$1 $2') // Convert "04 A - description" to "04 A description"
        .trim();
      
      // Use the cleaned filename as the key
      updatedData[cleanFilename] = {
        ...value,
        filename: cleanFilename
      };
      
      console.log(`Updated: "${key}" -> "${cleanFilename}"`);
    } else {
      // Keep the entry as-is if it already looks like a full filename
      updatedData[key] = value;
    }
  });
  
  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`Updated ${Object.keys(updatedData).length} entries in ${filePath}`);
}

// Update all mapping files
const mappingFiles = [
  'client/src/data/qa-mapping-book1.json',
  'client/src/data/qa-mapping-book2.json',
  'client/src/data/qa-mapping-book3.json',
  'client/src/data/qa-mapping-book4.json',
  'client/src/data/qa-mapping-book5.json',
  'client/src/data/qa-mapping-book6.json',
  'client/src/data/qa-mapping-book7.json'
];

mappingFiles.forEach(updateMappingFile);

console.log('Mapping file updates completed!');