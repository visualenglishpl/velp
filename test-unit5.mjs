// Simple test to check if the Book 6 Unit 5 resources module can be imported
import fs from 'fs';

const filePath = './client/src/data/book6-unit5-resources.tsx';
const implPath = './client/src/data/book6-unit5-implementation.tsx';

try {
  // Check if the resources file exists
  const fileExists = fs.existsSync(filePath);
  console.log(`Resources file exists: ${fileExists}`);
  if (fileExists) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`Resources file size: ${content.length} bytes`);
    console.log(`Resources file has exports: ${content.includes('export ')}`);
  }
  
  // Check if the implementation file exists
  const implExists = fs.existsSync(implPath);
  console.log(`Implementation file exists: ${implExists}`);
  if (implExists) {
    const content = fs.readFileSync(implPath, 'utf8');
    console.log(`Implementation file size: ${content.length} bytes`);
    console.log(`Implementation has getBook6Unit5Resources: ${content.includes('getBook6Unit5Resources')}`);
    console.log(`Implementation has getBook6Unit5LessonPlans: ${content.includes('getBook6Unit5LessonPlans')}`);
  }
} catch (error) {
  console.error('Error checking files:', error);
}