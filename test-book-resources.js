/**
 * Simple Test Script for Book Resources
 * 
 * This script verifies that all book resource files can be properly imported.
 * It helps diagnose issues with the resource generation and loading.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DATA_DIR = path.join(__dirname, 'client', 'src', 'data');

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

// Function to check resource files for a specific book and unit
async function checkResources(book, unit) {
  console.log(`${COLORS.bold}Checking Book ${book} Unit ${unit} resources:${COLORS.reset}`);
  
  const fileTypes = ['video-resources', 'game-resources', 'pdf-resources', 'lesson-plans', 'resources'];
  const results = [];
  
  for (const type of fileTypes) {
    const filename = `book${book}-unit${unit}-${type}.tsx`;
    const filepath = path.join(DATA_DIR, filename);
    
    try {
      if (fs.existsSync(filepath)) {
        // Check if the file is valid and has the correct exports
        const content = fs.readFileSync(filepath, 'utf8');
        const hasDefaultExport = content.includes('export default');
        const hasNamedExport = type !== 'resources' ? content.includes(`export const ${type.split('-')[0]}`) : true;
        
        if (hasDefaultExport && hasNamedExport) {
          results.push({ type, status: 'ok', message: `${filename} exists and has proper exports` });
        } else {
          results.push({ 
            type, 
            status: 'warning', 
            message: `${filename} exists but may have incorrect exports (default: ${hasDefaultExport}, named: ${hasNamedExport})` 
          });
        }
      } else {
        results.push({ type, status: 'missing', message: `${filename} does not exist` });
      }
    } catch (err) {
      results.push({ type, status: 'error', message: `Error checking ${filename}: ${err.message}` });
    }
  }
  
  // Print results
  for (const result of results) {
    let color;
    switch (result.status) {
      case 'ok': color = COLORS.green; break;
      case 'warning': color = COLORS.yellow; break;
      case 'missing': color = COLORS.red; break;
      case 'error': color = COLORS.red; break;
      default: color = COLORS.reset;
    }
    console.log(`  ${color}[${result.status.toUpperCase()}]${COLORS.reset} ${result.message}`);
  }
  
  // Check the combined resources file
  const combinedFilename = `book${book}-unit${unit}-resources.tsx`;
  const combinedFilepath = path.join(DATA_DIR, combinedFilename);
  
  if (fs.existsSync(combinedFilepath)) {
    const content = fs.readFileSync(combinedFilepath, 'utf8');
    
    // Check imports
    const requiredImports = [
      `import { TeacherResource } from '@/types/TeacherResource';`,
      `import { videos } from './book${book}-unit${unit}-video-resources';`,
      `import { games } from './book${book}-unit${unit}-game-resources';`,
      `import { pdfs } from './book${book}-unit${unit}-pdf-resources';`,
      `import { lessonPlans } from './book${book}-unit${unit}-lesson-plans';`
    ];
    
    let missingImports = [];
    for (const imp of requiredImports) {
      if (!content.includes(imp)) {
        missingImports.push(imp);
      }
    }
    
    if (missingImports.length > 0) {
      console.log(`  ${COLORS.yellow}[WARNING]${COLORS.reset} ${combinedFilename} is missing imports:`);
      for (const imp of missingImports) {
        console.log(`    - ${imp}`);
      }
    } else {
      console.log(`  ${COLORS.green}[OK]${COLORS.reset} ${combinedFilename} has all required imports`);
    }
  }
  
  console.log(''); // Empty line for better readability
}

// Main function
async function main() {
  console.log(`${COLORS.bold}${COLORS.blue}=== Book Resource Verification ====${COLORS.reset}\n`);
  
  // Check Book 1 resources (Units 1-18)
  console.log(`${COLORS.bold}${COLORS.blue}Checking Book 1 resources...${COLORS.reset}\n`);
  for (let unit = 1; unit <= 18; unit++) {
    await checkResources(1, unit);
  }
  
  // Check Book 2 resources (Units 1-5)
  console.log(`${COLORS.bold}${COLORS.blue}Checking Book 2 resources...${COLORS.reset}\n`);
  for (let unit = 1; unit <= 5; unit++) {
    await checkResources(2, unit);
  }
  
  console.log(`${COLORS.bold}${COLORS.blue}=== Resource Verification Complete ====${COLORS.reset}\n`);
}

// Run the main function
main().catch(err => {
  console.error(`${COLORS.red}Error:${COLORS.reset}`, err);
  process.exit(1);
});