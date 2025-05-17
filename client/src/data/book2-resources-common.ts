/**
 * Book 2 Resources - Common Helper Functions
 * 
 * This file contains helper functions for creating Book 2 resources.
 */

import { TeacherResource } from '@/types/TeacherResource';

/**
 * Creates a video resource for Book 2
 */
export function createBook2VideoResource(unitId: string, id: string, title: string, youtubeId: string): TeacherResource {
  return {
    id: `book2-unit${unitId}-video-${id}`,
    type: 'video',
    title,
    book: '2',
    unit: unitId,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    provider: 'YouTube',
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
  };
}

/**
 * Creates a game resource for Book 2
 */
export function createBook2GameResource(unitId: string, id: string, title: string, wordwallId: string): TeacherResource {
  return {
    id: `book2-unit${unitId}-game-${id}`,
    type: 'game',
    title,
    book: '2',
    unit: unitId,
    embedUrl: `https://wordwall.net/embed/${wordwallId}`,
    provider: 'Wordwall',
    sourceUrl: `https://wordwall.net/resource/${wordwallId}`,
  };
}

/**
 * Creates a PDF resource for Book 2
 */
export function createBook2PdfResource(unitId: string, id: string, title: string, pdfUrl: string): TeacherResource {
  return {
    id: `book2-unit${unitId}-pdf-${id}`,
    type: 'pdf',
    title,
    book: '2',
    unit: unitId,
    fileUrl: pdfUrl,
    provider: 'Visual English',
  };
}

/**
 * Creates a lesson plan resource for Book 2
 */
export function createBook2LessonPlanResource(
  unitId: string, 
  id: string, 
  title: string, 
  lessonType: string = 'main',
  objective: string = ''
): TeacherResource {
  return {
    id: `book2-unit${unitId}-lesson-${id}`,
    type: 'lesson',
    title,
    book: '2',
    unit: unitId,
    provider: 'Visual English',
    metadata: {
      lessonType,
      objective,
    }
  };
}