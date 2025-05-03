/**
 * Common resource definitions for Visual English Book 1
 * This includes reusable resource templates and utility functions
 */

import { TeacherResource } from '@/components/TeacherResources';

// Common resource template functions for Book 1
export const createBook1VideoResource = (
  unit: number,
  index: number,
  title: string,
  youtubeEmbedId: string,
  description?: string
): TeacherResource => ({
  id: `book1-unit${unit}-video-${index}`,
  title: title,
  description: description || `A video resource for Book 1 Unit ${unit}: ${title}`,
  resourceType: 'video',
  content: {
    type: 'youtube',
    embedId: youtubeEmbedId,
  },
});

export const createBook1GameResource = (
  unit: number,
  index: number,
  title: string,
  wordwallEmbedId: string,
  themeId: string = '1',
  templateId: string = '38',
  fontStackId: string = '0',
  description?: string
): TeacherResource => ({
  id: `book1-unit${unit}-game-${index}`,
  title: title,
  description: description || `An interactive game for Book 1 Unit ${unit}: ${title}`,
  resourceType: 'game',
  content: {
    type: 'wordwall',
    embedUrl: `https://wordwall.net/embed/${wordwallEmbedId}?themeId=${themeId}&templateId=${templateId}&fontStackId=${fontStackId}`,
  },
});

// Function to extract YouTube video ID from full YouTube URL/embed code
export const extractYouTubeId = (url: string): string => {
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : url;
};

// Function to extract Wordwall ID from full Wordwall URL/embed code
export const extractWordwallId = (embedCode: string): string => {
  const regExp = /wordwall\.net\/embed\/([\w\d]+)/;
  const match = embedCode.match(regExp);
  return match ? match[1] : embedCode;
};

// Common video resources for all Book 1 units
export const VideoResources: TeacherResource[] = [
  {
    id: 'book1-common-video-1',
    title: 'Visual English Book 1 Introduction',
    description: 'An introductory video for teachers on how to use Visual English Book 1',
    resourceType: 'video',
    content: {
      type: 'youtube',
      embedId: 'dQw4w9WgXcQ',  // This is a placeholder ID
    },
  },
  {
    id: 'book1-common-video-2',
    title: 'ESL Teaching Methodologies',
    description: 'Overview of effective ESL teaching methodologies applicable to all Book 1 units',
    resourceType: 'video',
    content: {
      type: 'youtube',
      embedId: '9bZkp7q19f0',  // This is a placeholder ID
    },
  },
];

// Common game resources for all Book 1 units
export const GameResources: TeacherResource[] = [
  {
    id: 'book1-common-game-1',
    title: 'English Vocabulary Practice',
    description: 'A general vocabulary practice game suitable for all Book 1 units',
    resourceType: 'game',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/123456?themeId=1&templateId=38&fontStackId=0',
    },
  },
  {
    id: 'book1-common-game-2',
    title: 'Grammar Foundations',
    description: 'A grammar practice game covering basic concepts found throughout Book 1',
    resourceType: 'game',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/789012?themeId=1&templateId=38&fontStackId=0',
    },
  },
];

// Export default for compatibility with resource verification system
export default {
  VideoResources,
  GameResources,
  helpers: {
    createBook1VideoResource,
    createBook1GameResource,
    extractYouTubeId,
    extractWordwallId
  }
};
