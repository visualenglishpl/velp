/**
 * Visual English Book 1, Unit 5: My Family
 * Implementation guidance for teachers
 */

import { LessonPlan, LessonActivity } from '@/components/LessonPlanTemplate';
import { UnitId } from '@/types/content';

// Warm-up activities
const warmupActivities: LessonActivity[] = [
  {
    title: 'Family Members Flash Cards',
    description: 'Show flash cards with family members (father, mother, brother, sister, grandfather, grandmother), and have students repeat the names.',
    duration: 5,
    materials: 'Flash cards with family member images'
  },
  {
    title: 'Finger Family Song',
    description: 'Play the Finger Family song and have students point to their fingers as they represent different family members.',
    duration: 5,
    materials: 'Finger Family Song video'
  }
];

// Main activities
const mainActivities: LessonActivity[] = [
  {
    title: 'Family Member Identification',
    description: 'Show pictures of family members and ask "Who is he/she?" Students respond with "He/She is a father/mother/etc."',
    duration: 10,
    materials: 'Visual English images from Unit 5'
  },
  {
    title: 'Yes/No Questions Practice',
    description: 'Ask yes/no questions about family members: "Is he a dad or a mum?", "Is mum a man or a woman?", etc. Students practice responding.',
    duration: 10,
    materials: 'Visual English images from Unit 5'
  },
  {
    title: 'Family Tree Activity',
    description: 'Draw a simple family tree on the board and label family members. Have students repeat and practice the vocabulary.',
    duration: 10,
    materials: 'Whiteboard, markers'
  }
];

// Closing activities
const closingActivities: LessonActivity[] = [
  {
    title: 'My Family Drawing',
    description: 'Students draw their own family and present using simple sentences: "This is my mother", "This is my father", etc.',
    duration: 10,
    materials: 'Paper, colored pencils'
  },
  {
    title: 'Family Members Matching Game',
    description: 'Use the Wordwall game to match family member images with their names as a fun review activity.',
    duration: 5,
    materials: 'Digital device with Wordwall game access'
  }
];

// Homework assignment
const homeworkAssignment = {
  title: 'My Family Photo',
  description: 'Students bring a family photo and prepare to tell the class about their family members using the vocabulary learned in class.'
};

// Assessment guidelines
const assessmentGuidelines = {
  formative: 'Observe students\' ability to correctly identify and name family members during class activities.',
  summative: 'Give a short quiz where students match family member names to pictures and fill in simple sentences about family relationships.'
};

// Additional resources
const additionalResources = [
  {
    title: 'Baby Shark Song',
    description: 'Use the Baby Shark song to reinforce family vocabulary (baby, mommy, daddy, grandma, grandpa) in a fun way.',
    link: 'https://www.youtube.com/watch?v=XqZsoesa55w'
  },
  {
    title: 'Family Tree Worksheet',
    description: 'Printable worksheet where students can fill in their own family tree.',
    link: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit5/11+A+Draw+Your+Family+–+New.png'
  }
];

// Complete lesson plan for Book 1, Unit 5
export const book1Unit5Implementation: LessonPlan = {
  id: 'b1u5-implementation',
  title: 'My Family - Lesson Plan',
  bookId: '1',
  unitId: '5' as UnitId,
  objectives: [
    'Identify and name family members in English',
    'Ask and answer simple questions about family members',
    'Describe family relationships using simple sentences',
    'Use possessive adjectives (my, your) with family vocabulary'
  ],
  warmupActivities,
  mainActivities,
  closingActivities,
  differentiation: {
    lowerLevel: 'Focus on immediate family members only (mother, father, brother, sister). Use more visual supports and gestures.',
    higherLevel: 'Include extended family (uncle, aunt, cousin) and have students create more complex sentences about their family members.'
  },
  homeworkAssignment,
  assessmentGuidelines,
  additionalResources,
  notes: 'For younger learners, emphasize the vocabulary through songs and games. For older students, focus more on constructing sentences about family relationships.',
  duration: 45
};

