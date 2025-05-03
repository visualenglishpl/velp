/**
 * Implementation file for Book 1 Unit 14: WHERE IS THE SPIDER?
 *
 * This unit focuses on teaching prepositions of place and spatial relationships
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit14Resources } from './book1-unit14-resources';

// Export a function to get resources for this unit
export const getBook1Unit14Resources = (): TeacherResource[] => {
  return book1Unit14Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit14LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Prepositions of Place (45 minutes)
    {
      id: 'book1-unit14-lesson1',
      title: 'Introduction to Prepositions of Place - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic prepositions of place (on, in, under, by)',
        'Ask and answer "Where is the spider?"',
        'Understand spatial relationships using simple prepositions'
      ],
      materials: [
        'Visual English Book 1 - Unit 14 slides',
        'Small toy spider or spider pictures',
        'Preposition videos from resources section',
        'Objects for demonstration (box, table, chair, etc.)'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the toy spider (or picture). Place it in different positions and ask "Where is the spider?" Teach vocabulary: on, in, under, by.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the "On In Under By Song" video. Pause at different points to practice the prepositions. Model asking and answering: "Where is the spider? It\'s on/in/under/by the [object]."'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Give each pair a toy spider or picture. Student A places the spider somewhere and Student B must ask "Where is the spider?" Student A responds with the correct preposition.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Play "Spider Hide and Seek": Teacher hides the spider somewhere in the classroom. Students take turns asking "Where is the spider?" and guessing the location using prepositions until someone finds it.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the prepositions learned today. Students draw a picture showing the spider in different positions (on, in, under, by) relative to various objects.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of prepositions. Check if students can correctly identify and describe spatial relationships.',
      homeworkIdeas: [
        'Complete a worksheet matching pictures to prepositions',
        'Draw a room with a spider in 4 different positions and label each with the correct preposition'
      ],
      additionalResources: [
        {
          title: 'Prepositions of Place Resources',
          url: 'https://supersimple.com/article/8-great-activities-for-teaching-prepositions/'
        }
      ]
    },
    
    // Lesson Plan 2 - More Prepositions of Place (45 minutes)
    {
      id: 'book1-unit14-lesson2',
      title: 'More Prepositions of Place - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn additional prepositions (in front of, behind, between)',
        'Create sentences with multiple prepositions',
        'Apply prepositions in practical activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 14 slides',
        'Spider toy or picture and various classroom objects',
        'Wordwall games from resources section',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review prepositions from previous lesson. Then introduce new prepositions: in front of, behind, between. Demonstrate with the spider and classroom objects.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the "In Front Of, Behind, Between" video. Have students repeat the new prepositions and practice using them in sentences. Show "Where is the Ball" video as an additional example.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Give each group objects and a spider. Call out positions ("Put the spider between the book and the pencil") and have students arrange their objects accordingly.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use the Wordwall "WHERE IS THE SPIDER" games for interactive practice. Students take turns identifying where the spider is using the correct preposition.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play "Simon Says" with prepositions: "Simon says put your pencil on the desk" / "Simon says put your hands under the chair" etc. Review all prepositions learned.'
        }
      ],
      assessmentTips: 'Observe students during the group activity to ensure they understand and can use all prepositions correctly. Check for proper sentence structure when describing positions.',
      homeworkIdeas: [
        'Create a "spider map" showing various positions with labeled prepositions',
        'Take pictures of a toy at home in 5 different positions and write sentences describing each'
      ],
      additionalResources: [
        {
          title: 'Prepositions Games and Activities',
          url: 'https://www.fluentu.com/blog/educator-english/prepositions-of-place-esl/'
        }
      ]
    }
  ];
};
