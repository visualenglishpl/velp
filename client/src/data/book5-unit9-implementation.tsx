import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook5Unit9Resources } from './book5-unit9-resources';

/**
 * Generate Book 5 Unit 9 specific resources
 * @param bookId The book ID (should be '5')
 * @returns An array of TeacherResource objects
 */
export function generateBook5Unit9Content(bookId: string): TeacherResource[] {
  return generateBook5Unit9Resources(bookId);
}

/**
 * Generate lesson plans specific to Book 5 Unit 9: Emotions
 * @returns An array of LessonPlan objects
 */
export function generateUnit9LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book5-unit9-lesson1',
      title: 'Basic Emotions and Expressions',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Learn vocabulary for basic emotions (happy, sad, angry, etc.)',
        'Practice describing emotions using adjectives',
        'Recognize facial expressions associated with different emotions'
      ],
      materials: [
        'Visual English Book 5, Unit 9 slides',
        'Emotion flashcards',
        'Facial expression pictures',
        'Emotion wheel handout'
      ],
      steps: [
        {
          title: 'Warm-up activity',
          duration: '5',
          description: 'Show emotion flashcards and ask students to mimic the facial expressions. Discuss what emotions they represent.'
        },
        {
          title: 'Vocabulary introduction',
          duration: '10',
          description: 'Present vocabulary for basic emotions using Visual English slides. Practice pronunciation and match emotions to pictures.'
        },
        {
          title: 'Emotion wheel activity',
          duration: '10',
          description: 'Distribute emotion wheel handouts showing various emotions from the same family (e.g., happy → ecstatic, pleased, content). Students identify and discuss differences.'
        },
        {
          title: 'Role-play practice',
          duration: '15',
          description: 'In pairs, students take turns expressing an emotion without speaking while their partner tries to guess the emotion being portrayed.'
        },
        {
          title: 'Wrap-up',
          duration: '5',
          description: 'Review key vocabulary and ask students to share one situation that makes them feel a particular emotion.'
        }
      ],
      assessmentTips: 'Monitor students\' use of emotion vocabulary during the role-play activity. Check their ability to recognize and express different emotions.',
      homeworkIdeas: [
        'Complete the "Emotions - Quiz" Wordwall game online.',
        'Draw a comic strip showing a character experiencing at least three different emotions.'
      ]
    },
    {
      id: 'book5-unit9-lesson2',
      title: 'Talking About Feelings',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Learn phrases for expressing feelings',
        'Practice asking and answering questions about emotions',
        'Develop vocabulary for causes and responses to emotions'
      ],
      materials: [
        'Visual English Book 5, Unit 9 slides',
        'Dialog cards with emotion scenarios',
        'Emotion vocabulary worksheet',
        'Video worksheet'
      ],
      steps: [
        {
          title: 'Vocabulary review',
          duration: '5',
          description: 'Quick review of emotion vocabulary from the previous lesson using flashcards.'
        },
        {
          title: 'Expression phrases',
          duration: '10',
          description: 'Introduce phrases for expressing feelings ("I feel...", "I\'m feeling...", "I\'m so..."). Practice using these phrases with emotion adjectives.'
        },
        {
          title: 'Dialog practice',
          duration: '15',
          description: 'Students work in pairs with dialog cards that describe emotion scenarios. They create and practice short conversations about emotions, using questions such as "How are you feeling?" and "Why do you feel that way?"'
        },
        {
          title: 'Video activity',
          duration: '10',
          description: 'Show a short video clip about emotions and complete the ISL Collective video worksheet to identify emotions of characters and the causes.'
        },
        {
          title: 'Sharing and feedback',
          duration: '5',
          description: 'Selected pairs present their dialogs to the class. Provide feedback on vocabulary usage and expression.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use the appropriate phrases for expressing emotions during their dialog presentations. Check for correct usage of question forms about emotions.',
      homeworkIdeas: [
        'Complete the "Emotions - Match" Wordwall game online.',
        'Write a short paragraph about a time when they felt a strong emotion, explaining what caused it and how they responded.'
      ]
    }
  ];
}