// Phonics-focused lesson plan
export const book1Unit5PhonicsLesson: LessonPlan = {
  id: 'b1u5-phonics',
  title: 'Family Words Phonics Focus',
  bookId: '1',
  unitId: '5' as UnitId,
  objectives: [
    'Recognize and pronounce the beginning sounds in family member words',
    'Practice letter-sound correspondence for f, m, b, s, g',
    'Read simple words related to family members'
  ],
  warmupActivities: [
    {
      title: 'Sound Warm-up',
      description: 'Practice the sounds f, m, b, s, g with actions. For example, f - pretend to blow out a candle, m - rub tummy saying "mmm".',
      duration: 5,
      materials: 'None'
    }
  ],
  mainActivities: [
    {
      title: 'Family Word Sound Sorting',
      description: 'Sort family words by their beginning sounds: father (f), mother (m), brother (b), sister (s), grandmother/grandfather (g).',
      duration: 10,
      materials: 'Word cards with family members'
    },
    {
      title: 'Letter Formation',
      description: 'Practice writing the letters f, m, b, s, g and connect them to family words.',
      duration: 10,
      materials: 'Worksheets, pencils'
    },
    {
      title: 'Sound Hunt',
      description: 'Find objects in the classroom that start with the same sounds as family words.',
      duration: 10,
      materials: 'Classroom objects'
    }
  ],
  closingActivities: [
    {
      title: 'Family Word Bingo',
      description: 'Play bingo with family words, focusing on initial sounds.',
      duration: 10,
      materials: 'Bingo cards with family words'
    }
  ],
  differentiation: {
    lowerLevel: 'Focus only on the most distinct sounds (f and m) and provide more visual support.',
    higherLevel: 'Include more complex family words like "cousin" and "uncle" and their sounds.'
  },
  homeworkAssignment: {
    title: 'Sound Collection',
    description: 'Find three objects at home that start with the same sound as "family".'
  },
  assessmentGuidelines: {
    formative: 'Observe students\' ability to identify beginning sounds in family words during activities.',
    summative: 'Short assessment where students match letters to family words based on beginning sounds.'
  },
  additionalResources: [
    {
      title: 'Phonics Songs',
      description: 'Songs that emphasize the f, m, b, s, g sounds.',
      link: 'https://www.youtube.com/watch?v=BELlZKpi1Zs'
    }
  ],
  notes: 'Emphasize the connection between the sounds and the family vocabulary to reinforce both areas.',
  duration: 30
};

// Conversation practice lesson plan
export const book1Unit5ConversationLesson: LessonPlan = {
  id: 'b1u5-conversation',
  title: 'Family Conversation Practice',
  bookId: '1',
  unitId: '5' as UnitId,
  objectives: [
    'Ask and answer questions about family members',
    'Use "Who is he/she?" and "Is he/she...?" question patterns',
    'Respond to questions with complete sentences',
    'Practice family-related dialogues'
  ],
  warmupActivities: [
    {
      title: 'Question Chain',
      description: 'Students pass questions around the circle: "Who is he?" "He is a father." "Who is she?" "She is a mother."',
      duration: 5,
      materials: 'Family member pictures'
    }
  ],
  mainActivities: [
    {
      title: 'Interview a Friend',
      description: 'In pairs, students ask and answer questions about their families using the target patterns.',
      duration: 10,
      materials: 'Question prompt cards'
    },
    {
      title: 'Family Photo Role Play',
      description: 'Using a family photo (real or pretend), one student presents their family while others ask questions.',
      duration: 15,
      materials: 'Family photos or picture cards'
    }
  ],
  closingActivities: [
    {
      title: 'Family Guessing Game',
      description: 'One student describes a family member without naming them, and others guess who it is.',
      duration: 5,
      materials: 'None'
    }
  ],
  differentiation: {
    lowerLevel: 'Provide more structured question prompts and accept shorter answers.',
    higherLevel: 'Encourage students to add details about family members (e.g., "He is my father. He is tall.").'
  },
  homeworkAssignment: {
    title: 'Family Interview',
    description: 'Interview a family member at home using the question patterns practiced in class.'
  },
  assessmentGuidelines: {
    formative: 'Monitor students\' use of question patterns and appropriate responses during pair work.',
    summative: 'Short role-play assessment where students demonstrate a family conversation.'
  },
  additionalResources: [
    {
      title: 'Dialogue Cards',
      description: 'Printable cards with family-related dialogues for additional practice.',
      link: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit5/12+A+Find+the+Answer+–+New.png'
    }
  ],
  notes: 'Focus on natural intonation and appropriate responses to questions. For younger learners, keep dialogues very simple.',
  duration: 35
};

// Export implementations
export const book1Unit5Implementations = [
  book1Unit5Implementation,
  book1Unit5PhonicsLesson,
  book1Unit5ConversationLesson
];

export const getBook1Unit5Implementations = () => book1Unit5Implementations;

export default book1Unit5Implementations;