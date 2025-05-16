/**
 * Embed Utilities
 * 
 * This module provides utility functions for handling embedded content
 * from various providers like YouTube, Wordwall, and ISL Collective.
 */

/**
 * Extracts a YouTube video ID from a URL
 * 
 * @param url YouTube URL (can be watch, embed, or shortened format)
 * @returns YouTube video ID or null if not found
 */
export function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle youtube.com/watch URLs
  const watchRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const watchMatch = url.match(watchRegex);
  if (watchMatch) return watchMatch[1];
  
  // Handle youtube.com/embed URLs
  const embedRegex = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  const embedMatch = url.match(embedRegex);
  if (embedMatch) return embedMatch[1];
  
  // If no match is found
  return null;
}

/**
 * Extracts a Wordwall game ID from a URL
 * 
 * @param url Wordwall URL
 * @returns Wordwall game ID or null if not found
 */
export function extractWordwallGameId(url: string): string | null {
  if (!url) return null;
  
  // Handle wordwall.net/resource URLs
  const resourceRegex = /wordwall\.net\/(?:resource|play)\/([0-9]+)/;
  const resourceMatch = url.match(resourceRegex);
  if (resourceMatch) return resourceMatch[1];
  
  // Handle wordwall.net/embed URLs
  const embedRegex = /wordwall\.net\/embed\/([0-9]+)/;
  const embedMatch = url.match(embedRegex);
  if (embedMatch) return embedMatch[1];
  
  // If no match is found
  return null;
}

/**
 * Extracts an ISL Collective resource ID from a URL
 * 
 * @param url ISL Collective URL
 * @returns ISL Collective resource ID or null if not found
 */
export function extractIslCollectiveId(url: string): string | null {
  if (!url) return null;
  
  // Handle islcollective.com/preview URLs
  const previewRegex = /islcollective\.com\/preview\/([a-zA-Z0-9_-]+)/;
  const previewMatch = url.match(previewRegex);
  if (previewMatch) return previewMatch[1];
  
  // If no match is found
  return null;
}

/**
 * Detects the type of embedded content from a URL
 * 
 * @param url URL to detect
 * @returns The detected embed type or null if not recognized
 */
export function detectEmbedType(url: string): 'youtube' | 'wordwall' | 'islcollective' | null {
  if (!url) return null;
  
  // Check for YouTube URLs
  if (
    url.includes('youtube.com/watch') || 
    url.includes('youtube.com/embed') || 
    url.includes('youtu.be/')
  ) {
    return 'youtube';
  }
  
  // Check for Wordwall URLs
  if (
    url.includes('wordwall.net/resource') || 
    url.includes('wordwall.net/play') || 
    url.includes('wordwall.net/embed')
  ) {
    return 'wordwall';
  }
  
  // Check for ISL Collective URLs
  if (
    url.includes('islcollective.com/preview') || 
    url.includes('en.islcollective.com')
  ) {
    return 'islcollective';
  }
  
  // No recognized embed type
  return null;
}