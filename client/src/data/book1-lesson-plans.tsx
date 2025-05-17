/**
 * Book 1 Lesson Plans - Organized by unit
 */
import { TeacherResource, ResourceType, LessonPlan, LessonStep } from '@/types/teacher-resources';

/**
 * Create a lesson plan resource for Book 1
 */
function createBook1LessonPlanResource(
  unit: string, 
  title: string, 
  lessonPlan: LessonPlan
): TeacherResource {
  return {
    id: `book1-unit${unit}-lesson-plan`,
    bookId: '1',
    unitId: unit,
    resourceType: 'lesson' as ResourceType,
    title: title,
    description: `Lesson plan for Book 1, Unit ${unit}: ${lessonPlan.title}`,
    provider: 'Visual English',
    content: {
      type: 'lesson-plan',
    },
    lessonPlan
  };
}

/**
 * Generate base lesson plans for all Book 1 units
 */
export function getBook1LessonPlans(): TeacherResource[] {
  const lessonPlans: TeacherResource[] = [];
  
  // Unit titles for Book 1
  const unitTitles: Record<string, string> = {
    '1': 'Hello',
    '2': 'My School',
    '3': 'Food',
    '4': 'My House',
    '5': 'Pets and Animals',
    '6': 'My Favourite Colour',
    '7': 'Toys',
    '8': 'Numbers',
    '9': 'My Family',
    '10': 'Transport',
    '11': 'Weather',
    '12': 'My Body',
    '13': 'Clothes',
    '14': 'Daily Routine',
    '15': 'Jobs',
    '16': 'Sports',
    '17': 'Hobbies',
    '18': 'Action Verbs'
  };
  
  // Create standard lesson plan for each unit
  for (let i = 1; i <= 18; i++) {
    const unitNum = i.toString();
    const unitTitle = unitTitles[unitNum] || `Unit ${unitNum}`;
    
    // Basic lesson plan structure that will be enhanced for specific units
    const basicLessonPlan: LessonPlan = {
      id: `book1-unit${unitNum}-lesson-plan`,
      title: `${unitTitle} Lesson Plan`,
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        `Learn vocabulary related to ${unitTitle.toLowerCase()}`,
        'Practice speaking and listening skills',
        'Engage in interactive activities'
      ],
      materials: [
        'Visual English Book 1 digital materials',
        'Flashcards',
        'Worksheets'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5-7 minutes',
          description: `Introduction to ${unitTitle.toLowerCase()} vocabulary`,
          instructions: ['Show flashcards and introduce new words', 'Practice pronunciation']
        },
        {
          title: 'Main Activity',
          duration: '20-25 minutes',
          description: 'Interactive practice with new vocabulary',
          instructions: [
            'Go through the Visual English slides',
            'Ask and answer questions using the target language',
            'Practice in pairs/groups'
          ]
        },
        {
          title: 'Game/Activity',
          duration: '10 minutes',
          description: 'Reinforcement through games',
          instructions: ['Play vocabulary games', 'Use online resources']
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review and assessment',
          instructions: ['Review key vocabulary', 'Quick assessment questions']
        }
      ]
    };
    
    // Add the lesson plan resource
    lessonPlans.push(createBook1LessonPlanResource(
      unitNum, 
      `Unit ${unitNum}: ${unitTitle} - Lesson Plan`,
      basicLessonPlan
    ));
  }
  
  return lessonPlans;
}

/**
 * Get all Book 1 lesson plans
 */
export const book1LessonPlans = getBook1LessonPlans();

/**
 * Create a map of unit IDs to lesson plan resources for easier lookup
 */
export const book1LessonPlansByUnit: Record<string, TeacherResource[]> = book1LessonPlans.reduce((acc, resource) => {
  if (resource.unitId) {
    if (!acc[resource.unitId]) {
      acc[resource.unitId] = [];
    }
    acc[resource.unitId].push(resource);
  }
  return acc;
}, {} as Record<string, TeacherResource[]>);