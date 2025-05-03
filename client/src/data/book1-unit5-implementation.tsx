/**
 * Visual English Book 1, Unit 5: School Supplies
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const generateUnit5LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Advanced School Supplies (45 minutes)
    {
      id: 'book1-unit5-lesson1',
      title: 'Advanced School Supplies',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify additional school supplies vocabulary (scissors, glue, pencil case, etc.)',
        'Practice asking and answering "Do you have...?" questions with school supplies',
        'Develop speaking skills through pair work activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 5 (slides 1-15)',
        'Real school supplies (scissors, glue, pencil case, stapler, etc.)',
        'School Supplies flashcards',
        'School Supplies Song video from Video Resources'
      ],
      steps: [
        {
          title: 'School Supplies Song',
          duration: '5 minutes',
          description: 'Play the "School Supplies Song - English Tree TV" video as an introduction. Have students watch and listen first time, then encourage them to join in second time.'
        },
        {
          title: 'Advanced School Objects Introduction',
          duration: '10 minutes',
          description: 'Show real school supplies one by one. Hold up each item, say its name clearly, and have students repeat. Focus on: scissors, glue, pencil case, stapler, tape, markers, crayons, etc.'
        },
        {
          title: 'What is this? Review',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 5-10, review the question "What is this?" and the answer "It is a/an [object]." Teacher asks the question while pointing to an object, whole class responds with the answer.'
        },
        {
          title: 'Do you have...? Practice',
          duration: '10 minutes',
          description: 'Introduce and practice the question "Do you have a/an [school supply]?" and answers "Yes, I do." / "No, I don\'t." Model the conversation, then have students work in pairs to ask and answer about the school supplies they have.'
        },
        {
          title: 'School Supply Charades',
          duration: '7 minutes',
          description: 'Students take turns coming to the front of the class and miming using a school supply (e.g., cutting with scissors, coloring with crayons). Other students must guess "Is it a/an [school supply]?" until someone guesses correctly.'
        },
        {
          title: 'Review and Wrap-up',
          duration: '5 minutes',
          description: 'Review all school supplies learned today. Hold up flashcards one by one, students name each item. Finish by watching the "Magic Crayons - Watts English" video if time permits.'
        }
      ]
    },
    // Lesson Plan 2 - Using School Supplies (45 minutes)
    {
      id: 'book1-unit5-lesson2',
      title: 'Using School Supplies',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and consolidate school supplies vocabulary',
        'Learn to describe actions with school supplies',
        'Practice asking "What are you doing?" questions',
        'Create a craft using various school supplies'
      ],
      materials: [
        'Visual English Book 1 - Unit 5 (slides 16-30)',
        'Various school supplies for each student/group',
        'Wordwall game on school supplies (from Game Resources)',
        'Construction paper, scissors, glue, markers, etc. for craft activity',
        'What is in Your Bag Song video (from Video Resources)'
      ],
      steps: [
        {
          title: 'Warm-up Song',
          duration: '5 minutes',
          description: 'Play the "What is in Your Bag Song - Dream English" video. Have students watch first, then join in with actions.'
        },
        {
          title: 'School Supplies Review',
          duration: '7 minutes',
          description: 'Quick review of school supplies from previous lesson. Show real objects, students name them. Play a quick "I Spy" game: "I spy with my little eye something that we use for cutting paper" (scissors).'
        },
        {
          title: 'Action Vocabulary Introduction',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 16-20, introduce action verbs related to school supplies: "I am cutting with scissors." "I am drawing with markers." "I am gluing with glue." Model each action and have students repeat the sentences.'
        },
        {
          title: 'What are you doing? Practice',
          duration: '8 minutes',
          description: 'Introduce the question "What are you doing?" and the answer "I am [verb+ing] with [school supply]." Have students work in pairs. Student A performs an action with a school supply, Student B asks "What are you doing?" Student A responds.'
        },
        {
          title: 'Interactive Wordwall Game',
          duration: '7 minutes',
          description: 'Play the "In My Pencil Case" quiz game from Games Resources. Students come to the board to answer questions about school supplies.'
        },
        {
          title: 'Craft Activity',
          duration: '10 minutes',
          description: 'Students create a simple collage or craft using various school supplies (scissors, glue, markers, etc.). While working, teacher circulates and asks "What are you doing?" Students practice responding "I am cutting with scissors" etc.'
        }
      ]
    }
  ];
};

export default generateUnit5LessonPlans;
