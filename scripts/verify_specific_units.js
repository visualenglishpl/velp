/**
 * Verify Specific Units Script
 * 
 * This script checks the implementation of specific units in Book 5 and Book 6
 * that have had custom content applied.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test books and units
const TEST_UNITS = [
  { bookId: '5', unitId: '1', theme: 'Schools in the UK and USA' },
  { bookId: '5', unitId: '5', theme: 'Winter Fun' },
  { bookId: '5', unitId: '9', theme: 'Emotions' },
  { bookId: '5', unitId: '13', theme: 'Irregular Verbs - Past Tense' },
  { bookId: '6', unitId: '5', theme: 'Theme Park' },
  { bookId: '6', unitId: '7', theme: 'What Your Body Can Do' },
  { bookId: '6', unitId: '9', theme: 'Present Perfect - What Has Just Happened' },
  { bookId: '6', unitId: '11', theme: 'Extreme Sports' },
  { bookId: '6', unitId: '14', theme: 'Are You a Survivor?' }
];

// Main verification function
async function verifyUnits() {
  console.log('Verifying specific units for Book 5 and Book 6...');
  console.log('===================================================\n');
  
  // Detailed check of specific unit files
  for (const unit of TEST_UNITS) {
    const { bookId, unitId, theme } = unit;
    
    console.log(`\n📘 Book ${bookId} Unit ${unitId} - ${theme}`);
    
    // Check resources file
    const resourcesPath = path.join(__dirname, '..', 'client', 'src', 'data', `book${bookId}-unit${unitId}-resources.tsx`);
    if (!fs.existsSync(resourcesPath)) {
      console.log(`  ❌ Resources file not found: ${resourcesPath}`);
      continue;
    }
    
    console.log(`  ✅ Resources file exists`);
    const resourcesContent = fs.readFileSync(resourcesPath, 'utf8');
    
    // Check for specific content
    const hasThemeContent = resourcesContent.includes(theme);
    console.log(`  ${hasThemeContent ? '✅' : '❌'} Contains theme-specific content`);  
    
    // Check implementation file
    const implementationPath = path.join(__dirname, '..', 'client', 'src', 'data', `book${bookId}-unit${unitId}-implementation.tsx`);
    if (!fs.existsSync(implementationPath)) {
      console.log(`  ❌ Implementation file not found: ${implementationPath}`);
      continue;
    }
    
    console.log(`  ✅ Implementation file exists`);
    const implementationContent = fs.readFileSync(implementationPath, 'utf8');
    
    // Check for specific implementation details
    const hasLessonPlans = implementationContent.includes('LessonPlan');
    console.log(`  ${hasLessonPlans ? '✅' : '❌'} Contains lesson plans`);
    
    // Check for theme-specific content in implementation
    const hasImplementationTheme = implementationContent.includes(theme);
    console.log(`  ${hasImplementationTheme ? '✅' : '❌'} Contains theme-specific content in implementation`); 
  }
  
  console.log('\n===================================================');
  console.log('Verification complete!');
}

// Run the function
verifyUnits().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
