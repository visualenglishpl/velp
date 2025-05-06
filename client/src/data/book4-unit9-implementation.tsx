/**
 * Visual English Book 4, Unit 9 - CAMPING
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit9-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit9Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit9LessonPlans(): LessonPlan[] {
  const unitNumber = '9';
  const unitTitle = 'CAMPING';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn essential camping vocabulary',
        'Students will understand camping equipment and uses',
        'Students will develop conversation skills related to outdoor activities'
      ],
      materials: ['Camping equipment pictures', 'Vocabulary cards', 'Camping site diagram'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a discussion about outdoor experiences',
          instructions: ['Ask students if they have ever been camping', 'Discuss what they know about camping activities']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential camping vocabulary with visual aids',
          materials: ['Camping equipment pictures'],
          instructions: [
            'Show pictures of tent, sleeping bag, backpack, compass, flashlight, etc.',
            'Have students repeat new words and match them to images',
            'Watch the "Introduction to Camping" video'
          ]
        },
        {
          title: 'Camping Equipment Activity',
          duration: '15 minutes',
          description: 'Practice identifying equipment and its uses',
          materials: ['Vocabulary cards'],
          instructions: [
            'Divide students into pairs',
            'Distribute vocabulary cards with equipment names and uses',
            'Have students match equipment to its function'
          ]
        },
        {
          title: 'Setting Up Camp Simulation',
          duration: '10 minutes',
          description: 'Learn the sequence of setting up a campsite',
          materials: ['Camping site diagram'],
          instructions: [
            'Present a diagram of a campsite',
            'Discuss the ideal locations for tent, fire pit, food storage',
            'Have students describe the process of setting up camp using sequence words'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review key vocabulary through quick quiz',
          instructions: [
            'Play the Camping Vocabulary Game',
            'Review any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\'vocabulary retention through participation in activities',
      homeworkIdeas: ['Draw and label a camping scene with at least 5 vocabulary items', 'List camping items you would bring on a trip']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn basic camping safety rules',
        'Students will understand emergency procedures for outdoor activities',
        'Students will develop vocabulary related to safety and survival'
      ],
      materials: ['Safety rules poster', 'First aid kit items', 'Compass and map', 'Emergency scenario cards'],
      steps: [
        {
          title: 'Safety Introduction',
          duration: '5 minutes',
          description: 'Discuss the importance of safety in outdoor settings',
          instructions: ['Ask students why safety is important when camping', 'Brainstorm potential risks during camping trips']
        },
        {
          title: 'Safety Rules Presentation',
          duration: '10 minutes',
          description: 'Present essential camping safety guidelines',
          materials: ['Safety rules poster'],
          instructions: [
            'Review rules about fire safety, wildlife encounters, weather precautions',
            'Discuss the "buddy system" and staying together',
            'Watch the "Camping Safety Tips" video'
          ]
        },
        {
          title: 'First Aid Basics',
          duration: '10 minutes',
          description: 'Introduce basic first aid concepts for camping',
          materials: ['First aid kit items'],
          instructions: [
            'Show items in a basic first aid kit',
            'Discuss common minor injuries and appropriate treatments',
            'Teach vocabulary: bandage, antiseptic, splint, etc.'
          ]
        },
        {
          title: 'Navigation Skills',
          duration: '10 minutes',
          description: 'Learn basic navigation to avoid getting lost',
          materials: ['Compass and map'],
          instructions: [
            'Demonstrate how to use a compass',
            'Explain how to read basic map features',
            'Discuss what to do if lost in the wilderness'
          ]
        },
        {
          title: 'Interactive Activity',
          duration: '10 minutes',
          description: 'Practice camping safety with interactive game',
          instructions: [
            'Play the Camping Verbs Game',
            'Discuss what students learned about camping safety',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' understanding of safety procedures through scenario responses',
      homeworkIdeas: ['Create a personal camping safety checklist', 'Research local wildlife safety guidelines']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit9LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit9LessonPlans = (): LessonPlan[] => lessonPlans;