/**
 * Visual English Book 1, Unit 2: School Objects
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const generateUnit2LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to School Objects (45 minutes)
    {
      id: 'book1-unit2-lesson1',
      title: 'Introduction to School Objects',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify common school objects vocabulary',
        'Practice asking and answering "What is this?" with school objects',
        'Develop listening skills through targeted activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 2 (slides 1-15)',
        'Real school objects (pen, pencil, book, ruler, etc.)',
        'School Objects flashcards',
        'School Objects video (from Video Resources)'
      ],
      steps: [
        {
          title: 'School Objects Song',
          duration: '5 minutes',
          description: 'Play the "School Objects - ENGLISH TREE" video as an introduction. Have students watch and listen first time, then encourage them to join in second time.'
        },
        {
          title: 'Real Objects Introduction',
          duration: '10 minutes',
          description: 'Show real school objects one by one. Hold up each object, say its name clearly, and have students repeat. Go through: pencil, pen, ruler, book, notebook, eraser, pencil case, sharpener, schoolbag, scissors.'
        },
        {
          title: 'What is this? Drill',
          duration: '10 minutes',
          description: 'Using Visual English Book 1 slides 5-10, practice the question "What is this?" and the answer "It is a [object]." Teacher asks the question while pointing to an object, whole class responds with the answer.'
        },
        {
          title: 'Pass the Object Game',
          duration: '10 minutes',
          description: 'Students sit in a circle. Play music and pass school objects around. When music stops, teacher asks the student holding an object: "What is this?" Student must respond correctly: "It is a [object]."'
        },
        {
          title: 'Missing Object',
          duration: '7 minutes',
          description: 'Place 5-6 school objects on a desk. Students observe them for 30 seconds. Students close their eyes while teacher removes one object. Students open eyes and must identify what is missing. Practice saying "The [object] is missing."'
        },
        {
          title: 'Review and Wrap-up',
          duration: '3 minutes',
          description: 'Quick review of all school objects learned today. Hold up flashcards one by one, students name each object. Finish by watching the "Magic Crayons - WATTS ENGLISH" video if time permits.'
        }
      ]
    },
    // Lesson Plan 2 - My School Supplies (45 minutes)
    {
      id: 'book1-unit2-lesson2',
      title: 'My School Supplies',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and consolidate school objects vocabulary',
        'Learn to express possession with "I have a..."',
        'Practice asking "Do you have a...?" questions'
      ],
      materials: [
        'Visual English Book 1 - Unit 2 (slides 16-30)',
        'Students\'own school supplies',
        'Wordwall game on school objects (from Game Resources)',
        'What is In Your Bag Song (from Video Resources)'
      ],
      steps: [
        {
          title: 'Warm-up Song',
          duration: '5 minutes',
          description: 'Play the "What is In Your Bag Song - DREAM ENGLISH" video. Have students watch first, then join in with actions.'
        },
        {
          title: 'Review Previous Vocabulary',
          duration: '7 minutes',
          description: 'Quick review of school objects from previous lesson. Show flashcards, students name the objects.'
        },
        {
          title: 'I have a... Introduction',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 16-20, introduce the phrase "I have a [object]." Teacher models first, showing own school supplies. Then students practice saying "I have a [object]" while showing their own supplies.'
        },
        {
          title: 'School Bag Investigation',
          duration: '10 minutes',
          description: 'Students work in pairs. Student A looks in their school bag and says what they have: "I have a book, I have a pen..." Student B listens and makes a list of items. Then they switch roles.'
        },
        {
          title: 'Do you have a...? Practice',
          duration: '10 minutes',
          description: 'Using Visual English Book 1 slides 21-25, introduce the question "Do you have a [object]?" and responses "Yes, I do." / "No, I don\'t." Practice in pairs - Student A asks "Do you have a [object]?" Student B replies.'
        },
        {
          title: 'Interactive Wordwall Game',
          duration: '5 minutes',
          description: 'Play the "School Objects - Matching Game" from Games Resources. Students come to the board individually or in pairs to match school objects to their names.'
        },
        {
          title: 'Review and Homework',
          duration: '3 minutes',
          description: 'Review vocabulary and expressions learned. For homework, ask students to draw their pencil case with contents and label each item.'
        }
      ]
    }
  ];
};

export default generateUnit2LessonPlans;
