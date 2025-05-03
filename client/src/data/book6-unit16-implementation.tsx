import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit16Resources } from './book6-unit16-resources';
import { BOOK6_UNIT_TITLES } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 16 - Fashion Accessories
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit16Content(bookId: string): TeacherResource[] {
  // Get unit-specific resources with the extra game
  return generateBook6Unit16Resources(bookId);
}

/**
 * Lesson plans for Unit 16 - Fashion Accessories
 */
export function generateUnit16LessonPlans(): LessonPlan[] {
  const unitId = '16';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Create specific lesson plans (two 45-minute plans)
  const lessonPlans: LessonPlan[] = [
    {
      id: 'book6-unit16-lesson1',
      title: "Fashion Accessories Vocabulary",
      duration: "45",
      level: "Intermediate",
      objectives: [
        "Learn and identify various fashion accessories",
        "Practice describing accessories using adjectives",
        "Develop vocabulary related to materials and styles"
      ],
      materials: [
        "Visual English Book 6, Unit 16 slides",
        "Fashion accessories flashcards",
        "Fashion magazines (optional)"
      ],
      steps: [
        {
          title: "Fashion Discussion",
          duration: "5",
          description: "Ask students about their favorite accessories. What do they wear regularly? What are popular accessories in their culture?"
        },
        {
          title: "Accessories Vocabulary Introduction",
          duration: "15",
          description: "Present fashion accessories vocabulary with images: necklace, bracelet, earrings, watch, scarf, tie, belt, hat, sunglasses, etc."
        },
        {
          title: "Materials and Descriptions",
          duration: "10",
          description: "Introduce adjectives to describe accessories (leather, silver, gold, stylish, elegant, casual) and materials they are made from."
        },
        {
          title: "Describing Game",
          duration: "10",
          description: "Students take turns describing an accessory without naming it while others guess what it is."
        },
        {
          title: "Quick Review Quiz",
          duration: "5",
          description: "Brief assessment of the vocabulary learned through a matching or fill-in-the-blank exercise."
        }
      ],
      assessmentTips: "Monitor students' use of vocabulary during the describing game and their accuracy in the review quiz.",
      homeworkIdeas: [
        "Cut out pictures of accessories from magazines or print them and label them with the correct vocabulary.",
        "Write 5-8 sentences describing your favorite accessories using the new vocabulary."
      ]
    },
    {
      id: 'book6-unit16-lesson2',
      title: "Shopping for Accessories",
      duration: "45",
      level: "Intermediate",
      objectives: [
        "Practice shopping dialogues related to accessories",
        "Learn phrases for expressing preferences and making choices",
        "Develop role-play skills in shopping scenarios"
      ],
      materials: [
        "Visual English Book 6, Unit 16 slides",
        "Price tags and labels",
        "Play money (optional)",
        "Accessory images or props"
      ],
      steps: [
        {
          title: "Vocabulary Review",
          duration: "5",
          description: "Quick review of accessories vocabulary from the previous lesson."
        },
        {
          title: "Shopping Phrases Introduction",
          duration: "10",
          description: "Teach phrases for shopping: 'How much is this...?', 'Do you have it in another color?', 'I'd like to try on...', 'I'll take it.'"
        },
        {
          title: "Shopping Dialogue Practice",
          duration: "10",
          description: "In pairs, students practice model dialogues for shopping for different accessories."
        },
        {
          title: "Accessory Shop Role-Play",
          duration: "15",
          description: "Set up a mock accessory shop where students take turns being salespeople and customers, using the vocabulary and phrases learned."
        },
        {
          title: "Class Discussion",
          duration: "5",
          description: "Discuss shopping habits, preferences for accessories, and cultural differences in accessory use."
        }
      ],
      assessmentTips: "Evaluate students' use of shopping phrases and accessory vocabulary during the role-play activity.",
      homeworkIdeas: [
        "Write a dialogue between a customer and salesperson in an accessory shop.",
        "Design an advertisement for a new fashion accessory, including a description and price."
      ]
    }
  ];
  
  return lessonPlans;
}