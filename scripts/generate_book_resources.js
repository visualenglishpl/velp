/**
 * Generate Resources Script for Visual English Books
 * 
 * This script generates resources for all books (0A through 7) with
 * context-appropriate lesson plans, videos, and games for each unit.
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

// Generate resource content for all books and units
async function main() {
  console.log('Generating resources for all books...');
  
  // Process each book
  let totalFiles = 0;
  
  for (const book of BOOKS) {
    console.log(`\n📚 Processing Book ${book.id.toUpperCase()} (${book.name})...`);
    
    // Generate common file
    await generateCommonFile(book);
    totalFiles++;
    
    // Generate files for each unit
    for (let unitId = 1; unitId <= book.units; unitId++) {
      console.log(`\n- Processing Unit ${unitId}...`);
      
      await generateResourceFile(book.id, unitId, book.name);
      totalFiles++;
      
      await generateImplementationFile(book.id, unitId, book.name, book.requiresLessonPlans);
      totalFiles++;
    }
  }
  
  console.log(`\n✅ Generated ${totalFiles} files in total.`);
  console.log('\nNext steps:');
  console.log('1. Update TeacherResources.tsx to import all the newly created resources');
  console.log('2. Test in the application by viewing a unit from each book')
}

// Generate common resource file for a book
async function generateCommonFile(book) {
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const outputFile = path.join(outputDir, `book${book.id}-resources-common.tsx`);
  
  // Skip if file already exists
  if (fs.existsSync(outputFile)) {
    console.log(`⚠️ Common file already exists for Book ${book.id}, skipping...`);
    return;
  }
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate content
  let content = `import { TeacherResource } from '@/components/TeacherResources';\n`;
  
  if (book.requiresLessonPlans) {
    content += `import { LessonPlan } from '@/components/LessonPlanTemplate';\n`;
  }
  
  content += `\n/**\n * This file contains common resources for Book ${book.id}\n */\n\n`;
  
  // Add unit titles
  content += `// Unit titles for Book ${book.id}\n`;
  content += `export const BOOK${book.id.toUpperCase()}_TITLE = '${book.name}';\n`;
  content += `export const BOOK${book.id.toUpperCase()}_UNIT_TITLES: Record<string, string> = {\n`;
  
  for (let i = 1; i <= book.units; i++) {
    content += `  '${i}': 'Unit ${i}',\n`;
  }
  
  content += `};\n\n`;
  
  // Add default resource generator
  content += `// Generate default resources for any unit\n`;
  content += `export function generateBook${book.id}UnitResources(bookId: string, unitId: string): TeacherResource[] {\n`;
  content += `  const unitTitle = BOOK${book.id.toUpperCase()}_UNIT_TITLES[unitId] || \`Unit \${unitId}\`;\n\n`;
  content += `  return [\n`;
  content += `    {\n`;
  content += `      id: \`book${book.id}-unit\${unitId}-default-video\`,\n`;
  content += `      bookId,\n`;
  content += `      unitId,\n`;
  content += `      title: \`\${unitTitle} - Video Resource\`,\n`;
  content += `      resourceType: 'video',\n`;
  content += `      provider: 'YouTube',\n`;
  content += `      sourceUrl: 'https://www.youtube.com/embed/placeholder',\n`;
  content += `      embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'\n`;
  content += `    },\n`;
  content += `    {\n`;
  content += `      id: \`book${book.id}-unit\${unitId}-default-game\`,\n`;
  content += `      bookId,\n`;
  content += `      unitId,\n`;
  content += `      title: \`\${unitTitle} - Interactive Game\`,\n`;
  content += `      resourceType: 'game',\n`;
  content += `      provider: 'Wordwall',\n`;
  content += `      sourceUrl: 'https://wordwall.net/resource/placeholder',\n`;
  content += `      embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'\n`;
  content += `    }\n`;
  content += `  ];\n`;
  content += `}\n`;
  
  // Write the file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated common file: ${outputFile}`);
}

