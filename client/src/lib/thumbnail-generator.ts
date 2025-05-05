/**
 * Utility for generating thumbnails for various resource types
 */

/**
 * Get a YouTube video thumbnail from a video ID
 * @param videoId YouTube video ID
 * @param quality Thumbnail quality - default, medium, high, or max
 * @returns URL to YouTube thumbnail
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'max' = 'medium'): string {
  if (!videoId) return '';

  switch (quality) {
    case 'max':
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    case 'high':
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    case 'medium':
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    case 'default':
    default:
      return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url YouTube URL
 * @returns YouTube video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const patterns = [
    // Standard YouTube URL
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)(?:&.*)?/,
    // Shortened URL format
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([\w-]+)(?:\?.*)?/,
    // Embed URL format
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([\w-]+)(?:\?.*)?/,
    // Iframe embed code
    /<iframe.*?src=["'](?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([\w-]+)(?:\?.*)?["'].*?><\/iframe>/,
    // Video ID directly
    /^([\w-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract Wordwall game ID from embed URL or code
 * @param embedUrl Wordwall embed URL or iframe code
 * @returns Wordwall game ID or null if not found
 */
export function extractWordwallGameId(embedUrl: string): string | null {
  if (!embedUrl) return null;

  // Extract from iframe code or URL
  const patterns = [
    // Extract from iframe src
    /<iframe.*?src=["'](?:https?:\/\/)?wordwall\.net\/embed\/([\w-]+)(?:\?.*)?["'].*?><\/iframe>/,
    // Extract from URL
    /(?:https?:\/\/)?wordwall\.net\/(?:\w+\/)?(?:embed|resource|play)\/([\w-]+)(?:\?.*)?/
  ];

  for (const pattern of patterns) {
    const match = embedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Create thumbnail URL for Wordwall games
 * Currently using a placeholder as Wordwall doesn't offer a direct thumbnail API
 * In a production environment, you might want to generate these server-side
 * @param gameId Wordwall game ID
 * @returns A URL to a placeholder image for Wordwall
 */
export function getWordwallThumbnail(gameId: string): string {
  if (!gameId) return '';
  
  // Check if we have a cached thumbnail for this game ID
  // This would require server-side implementation to store screenshots
  // For now, return a placeholder based on the game ID
  return `https://wordwall.net/resource/thumb/${gameId}`;
}

/**
 * Generate a thumbnail URL for any resource type
 * @param resource The teacher resource object
 * @returns A URL to the appropriate thumbnail
 */
export function generateThumbnailUrl(resource: any): string {
  if (!resource) return '';
  
  // If resource already has a thumbnail URL, use it
  if (resource.thumbnailUrl) {
    return resource.thumbnailUrl;
  }
  
  // Generate based on resource type
  switch (resource.resourceType) {
    case 'video':
      if (resource.content?.embedId) {
        return getYouTubeThumbnail(resource.content.embedId, 'high');
      } else if (resource.content?.embedUrl) {
        const videoId = extractYouTubeVideoId(resource.content.embedUrl);
        if (videoId) {
          return getYouTubeThumbnail(videoId, 'high');
        }
      }
      break;
      
    case 'game':
      if (resource.content?.embedUrl) {
        const gameId = extractWordwallGameId(resource.content.embedUrl);
        if (gameId) {
          return getWordwallThumbnail(gameId);
        }
      }
      break;
      
    case 'lesson':
      // Use a generic icon for lesson plans
      return '/assets/icons/lesson-plan-thumbnail.svg';
      
    case 'pdf':
      // Use a generic icon for PDFs
      return '/assets/icons/pdf-thumbnail.svg';
  }
  
  // Default thumbnail
  return '/assets/icons/resource-thumbnail.svg';
}
