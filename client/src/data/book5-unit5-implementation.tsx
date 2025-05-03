import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook5Unit5Resources } from './book5-unit5-resources';

/**
 * Generate Book 5 Unit 5 specific resources
 * @param bookId The book ID (should be '5')
 * @returns An array of TeacherResource objects
 */
export function generateBook5Unit5Content(bookId: string): TeacherResource[] {
  return generateBook5Unit5Resources(bookId);
}

/**
 * Generate lesson plans specific to Book 5 Unit 5: Winter Fun
 * @returns An array of LessonPlan objects
 */
export function generateUnit5LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book5-unit5-lesson1',
      title: 'Winter Activities and Equipment',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Learn vocabulary related to winter activities and sports',
        'Identify and describe winter equipment and clothing',
        'Practice using present continuous tense for winter activities'
      ],
      materials: [
        'Visual English Book 5, Unit 5 slides',
        'Winter activities flashcards',
        'Equipment matching cards',
        'Winter scene images'
      ],
      steps: [
        {
          title: 'Warm-up discussion',
          duration: '5',
          description: 'Show images of winter scenes. Ask students what activities people do in winter and list them on the board.'
        },
        {
          title: 'Vocabulary introduction',
          duration: '12',
          description: 'Present vocabulary related to winter activities (skating, skiing, snowboarding, etc.) and appropriate equipment using Visual English slides.'
        },
        {
          title: 'Matching activity',
          duration: '10',
          description: 'Students match winter activities with the equipment needed (e.g., skiing - skis, boots, poles).'
        },
        {
          title: 'Present continuous practice',
          duration: '15',
          description: 'Show images of people doing winter activities. Students describe what they are doing using present continuous tense ("They are skiing down the mountain").'
        },
        {
          title: 'Wrap-up',
          duration: '3',
          description: 'Review key vocabulary and structures learned. Ask students which winter activities they enjoy most.'
        }
      ],
      assessmentTips: 'Observe students\' use of vocabulary and grammar during the present continuous activity. Check how well they connect activities with appropriate equipment.',
      homeworkIdeas: [
        'Complete the "Winter Activities" Wordwall game online.',
        'Draw a winter scene with at least three activities and label the equipment used.'
      ]
    },
    {
      id: 'book5-unit5-lesson2',
      title: 'Winter Sports and Safety',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Expand vocabulary related to winter sports',
        'Learn to express likes/dislikes about winter activities',
        'Understand basic winter safety rules and vocabulary'
      ],
      materials: [
        'Visual English Book 5, Unit 5 slides',
        'Winter sports video',
        'Like/dislike expression cards',
        'Winter safety infographic'
      ],
      steps: [
        {
          title: 'Vocabulary review',
          duration: '5',
          description: 'Quick review of winter activities and equipment vocabulary from the previous lesson.'
        },
        {
          title: 'Video activity',
          duration: '10',
          description: 'Watch the "Winter Activities" video. Students note down different sports mentioned and any new vocabulary.'
        },
        {
          title: 'Expressing preferences',
          duration: '10',
          description: 'Introduce expressions for likes/dislikes ("I love skiing", "I don\'t enjoy ice skating"). Students practice in pairs, discussing winter activities they enjoy or dislike.'
        },
        {
          title: 'Winter safety',
          duration: '15',
          description: 'Present vocabulary related to winter safety (hat, gloves, layers, ice, frostbite). Students create safety rules using "should/shouldn\'t" ("You should wear warm gloves").'
        },
        {
          title: 'Sharing and feedback',
          duration: '5',
          description: 'Students share their winter safety rules with the class. Review key points and vocabulary.'
        }
      ],
      assessmentTips: 'Evaluate students\' comprehension of the video through their notes. Check their use of should/shouldn\'t for safety rules and like/dislike expressions.',
      homeworkIdeas: [
        'Complete the "Winter Sports" and "Winter Equipment" Wordwall games online.',
        'Create a winter safety poster with at least five safety tips using "should/shouldn\'t."'
      ]
    }
  ];
}