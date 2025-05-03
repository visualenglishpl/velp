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
