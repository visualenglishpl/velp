/**
 * Visual English Book 2, Unit 18: IN THE GARDEN
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit18Resources } from './book2-unit18-resources';

// Function to get resources for this unit
export function getBook2Unit18Resources(): TeacherResource[] {
  return book2Unit18Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit18LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit18-lesson1',
      title: 'Garden Vocabulary - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common garden items and plants',
        'Students will practice pronunciation of garden-related words',
        'Students will identify different garden tools and plants'
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
          description: 'Present garden vocabulary with flashcards showing garden tools (rake, shovel, watering can) and plants (flower, tree, bush). Practice pronunciation with the whole class.'
        },
        {
          title: 'BBQ Garden Song',
          duration: '8 minutes',
          description: 'Play the "BBQ Garden Song" by Maple Leaf Learning. First have students listen, then play it again and encourage them to sing along and do the actions.'
        },
        {
          title: 'Garden Tools Mime',
          duration: '10 minutes',
          description: 'Demonstrate different garden tools and activities through mime (digging, planting, watering). Have students guess the action, then have them take turns miming while others guess.'
        },
        {
          title: 'Garden Vocabulary Sorting',
          duration: '10 minutes',
          description: 'Create categories on the board (tools, plants, parts of plants) and have students help categorize garden vocabulary into appropriate groups.'
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the "In the Garden - Wordwall" game as a class activity to reinforce garden vocabulary.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of garden vocabulary and observe students\'s ability to categorize garden items.',
      homeworkIdeas: [
        'Draw and label 5 things you might find in a garden',
        'Cut out pictures of plants and garden tools from magazines and create a collage'
      ]
    },
    {
      id: 'book2-unit18-lesson2',
      title: 'Parts of Plants - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for parts of plants (root, stem, leaf, flower)',
        'Students will understand the basic growth cycle of plants',
        'Students will create a simple diagram of a plant and label its parts'
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
          description: 'Introduce the main parts of a plant (root, stem, leaf, flower, seed) using visuals or a real plant if available. Explain the basic function of each part in simple terms.'
        },
        {
          title: 'Plant Lifecycle',
          duration: '8 minutes',
          description: 'Show a simple diagram of a plant lifecycle from seed to flower. Use gestures to represent growing from a small seed to a tall plant.'
        },
        {
          title: 'Plant Parts Labeling',
          duration: '10 minutes',
          description: 'Give students a worksheet with a picture of a plant. Have them color and label the parts of the plant using the vocabulary learned.'
        },
        {
          title: 'Plant Parts Action Game',
          duration: '7 minutes',
          description: 'Assign different actions for each plant part (crouch down for roots, stand up straight for stem, arms out for leaves, hands cupped above head for flower). Call out different parts and have students do the corresponding actions.'
        },
        {
          title: 'Parts of Plant Game',
          duration: '8 minutes',
          description: 'Play the "Parts of the Plant - Wordwall" games to reinforce vocabulary and assess learning.'
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