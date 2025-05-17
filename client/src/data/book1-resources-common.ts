/**
 * Common helper functions for Book 1 resources
 */

import { TeacherResource, ResourceType } from '@/types/TeacherResource';
import { BookId, UnitId } from '@/types/content';

/**
 * Creates a video resource for Book 1
 * 
 * @param unitId The unit ID
 * @param id The resource ID (suffix)
 * @param title The resource title
 * @param description The resource description
 * @param youtubeUrl The YouTube URL
 * @param embedCode The embed code (iframe)
 * @returns A TeacherResource object
 */
export function createBook1VideoResource(
  unitId: UnitId,
  id: string,
  title: string,
  description: string,
  youtubeUrl: string,
  embedCode?: string
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description,
    resourceType: 'video' as ResourceType,
    bookId: '1' as BookId,
    unitId,
    provider: 'YouTube',
    sourceUrl: youtubeUrl,
    embedCode,
    isYoutubeVideo: true
  };
}

/**
 * Creates a game resource for Book 1
 * 
 * @param unitId The unit ID
 * @param id The resource ID (suffix)
 * @param title The resource title
 * @param description The resource description
 * @param wordwallUrl The Wordwall URL
 * @param embedCode The embed code (iframe)
 * @returns A TeacherResource object
 */
export function createBook1GameResource(
  unitId: UnitId,
  id: string,
  title: string,
  description: string,
  wordwallUrl: string,
  embedCode?: string
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description,
    resourceType: 'game' as ResourceType,
    bookId: '1' as BookId,
    unitId,
    provider: 'Wordwall',
    sourceUrl: wordwallUrl,
    embedCode,
    isWordwallGame: true
  };
}

/**
 * Creates a PDF resource for Book 1
 * 
 * @param unitId The unit ID
 * @param id The resource ID (suffix)
 * @param title The resource title
 * @param description The resource description
 * @param pdfUrl The PDF URL
 * @returns A TeacherResource object
 */
export function createBook1PdfResource(
  unitId: UnitId,
  id: string,
  title: string,
  description: string,
  pdfUrl: string
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description,
    resourceType: 'pdf' as ResourceType,
    bookId: '1' as BookId,
    unitId,
    provider: 'Visual English',
    sourceUrl: pdfUrl,
    pdfUrl
  };
}