/**
 * Update Teacher Resources Script
 * 
 * This script generates the necessary code changes for TeacherResources.tsx
 * to import and use all generated resources across all books and units.
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
  { id: '5', name: 'VISUAL 5', units: 16, requiresLessonPlans: true },
  { id: '6', name: 'VISUAL 6', units: 16, requiresLessonPlans: true },
  { id: '7', name: 'VISUAL 7', units: 16, requiresLessonPlans: true }
];

// Main function to update teacher resources
async function main() {
  console.log('Updating TeacherResources.tsx with all book and unit resources...');
  
  const targetFile = path.join(__dirname, '..', 'client', 'src', 'components', 'TeacherResources.tsx');
  
  if (!fs.existsSync(targetFile)) {
    console.error(`⚠️ Error: ${targetFile} does not exist`);
    return;
  }
  
  // Read current file content
  const currentContent = fs.readFileSync(targetFile, 'utf8');
  
  // Generate imports for all units
  const imports = generateResourceImports();
  
  // Generate resource mapping functions
  const resourceMappings = generateResourceMappings();
  
  // Update the file with new imports and mappings
  let updatedContent = insertImports(currentContent, imports);
  updatedContent = insertResourceMappings(updatedContent, resourceMappings);
  
  // Create backup of original file
  const backupFile = `${targetFile}.backup`;
  fs.writeFileSync(backupFile, currentContent);
  console.log(`✅ Created backup of original file at ${backupFile}`);
  
  // Write updated content
  fs.writeFileSync(targetFile, updatedContent);
  console.log(`✅ Updated ${targetFile} with all resource imports and mappings`);
  
  console.log('\nNext steps:');
  console.log('1. Check the updated TeacherResources.tsx file');
  console.log('2. Test the application to make sure all resources are available');
  console.log('3. Make any necessary adjustments to specific resources');
}

// Generate import statements for all resources
function generateResourceImports() {
  let imports = '// AUTO-GENERATED IMPORTS - DO NOT MODIFY MANUALLY\n';
  
  for (const book of BOOKS) {
    imports += `// Book ${book.id.toUpperCase()} resources\n`;
    
    // Import common resource helpers
    imports += `import { generateBook${book.id}UnitResources } from '@/data/book${book.id}-resources-common';\n`;
    
    // Import each unit implementation
    for (let unitId = 1; unitId <= book.units; unitId++) {
      imports += `import { getBook${book.id}Unit${unitId}Resources`;
      
      if (book.requiresLessonPlans) {
        imports += `, getBook${book.id}Unit${unitId}LessonPlans`;
      }
      
      imports += ` } from '@/data/book${book.id}-unit${unitId}-implementation';\n`;
    }
    
    imports += '\n';
  }
  
  return imports;
}

// Generate resource mapping functions
function generateResourceMappings() {
  let mappings = '// AUTO-GENERATED RESOURCE MAPPINGS - DO NOT MODIFY MANUALLY\n\n';
  
  // Create getResourcesForBookUnit function
  mappings += 'export function getResourcesForBookUnit(bookId: string, unitId: string): TeacherResource[] {\n';
  mappings += '  // Return resources based on book and unit ID\n';
  mappings += '  switch (bookId) {\n';
  
  for (const book of BOOKS) {
    mappings += `    case '${book.id}': {\n`;
    mappings += '      switch (unitId) {\n';
    
    for (let unitId = 1; unitId <= book.units; unitId++) {
      mappings += `        case '${unitId}': return getBook${book.id}Unit${unitId}Resources();\n`;
    }
    
    mappings += '        default: return generateBook' + book.id + 'UnitResources(bookId, unitId);\n';
    mappings += '      }\n';
    mappings += '    }\n';
  }
  
  mappings += '    default: return [];\n';
  mappings += '  }\n';
  mappings += '}\n\n';
  
  // Create getLessonPlansForBookUnit function
  mappings += 'export function getLessonPlansForBookUnit(bookId: string, unitId: string): LessonPlan[] {\n';
  mappings += '  // Return lesson plans based on book and unit ID\n';
  mappings += '  switch (bookId) {\n';
  
  for (const book of BOOKS) {
    if (book.requiresLessonPlans) {
      mappings += `    case '${book.id}': {\n`;
      mappings += '      switch (unitId) {\n';
      
      for (let unitId = 1; unitId <= book.units; unitId++) {
        mappings += `        case '${unitId}': return getBook${book.id}Unit${unitId}LessonPlans();\n`;
      }
      
      mappings += '        default: return [];\n';
      mappings += '      }\n';
      mappings += '    }\n';
    }
  }
  
  mappings += '    default: return [];\n';
  mappings += '  }\n';
  mappings += '}\n';
  
  return mappings;
}

// Helper function to insert imports into content
function insertImports(content, imports) {
  // Find a good location to insert imports (after existing imports)
  const importRegex = /import.*from.*;\s*$/m;
  const lastImportMatch = content.match(new RegExp(importRegex, 'g'));
  
  if (lastImportMatch && lastImportMatch.length > 0) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    const lastImportPos = content.lastIndexOf(lastImport) + lastImport.length;
    
    return content.substring(0, lastImportPos) + '\n\n' + imports + content.substring(lastImportPos);
  }
  
  // If no imports found, add after file header comments
  const headerEnd = content.indexOf('*/') + 2;
  if (headerEnd > 2) {
    return content.substring(0, headerEnd) + '\n\n' + imports + content.substring(headerEnd);
  }
  
  // If all else fails, add at the beginning
  return imports + content;
}

// Helper function to insert resource mappings into content
function insertResourceMappings(content, mappings) {
  // Look for existing resource mappings to replace
  const mappingsStartMarker = '// AUTO-GENERATED RESOURCE MAPPINGS';
  const mappingsEndMarker = '// END AUTO-GENERATED RESOURCE MAPPINGS';
  
  const startIndex = content.indexOf(mappingsStartMarker);
  
  if (startIndex !== -1) {
    const endIndex = content.indexOf(mappingsEndMarker);
    
    if (endIndex !== -1 && endIndex > startIndex) {
      return content.substring(0, startIndex) + mappings + '\n' + mappingsEndMarker + content.substring(endIndex + mappingsEndMarker.length);
    }
  }
  
  // If no existing mappings, find a good spot to insert them
  // Typically, this would be after component interfaces/type definitions and before component implementation
  const componentStart = content.indexOf('export function TeacherResources');
  
  if (componentStart !== -1) {
    return content.substring(0, componentStart) + '\n' + mappings + '\n' + content.substring(componentStart);
  }
  
  // If component function not found, try to find the last export declaration
  const lastExportMatch = content.match(/export .*$/gm);
  
  if (lastExportMatch && lastExportMatch.length > 0) {
    const lastExport = lastExportMatch[0];
    const lastExportPos = content.lastIndexOf(lastExport);
    
    return content.substring(0, lastExportPos) + '\n' + mappings + '\n' + content.substring(lastExportPos);
  }
  
  // If all else fails, append to the end
  return content + '\n\n' + mappings;
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
