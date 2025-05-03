import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit14Resources } from './book6-unit14-resources';
import { BOOK6_UNIT_TITLES, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 14 - At The Airport
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit14Content(bookId: string): TeacherResource[] {
  return generateBook6Unit14Resources(bookId);
}

/**
 * Lesson plans for Unit 14 - At The Airport
 */
export function generateUnit14LessonPlans(): LessonPlan[] {
  const unitId = '14';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Create specific lesson plans (two 45-minute plans)
  const lessonPlans: LessonPlan[] = [
    {
      title: "Airport Vocabulary Introduction",
      duration: 45,
      objectives: [
        "Learn and identify 15 airport-related vocabulary terms",
        "Practice speaking using airport scenario dialogues",
        "Develop listening skills with airport announcements"
      ],
      materials: [
        "Visual English Book 6, Unit 14 slides",
        "Airport vocabulary flashcards",
        "Airport scenario worksheets"
      ],
      warmUp: {
        title: "Travel Experience Discussion",
        duration: 5,
        description: "Ask students about their travel experiences. Have they been to an airport before? What do they remember seeing there?"
      },
      mainActivities: [
        {
          title: "Airport Vocabulary Introduction",
          duration: 15,
          description: "Present airport vocabulary with corresponding images: check-in desk, security check, boarding pass, departure gate, arrivals, departures, baggage claim, etc."
        },
        {
          title: "Airport Dialogue Practice",
          duration: 15,
          description: "In pairs, students practice short dialogues that might occur at an airport (checking in, going through security, asking for directions)."
        },
        {
          title: "Listening Exercise: Airport Announcements",
          duration: 5,
          description: "Students listen to sample airport announcements and identify key information (flight numbers, gate changes, boarding calls)."
        }
      ],
      conclusion: {
        title: "Quick Review Game",
        duration: 5,
        description: "Play a quick memory game where students recall airport vocabulary terms."
      },
      assessment: "Monitor students' participation in dialogues and their ability to identify vocabulary terms during activities.",
      homework: "Complete the airport vocabulary worksheet. Prepare a short dialogue that might occur at an airport."
    },
    {
      title: "Airport Travel Situations",
      duration: 45,
      objectives: [
        "Practice using airport vocabulary in context",
        "Develop problem-solving skills for travel situations",
        "Create and perform airport scenario role-plays"
      ],
      materials: [
        "Visual English Book 6, Unit 14 slides",
        "Role-play scenario cards",
        "Airport map handouts"
      ],
      warmUp: {
        title: "Airport Vocabulary Review",
        duration: 5,
        description: "Quick review of airport vocabulary from previous lesson using flashcards or images."
      },
      mainActivities: [
        {
          title: "Airport Map Navigation",
          duration: 10,
          description: "Using airport map handouts, students practice giving and following directions to different locations within an airport."
        },
        {
          title: "Problem-Solving Scenarios",
          duration: 15,
          description: "Present common airport problems (delayed flight, lost luggage, missed connection) and have students discuss solutions in small groups."
        },
        {
          title: "Airport Role-Play Preparation and Performance",
          duration: 15,
          description: "In pairs or small groups, students prepare and perform short role-plays based on airport scenarios (check-in, security, boarding, etc.)."
        }
      ],
      conclusion: {
        title: "Class Discussion",
        duration: 5,
        description: "Discuss cultural differences in airports around the world and share any personal travel experiences."
      },
      assessment: "Evaluate students' use of vocabulary and appropriate language during role-plays and problem-solving activities.",
      homework: "Write a short paragraph describing a journey through an airport from arrival to boarding the plane."
    }
  ];
  
  return lessonPlans;
}
