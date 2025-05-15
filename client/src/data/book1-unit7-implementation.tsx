/**
 * Book 1, Unit 7: How Old Are You? - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 7.
 */

import { book1Unit7Resources } from './book1-unit7-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 7
export const getBook1Unit7Resources = () => book1Unit7Resources;

// Generate lesson plans for Book 1, Unit 7
export const generateUnit7LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit7-lesson1",
      title: "Numbers 1-10 Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn to count from 1 to 10 in English",
        "Recognize written numbers 1-10",
        "Ask and answer the question 'How old are you?'"
      ],
      materials: [
        "Flashcards with numbers 1-10",
        "Number chart",
        "Age cards for role-play",
        "Number Zoo 1-10 video from Video Resources"
      ],
      steps: [
        {
          title: "Warm-up: Number Song",
          duration: "5 minutes",
          description: "Play the 'Number Zoo 1-10' video. Have students watch first time, then join in with counting during second viewing."
        },
        {
          title: "Number Introduction",
          duration: "10 minutes",
          description: "Show number flashcards one by one from 1-10. Say each number clearly and have students repeat. Practice counting forward and backward."
        },
        {
          title: "Counting Practice",
          duration: "8 minutes",
          description: "Have students count various objects in the classroom. Ask 'How many [pencils/books/chairs] are there?' Students respond with the correct number."
        },
        {
          title: "'How Old Are You?' Introduction",
          duration: "10 minutes",
          description: "Teach the question 'How old are you?' and the response 'I am ___ years old.' Model with examples using age cards. Practice pronunciation and intonation."
        },
        {
          title: "Age Interview Activity",
          duration: "7 minutes",
          description: "Students work in pairs or small groups, asking and answering about their age. Encourage them to use complete sentences."
        },
        {
          title: "Review and Number Game",
          duration: "5 minutes",
          description: "Play a number matching game to reinforce learning. Students match number words with numerals or count objects to reinforce numbers 1-10."
        }
      ]
    },
    {
      id: "book1-unit7-lesson2",
      title: "Number Spelling and Age Practice",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn to spell numbers 1-10 in English",
        "Practice age-related vocabulary",
        "Engage in simple conversations about age"
      ],
      materials: [
        "Handouts with number spelling activities",
        "Birthday cake props or images",
        "Age survey worksheet",
        "Number Spelling 1-10 video from Video Resources"
      ],
      steps: [
        {
          title: "Warm-up: Number Review",
          duration: "5 minutes",
          description: "Review numbers 1-10 with a quick counting game. Show numbers in random order, students call them out."
        },
        {
          title: "Number Spelling Introduction",
          duration: "10 minutes",
          description: "Watch the 'Number Spelling 1-10' video. After watching, practice spelling each number. Write numbers on board and say letters aloud with students."
        },
        {
          title: "Spelling Practice Activity",
          duration: "8 minutes",
          description: "Students complete number spelling worksheets, matching number words with numerals and practicing writing number words."
        },
        {
          title: "Birthday Role-play",
          duration: "10 minutes",
          description: "Set up a birthday party scenario. Students role-play conversations using 'How old are you?' and 'I am ___ years old.' Use birthday cake props for motivation."
        },
        {
          title: "Family Age Survey",
          duration: "7 minutes",
          description: "Students complete a simple survey asking about ages of family members. They write numbers and practice the question 'How old is your [family member]?'"
        },
        {
          title: "Class Display Creation",
          duration: "5 minutes",
          description: "Students create quick drawings showing their age with the caption 'I am ___ years old.' Share with the class and create a display."
        }
      ]
    }
  ];
};