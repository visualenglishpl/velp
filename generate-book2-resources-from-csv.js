/**
 * Book 2 Resource Generator Script
 * 
 * This script reads from a CSV file containing resource information and
 * automatically generates resource files for each unit in Book 2.
 * 
 * It creates:
 * - book2-unitX-video-resources.tsx (video resources)
 * - book2-unitX-game-resources.tsx (game resources)
 * - book2-unitX-pdf-resources.tsx (PDF resources)
 * - book2-unitX-lesson-plans.tsx (lesson plans)
 * - book2-unitX-resources.tsx (combined resources)
 * 
 * It also updates the resource registry in resourceRegistry.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSV_FILE = path.join(__dirname, 'book2-resources.csv');
const OUTPUT_DIR = path.join(__dirname, 'client', 'src', 'data');
const BOOK_ID = '2';
const COMMON_HELPERS_FILE = path.join(OUTPUT_DIR, 'book2-resources-common.ts');

// Helper function to extract YouTube video ID
function extractYoutubeId(url) {
  if (!url) return null;
  
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Helper function to extract Wordwall game ID
function extractWordwallId(url) {
  if (!url) return null;
  
  const regex = /wordwall\.net\/(?:resource|play)\/([0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Generate the common helpers file if it doesn't exist
function generateCommonHelpersFile() {
  // Check if file already exists
  if (fs.existsSync(COMMON_HELPERS_FILE)) {
    console.log('Common helpers file already exists, skipping creation');
    return;
  }
  
  const content = `/**
 * Book 2 Resources - Common Helper Functions
 * 
 * This file contains helper functions for creating Book 2 resources.
 */

import { TeacherResource } from '@/types/TeacherResource';

/**
 * Creates a video resource for Book 2
 */
