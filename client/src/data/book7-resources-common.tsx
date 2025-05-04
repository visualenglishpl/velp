import { TeacherResource } from '@/components/TeacherResources';
import LessonPlanTemplate, { LessonPlan, LessonActivity, LessonObjective } from '@/components/LessonPlanTemplate';

// Define Book 7 Unit Titles
export const BOOK7_UNIT_TITLES: Record<string, string> = {
  '1': 'Advertising',
  '2': 'Health and Fitness',
  '3': 'Fiction and Non-fiction',
  '4': 'Sleep and Dreams',
  '5': 'Gaming',
  '6': 'Money Matters',
  '7': 'DIY & Tools',
  '8': 'Musical Instruments',
  '9': 'Jobs and Careers',
  '10': 'Sports',
  '11': 'Technology and Gadgets',
  '12': 'Earth and Space',
  '13': 'Art and Design',
  '14': 'Food Around the World',
  '15': 'History',
  '16': 'The Future'
};

/**
 * Generate default lesson plans for Book 7 units when specific implementations aren't available
 * @param unitId The unit ID as a string
 * @param unitTitle The title of the unit
 * @returns An array of two lesson plans
 */
export function generateDefaultBook7UnitLessonPlans(unitId: string, unitTitle: string): LessonPlan[] {
  return [
    {
      title: `${unitTitle} - Vocabulary Building`,
      duration: 45,
      level: 'Intermediate to Advanced',
      objectives: [
        { description: `Introduce and practice key ${unitTitle.toLowerCase()} vocabulary` },
        { description: 'Develop listening and speaking skills in context' },
        { description: 'Build confidence in using new vocabulary in conversations' }
      ],
      materials: [
        { description: 'Visual English Book 7' },
        { description: 'Vocabulary flashcards' },
        { description: 'Whiteboard and markers' },
        { description: 'Handouts with vocabulary exercises' }
      ],
      warmup: {
        title: 'Vocabulary Activation',
        duration: 8,
        description: `Show students pictures related to ${unitTitle.toLowerCase()} and elicit vocabulary they already know. Create a mind map on the board.`
      },
      activities: [
        {
          title: 'Key Vocabulary Introduction',
          duration: 12,
          description: `Present 10-12 key vocabulary items related to ${unitTitle.toLowerCase()} using Visual English Book 7 Unit ${unitId}. Have students repeat pronunciation and match words to definitions.`
        },
        {
          title: 'Vocabulary Practice',
          duration: 15,
          description: 'Students complete gap-fill exercises and match vocabulary to pictures. In pairs, they create sentences using the new vocabulary.'
        },
        {
          title: 'Speaking Activity',
          duration: 8,
          description: `Students discuss questions related to ${unitTitle.toLowerCase()} using the target vocabulary. Monitor and provide feedback on vocabulary usage.`
        }
      ],
      assessment: 'Observe student participation in speaking activities. Check accuracy of vocabulary usage in written exercises.',
      homework: `Students create a mini-dictionary with 10 words related to ${unitTitle.toLowerCase()}, including definitions, example sentences, and illustrations.`
    },
    {
      title: `${unitTitle} - Functional Language`,
      duration: 45,
      level: 'Intermediate to Advanced',
      objectives: [
        { description: `Develop communicative skills in ${unitTitle.toLowerCase()} contexts` },
        { description: 'Practice functional language for real-world situations' },
        { description: 'Improve accuracy in grammar structures relevant to the topic' }
      ],
      materials: [
        { description: 'Visual English Book 7' },
        { description: 'Role-play cards' },
        { description: 'Audio/video equipment' },
        { description: 'Handouts with exercises' }
      ],
      warmup: {
        title: 'Real-Life Connections',
        duration: 5,
        description: `Students share personal experiences related to ${unitTitle.toLowerCase()} in small groups. Class feedback on common experiences.`
      },
      activities: [
        {
          title: 'Listening for Context',
          duration: 10,
          description: `Students listen to a dialogue about ${unitTitle.toLowerCase()} and identify functional language and key expressions. Discuss how the language is used in context.`
        },
        {
          title: 'Controlled Practice',
          duration: 10,
          description: 'Guided practice with target language structures. Students complete dialogues with appropriate expressions and practice in pairs.'
        },
        {
          title: 'Role-play Preparation',
          duration: 8,
          description: `In pairs or small groups, students prepare a role-play scenario related to ${unitTitle.toLowerCase()} using the target language.`
        },
        {
          title: 'Role-play Performances',
          duration: 10,
          description: 'Selected pairs perform their role-plays for the class. Others give feedback on effective use of target language.'
        }
      ],
      assessment: 'Evaluate role-play performances for appropriate use of functional language. Check accuracy and fluency in speaking activities.',
      homework: `Students write a dialogue demonstrating functional language related to ${unitTitle.toLowerCase()}.`
    }
  ];
}

/**
 * Generate default resources for Book 7 units
 * @param unitId The unit ID
 * @returns Array of teacher resources
 */
export function generateBook7UnitResources(unitId: string): TeacherResource[] {
  const unitTitle = BOOK7_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  return [
    {
      title: `${unitTitle} Vocabulary Flashcards`,
      description: 'Printable flashcards for key vocabulary items',
      resourceType: 'pdf',
      provider: 'Visual English',
      content: {
        type: 'pdf'
      }
    },
    {
      title: `${unitTitle} Quizlet Set`,
      description: 'Interactive vocabulary practice',
      resourceType: 'game',
      provider: 'Quizlet',
      sourceUrl: `https://quizlet.com/class/visual-english-book7-${unitId}`,
      content: {
        type: 'link'
      }
    },
    {
      title: `${unitTitle} Supplementary Worksheets`,
      description: 'Additional practice activities for classroom or homework',
      resourceType: 'pdf',
      provider: 'Visual English',
      content: {
        type: 'pdf'
      }
    }
  ];
}
