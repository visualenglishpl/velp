import { TeacherResource } from '@/types/TeacherResource';
import { book1Unit1Resources } from '@/data/book1-unit1-resources';
import { book1Unit2Resources } from '@/data/book1-unit2-resources'; 
import { book1Unit3Resources } from '@/data/book1-unit3-resources';
import { apiRequest } from '@/lib/queryClient';

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
 * Fetch all teacher resources for a specific book and unit
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of teacher resources
 */
export async function fetchTeacherResources(bookId: string, unitId: string): Promise<TeacherResource[]> {
  try {
    // First try to get resources from the API
    const response = await apiRequest('GET', `/api/resources/book/${bookId}/unit/${unitId}`);
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('Failed to fetch resources from API, falling back to static data', error);
  }
  
  // Fall back to static data if API fails
  if (resourcesByBookAndUnit[bookId]?.[unitId]) {
    return resourcesByBookAndUnit[bookId][unitId];
  }
  
  // If no resources found, return empty array
  return [];
}

/**
 * Fetch video resources for a specific book and unit
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of video resources
 */
export async function fetchVideoResources(bookId: string, unitId: string): Promise<TeacherResource[]> {
  const resources = await fetchTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'video');
}

/**
 * Fetch Wordwall games for a specific book and unit
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of game resources
 */
export async function fetchWordwallGames(bookId: string, unitId: string): Promise<TeacherResource[]> {
  const resources = await fetchTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'game');
}

/**
 * Fetch PDF resources for a specific book and unit
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of PDF resources
 */
export async function fetchPdfResources(bookId: string, unitId: string): Promise<TeacherResource[]> {
  const resources = await fetchTeacherResources(bookId, unitId);
  return resources.filter(resource => resource.resourceType === 'pdf');
}

/**
 * Fetch lesson plans for a specific book and unit
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of lesson plan resources
 */
export async function fetchLessonPlans(bookId: string, unitId: string): Promise<TeacherResource[]> {
  const resources = await fetchTeacherResources(bookId, unitId);
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
  return resource.resourceType === 'game' && !!(resource.wordwallGameId || resource.extraData?.wordwallId);
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