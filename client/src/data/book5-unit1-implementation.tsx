import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook5Unit1Resources } from './book5-unit1-resources';

/**
 * Generate Book 5 Unit 1 specific resources
 * @param bookId The book ID (should be '5')
 * @returns An array of TeacherResource objects
 */
export function generateBook5Unit1Content(bookId: string): TeacherResource[] {
  return generateBook5Unit1Resources(bookId);
}

/**
 * Generate lesson plans specific to Book 5 Unit 1: Schools in the UK and USA
 * @returns An array of LessonPlan objects
 */
export function generateUnit1LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book5-unit1-lesson1',
      title: 'Introduction to Schools in UK and USA',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Learn key vocabulary related to school buildings and facilities',
        'Compare schools in the UK and USA with local schools',
        'Develop speaking skills through comparative discussions'
      ],
      materials: [
        'Visual English Book 5, Unit 1 slides',
        'School vocabulary flashcards',
        'Comparison worksheets',
        'Images of UK and USA schools'
      ],
      steps: [
        {
          title: 'Warm-up discussion',
          duration: '5',
          description: 'Ask students what they know about schools in the UK and USA. Create a mind map on the board with their ideas.'
        },
        {
          title: 'Vocabulary introduction',
          duration: '12',
          description: 'Present vocabulary related to school buildings, facilities, and classroom objects using Visual English slides and flashcards.'
        },
        {
          title: 'Comparison activity',
          duration: '15',
          description: 'Show images of schools in the UK and USA. Students work in pairs to identify differences and similarities with their own school.'
        },
        {
          title: 'Guided practice',
          duration: '10',
          description: 'Students complete a worksheet using comparative structures to describe the differences between schools (e.g., "Schools in the USA are bigger than...").'
        },
        {
          title: 'Wrap-up',
          duration: '3',
          description: 'Review key vocabulary and structures learned. Preview the next lesson on school subjects and schedules.'
        }
      ],
      assessmentTips: 'Monitor students\'s use of comparative language and school vocabulary during the pair work activity. Check worksheets for accurate use of vocabulary and structures.',
      homeworkIdeas: [
        'Research one interesting fact about schools in the UK or USA to share in the next class.',
        'Complete a vocabulary matching exercise with school terms.'
      ]
    },
    {
      id: 'book5-unit1-lesson2',
      title: 'School Subjects and After-School Activities',
      duration: '45',
      level: 'Elementary',
      objectives: [
        'Learn vocabulary related to school subjects and after-school clubs',
        'Practice expressing preferences about school activities',
        'Develop listening skills through authentic videos about schools'
      ],
      materials: [
        'Visual English Book 5, Unit 1 slides',
        'School subjects flashcards',
        'After-school clubs video',
        'Schedule template worksheets'
      ],
      steps: [
        {
          title: 'Vocabulary review',
          duration: '5',
          description: 'Quick review of school building vocabulary from the previous lesson using flashcards.'
        },
        {
          title: 'School subjects introduction',
          duration: '10',
          description: 'Present vocabulary for common school subjects using Visual English slides. Students practice pronunciation and match subjects to images.'
        },
        {
          title: 'Video activity',
          duration: '12',
          description: 'Watch the "After School Clubs" video. Students note down different types of clubs mentioned and any new vocabulary.'
        },
        {
          title: 'Schedule creation',
          duration: '15',
          description: 'Students create their ideal school schedule including regular subjects and after-school activities. They should use the new vocabulary learned.'
        },
        {
          title: 'Sharing and feedback',
          duration: '3',
          description: 'Selected students present their schedules to the class. Others listen and ask questions about the choices.'
        }
      ],
      assessmentTips: 'Evaluate students\'s comprehension of the video through their notes. Check their schedule creation for proper use of subject vocabulary and expressions of preference.',
      homeworkIdeas: [
        'Complete an online Wordwall game about school subjects or places in school.',
        'Write a short paragraph comparing their ideal schedule with their actual school schedule.'
      ]
    }
  ];
}