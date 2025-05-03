/**
 * Update TeacherResources.tsx Script
 * 
 * This script updates the TeacherResources.tsx file to include support for all books (0A-7)
 * and all units without any special exceptions.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Book configuration
const BOOKS = [
  { id: '0a', name: 'VISUAL 0A', units: 20, requiresLessonPlans: true },
  { id: '0b', name: 'VISUAL 0B', units: 20, requiresLessonPlans: true },
  { id: '0c', name: 'VISUAL 0C', units: 20, requiresLessonPlans: true },
  { id: '1', name: 'VISUAL 1', units: 18, requiresLessonPlans: false },
  { id: '2', name: 'VISUAL 2', units: 18, requiresLessonPlans: false },
  { id: '3', name: 'VISUAL 3', units: 18, requiresLessonPlans: false },
  { id: '4', name: 'VISUAL 4', units: 16, requiresLessonPlans: false },
  { id: '5', name: 'VISUAL 5', units: 16, requiresLessonPlans: false },
  { id: '6', name: 'VISUAL 6', units: 16, requiresLessonPlans: false },
  { id: '7', name: 'VISUAL 7', units: 16, requiresLessonPlans: false }
];

// Generate code for adding book titles
function generateBookTitles() {
  let code = '';
  
  BOOKS.forEach(book => {
    code += `// Book ${book.id} title and unit titles\n`;
    code += `const BOOK${book.id.toUpperCase()}_TITLE = '${book.name}';\n`;
    code += `const BOOK${book.id.toUpperCase()}_UNIT_TITLES: Record<string, string> = {\n`;
    
    for (let i = 1; i <= book.units; i++) {
      code += `  '${i}': 'Unit ${i}',\n`;
    }
    
    code += `};\n\n`;
  });
  
  return code;
}

// Generate code for isSpecialBookUnit function
function generateIsSpecialBookUnit() {
  let code = '// Check if this is a special book/unit with predefined resources\n';
  code += 'const isSpecialBookUnit = \n';
  
  // Start with Book 0A
  BOOKS.forEach((book, index) => {
    const units = [];
    
    for (let i = 1; i <= book.units; i++) {
      units.push(`'${i}'`);
    }
    
    code += `  (bookId === '${book.id}' && [${units.join(', ')}].includes(unitId))`;
    
    if (index < BOOKS.length - 1) {
      code += ` ||\n`;
    } else {
      code += `;\n`;
    }
  });
  
  return code;
}

// Generate code for dynamic implementation import function
function generateDynamicImplImport() {
  let code = 'const dynamicImplImport = async (book: string, unit: number) => {\n';
  code += '  try {\n';
  
  BOOKS.forEach(book => {
    code += `    if (book === '${book.id}') {\n`;
    code += `      switch(unit) {\n`;
    
    for (let i = 1; i <= book.units; i++) {
      code += `        case ${i}:\n`;
      code += `          return import('@/data/book${book.id}-unit${i}-implementation');\n`;
    }
    
    code += `        default:\n`;
    code += `          return null;\n`;
    code += `      }\n`;
    code += `    }\n`;
  });
  
  code += '    return null;\n';
  code += '  } catch (error) {\n';
  code += '    console.error(`Error loading implementation for Book ${book}, Unit ${unit}:`, error);\n';
  code += '    return null;\n';
  code += '  }\n';
  code += '};\n';
  
  return code;
}

// Generate code for dynamic resource import function
function generateDynamicResourceImport() {
  let code = 'const dynamicResourceImport = async (book: string, unit: number) => {\n';
  code += '  try {\n';
  
  BOOKS.forEach(book => {
    code += `    if (book === '${book.id}') {\n`;
    code += `      switch(unit) {\n`;
    
    for (let i = 1; i <= book.units; i++) {
      code += `        case ${i}:\n`;
      code += `          return import('@/data/book${book.id}-unit${i}-resources');\n`;
    }
    
    code += `        default:\n`;
    code += `          return null;\n`;
    code += `      }\n`;
    code += `    }\n`;
  });
  
  code += '    return null;\n';
  code += '  } catch (error) {\n';
  code += '    console.error(`Error loading resources for Book ${book}, Unit ${unit}:`, error);\n';
  code += '    return null;\n';
  code += '  }\n';
  code += '};\n';
  
  return code;
}

// Generate the main code
function generateCode() {
  const bookTitles = generateBookTitles();
  const isSpecialBookUnit = generateIsSpecialBookUnit();
  const dynamicImplImport = generateDynamicImplImport();
  const dynamicResourceImport = generateDynamicResourceImport();
  
  console.log('Generated code for book titles');
  console.log('Generated code for isSpecialBookUnit');
  console.log('Generated code for dynamicImplImport');
  console.log('Generated code for dynamicResourceImport');
  
  // Create the output directory if it doesn't exist
  const outputDir = path.join(__dirname, '..', 'temp');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the code to a file
  const outputFile = path.join(outputDir, 'teacherresources_update.txt');
  
  let content = '// Book titles and unit titles\n';
  content += bookTitles;
  content += '// isSpecialBookUnit function\n';
  content += isSpecialBookUnit;
  content += '\n// dynamicImplImport function\n';
  content += dynamicImplImport;
  content += '\n// dynamicResourceImport function\n';
  content += dynamicResourceImport;
  
  fs.writeFileSync(outputFile, content);
  
  console.log(`\nGenerated code written to: ${outputFile}`);
  console.log('\nTo update TeacherResources.tsx:');
  console.log('1. Add the generated book titles at the top of the file.');
  console.log('2. Replace the isSpecialBookUnit function with the generated code.');
  console.log('3. Replace the dynamicImplImport function with the generated code.');
  console.log('4. Replace the dynamicResourceImport function with the generated code.');
}

// Run the code generation
generateCode();
