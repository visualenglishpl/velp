/**
 * Embed Utilities
 * 
 * This library provides functions for handling embedded content from various providers.
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * 
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube-nocookie.com/embed/VIDEO_ID
 * 
 * @param url Any YouTube URL or embed code containing a video ID
 * @returns The extracted video ID or null if not found
 */
export function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle iframe embed code
  if (url.includes('<iframe')) {
    const srcMatch = url.match(/src=["'](?:https?:)?\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/embed\/([^"'&?\/\s]+)/i);
    if (srcMatch && srcMatch[1]) return srcMatch[1];
  }
  
  // Handle regular YouTube URLs
  const patterns = [
    /(?:https?:)?\/\/(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,    // Standard watch URL
    /(?:https?:)?\/\/(?:www\.)?youtu\.be\/([^?&]+)/i,               // Shortened URL
    /(?:https?:)?\/\/(?:www\.)?youtube\.com\/embed\/([^?&]+)/i,      // Embed URL
    /(?:https?:)?\/\/(?:www\.)?youtube-nocookie\.com\/embed\/([^?&]+)/i // No-cookie embed URL
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  
  return null;
}

/**
 * Generates YouTube embed URL with privacy-enhanced mode
 * 
 * @param videoId YouTube video ID
 * @param autoplay Whether to autoplay the video (default: false)
 * @returns Embed URL for the video
 */
export function getYoutubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;
}

/**
 * Extracts Wordwall game ID from various Wordwall URL formats
 * 
 * Supports:
 * - https://wordwall.net/resource/GAME_ID/...
 * - https://wordwall.net/embed/GAME_ID
 * - iframe embed code with src="https://wordwall.net/embed/GAME_ID"
 * 
 * @param url Any Wordwall URL or embed code containing a game ID
 * @returns The extracted game ID or null if not found
 */
export function extractWordwallGameId(url: string): string | null {
  if (!url) return null;
  
  // Handle iframe embed code
  if (url.includes('<iframe')) {
    const srcMatch = url.match(/src=["'](?:https?:)?\/\/(?:www\.)?wordwall\.net\/(?:embed|resource)\/([0-9]+)/i);
    if (srcMatch && srcMatch[1]) return srcMatch[1];
  }
  
  // Handle regular Wordwall URLs
  const patterns = [
    /(?:https?:)?\/\/(?:www\.)?wordwall\.net\/resource\/([0-9]+)/i,    // Resource URL
    /(?:https?:)?\/\/(?:www\.)?wordwall\.net\/embed\/([0-9]+)/i        // Embed URL
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  
  return null;
}

/**
 * Generates Wordwall embed URL
 * 
 * @param gameId Wordwall game ID
 * @returns Embed URL for the game
 */
export function getWordwallEmbedUrl(gameId: string): string {
  return `https://wordwall.net/embed/${gameId}`;
}

/**
 * Extracts ISL Collective resource ID from various ISL Collective URL formats
 * 
 * Supports:
 * - https://en.islcollective.com/english-esl-worksheets/ID
 * - iframe embed code with ISL Collective resources
 * 
 * @param url Any ISL Collective URL or embed code containing a resource ID
 * @returns The extracted resource ID or null if not found
 */
export function extractIslCollectiveId(url: string): string | null {
  if (!url) return null;
  
  // Handle iframe embed code
  if (url.includes('<iframe')) {
    const srcMatch = url.match(/src=["'](?:https?:)?\/\/(?:www\.)?en\.islcollective\.com\/[^"']+\/([a-z0-9-]+)(?:[^"']*)/i);
    if (srcMatch && srcMatch[1]) return srcMatch[1];
  }
  
  // Handle regular ISL Collective URLs
  const pattern = /(?:https?:)?\/\/(?:www\.)?en\.islcollective\.com\/[^\/]+\/([a-z0-9-]+)(?:[^"']*)/i;
  const match = url.match(pattern);
  if (match && match[1]) return match[1];
  
  return null;
}

/**
 * Determines if a URL is a PDF link
 * 
 * @param url The URL to check
 * @returns True if the URL is a PDF link
 */
export function isPdfUrl(url: string): boolean {
  if (!url) return false;
  return url.toLowerCase().endsWith('.pdf');
}

/**
 * Encodes content to be safely embedded in an iframe src attribute
 * 
 * @param content HTML content to encode
 * @returns Data URI with encoded content
 */
export function createHtmlDataUri(content: string): string {
  const encodedContent = encodeURIComponent(content);
  return `data:text/html;charset=utf-8,${encodedContent}`;
}

/**
 * Creates a sanitized iframe from raw HTML
 * 
 * @param html Raw HTML to embed
 * @param title Accessibility title for the iframe
 * @returns Safe iframe element as a string
 */
export function createSafeIframe(html: string, title: string): string {
  const safeHtml = html
    .replace(/onerror/gi, 'data-blocked-onerror')
    .replace(/javascript:/gi, 'data-blocked-javascript:');
    
  return `<iframe 
    title="${title || 'Embedded content'}" 
    src="${createHtmlDataUri(safeHtml)}" 
    style="width:100%;height:500px;border:none;" 
    sandbox="allow-scripts allow-same-origin"
  ></iframe>`;
}

/**
 * Determines the type of embedded content from a URL or HTML
 * 
 * @param content URL or HTML to analyze
 * @returns The detected content type or 'unknown'
 */
export function detectEmbedType(content: string): 'youtube' | 'wordwall' | 'islcollective' | 'pdf' | 'html' | 'unknown' {
  if (!content) return 'unknown';
  
  if (extractYoutubeVideoId(content)) return 'youtube';
  if (extractWordwallGameId(content)) return 'wordwall';
  if (extractIslCollectiveId(content)) return 'islcollective';
  if (isPdfUrl(content)) return 'pdf';
  if (content.includes('<iframe') || content.includes('<html')) return 'html';
  
  return 'unknown';
}