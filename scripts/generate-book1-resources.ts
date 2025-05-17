/**
 * Book 1 Resources Generator
 * 
 * This script generates resource files for Book 1 units.
 * It creates separate files for videos, games, and PDFs for each unit.
 */

import * as fs from 'fs';
import * as path from 'path';

// Define the structure of our resource data
interface BaseResourceData {
  unit: string;
  type: 'video' | 'game' | 'pdf' | 'lesson';
  title: string;
  provider: string;
}

interface VideoResourceData extends BaseResourceData {
  type: 'video';
  embedUrl: string;
}

interface GameResourceData extends BaseResourceData {
  type: 'game';
  embedUrl: string;
}

interface PdfResourceData extends BaseResourceData {
  type: 'pdf';
  pdfUrl: string;
  embedUrl?: string;
}

interface LessonResourceData extends BaseResourceData {
  type: 'lesson';
  lessonType: string;
  lessonObjective: string;
  embedUrl?: string;
}

type ResourceData = VideoResourceData | GameResourceData | PdfResourceData | LessonResourceData;

// Unit titles for Book 1
const unitTitles: Record<string, string> = {
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

// Sample resources data (can be replaced with actual CSV/JSON data)
const resourcesData: ResourceData[] = [
  // Unit 1 resources
  { 
    unit: '1', 
    type: 'video',
    title: 'Hello Song',
    provider: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/abc123'
  } as VideoResourceData,
  { 
    unit: '1', 
    type: 'game',
    title: 'Greetings Match Game',
    provider: 'Wordwall',
    embedUrl: 'https://wordwall.net/embed/xyz456'
  } as GameResourceData,
  { 
    unit: '1', 
    type: 'pdf',
    title: 'Unit 1: Hello - PDF',
    provider: 'Visual English',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf'
  } as PdfResourceData,
  
  // Unit 2 resources
  { 
    unit: '2', 
    type: 'video',
    title: 'School Objects Song',
    provider: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/def789'
  } as VideoResourceData,
  { 
    unit: '2', 
    type: 'game',
    title: 'School Objects Game',
    provider: 'Wordwall',
    embedUrl: 'https://wordwall.net/embed/uvw123'
  } as GameResourceData,
  { 
    unit: '2', 
    type: 'pdf',
    title: 'Unit 2: My School - PDF',
    provider: 'Visual English',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit2/00 A Visual English 1 – Unit 2 – New Version.pdf'
  } as PdfResourceData,
  
  // Example lesson plan
  {
    unit: '1',
    type: 'lesson',
    title: 'Greetings Lesson Plan',
    provider: 'Visual English',
    lessonType: 'main',
    lessonObjective: 'Learn basic greetings in English'
  } as LessonResourceData
  
  // Add more resources as needed
];

// Group resources by unit
function groupResourcesByUnit(resources: ResourceData[]): Record<string, ResourceData[]> {
  const grouped: Record<string, ResourceData[]> = {};
  
  resources.forEach(resource => {
    if (!grouped[resource.unit]) {
      grouped[resource.unit] = [];
    }
    grouped[resource.unit].push(resource);
  });
  
  return grouped;
}

// Extract YouTube video ID from URL
function extractYoutubeId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

// Extract Wordwall game ID from URL
function extractWordwallId(url: string): string {
  const regex = /wordwall\.net\/(?:embed|resource|play)\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

// Generate video resources file for a unit
function generateVideoResourcesFile(unit: string, resources: ResourceData[]): string {
  const videoResources = resources.filter(r => r.type === 'video');
  
  if (videoResources.length === 0) {
    return '';
  }
  
  const unitTitle = unitTitles[unit] || `Unit ${unit}`;
  
  let content = `/**
 * Book 1 Unit ${unit} video resources
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}VideoResources: TeacherResource[] = [
`;

  videoResources.forEach((resource, index) => {
    const youtubeId = extractYoutubeId(resource.embedUrl);
    content += `  createBook1VideoResource(
    '${unit}',
    'video-${index + 1}',
    '${resource.title}',
    '${resource.title} - Visual English Book 1 Unit ${unit}',
    '${resource.embedUrl}',
    \`<iframe width="560" height="315" src="${resource.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\`
  ),\n`;
  });

  content += `];

export default book1Unit${unit}VideoResources;
`;

  return content;
}

// Generate game resources file for a unit
function generateGameResourcesFile(unit: string, resources: ResourceData[]): string {
  const gameResources = resources.filter(r => r.type === 'game');
  
  if (gameResources.length === 0) {
    return '';
  }
  
  const unitTitle = unitTitles[unit] || `Unit ${unit}`;
  
  let content = `/**
 * Book 1 Unit ${unit} game resources
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}GameResources: TeacherResource[] = [
`;

  gameResources.forEach((resource, index) => {
    const wordwallId = extractWordwallId(resource.embedUrl);
    content += `  createBook1GameResource(
    '${unit}',
    'game-${index + 1}',
    '${resource.title}',
    '${resource.title} - Interactive activity for Unit ${unit}',
    '${resource.embedUrl}',
    \`<iframe style="width: 100%; height: 400px; max-width: 800px;" src="${resource.embedUrl}" frameborder="0" allowfullscreen></iframe>\`
  ),\n`;
  });

  content += `];

export default book1Unit${unit}GameResources;
`;

  return content;
}

// Generate PDF resources file for a unit
function generatePdfResourcesFile(unit: string, resources: ResourceData[]): string {
  const pdfResources = resources.filter(r => r.type === 'pdf');
  
  if (pdfResources.length === 0) {
    return '';
  }
  
  const unitTitle = unitTitles[unit] || `Unit ${unit}`;
  
  let content = `/**
 * Book 1 Unit ${unit} PDF resources
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}PdfResources: TeacherResource[] = [
`;

  pdfResources.forEach((resource, index) => {
    content += `  createBook1PdfResource(
    '${unit}',
    'pdf-${index + 1}',
    '${resource.title}',
    'PDF lesson materials for Unit ${unit}',
    '${resource.pdfUrl}'
  ),\n`;
  });

  content += `];

export default book1Unit${unit}PdfResources;
`;

  return content;
}

// Generate combined resources file for a unit
function generateCombinedResourcesFile(unit: string): string {
  const unitTitle = unitTitles[unit] || `Unit ${unit}`;
  
  return `/**
 * Book 1 Unit ${unit} resources
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit${unit}VideoResources from './book1-unit${unit}-video-resources';
import book1Unit${unit}GameResources from './book1-unit${unit}-game-resources';
import book1Unit${unit}PdfResources from './book1-unit${unit}-pdf-resources';

/**
 * All resources for Book 1 Unit ${unit} (${unitTitle})
 */
export const book1Unit${unit}Resources: TeacherResource[] = [
  ...book1Unit${unit}VideoResources,
  ...book1Unit${unit}GameResources,
  ...book1Unit${unit}PdfResources
];

export default book1Unit${unit}Resources;
`;
}

// Generate registry update for a unit
function generateRegistryUpdate(unit: string): string {
  return `
// Register Book 1 Unit ${unit} resources
registerResourceLoader('1', '${unit}', () => import('@/data/book1-unit${unit}-resources').then(m => m.default));
`;
}

// Main function to generate all resources
function generateAllResources() {
  const groupedResources = groupResourcesByUnit(resourcesData);
  let registryUpdates = '';
  
  // Create data directory if it doesn't exist
  const dataDir = path.resolve(__dirname, '../client/src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Generate resources for each unit
  Object.keys(groupedResources).forEach(unit => {
    const resources = groupedResources[unit];
    
    // Generate video resources
    const videoContent = generateVideoResourcesFile(unit, resources);
    if (videoContent) {
      fs.writeFileSync(path.join(dataDir, `book1-unit${unit}-video-resources.tsx`), videoContent);
      console.log(`Generated book1-unit${unit}-video-resources.tsx`);
    }
    
    // Generate game resources
    const gameContent = generateGameResourcesFile(unit, resources);
    if (gameContent) {
      fs.writeFileSync(path.join(dataDir, `book1-unit${unit}-game-resources.tsx`), gameContent);
      console.log(`Generated book1-unit${unit}-game-resources.tsx`);
    }
    
    // Generate PDF resources
    const pdfContent = generatePdfResourcesFile(unit, resources);
    if (pdfContent) {
      fs.writeFileSync(path.join(dataDir, `book1-unit${unit}-pdf-resources.tsx`), pdfContent);
      console.log(`Generated book1-unit${unit}-pdf-resources.tsx`);
    }
    
    // Generate combined resources
    const combinedContent = generateCombinedResourcesFile(unit);
    fs.writeFileSync(path.join(dataDir, `book1-unit${unit}-resources.tsx`), combinedContent);
    console.log(`Generated book1-unit${unit}-resources.tsx`);
    
    // Accumulate registry updates
    registryUpdates += generateRegistryUpdate(unit);
  });
  
  // Output registry updates (these need to be manually added to resourceRegistry.ts)
  console.log('\nAdd the following to resourceRegistry.ts:');
  console.log(registryUpdates);
}

// Display instructions when running the script
console.log('\n======================================================');
console.log('Book 1 Resource Generator');
console.log('======================================================');
console.log('\nThis script will generate resource files for Book 1 units.');
console.log('Please review the sample data first to ensure it matches your needs.');
console.log('For production use, replace the sample data with real resource data.');
console.log('\nExecuting resource generation...\n');

// Run the generator
generateAllResources();

console.log('\n======================================================');
console.log('Resource Generation Complete!');
console.log('======================================================');
console.log('\nNext steps:');
console.log('1. Review the generated files in client/src/data/');
console.log('2. Update any resource data as needed');
console.log('3. Copy the resource registry updates into client/src/lib/resourceRegistry.ts');
console.log('4. Test the resources in the application');
console.log('\nSee README-RESOURCE-GENERATOR.md for detailed instructions.\n');