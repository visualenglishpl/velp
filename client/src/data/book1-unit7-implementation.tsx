/**
 * Implementation file for Book 1 Unit 7: Fruit
 *
 * This unit focuses on teaching fruit vocabulary and expressing preferences using
 * "I like..." and "I don't like..."
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit7Resources } from './book1-unit7-resources';

// Export a function to get resources for this unit
export const getBook1Unit7Resources = (): TeacherResource[] => {
  return book1Unit7Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit7LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Fruit Vocabulary (45 minutes)
    {
      id: 'book1-unit7-lesson1',
      title: 'Fruit Vocabulary - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify common fruits (apple, banana, orange, grape, strawberry, pear)',
        'Use the structures "I like..." and "I don\'t like..."',
        'Ask and answer "Do you like...?"'
      ],
      materials: [
        'Visual English Book 1 - Unit 7 slides',
        'Fruit flashcards',
        'Fruit Song video from resources section',
        'Real fruit samples or plastic fruit models (if available)',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of fruits. Show fruit flashcards one by one and ask "What is this?". Students respond with the fruit name.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Fruit Song video. Pause at different points to reinforce fruit vocabulary. Introduce the structures "I like..." and "I don\'t like..." with visual examples. Model the question "Do you like...?" and responses.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students take turns asking "Do you like [fruit]?" using the flashcards. Partner responds with "Yes, I like [fruit]" or "No, I don\'t like [fruit]". Teacher monitors and provides feedback.'
        },
        {
          title: 'Production',
          duration: '10 minutes',
          description: 'Students draw their favorite and least favorite fruits. They present to a small group saying "I like [fruit]" and "I don\'t like [fruit]". Teacher encourages descriptive language like color and size when possible.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review fruit vocabulary with a quick game: teacher shows a fruit flashcard and asks "Do you like [fruit]?". Students stand up for "yes" and sit down for "no". Assign homework: survey family members about their favorite fruits.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of "I like/don\'t like" structures. Check for correct fruit identification in drawings.',
      homeworkIdeas: [
        'Ask family members "Do you like [fruit]?" and record their answers',
        'Draw and label 5 fruits you can find at home'
      ],
      additionalResources: [
        {
          title: 'Fruit Song for Kids - The Singing Walrus',
          url: 'https://www.youtube.com/watch?v=mfReSbQ7jzE'
        },
        {
          title: 'Do You Like Broccoli Ice Cream? - Super Simple Songs',
          url: 'https://www.youtube.com/watch?v=frN3nvhIHUk'
        }
      ]
    },
    
    // Lesson Plan 2 - Fruits and Preferences (45 minutes)
    {
      id: 'book1-unit7-lesson2',
      title: 'Fruits and Preferences - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand fruit vocabulary',
        'Practice expressing preferences with "My favorite fruit is..."',
        'Learn simple descriptive language for fruits (sweet, sour, juicy)'
      ],
      materials: [
        'Visual English Book 1 - Unit 7 slides',
        'Fruit flashcards and pictures',
        '"Do You Like Broccoli Ice Cream?" video',
        'Wordwall fruit games',
        'Craft materials for fruit mobile activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review fruit vocabulary with a quick game of fruit charades. Students take turns miming eating different fruits while classmates guess which fruit it is.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce descriptive words for fruits (sweet, sour, juicy, etc.). Show different fruits and describe them. Introduce the structure "My favorite fruit is...because it\'s...". Play the "Do You Like Broccoli Ice Cream?" video for fun language practice.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Create a class fruit survey. Each student asks 5 classmates "What is your favorite fruit?" and records the answers. Teacher helps create a simple graph on the board showing the most popular fruits in class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall fruit games for interactive practice. Students take turns identifying fruits and expressing preferences while the class helps.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Circle time: Each student completes the sentence "My favorite fruit is...because it\'s...". Review all vocabulary learned and play a quick "Simon Says" game with fruit vocabulary ("Simon says, pretend to peel a banana").'
        }
      ],
      assessmentTips: 'Check student understanding through the survey activity. Monitor use of descriptive language during the circle time activity.',
      homeworkIdeas: [
        'Create a fruit mini-book with drawings and simple sentences',
        'Bring a picture or drawing of your favorite fruit to the next class for a show-and-tell activity'
      ],
      additionalResources: [
        {
          title: 'Fruit Shop | English for Kids - English Tree TV',
          url: 'https://www.youtube.com/watch?v=cZP-BKY6LeM'
        },
        {
          title: 'Fruit Flashcards - Printable Resource',
          url: 'https://supersimple.com/article/fruit-flashcards/'
        }
      ]
    }
  ];
};