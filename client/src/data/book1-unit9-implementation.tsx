/**
 * Implementation file for Book 1 Unit 9: Family
 *
 * This unit focuses on teaching family vocabulary and talking about family members
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit9Resources } from './book1-unit9-resources';

// Export a function to get resources for this unit
export const getBook1Unit9Resources = (): TeacherResource[] => {
  return book1Unit9Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit9LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introducing Family Vocabulary (45 minutes)
    {
      id: 'book1-unit9-lesson1',
      title: 'Introducing Family Vocabulary - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic family vocabulary (mother, father, sister, brother, etc.)',
        'Understand possessive structures like "my mother", "your father"',
        'Present family members using simple sentences'
      ],
      materials: [
        'Visual English Book 1 - Unit 9 slides',
        'Family member flashcards',
        'Family videos from resources section',
        'Paper for drawing family trees',
        'Markers/colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of family. Show a simple picture of a family and ask students what they see. Introduce key vocabulary: mother, father, sister, brother.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Family Song video. Pause to reinforce vocabulary. Show flashcards of different family members and model sentences like "This is my mother" and "This is my father".'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Students practice in pairs using the flashcards. Student A holds up a card and asks "Who is this?". Student B responds with "This is my [family member]". Then they switch roles.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students begin to draw a simple family tree with 4-5 members of their family (real or imaginary). They label each person with the appropriate vocabulary word.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Several students share their family trees with the class, practicing "This is my [family member]" for each person they\'ve drawn. Assign homework: complete family tree if not finished.'
        }
      ],
      assessmentTips: 'Monitor students during paired practice to check pronunciation and usage of possessive adjectives. Observe family tree drawings for correct labeling.',
      homeworkIdeas: [
        'Complete family tree with labels',
        'Draw pictures of 5 family members and write a sentence about each one'
      ],
      additionalResources: [
        {
          title: 'Family Vocabulary Flashcards',
          url: 'https://supersimple.com/free-printable/family-flashcards/'
        },
        {
          title: 'The Family Song - Super Simple Songs',
          url: 'https://www.youtube.com/watch?v=GiRUF7hvWuM'
        }
      ]
    },
    
    // Lesson Plan 2 - Describing My Family (45 minutes)
    {
      id: 'book1-unit9-lesson2',
      title: 'Describing My Family - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand family vocabulary',
        'Learn adjectives to describe family members',
        'Create and present a simple family description'
      ],
      materials: [
        'Visual English Book 1 - Unit 9 slides',
        'Family member flashcards',
        'Wordwall family games',
        'Student family trees from previous lesson',
        'Template for "My Family" mini-book'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review family vocabulary with a quick matching game. Students match family word cards to pictures.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce simple adjectives to describe family members: tall, short, funny, kind, smart. Model sentences like "My sister is funny" and "My father is tall". Show pictures to illustrate the adjectives.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Students work on their "My Family" mini-books. They draw each family member on a separate page and write a simple sentence using the new adjectives. Teacher circulates to help with spelling and grammar.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall family vocabulary games for interactive practice. Students take turns identifying family members and adding a descriptive adjective.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students share their mini-books in small groups. Each student presents 2-3 family members with descriptions. Close the lesson by reviewing all family vocabulary learned in both lessons.'
        }
      ],
      assessmentTips: 'Evaluate students\' use of adjectives to describe family members. Check for correct sentence structure in their mini-books.',
      homeworkIdeas: [
        'Complete the "My Family" mini-book if not finished in class',
        'Bring a family photo (or draw one) for the next class'
      ],
      additionalResources: [
        {
          title: 'Family Activities and Worksheets',
          url: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/family'
        },
        {
          title: 'Family Members Song - English Tree TV',
          url: 'https://www.youtube.com/watch?v=FHaObkHEkHQ'
        }
      ]
    }
  ];
};