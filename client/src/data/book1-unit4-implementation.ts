/**
 * Visual English Book 1, Unit 4: How Are You?
 * Lesson plans and teaching implementations
 */

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { UnitId } from '@/types/content';

/**
 * Lesson plan for teaching feelings and emotions vocabulary
 */
export const book1Unit4Lesson1: LessonPlan = {
  id: 'b1u4-lesson1',
  title: 'Feelings and Emotions - Teaching Basic Vocabulary',
  objectives: [
    'Identify and name at least 6 common feelings and emotions (happy, sad, angry, scared, tired, hungry)',
    'Respond appropriately to "How are you?" using learned vocabulary',
    'Recognize feelings in different contexts and illustrations'
  ],
  materials: [
    'Visual English Book 1, Unit 4 slides',
    'Emotion flashcards',
    'Emotion face masks/props (optional)',
    'Small mirrors for students to see their facial expressions (optional)'
  ],
  warmUp: {
    title: 'Feelings Face Warm-up',
    description: 'Teacher makes different facial expressions showing emotions, and students try to guess what feeling is being shown. After guessing correctly, students mimic the facial expression themselves.',
    duration: '5-7 minutes',
    resources: [
      'Small mirrors (optional)',
      'Emotion flashcards'
    ]
  },
  mainActivities: [
    {
      title: 'Introducing Basic Feelings',
      description: 'Show slides from Book 1 Unit 4 that introduce the basic feelings vocabulary. For each emotion, model the correct pronunciation, have students repeat, and demonstrate with facial expressions and gestures. Use the illustrations in the book to reinforce meaning.',
      duration: '10 minutes',
      resources: [
        'Book 1 Unit 4 slides 1-10',
        'Video: Are You Happy Sad Hot Cold - WATTS ENGLISH'
      ]
    },
    {
      title: 'How Are You? Dialogue Practice',
      description: 'Teach the basic dialogue structure: "How are you?" "I am [feeling]." Model with a student or puppet, then have students practice in pairs. Have students move around the classroom practicing the dialogue with different classmates.',
      duration: '8-10 minutes',
      resources: [
        'Book 1 Unit 4 slides 11-15',
        'Video: How Are You Today - MAPLE LEAF'
      ]
    },
    {
      title: 'Feelings Charades',
      description: 'Divide students into small groups. One student picks an emotion card and acts it out without speaking. The group tries to guess the feeling by asking "Are you [happy/sad/etc.]?" The student can only reply "Yes, I am" or "No, I\'m not."',
      duration: '10 minutes',
      resources: [
        'Emotion flashcards or word cards'
      ]
    }
  ],
  extension: {
    title: 'Feelings Songs and Games',
    description: 'Use the provided online games and videos to reinforce vocabulary. The Wordwall game "How Are You - How Is The Dog" helps students identify emotions in both people and animals, extending the concept to new contexts.',
    resources: [
      'Video: How Are You Today SKIT - MAPLE LEAF',
      'Game: WORDWALL - HOW ARE YOU - HOW IS THE DOG'
    ]
  },
  assessment: 'During the lesson, observe students\' ability to identify and name emotions correctly. Note if they can respond appropriately to "How are you?" with a complete sentence. At the end of the lesson, show emotion flashcards and have each student identify at least 3 different emotions.',
  homework: 'Ask students to draw a picture of their family members showing different emotions. Under each person, they should write "He/She is [emotion]."'
};

/**
 * Lesson plan for teaching physical states and needs
 */
