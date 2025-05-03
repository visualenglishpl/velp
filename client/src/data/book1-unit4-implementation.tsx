/**
 * Visual English Book 1, Unit 4: How Are You?
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const generateUnit4LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introducing Feelings and States (45 minutes)
    {
      id: 'book1-unit4-lesson1',
      title: 'Introducing Feelings and States',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn to ask and answer the question "How are you?"',
        'Identify and express 6 basic feelings/states (happy, sad, hungry, thirsty, hot, cold)',
        'Develop facial expressions and gestures corresponding to different feelings'
      ],
      materials: [
        'Visual English Book 1 - Unit 4 (slides 1-15)',
        'Emotion/state flashcards',
        'Mirror for facial expressions practice',
        'Are You Happy Sad Hot Cold video from Video Resources',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Feelings Song Introduction',
          duration: '5 minutes',
          description: 'Play "Are You Happy Sad Hot Cold - WATTS ENGLISH" video. Have students watch and listen the first time, then encourage them to mimic the facial expressions during the second viewing.'
        },
        {
          title: 'Feelings/States Flashcards Introduction',
          duration: '10 minutes',
          description: 'Introduce each feeling/state using flashcards. Hold up a card, demonstrate the expression, say the word clearly, have students repeat and mimic. Practice with: happy, sad, hungry, thirsty, hot, cold.'
        },
        {
          title: 'How Are You? Dialogue Practice',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 5-10, practice the question "How are you?" and various answers like "I am happy/sad/hungry/thirsty/hot/cold". Model the dialogue with a student, then have students practice in pairs.'
        },
        {
          title: 'Feelings Charades',
          duration: '7 minutes',
          description: 'Students take turns coming to the front of the class and acting out a feeling/state without speaking. The class guesses the feeling by asking "Are you (happy/sad/etc.)?" until they guess correctly.'
        },
        {
          title: 'Feelings Survey Activity',
          duration: '10 minutes',
          description: 'Give students a simple survey sheet with faces representing different feelings. Students walk around asking classmates "How are you?" and marking their responses. After gathering 5 responses, students report back: "[Name] is [feeling]."'
        },
        {
          title: 'Review and Feelings Drawing',
          duration: '5 minutes',
          description: 'Review all feelings/states learned. Then give students drawing paper and have them draw a face showing one of the feelings/states and label it "I am [feeling/state]."'
        }
      ]
    },
    // Lesson Plan 2 - More Feelings and Health States (45 minutes)
    {
      id: 'book1-unit4-lesson2',
      title: 'More Feelings and Health States',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Expand vocabulary related to feelings and physical states',
        'Learn to ask and answer about someone else\'s feelings',
        'Introduce health-related vocabulary (sick, tired)',
        'Practice appropriate responses to different states'
      ],
      materials: [
        'Visual English Book 1 - Unit 4 (slides 16-30)',
        'Additional feelings/states flashcards',
        'Are you Thirsty Hungry and Sick video',
        'Paper puppets with different facial expressions',
        'Wordwall game from Game Resources'
      ],
      steps: [
        {
          title: 'Review and Expansion',
          duration: '5 minutes',
          description: 'Quick review of previously learned feelings/states. Introduce new vocabulary: tired, sick, good, great, okay.'
        },
        {
          title: 'Video Activity',
          duration: '7 minutes',
          description: 'Play the "Are you Thirsty Hungry and Sick - WATTS ENGLISH" video. After watching, ask students questions about the characters in the video: "How is the boy?" "Is he hungry?" etc.'
        },
        {
          title: 'Third Person Questions',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 16-20, practice asking about a third person: "How is he/she?" and answering "He/She is [feeling/state]." Use pictures of children showing different emotions.'
        },
        {
          title: 'Face Puppet Activity',
          duration: '10 minutes',
          description: 'Give pairs of students paper puppets with different facial expressions. Students take turns asking "How are you?" and responding according to their puppet\'s expression. Then they switch to asking "How is he/she?" about their partner\'s puppet.'
        },
        {
          title: 'What to Say Role Play',
          duration: '10 minutes',
          description: 'Practice appropriate responses to different states. Example: If someone says "I am hungry," what can you say? ("Here\'s some food" or "Let\'s eat"). Create mini-dialogues for different situations.'
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the "HOW ARE YOU" Wordwall game from Game Resources. Have students come to the board to practice questions and answers about feelings and states.'
        }
      ]
    }
  ];
};

export default generateUnit4LessonPlans;
