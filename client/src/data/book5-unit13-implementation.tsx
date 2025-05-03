import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook5Unit13Resources } from './book5-unit13-resources';

/**
 * Generate Book 5 Unit 13 specific resources
 * @param bookId The book ID (should be '5')
 * @returns An array of TeacherResource objects
 */
export function generateBook5Unit13Content(bookId: string): TeacherResource[] {
  return generateBook5Unit13Resources(bookId);
}

/**
 * Generate lesson plans specific to Book 5 Unit 13: Irregular Verbs - Past Tense
 * @returns An array of LessonPlan objects
 */
export function generateUnit13LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book5-unit13-lesson1',
      title: 'Introduction to Irregular Verbs',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Identify and understand common irregular verbs in past tense',
        'Distinguish between regular and irregular verb forms',
        'Practice using irregular verbs in simple sentences'
      ],
      materials: [
        'Visual English Book 5, Unit 13 slides',
        'Irregular verb flashcards',
        'Regular vs. irregular sorting cards',
        'Verb worksheet'
      ],
      steps: [
        {
          title: 'Warm-up activity',
          duration: '5',
          description: 'Review regular past tense verbs and their -ed ending pattern. Explain that some verbs don\'t follow this pattern and are called "irregular verbs".'
        },
        {
          title: 'Presentation of irregular verbs',
          duration: '12',
          description: 'Present common irregular verbs (go → went, eat → ate, see → saw, etc.) using Visual English slides. Practice pronunciation and highlight the unpredictable nature of the changes.'
        },
        {
          title: 'Sorting activity',
          duration: '10',
          description: 'Students sort verb cards into regular and irregular categories. Then they match present tense irregular verbs with their past tense forms.'
        },
        {
          title: 'Sentence building',
          duration: '15',
          description: 'Students create simple past tense sentences using the irregular verbs they\'ve learned. Start with guided examples, then progress to more independent work.'
        },
        {
          title: 'Wrap-up',
          duration: '3',
          description: 'Review the irregular verbs learned today and preview those to be covered in the next lesson.'
        }
      ],
      assessmentTips: 'Monitor students\' ability to correctly identify irregular verbs and their past tense forms during the sorting activity. Check for proper usage in their sentence creation.',
      homeworkIdeas: [
        'Complete the "Past Tense Verbs - Match" Wordwall game online.',
        'Write five sentences about activities they did yesterday, using at least three irregular verbs.'
      ]
    },
    {
      id: 'book5-unit13-lesson2',
      title: 'Using Irregular Verbs in Context',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Expand knowledge of irregular verb forms',
        'Use irregular verbs in past tense to tell stories',
        'Apply irregular verbs in different contexts'
      ],
      materials: [
        'Visual English Book 5, Unit 13 slides',
        'Story sequence cards',
        'Video worksheet',
        'Past tense practice handouts'
      ],
      steps: [
        {
          title: 'Vocabulary review',
          duration: '5',
          description: 'Quick review of irregular verbs from the previous lesson using flashcards.'
        },
        {
          title: 'New irregular verbs',
          duration: '10',
          description: 'Introduce additional irregular verbs (bring → brought, think → thought, buy → bought, etc.). Identify patterns where possible (e.g., -ink → -ought).'
        },
        {
          title: 'Video activity',
          duration: '10',
          description: 'Watch the ISL Collective video about irregular verbs and complete the worksheet, identifying the irregular verbs used.'
        },
        {
          title: 'Story sequencing',
          duration: '15',
          description: 'In pairs, students arrange picture sequence cards to form a story, then write or tell the story using past tense irregular verbs. Provide a word bank for support.'
        },
        {
          title: 'Sharing and feedback',
          duration: '5',
          description: 'Selected pairs share their stories with the class. Highlight correct usage of irregular verbs and suggest improvements.'
        }
      ],
      assessmentTips: 'Evaluate students\' comprehension of irregular verbs through their video worksheet answers. Assess their ability to use irregular verbs correctly in context through their story creation.',
      homeworkIdeas: [
        'Complete the "Past Tense Verbs - Categories" Wordwall game online.',
        'Write a short paragraph about a memorable day in their past, using at least six irregular verbs.'
      ]
    }
  ];
}