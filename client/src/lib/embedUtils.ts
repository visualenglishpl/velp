/**
 * Utility functions for handling embedded content from external providers
 * like Wordwall, ISL Collective, and YouTube.
 */

/**
 * Resource type enum for categorizing external content
 */
export enum ResourceType {
  Wordwall = 'wordwall',
  IslCollective = 'islcollective',
  YouTube = 'youtube',
  Other = 'other'
}

/**
 * Extracts the Wordwall activity ID from an embed URL or code
 * @param input The embed URL, iframe code, or direct URL
 * @returns The Wordwall activity ID or null if not found
 */
export const extractWordwallId = (input: string): string | null => {
  if (!input) return null;
  
  // Match the ID from a Wordwall iframe src attribute
  const iframeSrcRegex = /wordwall\.net\/(?:embed|resource)\/([0-9]+)/i;
  const iframeMatch = input.match(iframeSrcRegex);
  
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }
  
  // Match from a direct Wordwall URL
  const urlRegex = /wordwall\.net\/\w+\/\w+\/([0-9]+)/i;
  const urlMatch = input.match(urlRegex);
  
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  
  return null;
};

/**
 * Extracts the ISL Collective worksheet ID from an embed URL or code
 * @param input The embed URL, iframe code, or direct URL
 * @returns The ISL Collective worksheet ID or null if not found
 */
export const extractIslCollectiveId = (input: string): string | null => {
  if (!input) return null;
  
  // Match the ID from an ISL Collective iframe src attribute
  const iframeSrcRegex = /islcollective\.com\/\w+\/\w+\/\w+\/([0-9]+)/i;
  const iframeMatch = input.match(iframeSrcRegex);
  
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }
  
  return null;
};

/**
 * Extracts the YouTube video ID from an embed URL or code
 * @param input The embed URL, iframe code, or direct URL
 * @returns The YouTube video ID or null if not found
 */
export const extractYouTubeId = (input: string): string | null => {
  if (!input) return null;
  
  // Match the ID from a YouTube iframe src attribute
  const iframeSrcRegex = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i;
  const iframeMatch = input.match(iframeSrcRegex);
  
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }
  
  // Match from a direct YouTube URL
  const urlRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const urlMatch = input.match(urlRegex);
  
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  
  return null;
};

/**
 * Detects the type of resource from an embed code or URL
 * @param input The embed code or URL to analyze
 * @returns The detected resource type
 */
export const detectResourceType = (input: string): ResourceType => {
  if (!input) return ResourceType.Other;
  
  if (input.includes('wordwall.net')) {
    return ResourceType.Wordwall;
  }
  
  if (input.includes('islcollective.com')) {
    return ResourceType.IslCollective;
  }
  
  if (input.includes('youtube.com') || input.includes('youtu.be')) {
    return ResourceType.YouTube;
  }
  
  return ResourceType.Other;
};

/**
 * Generates a standardized embed code for Wordwall activities
 * @param id The Wordwall activity ID
 * @returns An iframe HTML string for embedding the Wordwall activity
 */
export const generateWordwallEmbed = (id: string): string => {
  if (!id) return '';
  
  return `<iframe 
    style="max-width: 100%; width: 100%; height: 100%; border: 0px; display: block; margin: 0 auto;" 
    src="https://wordwall.net/embed/${id}" 
    frameborder="0" 
    allowfullscreen></iframe>`;
};

/**
 * Generates a standardized embed code for ISL Collective worksheets
 * @param id The ISL Collective worksheet ID
 * @returns An iframe HTML string for embedding the ISL Collective worksheet
 */
export const generateIslCollectiveEmbed = (id: string): string => {
  if (!id) return '';
  
  return `<iframe 
    style="max-width: 100%; width: 100%; height: 100%; border: 0px; display: block; margin: 0 auto;" 
    src="https://en.islcollective.com/preview/202207/f/${id}_en_islcollective_worksheets_templates.png" 
    frameborder="0" 
    allowfullscreen></iframe>`;
};

/**
 * Generates a standardized embed code for YouTube videos
 * @param id The YouTube video ID
 * @returns An iframe HTML string for embedding the YouTube video
 */
export const generateYouTubeEmbed = (id: string): string => {
  if (!id) return '';
  
  return `<iframe 
    style="max-width: 100%; width: 100%; height: 100%; border: 0px; display: block; margin: 0 auto;" 
    src="https://www.youtube.com/embed/${id}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen></iframe>`;
};

/**
 * Sanitizes an embed code to ensure it's safer to render
 * @param embedCode The original embed code
 * @returns A sanitized version of the embed code
 */
export const sanitizeEmbedCode = (embedCode: string): string => {
  if (!embedCode) return '';
  
  // Add sandbox attributes to iframes for security
  let safeCode = embedCode.replace(
    /<iframe(.*?)>/gi, 
    '<iframe$1 sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation" loading="lazy">'
  );
  
  // Ensure responsive sizing if not already present
  if (!safeCode.includes('width="100%"') && !safeCode.includes('style="width: 100%')) {
    safeCode = safeCode.replace(
      /<iframe(.*?)>/gi,
      '<iframe$1 style="width: 100%; height: 100%; border: 0;">'
    );
  }
  
  return safeCode;
};

/**
 * Normalizes an embed code or URL into a standardized embed code
 * @param input The original embed code or URL
 * @returns A standardized embed code
 */
export const normalizeEmbed = (input: string): string => {
  if (!input) return '';
  
  const resourceType = detectResourceType(input);
  
  switch (resourceType) {
    case ResourceType.Wordwall: {
      const id = extractWordwallId(input);
      return id ? generateWordwallEmbed(id) : sanitizeEmbedCode(input);
    }
    case ResourceType.IslCollective: {
      const id = extractIslCollectiveId(input);
      return id ? generateIslCollectiveEmbed(id) : sanitizeEmbedCode(input);
    }
    case ResourceType.YouTube: {
      const id = extractYouTubeId(input);
      return id ? generateYouTubeEmbed(id) : sanitizeEmbedCode(input);
    }
    default:
      return sanitizeEmbedCode(input);
  }
};