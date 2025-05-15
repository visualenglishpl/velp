/**
 * Book 1, Unit 9: My Face - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 9.
 */

import { book1Unit9Resources } from './book1-unit9-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 9
export const getBook1Unit9Resources = () => book1Unit9Resources;

// Generate lesson plans for Book 1, Unit 9
export const generateUnit9LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit9-lesson1",
      title: "Parts of the Face Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn and identify basic parts of the face (eyes, nose, mouth, ears)",
        "Use simple sentences to describe facial features",
        "Match vocabulary with visual representations"
      ],
      materials: [
        "Face Parts Song video from Video Resources",
        "Face flashcards",
        "Mirror for each student or pair",
        "Face parts worksheet",
        "Crayons or markers"
      ],
      steps: [
        {
          title: "Warm-up: Face Parts Song",
          duration: "5 minutes",
          description: "Play the 'Face Parts Song' video from Maple Leaf Learning. Have students point to their own facial features as they are mentioned in the song."
        },
        {
          title: "Face Parts Introduction",
          duration: "10 minutes",
          description: "Using flashcards, introduce each face part (eyes, nose, mouth, ears, etc.). Show the picture, say the word clearly, and have students repeat. Practice singular and plural forms (eye/eyes)."
        },
        {
          title: "Mirror Activity",
          duration: "8 minutes",
          description: "Give students mirrors. Point to parts of your face and have students find the same part on their own face. Practice 'These are my eyes,' 'This is my nose,' etc."
        },
        {
          title: "Face Parts Sentences",
          duration: "8 minutes",
          description: "Teach simple sentences about face parts: 'I have [color] eyes,' 'I have a small nose,' etc. Students practice describing their own facial features to a partner."
        },
        {
          title: "Face Parts Matching",
          duration: "9 minutes",
          description: "Students complete a worksheet matching face part words to pictures. Differentiate by including written words for stronger students and only pictures for beginners."
        },
        {
          title: "Review and Assessment",
          duration: "5 minutes",
          description: "Play a quick game where you point to a face part and students call out the word. Then reverse it - say a word and have students point to that part on their own face."
        }
      ]
    },
    {
      id: "book1-unit9-lesson2",
      title: "Face Description and Creativity",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Review and reinforce face vocabulary",
        "Describe facial features using simple adjectives",
        "Create a robot face using face part vocabulary",
        "Follow simple instructions about face creation"
      ],
      materials: [
        "Make A Robot Face video from Video Resources",
        "Construction paper in various colors",
        "Scissors, glue, markers",
        "Face templates",
        "Face description cards with adjectives"
      ],
      steps: [
        {
          title: "Warm-up: Face Parts Review",
          duration: "5 minutes",
          description: "Quick review of face parts vocabulary. Play a touch-your-face game: 'Touch your eyes,' 'Touch your nose,' etc. Increase speed to make it more fun."
        },
        {
          title: "Robot Face Video",
          duration: "8 minutes",
          description: "Watch the 'Make A Robot Face - Watts English' video. Discuss the different face parts shown in the robot. Ask questions about the robot's face features."
        },
        {
          title: "Face Adjectives Introduction",
          duration: "8 minutes",
          description: "Introduce simple adjectives to describe face parts: big/small eyes, long/short nose, wide/thin mouth. Model sentences: 'The robot has big eyes.' Students practice using these adjectives."
        },
        {
          title: "Robot Face Craft Preparation",
          duration: "5 minutes",
          description: "Distribute materials for the craft activity. Demonstrate how to create face parts using paper shapes. Review vocabulary as you point to each part you'll create."
        },
        {
          title: "Robot Face Creation",
          duration: "14 minutes",
          description: "Students create their own robot faces using the materials provided. Encourage them to make creative choices. Walk around and ask questions: 'What color are your robot's eyes?' 'Is your robot's mouth big or small?'"
        },
        {
          title: "Robot Face Presentations",
          duration: "5 minutes",
          description: "Students present their robot face creations to a partner or small group using complete sentences: 'My robot has [description] [face part].' More confident students can present to the whole class."
        }
      ]
    }
  ];
};