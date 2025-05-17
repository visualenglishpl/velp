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
  if (watchMatch) {
    console.log(`Extracted YouTube ID: ${watchMatch[1]} from URL: ${url}`);
    return watchMatch[1];
  }
  
  // Handle youtube.com/embed URLs
  const embedRegex = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  const embedMatch = url.match(embedRegex);
  if (embedMatch) {
    console.log(`Extracted YouTube ID: ${embedMatch[1]} from URL: ${url}`);
    return embedMatch[1];
  }
  
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
  const resourceRegex = /wordwall\.net\/(?:resource|play)\/([a-zA-Z0-9]+)/;
  const resourceMatch = url.match(resourceRegex);
  if (resourceMatch) {
    console.log(`Extracted Wordwall ID: ${resourceMatch[1]} from URL: ${url}`);
    return resourceMatch[1];
  }
  
  // Handle wordwall.net/embed URLs
  const embedRegex = /wordwall\.net\/embed\/([a-zA-Z0-9]+)/;
  const embedMatch = url.match(embedRegex);
  if (embedMatch) {
    console.log(`Extracted Wordwall ID: ${embedMatch[1]} from URL: ${url}`);
    return embedMatch[1];
  }
  
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
 * Checks if a URL is a PDF file
 * 
 * @param url URL to check
 * @returns True if the URL points to a PDF file
 */
export function isPdfUrl(url: string): boolean {
  if (!url) return false;
  return url.toLowerCase().endsWith('.pdf');
}

/**
 * Detects the type of embedded content from a URL
 * 
 * @param url URL to detect
 * @returns The detected embed type or null if not recognized
 */
export function detectEmbedType(url: string): 'youtube' | 'wordwall' | 'islcollective' | 'pdf' | null {
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
  
  // Check for PDF files
  if (isPdfUrl(url)) {
    return 'pdf';
  }
  
  // No recognized embed type
  return null;
}