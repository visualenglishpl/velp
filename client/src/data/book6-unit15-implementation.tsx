import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit15Resources } from './book6-unit15-resources';
import { BOOK6_UNIT_TITLES } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 15 - Are You A Survivor?
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit15Content(bookId: string): TeacherResource[] {
  return generateBook6Unit15Resources(bookId);
}

/**
 * Lesson plans for Unit 15 - Are You A Survivor?
 */
export function generateUnit15LessonPlans(): LessonPlan[] {
  const unitId = '15';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Create specific lesson plans (two 45-minute plans)
  const lessonPlans: LessonPlan[] = [
    {
      id: 'book6-unit15-lesson1',
      title: "Survival Vocabulary and Skills",
      duration: "45",
      level: "Intermediate",
      objectives: [
        "Learn and identify key survival vocabulary",
        "Understand basic survival skills and their importance",
        "Develop critical thinking in survival scenarios"
      ],
      materials: [
        "Visual English Book 6, Unit 15 slides",
        "Survival vocabulary flashcards",
        "Survival scenario worksheets"
      ],
      steps: [
        {
          title: "Survival Knowledge Check",
          duration: "5",
          description: "Quick discussion: What would you take to a deserted island? What are the most important things for survival?"
        },
        {
          title: "Survival Vocabulary Introduction",
          duration: "15",
          description: "Present survival vocabulary with corresponding images: shelter, water source, first aid, navigation, emergency signal, etc."
        },
        {
          title: "Survival Priorities",
          duration: "15",
          description: "In small groups, students rank survival priorities in different scenarios (desert, forest, mountains) and justify their choices."
        },
        {
          title: "Survival Tool Identification",
          duration: "5",
          description: "Show images of survival tools and equipment; students identify them and explain their uses."
        },
        {
          title: "Survival Quiz",
          duration: "5",
          description: "Quick quiz on the survival vocabulary and concepts covered in the lesson."
        }
      ],
      assessmentTips: "Evaluate students' vocabulary use and reasoning in the prioritization activity.",
      homeworkIdeas: [
        "Research a real survival story and write 5-8 sentences about what skills helped the person survive."
      ]
    },
    {
      id: 'book6-unit15-lesson2',
      title: "Survival Scenarios and Problem Solving",
      duration: "45",
      level: "Intermediate",
      objectives: [
        "Apply survival vocabulary in context",
        "Develop problem-solving skills for emergency situations",
        "Practice giving instructions for survival techniques"
      ],
      materials: [
        "Visual English Book 6, Unit 15 slides",
        "Survival scenario cards",
        "Basic survival equipment examples (if available)"
      ],
      steps: [
        {
          title: "Vocabulary Review Game",
          duration: "5",
          description: "Quick review of survival vocabulary from previous lesson using a word association game."
        },
        {
          title: "Survival Instructions",
          duration: "10",
          description: "Students practice giving clear instructions for basic survival skills (making a shelter, finding water, signaling for help)."
        },
        {
          title: "Survival Scenario Challenge",
          duration: "20",
          description: "In groups, students are given a specific survival scenario and must create a plan for the first 24 hours, explaining their decisions and priorities."
        },
        {
          title: "Rescue Communication",
          duration: "5",
          description: "Practice using phrases to communicate with potential rescuers (describing location, explaining injuries, requesting assistance)."
        },
        {
          title: "Group Reflection",
          duration: "5",
          description: "Class discussion about what they learned and how these skills might apply in everyday emergency situations."
        }
      ],
      assessmentTips: "Evaluate students' use of vocabulary and problem-solving skills during the scenario challenge.",
      homeworkIdeas: [
        "Design a simple survival kit for a specific environment (forest, desert, mountain) and explain the purpose of each item."
      ]
    }
  ];
  
  return lessonPlans;
}