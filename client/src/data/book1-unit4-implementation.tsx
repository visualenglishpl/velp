/**
 * Book 1, Unit 4: How Are You? - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 4.
 * This unit focuses on emotions and feelings vocabulary.
 */

import { book1Unit4Resources } from './book1-unit4-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 4
export const getBook1Unit4Resources = () => book1Unit4Resources;

// Generate lesson plans for Book 1, Unit 4
export const generateUnit4LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit4-lesson1",
      title: "Emotions Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn and identify basic emotions (happy, sad, hot, cold)",
        "Ask and answer 'How are you?' with appropriate emotion responses",
        "Recognize emotions in facial expressions and body language"
      ],
      materials: [
        "Emotion flashcards (happy, sad, hot, cold)",
        "Mirror for demonstrating facial expressions",
        "'How Are You Today?' video from Video Resources",
        "Emotion face cutouts",
        "Drawing paper and colored pencils"
      ],
      steps: [
        {
          title: "Warm-up: Emotion Song",
          duration: "5 minutes",
          description: "Play the 'How Are You Today?' video from Maple Leaf Learning. Ask students to watch first, then join in with facial expressions during the second viewing."
        },
        {
          title: "Emotion Introduction",
          duration: "10 minutes",
          description: "Show flashcards for basic emotions: happy, sad, hot, cold. Model each emotion with facial expressions and body language. Have students repeat the word and mimic the expression."
        },
        {
          title: "'How Are You?' Dialogue Practice",
          duration: "8 minutes",
          description: "Teach the question 'How are you?' and responses 'I am happy/sad/hot/cold.' Model the dialogue with puppets or by playing both roles. Have students repeat the dialogue chorally."
        },
        {
          title: "Emotion Mirror Activity",
          duration: "8 minutes",
          description: "Students work in pairs. One student asks 'How are you?' and the other responds with an emotion and shows the expression. Use a mirror to help students see their own expressions."
        },
        {
          title: "Emotion Matching Game",
          duration: "9 minutes",
          description: "Place emotion flashcards face down. Students take turns turning over cards, naming the emotion, and demonstrating the expression. If they can name and demonstrate correctly, they keep the card."
        },
        {
          title: "Emotion Faces Drawing",
          duration: "5 minutes",
          description: "Students draw simple faces showing different emotions. While drawing, teacher circulates and asks individual students 'How are you?' for them to respond with one of the target emotions."
        }
      ]
    },
    {
      id: "book1-unit4-lesson2",
      title: "More Feelings and Emotions",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn and identify additional emotions (hungry, thirsty, tired, scared)",
        "Expand responses to 'How are you?' questions",
        "Associate emotions with appropriate situations"
      ],
      materials: [
        "Emotion flashcards (hungry, thirsty, tired, scared)",
        "'Are You Hungry?' video from Video Resources",
        "'Are You Thirsty, Hungry and Sick?' video from Video Resources",
        "Situation picture cards",
        "Emotion bingo cards",
        "Emotion stickers or stamps"
      ],
      steps: [
        {
          title: "Warm-up: Review Previous Emotions",
          duration: "5 minutes",
          description: "Quick review of happy, sad, hot, cold with TPR (Total Physical Response). Say an emotion and have students show the expression. Increase the pace to make it more fun."
        },
        {
          title: "New Emotions Introduction",
          duration: "8 minutes",
          description: "Introduce hungry, thirsty, tired, and scared using flashcards and exaggerated expressions. Students repeat the words and mimic the expressions. Show the 'Are You Hungry?' video clip."
        },
        {
          title: "Expanded Dialogue Practice",
          duration: "7 minutes",
          description: "Expand the 'How are you?' dialogue to include new emotions. Practice in chain drills around the classroom. Each student asks the next student, who responds and then asks another."
        },
        {
          title: "Situation Matching",
          duration: "10 minutes",
          description: "Show situation pictures (e.g., a hot day, a scary monster, a tired child) and have students identify the appropriate emotion. Ask 'How is he/she?' and have students respond with full sentences."
        },
        {
          title: "Emotion Bingo",
          duration: "10 minutes",
          description: "Play bingo with emotion pictures. Teacher calls out an emotion, students mark if they have it. When a student gets 'Bingo', they must say 'I am (emotion)' for each marked square."
        },
        {
          title: "Class Survey",
          duration: "5 minutes",
          description: "Students circulate and ask 5 classmates 'How are you?' recording their answers. As a class, tally which emotion was most common today."
        }
      ]
    }
  ];
};