/**
 * Unit Generator for Book 1
 * 
 * This file provides utility functions to generate implementation files for multiple units at once,
 * using consistent patterns and templates.
 */

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import fs from 'fs';
import path from 'path';

// Book 1 unit themes for automatic generation
const BOOK1_UNIT_THEMES = {
  '7': 'Fruit',
  '8': 'Vegetables',
  '9': 'Family',
  '10': 'House and Home',
  '11': 'Weather',
  '12': 'Clothing',
  '13': 'Body Parts',
  '14': 'Animals',
  '15': 'Food and Drinks',
  '16': 'Community Helpers',
  '17': 'Transportation',
  '18': 'Leisure Activities',
};

/**
 * Generate a lesson plan implementation file for Book 1 units
 * @param unitNumber The unit number (7-18)
 */
export function generateUnitImplementationFile(unitNumber: number): string {
  const unitTheme = BOOK1_UNIT_THEMES[unitNumber.toString()];
  
  if (!unitTheme) {
    throw new Error(`Unknown unit theme for unit ${unitNumber}`);
  }
  
  return `/**
 * Implementation file for Book 1 Unit ${unitNumber}: ${unitTheme}
 *
 * This unit focuses on teaching ${unitTheme.toLowerCase()} vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit${unitNumber}Resources } from './book1-unit${unitNumber}-resources';

// Export a function to get resources for this unit
export const getBook1Unit${unitNumber}Resources = (): TeacherResource[] => {
  return book1Unit${unitNumber}Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit${unitNumber}LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to ${unitTheme} (45 minutes)
    {
      id: 'book1-unit${unitNumber}-lesson1',
      title: 'Introduction to ${unitTheme} - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic ${unitTheme.toLowerCase()} vocabulary',
        'Identify different ${unitTheme.toLowerCase()} items',
        'Use simple sentences with ${unitTheme.toLowerCase()} vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit ${unitNumber} slides',
        '${unitTheme} flashcards',
        '${unitTheme} videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of ${unitTheme.toLowerCase()}. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the ${unitTheme} vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to ${unitTheme.toLowerCase()}.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to ${unitTheme.toLowerCase()} vocabulary.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the vocabulary learned today. Play a quick game to reinforce learning. Assign simple homework related to the topic.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of vocabulary. Check worksheet completion for understanding.',
      homeworkIdeas: [
        'Complete a related worksheet',
        'Draw and label ${unitTheme.toLowerCase()} items learned in class'
      ],
      additionalResources: [
        {
          title: '${unitTheme} Resources',
          url: '#'
        }
      ]
    },
    
    // Lesson Plan 2 - ${unitTheme} In Practice (45 minutes)
    {
      id: 'book1-unit${unitNumber}-lesson2',
      title: '${unitTheme} In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand ${unitTheme.toLowerCase()} vocabulary',
        'Practice using ${unitTheme.toLowerCase()} in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit ${unitNumber} slides',
        'Interactive ${unitTheme.toLowerCase()} games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review ${unitTheme.toLowerCase()} vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to ${unitTheme.toLowerCase()}. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to ${unitTheme.toLowerCase()}. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall ${unitTheme.toLowerCase()} games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about ${unitTheme.toLowerCase()} today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to ${unitTheme.toLowerCase()}',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: '${unitTheme} Activity Ideas',
          url: '#'
        }
      ]
    }
  ];
};
`;
}

/**
 * Generate a resource file template for Book 1 units
 * @param unitNumber The unit number (7-18)
 */
export function generateUnitResourcesFile(unitNumber: number): string {
  const unitTheme = BOOK1_UNIT_THEMES[unitNumber.toString()];
  
  if (!unitTheme) {
    throw new Error(`Unknown unit theme for unit ${unitNumber}`);
  }
  
  return `import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit ${unitNumber}: ${unitTheme}
 * 
 * This file contains video and game resources for teaching
 * ${unitTheme.toLowerCase()} vocabulary and related expressions
 */

export const book1Unit${unitNumber}Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    ${unitNumber}, 1,
    '${unitTheme} Song for Kids',
    'example-youtube-id-1',
    'A catchy song about ${unitTheme.toLowerCase()} with colorful visuals'
  ),
  createBook1VideoResource(
    ${unitNumber}, 2,
    '${unitTheme} Vocabulary',
    'example-youtube-id-2',
    'Learn ${unitTheme.toLowerCase()} vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    ${unitNumber}, 3,
    '${unitTheme} in Action',
    'example-youtube-id-3',
    'See ${unitTheme.toLowerCase()} used in real-life contexts'
  ),
  createBook1VideoResource(
    ${unitNumber}, 4,
    '${unitTheme} Story Time',
    'example-youtube-id-4',
    'A story featuring ${unitTheme.toLowerCase()} vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    ${unitNumber}, 1,
    '${unitTheme} Matching Game',
    'https://wordwall.net/embed/example1',
    'Match ${unitTheme.toLowerCase()} pictures with their English names'
  ),
  createBook1GameResource(
    ${unitNumber}, 2,
    '${unitTheme} Spelling Practice',
    'https://wordwall.net/embed/example2',
    'Practice spelling ${unitTheme.toLowerCase()} vocabulary'
  ),
  createBook1GameResource(
    ${unitNumber}, 3,
    '${unitTheme} Quiz',
    'https://wordwall.net/embed/example3',
    'Test knowledge of ${unitTheme.toLowerCase()} vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    ${unitNumber}, 4,
    '${unitTheme} Groups',
    'https://wordwall.net/embed/example4',
    'Sort ${unitTheme.toLowerCase()} into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit${unitNumber}VideoResources = book1Unit${unitNumber}Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit${unitNumber}GameResources = book1Unit${unitNumber}Resources.filter(resource => resource.resourceType === 'game');
`;
}

/**
 * Generate unit files for multiple units at once
 * @param startUnit Starting unit number
 * @param endUnit Ending unit number (inclusive)
 * @param outputPath Output directory path
 */
export function generateMultipleUnits(startUnit: number, endUnit: number, outputPath: string = 'src/data'): void {
  for (let unitNumber = startUnit; unitNumber <= endUnit; unitNumber++) {
    const implementationContent = generateUnitImplementationFile(unitNumber);
    const resourcesContent = generateUnitResourcesFile(unitNumber);
    
    const implementationPath = path.join(outputPath, `book1-unit${unitNumber}-implementation.tsx`);
    const resourcesPath = path.join(outputPath, `book1-unit${unitNumber}-resources.tsx`);
    
    fs.writeFileSync(implementationPath, implementationContent);
    fs.writeFileSync(resourcesPath, resourcesContent);
    
    console.log(`Generated unit ${unitNumber} files`);
  }
  
  console.log(`Successfully generated files for units ${startUnit}-${endUnit}`);
}

// Example usage in Node.js environment:
// generateMultipleUnits(10, 18, './src/data');
