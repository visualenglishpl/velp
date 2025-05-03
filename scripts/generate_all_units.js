/**
 * Generate All Units Script
 * 
 * This script generates implementation files for all units across all books (0A through 7),
 * ensuring every unit has appropriate teacher resources, lesson plans, videos, and games.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get context-specific lesson theme data based on book and unit
function getLessonTheme(bookId, unitId) {
  // Default theme data that will be customized based on book/unit
  const defaultTheme = {
    id: 'vocabulary',
    title: 'Vocabulary Development',
    level: 'Beginner',
    objectives: [
      'Learn key vocabulary related to the unit theme',
      'Practice using new vocabulary in context',
      'Develop listening and speaking skills'
    ],
    materials: [
      'Wordwall vocabulary games',
      'Flashcards and handouts'
    ],
    steps: [
      {
        title: 'Warm-up',
        duration: '5-10 minutes',
        description: 'Introduce theme with visual aids',
        instructions: ['Show unit theme visuals', 'Ask eliciting questions', 'Build interest in the topic']
      },
      {
        title: 'Vocabulary Presentation',
        duration: '15 minutes',
        description: 'Use slides to present new words',
        materials: ['Visual English slides', 'Vocabulary list handout'],
        instructions: ['Present new vocabulary items', 'Model pronunciation', 'Have students repeat', 'Explain meanings with visuals']
      },
      {
        title: 'Practice Activities',
        duration: '15 minutes',
        description: 'Interactive Wordwall games',
        materials: ['Wordwall game access', 'Devices for access'],
        instructions: ['Demonstrate game access', 'Have students play in pairs or small groups', 'Monitor and assist as needed']
      },
      {
        title: 'Production',
        duration: '10-15 minutes',
        description: 'Role-play or conversation activity',
        instructions: ['Assign conversation scenarios', 'Have students practice in pairs', 'Ask volunteers to present']
      }
    ],
    assessmentTips: 'Observe student participation in activities. Check vocabulary recognition through game scores. Evaluate pronunciation and usage during production activities.',
    homeworkIdeas: [
      'Create a mini-project related to the unit theme',
      'Research and present additional vocabulary in the topic area',
      'Complete online practice activities'
    ]
  };
  
  // Customize based on book/unit combination
  if (bookId === '0a') {
    if (unitId >= 1 && unitId <= 5) {
      return {
        ...defaultTheme,
        title: 'Colors and Shapes Vocabulary',
        objectives: [
          'Learn basic color and shape vocabulary',
          'Practice identifying colors and shapes',
          'Develop visual recognition skills'
        ],
        materials: [
          'Color flashcards',
          'Shape cutouts',
          'Colorful classroom objects'
        ]
      };
    } else if (unitId >= 6 && unitId <= 10) {
      return {
        ...defaultTheme,
        title: 'Numbers and Counting',
        objectives: [
          'Learn numbers 1-10',
          'Practice counting objects',
          'Develop basic numerical skills'
        ],
        materials: [
          'Number flashcards',
          'Counting objects',
          'Number games'
        ]
      };
    } else {
      return {
        ...defaultTheme,
        title: 'Basic Vocabulary Development',
        objectives: [
          'Build foundational vocabulary',
          'Practice basic communication patterns',
          'Develop confidence in using new words'
        ]
      };
    }
  } else if (bookId === '0b') {
    if (unitId >= 1 && unitId <= 5) {
      return {
        ...defaultTheme,
        title: 'Family Vocabulary',
        objectives: [
          'Learn family member vocabulary',
          'Practice describing family relationships',
          'Develop speaking about family members'
        ],
        materials: [
          'Family tree templates',
          'Family member flashcards',
          'Picture dictionaries'
        ]
      };
    } else {
      return {
        ...defaultTheme,
        title: 'Daily Activities Vocabulary',
        objectives: [
          'Learn vocabulary for daily routines',
          'Practice talking about daily activities',
          'Develop time-based expressions'
        ],
        materials: [
          'Daily routine flashcards',
          'Schedule templates',
          'Picture sequences'
        ]
      };
    }
  } else if (bookId === '0c') {
    if (unitId >= 1 && unitId <= 8) {
      return {
        ...defaultTheme,
        title: 'Food and Drink Vocabulary',
        objectives: [
          'Learn food and drink vocabulary',
          'Practice expressing likes and dislikes',
          'Develop vocabulary for ordering food'
        ],
        materials: [
          'Food flashcards',
          'Menu templates',
          'Food categorization activities'
        ]
      };
    } else {
      return {
        ...defaultTheme,
        title: 'Places and Directions',
        objectives: [
          'Learn vocabulary for places in town',
          'Practice giving and following directions',
          'Develop spatial awareness vocabulary'
        ],
        materials: [
          'Map templates',
          'Location flashcards',
          'Direction word cards'
        ]
      };
    }
  }
  
  // For other books, return the default theme with minor customizations
  return defaultTheme;
}

// Helper function to get context-specific lesson activities data based on book and unit
function getLessonActivities(bookId, unitId) {
  // Default activities data that will be customized based on book/unit
  const defaultActivities = {
    id: 'activities',
    title: 'Interactive Activities',
    level: 'Beginner',
    objectives: [
      'Practice using vocabulary in interactive activities',
      'Develop communication skills through games',
      'Build confidence in using new language'
    ],
    materials: [
      'Video resources',
      'Game materials',
      'Activity worksheets'
    ],
    steps: [
      {
        title: 'Review',
        duration: '5 minutes',
        description: 'Quick review of previous vocabulary',
        instructions: ['Ask questions using vocabulary from previous lesson', 'Elicit responses from students']
      },
      {
        title: 'Video Activity',
        duration: '15 minutes',
        description: 'Watch thematic video and complete tasks',
        materials: ['Unit video', 'Activity worksheet'],
        instructions: ['Play the video', 'Students complete worksheet activities', 'Review answers as a class']
      },
      {
        title: 'Interactive Games',
        duration: '15 minutes',
        description: 'Play vocabulary reinforcement games',
        materials: ['Wordwall games', 'Game materials'],
        instructions: ['Explain game rules', 'Organize students into teams', 'Conduct games with supervision']
      },
      {
        title: 'Wrap-up Activity',
        duration: '10 minutes',
        description: 'Consolidation activity',
        instructions: ['Students create a mind map of vocabulary', 'Share with partners', 'Class discussion of key concepts']
      }
    ],
    assessmentTips: 'Monitor participation in games. Check understanding through worksheet answers. Assess vocabulary usage in mind maps.',
    homeworkIdeas: [
      'Complete related online games',
      'Watch additional thematic videos',
      'Create personal vocabulary flashcards'
    ]
  };
  
  // Customize based on book/unit combination
  if (bookId === '0a') {
    if (unitId >= 1 && unitId <= 5) {
      return {
        ...defaultActivities,
        title: 'Colors and Shapes Games',
        objectives: [
          'Practice identifying colors and shapes through games',
          'Develop color and shape vocabulary through activities',
          'Build confidence through interactive exercises'
        ],
        steps: [
          {
            title: 'Review',
            duration: '5 minutes',
            description: 'Quick review of colors and shapes',
            instructions: ['Show color and shape flashcards', 'Ask students to name each item', 'Correct pronunciation as needed']
          },
          {
            title: 'Color Hunt',
            duration: '15 minutes',
            description: 'Students find objects of specific colors',
            materials: ['Color cards', 'Classroom objects'],
            instructions: ['Divide students into teams', 'Give each team a color to find', 'Have teams collect or point to items of their assigned color']
          },
          {
            title: 'Shape Creation Game',
            duration: '15 minutes',
            description: 'Create pictures using different shapes',
            materials: ['Shape cutouts', 'Construction paper', 'Glue sticks'],
            instructions: ['Distribute shape cutouts to students', 'Have them create pictures using different shapes', 'Ask students to describe their pictures using color and shape vocabulary']
          },
          {
            title: 'Song Activity',
            duration: '10 minutes',
            description: 'Sing a song about colors and shapes',
            instructions: ['Teach a simple song about colors or shapes', 'Add actions for each color/shape', 'Have students sing along with actions']
          }
        ]
      };
    }
  } else if (bookId === '0b') {
    if (unitId >= 1 && unitId <= 5) {
      return {
        ...defaultActivities,
        title: 'Family Activities',
        objectives: [
          'Practice family vocabulary through interactive activities',
          'Develop speaking skills about family relationships',
          'Build confidence through role-play activities'
        ],
        steps: [
          {
            title: 'Family Review',
            duration: '5 minutes',
            description: 'Quick review of family vocabulary',
            instructions: ['Show family member flashcards', 'Ask students to name each family member', 'Correct pronunciation as needed']
          },
          {
            title: 'Family Tree Activity',
            duration: '15 minutes',
            description: 'Create a family tree',
            materials: ['Family tree templates', 'Photo cutouts or drawing supplies'],
            instructions: ['Distribute family tree templates', 'Have students fill in with their own family or a fictional family', 'Ask students to present their family trees']
          },
          {
            title: 'Family Role-play',
            duration: '15 minutes',
            description: 'Role-play family interactions',
            materials: ['Role cards', 'Simple dialogue prompts'],
            instructions: ['Assign family roles to students', 'Provide simple dialogue scenarios', 'Have students act out family conversations']
          },
          {
            title: 'Family Song',
            duration: '10 minutes',
            description: 'Sing a song about family',
            instructions: ['Teach a simple song about family', 'Add actions for each family member', 'Have students sing along with actions']
          }
        ]
      };
    }
  }
  
  // For other books, return the default activities with minor customizations
  return defaultActivities;
}

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

// Generate resource file for a specific book unit
function generateResourceFile(bookId, unitId, bookName, requiresLessonPlans) {
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const outputFile = path.join(outputDir, `book${bookId}-unit${unitId}-resources.tsx`);
  
  // Check if file already exists, don't overwrite existing files
  if (fs.existsSync(outputFile)) {
    console.log(`⚠️ Resource file already exists for Book ${bookId} Unit ${unitId}, skipping...`);
    return;
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate file content
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
  
  // Combined resources
  content += `// Combined resources for this unit\n`;
  content += `export const resources: TeacherResource[] = [...videos, ...games];\n\n`;
  
  // Export for backward compatibility
  content += `// Main export for backward compatibility\n`;
  content += `export const book${bookId}Unit${unitId}Resources = resources;\n`;
  
  // Write file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated resource file: ${outputFile}`);
}

// Generate implementation file for a specific book unit
function generateImplementationFile(bookId, unitId, bookName, requiresLessonPlans) {
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const outputFile = path.join(outputDir, `book${bookId}-unit${unitId}-implementation.tsx`);
  
  // Check if file already exists, don't overwrite existing files
  if (fs.existsSync(outputFile)) {
    console.log(`⚠️ Implementation file already exists for Book ${bookId} Unit ${unitId}, skipping...`);
    return;
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate file content
  let content = `// Implementation file for Book ${bookId} Unit ${unitId}\n\n`;
  content += `import { TeacherResource } from '@/components/TeacherResources';\n`;
  content += `import { resources } from './book${bookId}-unit${unitId}-resources';\n\n`;
  
  // Create context-specific lesson plans based on book/unit number
  if (requiresLessonPlans) {
    // Get context-specific lesson theme and activities based on book/unit
    const lessonTheme = getLessonTheme(bookId, unitId);
    const lessonActivities = getLessonActivities(bookId, unitId);
    
    content += `import { LessonPlan } from '@/components/LessonPlanTemplate';\n\n`;
    content += `// Lesson plans for Unit ${unitId}\n`;
    content += `const ${lessonTheme.id}LessonPlan: LessonPlan = {\n`;
    content += `  id: \`book${bookId}-unit${unitId}-${lessonTheme.id}-lesson\`,\n`;
    content += `  title: \`${bookName} Unit ${unitId} - ${lessonTheme.title}\`,\n`;
    content += `  duration: '45 minutes',\n`;
    content += `  level: '${lessonTheme.level}',\n`;
    content += `  objectives: [\n`;
    
    // Add theme-specific objectives
    lessonTheme.objectives.forEach(objective => {
      content += `    '${objective}',\n`;
    });
    
    content += `  ],\n`;
    content += `  materials: [\n`;
    content += `    \`${bookName} Unit ${unitId} slides\`,\n`;
    
    // Add theme-specific materials
    lessonTheme.materials.forEach(material => {
      content += `    '${material}',\n`;
    });
    
    content += `  ],\n`;
    content += `  steps: [\n`;
    
    // Add theme-specific lesson steps
    lessonTheme.steps.forEach(step => {
      content += `    {\n`;
      content += `      title: '${step.title}',\n`;
      content += `      duration: '${step.duration}',\n`;
      content += `      description: '${step.description}',\n`;
      
      if (step.materials && step.materials.length > 0) {
        content += `      materials: [${step.materials.map(m => `'${m}'`).join(', ')}],\n`;
      }
      
      content += `      instructions: [${step.instructions.map(i => `'${i}'`).join(', ')}]\n`;
      content += `    },\n`;
    });
    
    content += `  ],\n`;
    content += `  assessmentTips: '${lessonTheme.assessmentTips}',\n`;
    content += `  homeworkIdeas: [\n`;
    
    // Add theme-specific homework ideas
    lessonTheme.homeworkIdeas.forEach(idea => {
      content += `    '${idea}',\n`;
    });
    
    content += `  ]\n`;
    content += `};\n\n`;
    
    // Second lesson plan for activities
    content += `const ${lessonActivities.id}LessonPlan: LessonPlan = {\n`;
    content += `  id: \`book${bookId}-unit${unitId}-${lessonActivities.id}-lesson\`,\n`;
    content += `  title: \`${bookName} Unit ${unitId} - ${lessonActivities.title}\`,\n`;
    content += `  duration: '45 minutes',\n`;
    content += `  level: '${lessonActivities.level}',\n`;
    content += `  objectives: [\n`;
    
    // Add activities-specific objectives
    lessonActivities.objectives.forEach(objective => {
      content += `    '${objective}',\n`;
    });
    
    content += `  ],\n`;
    content += `  materials: [\n`;
    content += `    \`${bookName} Unit ${unitId} slides\`,\n`;
    
    // Add activities-specific materials
    lessonActivities.materials.forEach(material => {
      content += `    '${material}',\n`;
    });
    
    content += `  ],\n`;
    content += `  steps: [\n`;
    
    // Add activities-specific lesson steps
    lessonActivities.steps.forEach(step => {
      content += `    {\n`;
      content += `      title: '${step.title}',\n`;
      content += `      duration: '${step.duration}',\n`;
      content += `      description: '${step.description}',\n`;
      
      if (step.materials && step.materials.length > 0) {
        content += `      materials: [${step.materials.map(m => `'${m}'`).join(', ')}],\n`;
      }
      
      content += `      instructions: [${step.instructions.map(i => `'${i}'`).join(', ')}]\n`;
      content += `    },\n`;
    });
    
    content += `  ],\n`;
    content += `  assessmentTips: '${lessonActivities.assessmentTips}',\n`;
    content += `  homeworkIdeas: [\n`;
    
    // Add activities-specific homework ideas
    lessonActivities.homeworkIdeas.forEach(idea => {
      content += `    '${idea}',\n`;
    });
    
    content += `  ]\n`;
    content += `};\n\n`;
    
    // Export both lesson plans
    content += `// Export lesson plans for this unit\n`;
    content += `export const lessonPlans = [${lessonTheme.id}LessonPlan, ${lessonActivities.id}LessonPlan];\n\n`;
    content += `// Function to get lesson plans for this unit\n`;
    content += `export const getBook${bookId}Unit${unitId}LessonPlans = () => lessonPlans;\n\n`;
  }
  
  // Function to get resources for this unit
  content += `// Function to get resources for this unit\n`;
  content += `export const getBook${bookId}Unit${unitId}Resources = (): TeacherResource[] => resources;\n`;
  
  // Write file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated implementation file: ${outputFile}`);
}
}
  
  // Function to get resources for this unit
  content += `// Function to get resources for this unit\n`;
  content += `export const getBook${bookId}Unit${unitId}Resources = (): TeacherResource[] => resources;\n`;
  
  // Write file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated implementation file: ${outputFile}`);
}

// Generate common resources file for a book
function generateCommonFile(book) {
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const outputFile = path.join(outputDir, `book${book.id}-resources-common.tsx`);
  
  // Check if file already exists, don't overwrite existing files
  if (fs.existsSync(outputFile)) {
    console.log(`⚠️ Common file already exists for Book ${book.id}, skipping...`);
    return;
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate file content
  let content = `import { TeacherResource } from '@/components/TeacherResources';\n`;
  
  if (book.requiresLessonPlans) {
    content += `import { LessonPlan } from '@/components/LessonPlanTemplate';\n`;
  }
  
  content += `\n/**\n * This file contains common resources (games, videos) for Book ${book.id} that can be used\n * across multiple units.\n */\n\n`;
  
  // Unit titles
  content += `// Unit titles for reference in lesson plans and resources\n`;
  content += `export const BOOK${book.id.toUpperCase()}_TITLE = '${book.name}';\n`;
  content += `export const BOOK${book.id.toUpperCase()}_UNIT_TITLES: Record<string, string> = {\n`;
  
  for (let i = 1; i <= book.units; i++) {
    content += `  '${i}': 'Unit ${i}',\n`;
  }
  
  content += `};\n\n`;
  
  // Generator function
  content += `// Generate resources for any unit in this book\n`;
  content += `export function generateBook${book.id}UnitResources(bookId: string, unitId: string): TeacherResource[] {\n`;
  content += `  const unitTitle = BOOK${book.id.toUpperCase()}_UNIT_TITLES[unitId] || \`Unit \${unitId}\`;\n\n`;
  content += `  // Default resources that should be available for all units\n`;
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
  
  // Write file
  fs.writeFileSync(outputFile, content);
  console.log(`✅ Generated common file: ${outputFile}`);
}

// Process all books
async function processAllBooks() {
  console.log('Generating files for all books and units...');
  
  let totalFiles = 0;
  
  // Process each book
  for (const book of BOOKS) {
    console.log(`\n📚 Processing Book ${book.id} (${book.name})...`);
    
    // Generate common file for the book
    generateCommonFile(book);
    totalFiles++;
    
    // Process each unit in the book
    for (let unitId = 1; unitId <= book.units; unitId++) {
      console.log(`\n🔖 Processing Book ${book.id} Unit ${unitId}...`);
      
      // Generate resource file for the unit
      generateResourceFile(book.id, unitId, book.name, book.requiresLessonPlans);
      totalFiles++;
      
      // Generate implementation file for the unit
      generateImplementationFile(book.id, unitId, book.name, book.requiresLessonPlans);
      totalFiles++;
    }
  }
  
  console.log(`\n✅ Generation complete! Generated ${totalFiles} files.`);
  console.log('\nNext steps:');
  console.log('1. Update TeacherResources.tsx to include all books and units');
  console.log('2. Run node scripts/update_teacherresources_tsx.js to generate the necessary code changes');
  console.log('3. Test the changes by viewing any unit in the app');
}

// Run the main function
processAllBooks();
