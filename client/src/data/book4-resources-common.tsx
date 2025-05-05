import { TeacherResource } from '@/components/TeacherResources';

/**
 * This file contains common resources for Book 4
 */

// Unit titles for Book 4
export const BOOK4_TITLE = 'VISUAL 4';
export const BOOK4_UNIT_TITLES: Record<string, string> = {
  '1': 'NATIONALITIES',
  '2': 'GADGETS',
  '3': 'HOME SWEET HOME',
  '4': 'MY FAMILY',
  '5': 'PERSONALITY',
  '6': 'MY COLLECTIONS',
  '7': 'FASHION CRAZY',
  '8': 'ENJOY YOUR MEAL',
  '9': 'AT THE CAMPSITE',
  '10': 'MOTHER NATURE',
  '11': 'DAILY ROUTINES',
  '12': 'AT THE FARM',
  '13': 'AT THE PLAYGROUND',
  '14': 'WHAT CAN YOU DO',
  '15': 'AT THE CIRCUS',
  '16': 'FREE TIME ACTIVITIES',
};

// Generate default resources for any unit
export function generateBook4UnitResources(bookId: string, unitId: string): TeacherResource[] {
  const unitTitleText = BOOK4_UNIT_TITLES[unitId] || `Unit ${unitId}`;

  return [
    {
      id: `book4-unit${unitId}-default-video`,
      bookId,
      unitId,
      title: `${BOOK4_TITLE} - UNIT ${unitId} - ${unitTitleText} - Video Resource`,
      resourceType: 'video',
      provider: 'YouTube',
      sourceUrl: 'https://www.youtube.com/embed/placeholder',
      embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      content: {
        type: 'youtube',
        embedId: 'placeholder'
      }
    },
    {
      id: `book4-unit${unitId}-default-game`,
      bookId,
      unitId,
      title: `${BOOK4_TITLE} - UNIT ${unitId} - ${unitTitleText} - Interactive Game`,
      resourceType: 'game',
      provider: 'Wordwall',
      sourceUrl: 'https://wordwall.net/resource/placeholder',
      embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
      content: {
        type: 'wordwall',
        embedUrl: 'https://wordwall.net/embed/placeholder'
      }
    }
  ];
}

// Generate default lesson plans for any unit
export function generateDefaultBook4UnitLessonPlans(unitId: string, unitTitle?: string) {
  const finalUnitTitle = unitTitle || BOOK4_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  return [
    {
      id: `book4-unit${unitId}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitId} - ${finalUnitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn key vocabulary related to the unit theme',
        'Students will practice basic conversation structures',
        'Students will complete interactive activities to reinforce learning'
      ],
      materials: ['Visual English Book 4', 'Interactive whiteboard', 'Handouts'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to the lesson theme',
          instructions: ['Use visual aids to introduce the topic', 'Elicit vocabulary students already know']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach new vocabulary for the unit',
          materials: ['Flashcards or digital images'],
          instructions: [
            'Present new vocabulary with visual support',
            'Practice pronunciation',
            'Have students repeat and use vocabulary in context'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Interactive practice with new vocabulary and structures',
          materials: ['Worksheets or digital activity'],
          instructions: [
            'Guide students through controlled practice',
            'Monitor and provide feedback',
            'Address common errors as a group'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review and assessment',
          instructions: [
            'Conduct a quick review quiz',
            'Have students reflect on what they learned',
            'Preview the next lesson'
          ]
        }
      ],
      assessmentTips: 'Observe student participation and accuracy during activities. Collect worksheets to assess individual understanding.',
      homeworkIdeas: ['Complete vocabulary practice worksheet', 'Prepare a short dialogue using new vocabulary']
    },
    {
      id: `book4-unit${unitId}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitId} - ${finalUnitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will review vocabulary from previous lesson',
        'Students will extend their knowledge with additional language structures',
        'Students will engage in more communicative activities'
      ],
      materials: ['Visual English Book 4', 'Interactive games', 'Pair/group activity materials'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review of previous lesson',
          instructions: ['Quick vocabulary recall game', 'Address any questions from homework']
        },
        {
          title: 'Extension Activity',
          duration: '15 minutes',
          description: 'Building on previous vocabulary and structures',
          materials: ['Visual aids', 'Audio materials if relevant'],
          instructions: [
            'Introduce additional vocabulary or language structures',
            'Model examples and elicit student responses',
            'Guided practice in small groups'
          ]
        },
        {
          title: 'Communicative Activity',
          duration: '15 minutes',
          description: 'Practice in authentic communication contexts',
          materials: ['Role play cards or scenario descriptions'],
          instructions: [
            'Organize students for pair or group work',
            'Explain the communication task clearly',
            'Monitor and note examples of good language use and errors for feedback'
          ]
        },
        {
          title: 'Plenary and Assessment',
          duration: '10 minutes',
          description: 'Feedback and consolidation',
          instructions: [
            'Share examples of good language use observed during activities',
            'Address common errors',
            'Recap key learning points from the unit'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\'s ability to use language communicatively. Note both accuracy and fluency during pair/group activities.',
      homeworkIdeas: ['Create a project related to the unit theme', 'Complete online practice activities']
    }
  ];
}
