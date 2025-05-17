/**
 * Book 1 Resource Generator Script
 * 
 * This script reads from a CSV file containing resource information and
 * automatically generates resource files for each unit in Book 1.
 * 
 * It creates:
 * - book1-unitX-video-resources.tsx (video resources)
 * - book1-unitX-game-resources.tsx (game resources)
 * - book1-unitX-pdf-resources.tsx (PDF resources)
 * - book1-unitX-lesson-plans.tsx (lesson plans)
 * - book1-unitX-resources.tsx (combined resources)
 * 
 * It also updates the resource registry in resourceRegistry.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const csvFilePath = path.join(__dirname, 'book1-resources.csv');
const outputDir = path.join(__dirname, 'client/src/data');
const registryFilePath = path.join(__dirname, 'client/src/lib/resourceRegistry.ts');

// Unit titles for Book 1
const unitTitles = {
  '1': 'Hello',
  '2': 'My School',
  '3': 'Food',
  '4': 'My House',
  '5': 'Pets and Animals',
  '6': 'My Favourite Colour',
  '7': 'Toys',
  '8': 'Numbers',
  '9': 'My Family',
  '10': 'Transport',
  '11': 'Weather',
  '12': 'My Body',
  '13': 'Clothes',
  '14': 'Daily Routine',
  '15': 'Jobs',
  '16': 'Sports',
  '17': 'Hobbies',
  '18': 'Action Verbs'
};

// Helper functions to extract IDs
function extractYoutubeId(url) {
  if (!url) return '';
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : '';
}

function extractWordwallId(url) {
  if (!url) return '';
  const regExp = /wordwall\.net\/(?:resource|play|embed)\/([a-zA-Z0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read and parse CSV file
console.log(`Reading CSV file: ${csvFilePath}`);
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const resources = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

console.log(`Found ${resources.length} resources in CSV file`);

// Group resources by unit
const resourcesByUnit = {};
resources.forEach(resource => {
  if (!resourcesByUnit[resource.unit]) {
    resourcesByUnit[resource.unit] = {
      videos: [],
      games: [],
      pdfs: [],
      lessons: []
    };
  }
  
  if (resource.type === 'video') {
    resourcesByUnit[resource.unit].videos.push(resource);
  } else if (resource.type === 'game') {
    resourcesByUnit[resource.unit].games.push(resource);
  } else if (resource.type === 'pdf') {
    resourcesByUnit[resource.unit].pdfs.push(resource);
  } else if (resource.type === 'lesson') {
    resourcesByUnit[resource.unit].lessons.push(resource);
  }
});

console.log(`Resources grouped by ${Object.keys(resourcesByUnit).length} units`);

// Generate resource files for each unit
const processedUnits = [];
let registryUpdates = '';

Object.keys(resourcesByUnit).sort().forEach(unit => {
  console.log(`\nGenerating resources for Unit ${unit}`);
  const unitResources = resourcesByUnit[unit];
  const unitTitle = unitTitles[unit] || `Unit ${unit}`;
  
  // Generate video resources file
  if (unitResources.videos.length > 0) {
    const videoContent = generateVideoResourcesFile(unit, unitTitle, unitResources.videos);
    const videoFilePath = path.join(outputDir, `book1-unit${unit}-video-resources.tsx`);
    fs.writeFileSync(videoFilePath, videoContent);
    console.log(`✓ Created video resources file: book1-unit${unit}-video-resources.tsx`);
  }
  
  // Generate game resources file
  if (unitResources.games.length > 0) {
    const gameContent = generateGameResourcesFile(unit, unitTitle, unitResources.games);
    const gameFilePath = path.join(outputDir, `book1-unit${unit}-game-resources.tsx`);
    fs.writeFileSync(gameFilePath, gameContent);
    console.log(`✓ Created game resources file: book1-unit${unit}-game-resources.tsx`);
  }
  
  // Generate PDF resources file
  if (unitResources.pdfs.length > 0) {
    const pdfContent = generatePdfResourcesFile(unit, unitTitle, unitResources.pdfs);
    const pdfFilePath = path.join(outputDir, `book1-unit${unit}-pdf-resources.tsx`);
    fs.writeFileSync(pdfFilePath, pdfContent);
    console.log(`✓ Created PDF resources file: book1-unit${unit}-pdf-resources.tsx`);
  }
  
  // Generate lesson plans file
  if (unitResources.lessons.length > 0) {
    const lessonContent = generateLessonPlansFile(unit, unitTitle, unitResources.lessons);
    const lessonFilePath = path.join(outputDir, `book1-unit${unit}-lesson-plans.tsx`);
    fs.writeFileSync(lessonFilePath, lessonContent);
    console.log(`✓ Created lesson plans file: book1-unit${unit}-lesson-plans.tsx`);
  }
  
  // Generate combined resources file
  const combinedContent = generateCombinedResourcesFile(unit, unitTitle, 
    unitResources.videos.length > 0,
    unitResources.games.length > 0,
    unitResources.pdfs.length > 0,
    unitResources.lessons.length > 0
  );
  const combinedFilePath = path.join(outputDir, `book1-unit${unit}-resources.tsx`);
  fs.writeFileSync(combinedFilePath, combinedContent);
  console.log(`✓ Created combined resources file: book1-unit${unit}-resources.tsx`);
  
  // Add to registry updates
  registryUpdates += generateRegistryUpdate(unit);
  
  processedUnits.push(unit);
});

// Report summary
console.log(`\nResource Generation Complete!`);
console.log(`Generated resource files for ${processedUnits.length} units: ${processedUnits.join(', ')}`);
console.log(`\nRegistry Updates to add to resourceRegistry.ts:`);
console.log(registryUpdates);

// Function to generate video resources file
function generateVideoResourcesFile(unit, unitTitle, videos) {
  let content = `/**
 * Book 1 Unit ${unit} video resources
 * 
 * Videos for ${unitTitle}
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}VideoResources: TeacherResource[] = [
`;

  videos.forEach((video, index) => {
    const youtubeId = extractYoutubeId(video.embedUrl);
    content += `  createBook1VideoResource(
    '${unit}',
    'video-${index + 1}',
    '${video.title}',
    '${video.title} - Visual English Book 1 Unit ${unit}',
    '${video.embedUrl}',
    \`<iframe width="560" height="315" src="${video.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\`
  ),\n`;
  });

  content += `];

export default book1Unit${unit}VideoResources;
`;

  return content;
}

// Function to generate game resources file
function generateGameResourcesFile(unit, unitTitle, games) {
  let content = `/**
 * Book 1 Unit ${unit} game resources
 * 
 * Interactive games for ${unitTitle}
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}GameResources: TeacherResource[] = [
`;

  games.forEach((game, index) => {
    const wordwallId = extractWordwallId(game.embedUrl);
    content += `  createBook1GameResource(
    '${unit}',
    'game-${index + 1}',
    '${game.title}',
    '${game.title} - Interactive activity for Unit ${unit}',
    '${game.embedUrl}',
    \`<iframe style="width: 100%; height: 400px; max-width: 800px;" src="${game.embedUrl}" frameborder="0" allowfullscreen></iframe>\`
  ),\n`;
  });

  content += `];

export default book1Unit${unit}GameResources;
`;

  return content;
}

// Function to generate PDF resources file
function generatePdfResourcesFile(unit, unitTitle, pdfs) {
  let content = `/**
 * Book 1 Unit ${unit} PDF resources
 * 
 * PDF materials for ${unitTitle}
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}PdfResources: TeacherResource[] = [
`;

  pdfs.forEach((pdf, index) => {
    content += `  createBook1PdfResource(
    '${unit}',
    'pdf-${index + 1}',
    '${pdf.title}',
    'PDF lesson materials for Unit ${unit}',
    '${pdf.pdfUrl}'
  ),\n`;
  });

  content += `];

export default book1Unit${unit}PdfResources;
`;

  return content;
}

// Function to generate lesson plans file
function generateLessonPlansFile(unit, unitTitle, lessons) {
  let content = `/**
 * Book 1 Unit ${unit} lesson plans
 * 
 * Lesson plans for ${unitTitle}
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}LessonPlans: TeacherResource[] = [
`;

  lessons.forEach((lesson, index) => {
    content += `  createBook1LessonPlanResource(
    '${unit}',
    'lesson-${index + 1}',
    '${lesson.title}',
    '${lesson.lessonObjective || "Lesson plan for Unit " + unit}',
    '${lesson.lessonType || "main"}'
  ),\n`;
  });

  content += `];

export default book1Unit${unit}LessonPlans;
`;

  return content;
}

// Function to generate combined resources file
function generateCombinedResourcesFile(unit, unitTitle, hasVideos, hasGames, hasPdfs, hasLessons) {
  let content = `/**
 * Book 1 Unit ${unit} resources
 * 
 * Combined resources for ${unitTitle}
 */
