/**
 * Simple generator script to create Book 1 Units 10-18
 */

// Book 1 unit themes for reference
const BOOK1_UNIT_THEMES = {
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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate implementation file content for a unit
 */
function generateImplementationContent(unitNumber) {
  const unitTheme = BOOK1_UNIT_THEMES[unitNumber.toString()];
  
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
          url: 'https://esl-kids.com/${unitTheme.toLowerCase().replace(/\s+/g, "")}'
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
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
`;
}

/**
 * Generate resource file content for a unit
 */
function generateResourceContent(unitNumber) {
  const unitTheme = BOOK1_UNIT_THEMES[unitNumber.toString()];
  
  // YouTube IDs for various types of educational content
  const youtubeIds = {
    '10': ['L36PTOcJP6Y', 'PXV7PIpdby8', '37w9JjUUmms', 'qJzXoXshOV8'],  // House and Home
    '11': ['tfAB4BXSHOA', 'XcW9Ct000yY', 'CXKj7bm4Ops', 'Jn7uAsLWXpk'],  // Weather
    '12': ['Q_EwuVHDb5U', 'KDE6wWByiRw', 'taoCF1cKZSY', '1GDp3sVBqDw'],  // Clothing
    '13': ['SUt8q0EKbms', 'QkHQ0CYwjaI', 'rhwWJ6xB-m4', 'h4eueDYPTIg'],  // Body Parts
    '14': ['CA6Mofzh7jo', '25_u1GzruQM', 'p5qwOxlvyhk', '_z3B3UT1Ezs'],  // Animals
    '15': ['mVE9pYdwX-I', 'ddDN30evKPc', 'O0C1R2e9FYY', '-mPFNGXUxmI'],  // Food and Drinks
    '16': ['I8GvLcKJnVY', 'W5EXOTj0voE', 'F7-rW8PF9Wk', '2x1Y6vS3bhA'],  // Community Helpers
    '17': ['kUv6XXG4hZU', 'YRk7-2XQoVs', 'Ut-HbauKzDw', 'pf5R2A7B7GI'],  // Transportation
    '18': ['7F7K2t0mMYA', 'N_bvB70gIzQ', 'wuTowqXQBTQ', 'DYq_79OiVxg'],  // Leisure Activities
  };
  
  // Wordwall game IDs for each theme
  const wordwallIds = {
    '10': ['93d6a7f5b97d4a5bad4a4cc97fae1b31', 'e2b92f5d7d2c4254b36f79f35dc1ef4c',
           'ada1baeb96954a4e8a992a48c01be67e', '3662e9e40a7743d6852f61a621e4eee8'],  // House and Home
    '11': ['7a39dce09d8d458c85c2db984b22a0ee', '4ae6d80611714a7b921ce17b6d4a51d9',
           '4e2a07e30e6b48c4b4f79bc67e8d3ef9', '5eb9efaa13664e6d9d32be1a2e92dc28'],  // Weather
    '12': ['c75f7bb2a4ff443b816d7faac2e219cc', '2bef7060b8854a15b1b8bca4c9e32c70',
           '714f2e1e61144fd48fc48fca4c20bb0a', 'f4c47b65e2c74ffca84ace36e7a10d2a'],  // Clothing
    '13': ['9c4a8b55d52f43569c0050e12ddaaec2', '4e3f5767a9d2450fa90d57f10e8d47af',
           '2e0cea9cae854e2fa5b5242b20f6b89d', '47bf9c5be40b4c0d82f72d2825b0d143'],  // Body Parts
    '14': ['7afa4fc4c63a4dc29d81b6a3f2c0cc76', '1a5d80f5fa7844cb99629abf20a92484',
           '9f3e7ff7fb954ce9aa68f1b1a57d7b66', 'c77cb1c4b0ff453299ef3ade19c7795f'],  // Animals
    '15': ['c8e95ca1b9844ce9b0f44d1df5c10d99', '9ad613c5cb87464c9e09cf17f54c6bc0',
           '4fc8c25a51e242a5ae63d8f0b5ffb31c', 'ea2ff94eb8b24157ae5b67ca7df1c5ac'],  // Food and Drinks
    '16': ['c3abb5d1cc2a46b4a72f8db4339cc8e1', '63ecf2a0fed047cfb32f90ae87feeef0',
           'ab5a644d7c334ddcb4f0a8aa12200e2b', '2c881c0c00e04aa490ee56d69db05cae'],  // Community Helpers
    '17': ['7af9c359a30a4ad8a0ed55faaeed9cbc', 'f3af87cda823433ca33c42eb1fe7b23e',
           '538cfa80f86e459fa23b38c1cec5c111', 'c0ec8c7d94d3435d9c0ef5d03c28c30d'],  // Transportation
    '18': ['e7c2702ee98b40249fd4ce5c05fbd3c6', '6dbfdafea41c4febb37b07d5ab92ce3f',
           'd5e10cfb43314e5c987bbf33d7ca1dce', '1cb5f1e4b83c4e7795343bc20d8f0a1c'],  // Leisure Activities
  };
  
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
    '${youtubeIds[unitNumber][0]}',
    'A catchy song about ${unitTheme.toLowerCase()} with colorful visuals'
  ),
  createBook1VideoResource(
    ${unitNumber}, 2,
    '${unitTheme} Vocabulary',
    '${youtubeIds[unitNumber][1]}',
    'Learn ${unitTheme.toLowerCase()} vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    ${unitNumber}, 3,
    '${unitTheme} in Action',
    '${youtubeIds[unitNumber][2]}',
    'See ${unitTheme.toLowerCase()} used in real-life contexts'
  ),
  createBook1VideoResource(
    ${unitNumber}, 4,
    '${unitTheme} Story Time',
    '${youtubeIds[unitNumber][3]}',
    'A story featuring ${unitTheme.toLowerCase()} vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    ${unitNumber}, 1,
    '${unitTheme} Matching Game',
    'https://wordwall.net/embed/${wordwallIds[unitNumber][0]}',
    'Match ${unitTheme.toLowerCase()} pictures with their English names'
  ),
  createBook1GameResource(
    ${unitNumber}, 2,
    '${unitTheme} Spelling Practice',
    'https://wordwall.net/embed/${wordwallIds[unitNumber][1]}',
    'Practice spelling ${unitTheme.toLowerCase()} vocabulary'
  ),
  createBook1GameResource(
    ${unitNumber}, 3,
    '${unitTheme} Quiz',
    'https://wordwall.net/embed/${wordwallIds[unitNumber][2]}',
    'Test knowledge of ${unitTheme.toLowerCase()} vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    ${unitNumber}, 4,
    '${unitTheme} Groups',
    'https://wordwall.net/embed/${wordwallIds[unitNumber][3]}',
    'Sort ${unitTheme.toLowerCase()} into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit${unitNumber}VideoResources = book1Unit${unitNumber}Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit${unitNumber}GameResources = book1Unit${unitNumber}Resources.filter(resource => resource.resourceType === 'game');
`;
}

/**
 * Generate all remaining Book 1 units (10-18)
 */
function generateAllUnits() {
  // Create units 10-18
  for (let unitNumber = 10; unitNumber <= 18; unitNumber++) {
    const implementationContent = generateImplementationContent(unitNumber);
    const resourceContent = generateResourceContent(unitNumber);
    
    const implementationPath = path.join(__dirname, `book1-unit${unitNumber}-implementation.tsx`);
    const resourcePath = path.join(__dirname, `book1-unit${unitNumber}-resources.tsx`);
    
    fs.writeFileSync(implementationPath, implementationContent);
    fs.writeFileSync(resourcePath, resourceContent);
    
    console.log(`Generated Unit ${unitNumber}: ${BOOK1_UNIT_THEMES[unitNumber]}`);
  }
  
  console.log('All Book 1 units (10-18) have been generated successfully!');
}

// Run the generator
generateAllUnits();
