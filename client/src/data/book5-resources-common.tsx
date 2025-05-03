import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Unit titles for Book 5
export const BOOK5_UNIT_TITLES: Record<string, string> = {
  '1': 'Schools in the UK and USA',
  '2': 'Household Chores',
  '3': 'Are You a Gamer?',
  '4': 'Was/Were - Places in the Town',
  '5': 'Winter Fun',
  '6': 'Nationalities',
  '7': 'Get Well Soon',
  '8': 'Regular Verbs Past Tense',
  '9': 'Emotions',
  '10': 'At the Supermarket',
  '11': 'Prepositions of Movement',
  '12': 'Transport',
  '13': 'Irregular Verbs - Past Tense',
  '14': 'Movie Time',
  '15': 'Let\'s Go Sightseeing',
  '16': 'Sounds of Music'
};

/**
 * Generator for a default set of resources for any Book 5 unit
 * @param bookId The book ID (should be '5')
 * @param unitId The unit ID (1-16)
 * @returns An array of TeacherResource objects
 */
export function generateBook5UnitResources(bookId: string, unitId: string): TeacherResource[] {
  // This is a fallback function that will be used if there is no specific implementation
  // for a given unit
  return [];
}

/**
 * Generator for a default set of lesson plans for any Book 5 unit
 * @param unitId The unit ID (1-16)
 * @returns An array of LessonPlan objects
 */
export function generateDefaultBook5UnitLessonPlans(unitId: string): LessonPlan[] {
  const unitTitle = BOOK5_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  return [
    {
      id: `book5-unit${unitId}-lesson1`,
      title: `Introduction to ${unitTitle}`,
      duration: "45",
      level: "Elementary",
      objectives: [
        "Learn and identify key vocabulary related to the unit theme",
        "Practice basic communication skills using the new vocabulary",
        "Develop confidence in using English in context"
      ],
      materials: [
        `Visual English Book 5, Unit ${unitId} slides`,
        "Theme-related flashcards",
        "Worksheets for practice"
      ],
      steps: [
        {
          title: "Warm-up activity",
          duration: "5",
          description: "Brief discussion to introduce the theme and activate prior knowledge."
        },
        {
          title: "Vocabulary introduction",
          duration: "15",
          description: "Present new vocabulary with visual aids and example sentences."
        },
        {
          title: "Practice activity",
          duration: "15",
          description: "Students practice using the new vocabulary in pairs or small groups."
        },
        {
          title: "Checking understanding",
          duration: "10",
          description: "Brief assessment of vocabulary comprehension through interactive activities."
        }
      ],
      assessmentTips: "Monitor students' participation and correct usage of vocabulary during activities.",
      homeworkIdeas: [
        "Complete a follow-up worksheet with the new vocabulary.",
        "Prepare a short dialogue using the new words and phrases."
      ]
    },
    {
      id: `book5-unit${unitId}-lesson2`,
      title: `Developing ${unitTitle} Skills`,
      duration: "45",
      level: "Elementary",
      objectives: [
        "Reinforce vocabulary from previous lesson",
        "Introduce additional theme-related expressions",
        "Practice using the vocabulary in context"
      ],
      materials: [
        `Visual English Book 5, Unit ${unitId} slides`,
        "Role-play scenario cards",
        "Additional worksheets"
      ],
      steps: [
        {
          title: "Vocabulary review",
          duration: "5",
          description: "Quick review of vocabulary from previous lesson."
        },
        {
          title: "Extended vocabulary",
          duration: "10",
          description: "Introduction of additional theme-related words and expressions."
        },
        {
          title: "Contextual practice",
          duration: "20",
          description: "Students engage in role-plays or themed activities using the vocabulary in context."
        },
        {
          title: "Wrap-up activity",
          duration: "10",
          description: "Consolidation activity to reinforce learning and check understanding."
        }
      ],
      assessmentTips: "Evaluate students' ability to use vocabulary correctly in contextual situations.",
      homeworkIdeas: [
        "Create a themed project using the vocabulary learned.",
        "Complete a reading comprehension exercise related to the theme."
      ]
    }
  ];
}