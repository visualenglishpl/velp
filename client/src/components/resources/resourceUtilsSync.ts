/**
 * Synchronous version of resource utility functions
 * 
 * These functions provide direct access to resource data without async/await,
 * for components that need synchronous resource access.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { book1Unit1Resources } from '@/data/book1-unit1-resources';
import { book1Unit2Resources } from '@/data/book1-unit2-resources'; 
import { book1Unit3Resources } from '@/data/book1-unit3-resources';

// Collection of resources by book and unit
const resourcesByBookAndUnit: {
  [key: string]: {
    [key: string]: TeacherResource[]
  }
} = {
  '1': {
    '1': book1Unit1Resources,
    '2': book1Unit2Resources,
    '3': book1Unit3Resources,
    // Add more units as they become available
  },
  // Add more books as they become available
};

/**
 * Get teacher resources for a specific book and unit (sync version)
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of teacher resources
 */
export function getTeacherResources(bookId: string, unitId: string): TeacherResource[] {
  // Try to get resources from our static collection
  if (resourcesByBookAndUnit[bookId]?.[unitId]) {
    return resourcesByBookAndUnit[bookId][unitId];
  }
  
  // If no resources found, return empty array
  return [];
}

/**
 * Get video resources for a specific book and unit (sync version)
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of video resources
 */
export function getVideoResources(bookId: string, unitId: string): TeacherResource[] {
  const resources = getTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'video');
}

/**
 * Get Wordwall games for a specific book and unit (sync version)
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of game resources
 */
export function getWordwallGames(bookId: string, unitId: string): TeacherResource[] {
  const resources = getTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'game');
}

/**
 * Get PDF resources for a specific book and unit (sync version)
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of PDF resources
 */
export function getPdfResources(bookId: string, unitId: string): TeacherResource[] {
  const resources = getTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'pdf');
}

/**
 * Get lesson plans for a specific book and unit (sync version)
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(bookId: string, unitId: string): TeacherResource[] {
  const resources = getTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'lesson');
}

/**
 * Check if a resource is a YouTube video
 * @param resource The resource to check
 * @returns True if the resource is a YouTube video
 */
export function isYouTubeVideo(resource: TeacherResource): boolean {
  return resource.resourceType === 'video' && !!resource.youtubeVideoId;
}

/**
 * Check if a resource is a Wordwall game
 * @param resource The resource to check
 * @returns True if the resource is a Wordwall game
 */
export function isWordwallGame(resource: TeacherResource): boolean {
  return resource.resourceType === 'game' && !!resource.wordwallGameId;
}

/**
 * Extract YouTube video ID from URL or embed code
 * @param url YouTube URL or embed code
 * @returns YouTube video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
}

/**
 * Extract Wordwall game ID from URL or embed code
 * @param url Wordwall URL or embed code
 * @returns Wordwall game ID or null if not found
 */
export function extractWordwallId(url: string): string | null {
  const regExp = /wordwall\.net\/(?:resource|embed)\/([0-9a-zA-Z]+)/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
}

/**
 * Get YouTube thumbnail URL by video ID
 * @param videoId YouTube video ID
 * @returns YouTube thumbnail URL
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

/**
 * Get Wordwall thumbnail URL by game ID
 * @param wordwallId Wordwall game ID
 * @returns Wordwall thumbnail URL
 */
export function getWordwallThumbnailUrl(wordwallId: string): string {
  return `https://wordwall.net/resource/thumb/${wordwallId}`;
}