export const book1Unit4Lesson2: LessonPlan = {
  id: 'b1u4-lesson2',
  title: 'Physical States and Needs - Hungry, Thirsty, Hot, Cold',
  objectives: [
    'Identify and express common physical states (hungry, thirsty, hot, cold, sick)',
    'Ask and answer questions about physical states using learned vocabulary',
    'Connect physical needs with appropriate actions/solutions'
  ],
  materials: [
    'Visual English Book 1, Unit 4 slides',
    'Picture cards showing physical states',
    'Props representing solutions (toy food, water bottle, fan, blanket, medicine bottle)',
    'Weather flashcards (sunny, snowy)'
  ],
  warmUp: {
    title: 'Mime and Guess',
    description: 'Teacher mimes being hungry, thirsty, hot, cold, and sick. Students try to guess what is being demonstrated. Once identified, teach the vocabulary word and have students repeat and mimic the actions.',
    duration: '5 minutes',
    resources: []
  },
  mainActivities: [
    {
      title: 'Introducing Physical States',
      description: 'Show slides from Book 1 Unit 4 that introduce the physical states vocabulary. For each state, model the correct pronunciation, have students repeat, and demonstrate with actions. Use the illustrations in the book and the videos to reinforce meaning.',
      duration: '10-12 minutes',
      resources: [
        'Book 1 Unit 4 slides 16-25',
        'Video: Are you Thirsty Hungry and Sick - WATTS ENGLISH'
      ]
    },
    {
      title: 'Problem and Solution Matching',
      description: 'Display picture cards showing different physical states. Place solution props on a table. Call on students to identify the state ("He is hungry") and then find the matching solution (toy food). Practice the dialogue: "Are you hungry?" "Yes, I am hungry. I need food."',
      duration: '10 minutes',
      resources: [
        'Physical state cards',
        'Solution props',
        'Video: Are You Hungry Kids - SUPER SIMPLE SONGS'
      ]
    },
    {
      title: 'Survey Activity',
      description: 'Give students a simple survey sheet with pictures representing different states. Students walk around asking classmates "Are you [hungry/thirsty/hot/cold]?" and record the answers. Review the results as a class, practicing "Five students are hungry. Three students are thirsty."',
      duration: '12 minutes',
      resources: [
        'Survey worksheets with pictures',
        'Pencils'
      ]
    }
  ],
  extension: {
    title: 'Weather and Feelings Game',
    description: 'Show weather flashcards and ask students to say how they feel in that weather: "It\'s sunny. I\'m hot." or "It\'s snowy. I\'m cold." Play the WORDWALL game to reinforce vocabulary in different contexts.',
    resources: [
      'Weather flashcards',
      'Game: WORDWALL - HOW ARE YOU'
    ]
  },
  assessment: 'During the lesson, observe students\' ability to express physical states correctly. Note if they can connect needs with appropriate solutions. At the end of the lesson, show physical state pictures and have each student identify the state and suggest a solution.',
  homework: 'Students complete a worksheet where they draw what they need when they are hungry, thirsty, hot, cold, and sick.'
};

/**
 * Lesson plan for combining emotions and physical states in conversations
 */
export const book1Unit4Lesson3: LessonPlan = {
  id: 'b1u4-lesson3',
  title: 'Talking About Feelings - Combining Emotions and Physical States',
  objectives: [
    'Combine emotional and physical state vocabulary in simple conversations',
    'Ask and answer questions about feelings in different contexts',
    'Create and perform a simple dialogue using learned vocabulary'
  ],
  materials: [
    'Visual English Book 1, Unit 4 slides',
    'Dialogue cards with simple conversation starters',
    'Puppet or stuffed animal for teacher demonstrations',
    'Situation cards (at school, at home, at restaurant, etc.)'
  ],
  warmUp: {
    title: 'Feeling Ball Pass',
    description: 'Students sit in a circle and pass a ball. When a student receives the ball, the teacher asks "How are you?" and the student must respond with a complete sentence using any feeling or physical state vocabulary learned. Encourage students to use different responses.',
    duration: '5-7 minutes',
    resources: [
      'Soft ball or bean bag'
    ]
  },
  mainActivities: [
    {
      title: 'Review and Combine Vocabulary',
      description: 'Review all the feelings and physical states vocabulary learned so far. Show how to combine them in simple sentences: "I am happy and hungry." or "I am sad and cold." Have students practice these combinations.',
      duration: '8-10 minutes',
      resources: [
        'Book 1 Unit 4 slides 26-35',
        'Video: How Are You Today SKIT - MAPLE LEAF'
      ]
    },
    {
      title: 'Dialogue Building',
      description: 'Model a simple dialogue with a puppet/stuffed animal: \nTeacher: "Hello! How are you?"\nPuppet: "I am sad and hungry."\nTeacher: "Oh no! Here\'s some food."\nPuppet: "Thank you! Now I am happy!"\nHave students create and practice similar dialogues in pairs.',
      duration: '12-15 minutes',
      resources: [
        'Puppet or stuffed animal',
        'Dialogue cards',
        'Props representing food, water, etc.'
      ]
    },
    {
      title: 'Situation Role Plays',
      description: 'Assign different situations to pairs or small groups (at school, at home, at a restaurant, at the doctor). Students create and perform a short dialogue using feelings and physical states vocabulary appropriate to the situation.',
      duration: '15 minutes',
      resources: [
        'Situation cards',
        'Simple props for different settings'
      ]
    }
  ],
  extension: {
    title: 'Digital Review and Games',
    description: 'Use the provided videos and online games for reinforcement and consolidation of vocabulary. The videos provide natural conversation models, while the games allow for interactive practice.',
    resources: [
      'Videos: How Are You Today - MAPLE LEAF and How Are You Today SKIT - MAPLE LEAF',
      'Games: WORDWALL - HOW ARE YOU - HOW IS THE DOG and WORDWALL - HOW ARE YOU'
    ]
  },
  assessment: 'During the role plays, assess students\' ability to use appropriate emotional and physical state vocabulary in context. Note if they can ask and answer questions about feelings correctly. Have each group perform their dialogue for the class for final assessment.',
  homework: 'Students create a comic strip with 4 panels showing a character who changes from one state to another (e.g., from hungry to happy after eating).'
};

// Export all lesson plans
export const book1Unit4LessonPlans: LessonPlan[] = [
  book1Unit4Lesson1,
  book1Unit4Lesson2,
  book1Unit4Lesson3
];

export default book1Unit4LessonPlans;