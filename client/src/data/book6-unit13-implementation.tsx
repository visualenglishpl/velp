import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit13Resources } from './book6-unit13-resources';
import { BOOK6_UNIT_TITLES } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 13 - City Life
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit13Content(bookId: string): TeacherResource[] {
  return generateBook6Unit13Resources(bookId);
}

/**
 * Lesson plans for Unit 13 - City Life
 */
export function generateUnit13LessonPlans(): LessonPlan[] {
  const unitId = '13';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Create specific lesson plans (two 45-minute plans)
  const lessonPlans: LessonPlan[] = [
    {
      id: 'book6-unit13-lesson1',
      title: "City Vocabulary and Features",
      duration: "45",
      level: "Intermediate",
      objectives: [
        "Learn and identify key urban vocabulary",
        "Compare different city features and structures",
        "Discuss city life advantages and challenges"
      ],
      materials: [
        "Visual English Book 6, Unit 13 slides",
        "City map handouts",
        "Urban features flashcards"
      ],
      steps: [
        {
          title: "City Life Discussion",
          duration: "5",
          description: "Ask students about their experiences with cities. What cities have they visited or lived in? What do they like/dislike about cities?"
        },
        {
          title: "Urban Vocabulary Introduction",
          duration: "15",
          description: "Present urban vocabulary with corresponding images: skyscraper, subway, pedestrian, traffic, downtown, suburbs, etc."
        },
        {
          title: "City Features Comparison",
          duration: "15",
          description: "Using images of different cities, students identify and compare urban features and structures in small groups."
        },
        {
          title: "City Life Pros and Cons",
          duration: "10",
          description: "Class discussion about the advantages and challenges of living in a city versus rural areas."
        }
      ],
      assessmentTips: "Evaluate students' use of vocabulary and their ability to express opinions about urban living.",
      homeworkIdeas: [
        "Write a short paragraph describing your ideal city and what features it would have.",
        "Research an interesting city and prepare 3-5 facts to share with the class."
      ]
    },
    {
      id: 'book6-unit13-lesson2',
      title: "City Navigation and Communication",
      duration: "45",
      level: "Intermediate",
      objectives: [
        "Practice giving and following directions in a city",
        "Learn phrases for public transportation",
        "Develop city navigation skills"
      ],
      materials: [
        "Visual English Book 6, Unit 13 slides",
        "City map worksheets",
        "Direction phrase cards"
      ],
      steps: [
        {
          title: "Vocabulary Review",
          duration: "5",
          description: "Quick review of city vocabulary from previous lesson using flashcards or images."
        },
        {
          title: "Direction Phrases Practice",
          duration: "10",
          description: "Introduce and practice phrases for giving directions: 'Turn left/right at', 'Go straight for two blocks', 'It's across from', etc."
        },
        {
          title: "Map Navigation Activity",
          duration: "15",
          description: "In pairs, students take turns giving directions to specific locations on a city map while their partner follows the directions."
        },
        {
          title: "Public Transportation Role-Play",
          duration: "10",
          description: "Students practice conversations related to using public transportation (buying tickets, asking for the right stop, etc.)."
        },
        {
          title: "Wrap-Up Quiz",
          duration: "5",
          description: "Quick assessment of direction phrases and city navigation vocabulary."
        }
      ],
      assessmentTips: "Observe students' accuracy in giving directions and their use of transportation vocabulary during role-plays.",
      homeworkIdeas: [
        "Draw a simple map of your neighborhood or city center and write directions from one point to another.",
        "Create a dialogue that might occur when asking for directions in a city."
      ]
    }
  ];
  
  return lessonPlans;
}