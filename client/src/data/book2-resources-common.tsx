import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

/**
 * This file contains common resources and helper functions for Book 2 that will be shared
 * across multiple units. It provides functions to generate standardized resources
 * for any unit in Book 2.
 */

// Unit titles for reference in lesson plans and resources
export const BOOK2_TITLE = 'VISUAL 2';
export const BOOK2_UNIT_TITLES: Record<string, string> = {
  '1': 'DAYS OF THE WEEK',
  '2': 'IN THE CLASSROOM',
  '3': 'SEASONS',
  '4': 'WEATHER',
  '5': 'WHAT DO YOU WANT TO EAT?',
  '6': 'TOYS AND GAMES',
  '7': 'CLOTHES',
  '8': "LET'S GO SHOPPING",
  '9': 'BODY PARTS',
  '10': 'MONTHS AND SEASONS',
  '11': 'THINGS IN THE HOUSE',
  '12': 'AT THE DOCTORS',
  '13': 'WHAT ARE YOU DOING',
  '14': 'JOBS',
  '15': 'AT THE FARM',
  '16': 'TRANSPORT',
  '17': 'WHERE ARE YOU FROM?',
  '18': 'IN THE GARDEN'
};

/**
 * Helper function to create a Book 2 video resource with consistent formatting
 * @param unitNumber The unit number (1-18)
 * @param index The index of the video within the unit
 * @param title The title of the video
 * @param youtubeId The YouTube video ID
 * @param description Optional description of the video
 * @returns A formatted TeacherResource object
 */
export function createBook2VideoResource(
  unitNumber: string,
  index: number,
  title: string,
  youtubeId: string,
  description?: string
): TeacherResource {
  return {
    id: `book2-unit${unitNumber}-video${index}`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${BOOK2_UNIT_TITLES[unitNumber]} - ${title}`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: `https://www.youtube.com/embed/${youtubeId}`,
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description
  };
}

/**
 * Helper function to create a Book 2 Wordwall game resource with consistent formatting
 * @param unitNumber The unit number (1-18)
 * @param index The index of the game within the unit
 * @param title The title of the game
 * @param wordwallId The Wordwall resource ID
 * @param description Optional description of the game
 * @returns A formatted TeacherResource object
 */
export function createBook2GameResource(
  unitNumber: string,
  index: number,
  title: string,
  wordwallId: string,
  themeId: string = '1',
  templateId: string = '3',
  description?: string
): TeacherResource {
  const wordwallUrl = `https://wordwall.net/embed/${wordwallId}?themeId=${themeId}&templateId=${templateId}&fontStackId=0`;
  return {
    id: `book2-unit${unitNumber}-game${index}`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${BOOK2_UNIT_TITLES[unitNumber]} - ${title}`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: `https://wordwall.net/resource/${wordwallId}`,
    embedCode: `<iframe style="max-width:100%" src="${wordwallUrl}" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description
  };
}

/**
 * Generates default resources for any Book 2 unit
 * @param unitId The unit number (1-18)
 * @returns An array of TeacherResource objects
 */
export function generateBook2UnitResources(unitId: string): TeacherResource[] {
  const unitTitle = BOOK2_UNIT_TITLES[unitId] || `Unit ${unitId}`;

  return [
    {
      id: `book2-unit${unitId}-default-video`,
      bookId: '2',
      unitId,
      title: `${BOOK2_TITLE} - UNIT ${unitId} - ${unitTitle} - Video Resource`,
      resourceType: 'video',
      provider: 'YouTube',
      sourceUrl: 'https://www.youtube.com/embed/placeholder',
      embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
      id: `book2-unit${unitId}-default-game`,
      bookId: '2',
      unitId,
      title: `${BOOK2_TITLE} - UNIT ${unitId} - ${unitTitle} - Interactive Game`,
      resourceType: 'game',
      provider: 'Wordwall',
      sourceUrl: 'https://wordwall.net/resource/placeholder',
      embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
    }
  ];
}

/**
 * Generates default lesson plans for any Book 2 unit
 * @param unitNumber The unit number (1-18)
 * @returns An array of LessonPlan objects
 */
export function generateDefaultBook2UnitLessonPlans(unitId: string): LessonPlan[] {
  const unitTitle = BOOK2_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  // This is a placeholder function - each unit should implement its own lesson plans
  // Alternatively, if we have common lesson plan templates, they can be defined here
  return [];
}