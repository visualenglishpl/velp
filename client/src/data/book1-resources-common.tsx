import { TeacherResource } from '@/types/TeacherResource';
import { LessonPlan } from '@/components/LessonPlanTemplate';

/**
 * This file contains common resources and helper functions for Book 1 that will be shared
 * across multiple units. It provides functions to generate standardized resources
 * for any unit in Book 1.
 */

// Unit titles for reference in lesson plans and resources
export const BOOK1_UNIT_TITLES: Record<string, string> = {
  '1': 'Hello and Goodbye',
  '2': 'School Objects',
  '3': 'Colors',
  '4': 'Shapes',
  '5': 'School Supplies',
  '6': 'My Favourite Colour',
  '7': 'Fruit', 
  '8': 'Vegetables',
  '9': 'Food', 
  '10': 'Numbers 1-10',
  '11': 'Numbers 11-20',
  '12': 'Body Parts',
  '13': 'Face Parts',
  '14': 'My Family',
  '15': 'Rooms of the House',
  '16': 'Furniture',
  '17': 'Animals',
  '18': 'Pets'
};

/**
 * Helper function to create a Book 1 video resource with consistent formatting
 * @param unitNumber The unit number (1-18)
 * @param index The index of the video within the unit
 * @param title The title of the video
 * @param youtubeId The YouTube video ID
 * @param description Optional description of the video
 * @returns A formatted TeacherResource object
 */
export function createBook1VideoResource(
  unitNumber: number,
  index: number,
  title: string,
  youtubeId: string,
  description?: string
): TeacherResource {
  return {
    id: `book1-unit${unitNumber}-video${index}`,
    bookId: '1',
    unitId: unitNumber.toString(),
    title,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: `https://www.youtube.com/embed/${youtubeId}`,
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description
  };
}

/**
 * Helper function to create a Book 1 Wordwall game resource with consistent formatting
 * @param unitNumber The unit number (1-18)
 * @param index The index of the game within the unit
 * @param title The title of the game
 * @param wordwallUrl The Wordwall embed URL
 * @param description Optional description of the game
 * @returns A formatted TeacherResource object
 */
export function createBook1GameResource(
  unitNumber: number,
  index: number,
  title: string,
  wordwallUrl: string,
  description?: string
): TeacherResource {
  return {
    id: `book1-unit${unitNumber}-game${index}`,
    bookId: '1',
    unitId: unitNumber.toString(),
    title,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: wordwallUrl,
    embedCode: `<iframe style="max-width:100%" src="${wordwallUrl}" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description
  };
}

/**
 * Generates default resources for any Book 1 unit
 * @param unitNumber The unit number (1-18)
 * @returns An array of TeacherResource objects
 */
export function generateBook1UnitResources(unitNumber: number): TeacherResource[] {
  // This is a placeholder function - each unit should implement its own resources
  // Alternatively, if we have common resources, they can be defined here
  return [];
}

/**
 * Generates default lesson plans for any Book 1 unit
 * @param unitNumber The unit number (1-18)
 * @returns An array of LessonPlan objects
 */
export function generateDefaultBook1UnitLessonPlans(unitNumber: number): LessonPlan[] {
  const unitTitle = BOOK1_UNIT_TITLES[unitNumber.toString()] || `Unit ${unitNumber}`;
  
  // This is a placeholder function - each unit should implement its own lesson plans
  // Alternatively, if we have common lesson plan templates, they can be defined here
  return [];
}