// Generate resource file for a specific unit
async function generateResourceFile(bookId, unitId, bookName) {
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const outputFile = path.join(outputDir, `book${bookId}-unit${unitId}-resources.tsx`);
  
  // Skip if file already exists
  if (fs.existsSync(outputFile)) {
    console.log(`⚠️ Resource file already exists for Book ${bookId} Unit ${unitId}, skipping...`);
    return;
  }
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate content
  let content = `import { TeacherResource } from '@/components/TeacherResources';\n\n`;
  content += `/**\n * Resources for Book ${bookId} Unit ${unitId}\n */\n\n`;
  
  // Add default videos
  content += `// Videos for Unit ${unitId}\n`;
  content += `export const videos: TeacherResource[] = [\n`;
  content += `  {\n`;
  content += `    id: \`book${bookId}-unit${unitId}-video-1\`,\n`;
  content += `    bookId: '${bookId}',\n`;
  content += `    unitId: '${unitId}',\n`;
  content += `    title: '${bookName} Unit ${unitId} Video 1',\n`;
  content += `    resourceType: 'video',\n`;
  content += `    provider: 'YouTube',\n`;
  content += `    sourceUrl: 'https://www.youtube.com/embed/placeholder',\n`;
  content += `    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'\n`;
  content += `  },\n`;
  content += `  {\n`;
  content += `    id: \`book${bookId}-unit${unitId}-video-2\`,\n`;
  content += `    bookId: '${bookId}',\n`;
  content += `    unitId: '${unitId}',\n`;
  content += `    title: '${bookName} Unit ${unitId} Video 2',\n`;
  content += `    resourceType: 'video',\n`;
  content += `    provider: 'YouTube',\n`;
  content += `    sourceUrl: 'https://www.youtube.com/embed/placeholder',\n`;
  content += `    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'\n`;
  content += `  }\n`;
  content += `];\n\n`;
  
  // Add default games
  content += `// Games for Unit ${unitId}\n`;
  content += `export const games: TeacherResource[] = [\n`;
  content += `  {\n`;
  content += `    id: \`book${bookId}-unit${unitId}-game-1\`,\n`;
  content += `    bookId: '${bookId}',\n`;
  content += `    unitId: '${unitId}',\n`;
  content += `    title: '${bookName} Unit ${unitId} Game 1',\n`;
  content += `    resourceType: 'game',\n`;
  content += `    provider: 'Wordwall',\n`;
  content += `    sourceUrl: 'https://wordwall.net/resource/placeholder',\n`;
  content += `    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'\n`;
  content += `  },\n`;
  content += `  {\n`;
  content += `    id: \`book${bookId}-unit${unitId}-game-2\`,\n`;
  content += `    bookId: '${bookId}',\n`;
  content += `    unitId: '${unitId}',\n`;
  content += `    title: '${bookName} Unit ${unitId} Game 2',\n`;
  content += `    resourceType: 'game',\n`;
  content += `    provider: 'Wordwall',\n`;
  content += `    sourceUrl: 'https://wordwall.net/resource/placeholder',\n`;
  content += `    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'\n`;
  content += `  }\n`;
  content += `];\n\n`;
  
  // Add combined resources
  content += `// Combined resources for this unit\n`;
  content += `export const resources: TeacherResource[] = [...videos, ...games];\n\n`;
  content += `// Main export for backward compatibility\n`;
  content += `export const book${bookId}Unit${unitId}Resources = resources;\n`;
  
  // Write the file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated resource file: ${outputFile}`);
}