import { TeacherResource } from '@/types/TeacherResource';
`;

  // Import the individual resource files
  if (hasVideos) {
    content += `import book1Unit${unit}VideoResources from './book1-unit${unit}-video-resources';\n`;
  }
  if (hasGames) {
    content += `import book1Unit${unit}GameResources from './book1-unit${unit}-game-resources';\n`;
  }
  if (hasPdfs) {
    content += `import book1Unit${unit}PdfResources from './book1-unit${unit}-pdf-resources';\n`;
  }
  if (hasLessons) {
    content += `import book1Unit${unit}LessonPlans from './book1-unit${unit}-lesson-plans';\n`;
  }

  content += `
/**
 * All resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}Resources: TeacherResource[] = [
`;

  // Add resources to the combined array
  if (hasVideos) {
    content += `  ...book1Unit${unit}VideoResources,\n`;
  }
  if (hasGames) {
    content += `  ...book1Unit${unit}GameResources,\n`;
  }
  if (hasPdfs) {
    content += `  ...book1Unit${unit}PdfResources,\n`;
  }
  if (hasLessons) {
    content += `  ...book1Unit${unit}LessonPlans,\n`;
  }

  content += `];

export default book1Unit${unit}Resources;
`;

  return content;
}

// Function to generate registry update for a unit
function generateRegistryUpdate(unit) {
  return `
// Register Book 1 Unit ${unit} resources
registerResourceLoader('1', '${unit}', () => import('@/data/book1-unit${unit}-resources').then(m => m.default));
`;
}