export function createBook2VideoResource(unitId: string, id: string, title: string, youtubeId: string): TeacherResource {
  return {
    id: \`book2-unit\${unitId}-video-\${id}\`,
    type: 'video',
    title,
    book: '2',
    unit: unitId,
    embedUrl: \`https://www.youtube.com/embed/\${youtubeId}\`,
    provider: 'YouTube',
    thumbnail: \`https://img.youtube.com/vi/\${youtubeId}/mqdefault.jpg\`,
  };
}

/**
 * Creates a game resource for Book 2
 */
export function createBook2GameResource(unitId: string, id: string, title: string, wordwallId: string): TeacherResource {
  return {
    id: \`book2-unit\${unitId}-game-\${id}\`,
    type: 'game',
    title,
    book: '2',
    unit: unitId,
    embedUrl: \`https://wordwall.net/embed/\${wordwallId}\`,
    provider: 'Wordwall',
    sourceUrl: \`https://wordwall.net/resource/\${wordwallId}\`,
  };
}

/**
 * Creates a PDF resource for Book 2
 */
export function createBook2PdfResource(unitId: string, id: string, title: string, pdfUrl: string): TeacherResource {
  return {
    id: \`book2-unit\${unitId}-pdf-\${id}\`,
    type: 'pdf',
    title,
    book: '2',
    unit: unitId,
    fileUrl: pdfUrl,
    provider: 'Visual English',
  };
}

/**
 * Creates a lesson plan resource for Book 2
 */
export function createBook2LessonPlanResource(
  unitId: string, 
  id: string, 
  title: string, 
  lessonType: string = 'main',
  objective: string = ''
): TeacherResource {
  return {
    id: \`book2-unit\${unitId}-lesson-\${id}\`,
    type: 'lesson',
    title,
    book: '2',
    unit: unitId,
    provider: 'Visual English',
    metadata: {
      lessonType,
      objective,
    }
  };
}`;

  // Create directories if they don't exist
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  // Write the file
  fs.writeFileSync(COMMON_HELPERS_FILE, content);
  console.log(`Created common helpers file: ${COMMON_HELPERS_FILE}`);
}

// Generate video resources file for a unit
function generateVideoResourcesFile(unit, unitTitle, videos) {
  if (videos.length === 0) return false;
  
  const filename = path.join(OUTPUT_DIR, `book2-unit${unit}-video-resources.tsx`);
  
  let content = `/**
 * Book 2 Unit ${unit} Video Resources
 * 
 * This file contains video resources for Book 2 Unit ${unit}: ${unitTitle}
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { createBook2VideoResource } from './book2-resources-common';

// Video resources for this unit
export const videos: TeacherResource[] = [
`;

  videos.forEach((video, index) => {
    const youtubeId = extractYoutubeId(video.embedUrl);
    if (!youtubeId) {
      console.warn(`Warning: Could not extract YouTube ID from URL: ${video.embedUrl}`);
      return;
    }
    
    content += `  createBook2VideoResource('${unit}', '${index + 1}', '${video.title}', '${youtubeId}'),\n`;
  });

  content += `];

export default videos;
`;

  fs.writeFileSync(filename, content);
  console.log(`Generated video resources file: ${filename}`);
  return true;
}

// Generate game resources file for a unit
function generateGameResourcesFile(unit, unitTitle, games) {
  if (games.length === 0) return false;
  
  const filename = path.join(OUTPUT_DIR, `book2-unit${unit}-game-resources.tsx`);
  
  let content = `/**
 * Book 2 Unit ${unit} Game Resources
 * 
 * This file contains game resources for Book 2 Unit ${unit}: ${unitTitle}
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { createBook2GameResource } from './book2-resources-common';

// Game resources for this unit
export const games: TeacherResource[] = [
`;

  games.forEach((game, index) => {
    const wordwallId = extractWordwallId(game.embedUrl);
    if (!wordwallId) {
      console.warn(`Warning: Could not extract Wordwall ID from URL: ${game.embedUrl}`);
      return;
    }
    
    content += `  createBook2GameResource('${unit}', '${index + 1}', '${game.title}', '${wordwallId}'),\n`;
  });

  content += `];

export default games;
`;

  fs.writeFileSync(filename, content);
  console.log(`Generated game resources file: ${filename}`);
  return true;
}

// Generate PDF resources file for a unit
function generatePdfResourcesFile(unit, unitTitle, pdfs) {
  if (pdfs.length === 0) return false;
  
  const filename = path.join(OUTPUT_DIR, `book2-unit${unit}-pdf-resources.tsx`);
  
  let content = `/**
 * Book 2 Unit ${unit} PDF Resources
 * 
 * This file contains PDF resources for Book 2 Unit ${unit}: ${unitTitle}
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { createBook2PdfResource } from './book2-resources-common';

// PDF resources for this unit
export const pdfs: TeacherResource[] = [
`;

  pdfs.forEach((pdf, index) => {
    content += `  createBook2PdfResource('${unit}', '${index + 1}', '${pdf.title}', '${pdf.pdfUrl}'),\n`;
  });

  content += `];

export default pdfs;
`;

  fs.writeFileSync(filename, content);
  console.log(`Generated PDF resources file: ${filename}`);
  return true;
}

// Generate lesson plans file for a unit
function generateLessonPlansFile(unit, unitTitle, lessons) {
  if (lessons.length === 0) return false;
  
  const filename = path.join(OUTPUT_DIR, `book2-unit${unit}-lesson-plans.tsx`);
  
  let content = `/**
 * Book 2 Unit ${unit} Lesson Plans
 * 
 * This file contains lesson plans for Book 2 Unit ${unit}: ${unitTitle}
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { createBook2LessonPlanResource } from './book2-resources-common';

// Lesson plans for this unit
export const lessonPlans: TeacherResource[] = [
`;

  lessons.forEach((lesson, index) => {
    // Escape single quotes in content
    const safeTitle = lesson.title.replace(/'/g, "\\'");
    const safeObjective = lesson.lessonObjective ? lesson.lessonObjective.replace(/'/g, "\\'") : '';
    
    content += `  createBook2LessonPlanResource('${unit}', '${index + 1}', '${safeTitle}', '${lesson.lessonType || 'main'}', '${safeObjective}'),\n`;
  });

  content += `];

export default lessonPlans;
`;

  fs.writeFileSync(filename, content);
  console.log(`Generated lesson plans file: ${filename}`);
  return true;
}

// Generate combined resources file for a unit
function generateCombinedResourcesFile(unit, unitTitle, hasVideos, hasGames, hasPdfs, hasLessons) {
  const filename = path.join(OUTPUT_DIR, `book2-unit${unit}-resources.tsx`);
  
  let content = `/**
 * Book 2 Unit ${unit} Resources
 * 
 * This file combines all resources for Book 2 Unit ${unit}: ${unitTitle}
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
`;

  // Import only the resources that exist
  if (hasVideos) content += `import { videos } from './book2-unit${unit}-video-resources';\n`;
  if (hasGames) content += `import { games } from './book2-unit${unit}-game-resources';\n`;
  if (hasPdfs) content += `import { pdfs } from './book2-unit${unit}-pdf-resources';\n`;
  if (hasLessons) content += `import { lessonPlans } from './book2-unit${unit}-lesson-plans';\n`;

  content += `
// Combine all resources for this unit
const resources: TeacherResource[] = [
`;

  // Add only the resources that exist
  if (hasVideos) content += `  ...videos,\n`;
  if (hasGames) content += `  ...games,\n`;
  if (hasPdfs) content += `  ...pdfs,\n`;
  if (hasLessons) content += `  ...lessonPlans\n`;

  content += `];

export default resources;
`;

  fs.writeFileSync(filename, content);
  console.log(`Generated combined resources file: ${filename}`);
  return true;
}

// Generate registry update code
function generateRegistryUpdate(unitsWithResources) {
  console.log(`\n--- Resource Registry Update Code ---\n`);
  console.log(`// Define Book 2 units with CSV-generated resources`);
  console.log(`const book2CsvGeneratedUnits = [${unitsWithResources.map(u => `'${u}'`).join(', ')}];`);
  console.log(`
// Register all Book 2 CSV-generated resources
book2CsvGeneratedUnits.forEach(unit => {
  registerResourceLoader('2', unit as UnitId, 
    () => import(/* @vite-ignore */ \`@/data/book2-unit\${unit}-resources\`).then(m => m.default)
  );
});`);
  console.log(`\n--- End Registry Update Code ---\n`);
}

// Main function to process the CSV file
async function main() {
  try {
    // Generate common helpers file
    generateCommonHelpersFile();
    
    // Read and parse the CSV file
    const csvData = fs.readFileSync(CSV_FILE, 'utf8');
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    // Group resources by unit
    const unitResources = {};
    const unitTitles = {};
    
    // Extract unit title from the first PDF in each unit
    records.forEach(record => {
      const unit = record.unit;
      if (record.type === 'pdf') {
        // Example title format: "Unit 1: Hello and Greetings - PDF"
        const titleMatch = record.title.match(/Unit \d+: (.+?) -/);
        if (titleMatch && titleMatch[1]) {
          unitTitles[unit] = titleMatch[1];
        }
      }
    });
    
    // Group resources by unit and type
    records.forEach(record => {
      const unit = record.unit;
      if (!unitResources[unit]) {
        unitResources[unit] = {
          videos: [],
          games: [],
          pdfs: [],
          lessons: []
        };
      }
      
      // Add record to appropriate array based on type
      switch (record.type) {
        case 'video':
          unitResources[unit].videos.push(record);
          break;
        case 'game':
          unitResources[unit].games.push(record);
          break;
        case 'pdf':
          unitResources[unit].pdfs.push(record);
          break;
        case 'lesson':
          unitResources[unit].lessons.push(record);
          break;
      }
    });
    
    // Generate resource files for each unit
    const unitsWithResources = [];
    
    for (const unit in unitResources) {
      const resources = unitResources[unit];
      const unitTitle = unitTitles[unit] || `Unit ${unit}`;
      
      console.log(`\nProcessing Unit ${unit}: ${unitTitle}`);
      
      // Generate individual resource files
      const hasVideos = generateVideoResourcesFile(unit, unitTitle, resources.videos);
      const hasGames = generateGameResourcesFile(unit, unitTitle, resources.games);
      const hasPdfs = generatePdfResourcesFile(unit, unitTitle, resources.pdfs);
      const hasLessons = generateLessonPlansFile(unit, unitTitle, resources.lessons);
      
      // Generate combined resources file
      generateCombinedResourcesFile(unit, unitTitle, hasVideos, hasGames, hasPdfs, hasLessons);
      
      // Add unit to list
      unitsWithResources.push(unit);
    }
    
    // Generate registry update code
    generateRegistryUpdate(unitsWithResources);
    
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
}

// Run the main function
main();