// Generate implementation file for a specific unit
async function generateImplementationFile(bookId, unitId, bookName, requiresLessonPlans) {
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const outputFile = path.join(outputDir, `book${bookId}-unit${unitId}-implementation.tsx`);
  
  // Skip if file already exists
  if (fs.existsSync(outputFile)) {
    console.log(`⚠️ Implementation file already exists for Book ${bookId} Unit ${unitId}, skipping...`);
    return;
  }
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate content
  let content = `// Implementation file for Book ${bookId} Unit ${unitId}\n\n`;
  content += `import { TeacherResource } from '@/components/TeacherResources';\n`;
  content += `import { resources } from './book${bookId}-unit${unitId}-resources';\n\n`;
  
  // Add lesson plans if required
  if (requiresLessonPlans) {
    content += `import { LessonPlan } from '@/components/LessonPlanTemplate';\n\n`;
    content += `// Lesson plans for Unit ${unitId}\n`;
    
    // First lesson plan - vocabulary focused
    content += `const vocabularyLessonPlan: LessonPlan = {\n`;
    content += `  id: \`book${bookId}-unit${unitId}-vocabulary-lesson\`,\n`;
    content += `  title: \`${bookName} Unit ${unitId} - Vocabulary Development\`,\n`;
    content += `  duration: '45 minutes',\n`;
    content += `  level: 'Beginner',\n`;
    content += `  objectives: [\n`;
    content += `    'Learn key vocabulary related to the unit theme',\n`;
    content += `    'Practice using new vocabulary in context',\n`;
    content += `    'Develop listening and speaking skills'\n`;
    content += `  ],\n`;
    content += `  materials: [\n`;
    content += `    \`${bookName} Unit ${unitId} slides\`,\n`;
    content += `    'Wordwall vocabulary games',\n`;
    content += `    'Flashcards and handouts'\n`;
    content += `  ],\n`;
    content += `  steps: [\n`;
    content += `    {\n`;
    content += `      title: 'Warm-up',\n`;
    content += `      duration: '5-10 minutes',\n`;
    content += `      description: 'Introduce theme with visual aids',\n`;
    content += `      instructions: ['Show unit theme visuals', 'Ask eliciting questions', 'Build interest in the topic']\n`;
    content += `    },\n`;
    content += `    {\n`;
    content += `      title: 'Vocabulary Presentation',\n`;
    content += `      duration: '15 minutes',\n`;
    content += `      description: 'Use slides to present new words',\n`;
    content += `      materials: ['Visual English slides', 'Vocabulary list handout'],\n`;
    content += `      instructions: ['Present new vocabulary items', 'Model pronunciation', 'Have students repeat', 'Explain meanings with visuals']\n`;
    content += `    },\n`;
    content += `    {\n`;
    content += `      title: 'Practice Activities',\n`;
    content += `      duration: '15 minutes',\n`;
    content += `      description: 'Interactive Wordwall games',\n`;
    content += `      materials: ['Wordwall game access', 'Devices for access'],\n`;
    content += `      instructions: ['Demonstrate game access', 'Have students play in pairs or small groups', 'Monitor and assist as needed']\n`;
    content += `    },\n`;
    content += `    {\n`;
    content += `      title: 'Production',\n`;
    content += `      duration: '10-15 minutes',\n`;
    content += `      description: 'Role-play or conversation activity',\n`;
    content += `      instructions: ['Assign conversation scenarios', 'Have students practice in pairs', 'Ask volunteers to present']\n`;
    content += `    }\n`;
    content += `  ],\n`;
    content += `  assessmentTips: 'Observe student participation in activities. Check vocabulary recognition through game scores. Evaluate pronunciation and usage during production activities.',\n`;
    content += `  homeworkIdeas: [\n`;
    content += `    'Create a mini-project related to the unit theme',\n`;
    content += `    'Research and present additional vocabulary in the topic area',\n`;
    content += `    'Complete online practice activities'\n`;
    content += `  ]\n`;
    content += `};\n\n`;
    
    // Second lesson plan - activities focused
    content += `const activitiesLessonPlan: LessonPlan = {\n`;
    content += `  id: \`book${bookId}-unit${unitId}-activities-lesson\`,\n`;
    content += `  title: \`${bookName} Unit ${unitId} - Interactive Activities\`,\n`;
    content += `  duration: '45 minutes',\n`;
    content += `  level: 'Beginner',\n`;
    content += `  objectives: [\n`;
    content += `    'Practice using vocabulary in fun, interactive activities',\n`;
    content += `    'Develop communication skills through games',\n`;
    content += `    'Build confidence in using new language'\n`;
    content += `  ],\n`;
    content += `  materials: [\n`;
    content += `    \`${bookName} Unit ${unitId} slides\`,\n`;
    content += `    'Video resources',\n`;
    content += `    'Game materials'\n`;
    content += `  ],\n`;
    content += `  steps: [\n`;
    content += `    {\n`;
    content += `      title: 'Review',\n`;
    content += `      duration: '5 minutes',\n`;
    content += `      description: 'Quick review of previous vocabulary',\n`;
    content += `      instructions: ['Ask questions using vocabulary from previous lesson', 'Elicit responses from students']\n`;
    content += `    },\n`;
    content += `    {\n`;
    content += `      title: 'Video Activity',\n`;
    content += `      duration: '15 minutes',\n`;
    content += `      description: 'Watch thematic video and complete tasks',\n`;
    content += `      materials: ['Unit video', 'Activity worksheet'],\n`;
    content += `      instructions: ['Play the video', 'Students complete worksheet activities', 'Review answers as a class']\n`;
    content += `    },\n`;
    content += `    {\n`;
    content += `      title: 'Interactive Games',\n`;
    content += `      duration: '15 minutes',\n`;
    content += `      description: 'Play vocabulary reinforcement games',\n`;
    content += `      materials: ['Wordwall games', 'Game materials'],\n`;
    content += `      instructions: ['Explain game rules', 'Organize students into teams', 'Conduct games with supervision']\n`;
    content += `    },\n`;
    content += `    {\n`;
    content += `      title: 'Wrap-up Activity',\n`;
    content += `      duration: '10 minutes',\n`;
    content += `      description: 'Consolidation activity',\n`;
    content += `      instructions: ['Students create a mind map of vocabulary', 'Share with partners', 'Class discussion of key concepts']\n`;
    content += `    }\n`;
    content += `  ],\n`;
    content += `  assessmentTips: 'Monitor participation in games. Check understanding through worksheet answers. Assess vocabulary usage in mind maps.',\n`;
    content += `  homeworkIdeas: [\n`;
    content += `    'Complete related online games',\n`;
    content += `    'Watch additional thematic videos',\n`;
    content += `    'Create personal vocabulary flashcards'\n`;
    content += `  ]\n`;
    content += `};\n\n`;
    
    // Add lesson plan exports
    content += `// Export lesson plans for this unit\n`;
    content += `export const lessonPlans = [vocabularyLessonPlan, activitiesLessonPlan];\n\n`;
    content += `// Function to get lesson plans for this unit\n`;
    content += `export const getBook${bookId}Unit${unitId}LessonPlans = () => lessonPlans;\n\n`;
  }
  
  // Add resource function
  content += `// Function to get resources for this unit\n`;
  content += `export const getBook${bookId}Unit${unitId}Resources = (): TeacherResource[] => resources;\n`;
  
  // Write the file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated implementation file: ${outputFile}`);
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
