/**
 * Visual English Book 2, Unit 18: IN THE GARDEN
 * Implementation file for unit resources and lesson plans
 * 
 * Note: This unit handles slides without questions by leaving them blank
 */

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit18Resources } from './book2-unit18-resources';

const unitNumber = '18';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export function getBook2Unit18Resources(): TeacherResource[] {
  return book2Unit18Resources;
}

// Generate 45-minute lesson plans for this unit (formatted to match Book 2 Unit 13 structure)
export function generateUnit18LessonPlans(): LessonPlan[] {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn vocabulary for common garden items and plants',
        'Practice pronunciation of garden-related words',
        'Identify different garden tools and plants'
      ],
      materials: [
        'Visual English Book 2 Unit 18 slides',
        'Garden and plant flashcards', 
        'BBQ Garden song video',
        'Pictures of gardens',
        'Toy garden tools (optional)'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students pictures of gardens. Ask if they have a garden at home or know any plants or flowers.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present garden vocabulary using visual aids.',
          instructions: [
            'Use flashcards showing garden tools (rake, shovel, watering can)',
            'Introduce common plants (flower, tree, bush)',
            'Practice pronunciation with the whole class'
          ]
        },
        {
          title: 'BBQ Garden Song',
          duration: '8 minutes',
          description: 'Use the "BBQ Garden Song" to reinforce vocabulary.',
          teacherNotes: 'First have students listen, then play it again and encourage them to sing along and do the actions'
        },
        {
          title: 'Garden Tools Mime',
          duration: '10 minutes',
          description: 'Use mime activity to reinforce garden vocabulary.',
          instructions: [
            'Demonstrate different garden tools through mime actions',
            'Have students guess what you\'re doing',
            'Let students take turns miming while others guess'
          ]
        },
        {
          title: 'Garden Vocabulary Sorting',
          duration: '7 minutes',
          description: 'Classify garden vocabulary into categories.',
          instructions: [
            'Create categories on the board (tools, plants, parts of plants)',
            'Have students help categorize vocabulary into appropriate groups'
          ]
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play the "In the Garden - Wordwall" game to reinforce garden vocabulary.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of garden vocabulary and observe students\'s ability to categorize garden items.',
      homeworkIdeas: [
        'Draw and label 5 things you might find in a garden',
        'Cut out pictures of plants and garden tools from magazines and create a collage'
      ]
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn vocabulary for parts of plants (root, stem, leaf, flower)',
        'Understand the basic growth cycle of plants',
        'Create a simple diagram of a plant and label its parts'
      ],
      materials: [
        'Visual English Book 2 Unit 18 slides',
        'Plant parts flashcards',
        'Real plants or flowers (if available)',
        'Coloring materials',
        'Plant diagram worksheets'
      ],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of garden vocabulary using flashcards or by singing the BBQ Garden song again.'
        },
        {
          title: 'Parts of Plants Introduction',
          duration: '10 minutes',
          description: 'Teach the main parts of a plant and their functions.',
          instructions: [
            'Show the main parts (root, stem, leaf, flower, seed)',
            'Use visuals or a real plant if available',
            'Explain the basic function of each part in simple terms'
          ]
        },
        {
          title: 'Plant Lifecycle',
          duration: '8 minutes',
          description: 'Explain the plant growth process visually.',
          teacherNotes: 'Use gestures to represent growing from a small seed to a tall plant'
        },
        {
          title: 'Plant Parts Labeling',
          duration: '10 minutes',
          description: 'Reinforce plant vocabulary with a hands-on activity.',
          instructions: [
            'Give students a worksheet with a picture of a plant',
            'Have them color and label the plant parts',
            'Check accuracy of labels as students work'
          ]
        },
        {
          title: 'Plant Parts Action Game',
          duration: '7 minutes',
          description: 'Use physical movements to reinforce plant part vocabulary.',
          instructions: [
            'Assign actions for each plant part (crouch for roots, stand straight for stem, etc.)',
            'Call out different parts for students to act out',
            'Speed up calls to make the game more challenging'
          ]
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play the "Parts of the Plant - Wordwall" game to reinforce vocabulary and assess learning.'
        }
      ],
      assessmentTips: 'Check students\' labeled plant diagrams for accuracy. Observe their participation in the action game to assess understanding of plant parts.',
      homeworkIdeas: [
        'Draw the lifecycle of a plant from seed to flower',
        'Find and press a leaf or flower in a book, then bring it to class to share'
      ],
      additionalResources: [
        {
          title: "Soup's Up - PBS Kids Garden Game",
          url: 'https://pbskids.org/elinor/games/elinor-soups-up'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit18Resources,
  generateUnit18LessonPlans
};