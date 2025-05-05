/**
 * Utility functions for loading resources from S3 with error handling and retry logic
 */

const S3_BUCKET_URL = 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com';
const DEFAULT_RETRY_DELAY = 1000; // 1 second
const MAX_RETRIES = 3;

type ResourceType = 'image' | 'pdf' | 'video' | 'audio' | 'other';

/**
 * Formats a resource URL for S3 access
 * @param path The path within the S3 bucket
 * @returns Full S3 URL
 */
export function formatS3Url(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${S3_BUCKET_URL}/${cleanPath}`;
}

/**
 * Check if a resource exists by making a HEAD request
 * @param url The resource URL to check
 * @returns Promise resolving to boolean indicating if resource exists
 */
export async function checkResourceExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking resource existence:', error);
    return false;
  }
}

/**
 * Load a resource with retry capability
 * @param url The resource URL to load
 * @param options Fetch options
 * @param retryCount Current retry count
 * @param maxRetries Maximum number of retries
 * @param retryDelay Delay between retries in ms
 * @returns Promise resolving to the fetch response
 */
export async function loadResourceWithRetry(
  url: string,
  options: RequestInit = {},
  retryCount = 0,
  maxRetries = MAX_RETRIES,
  retryDelay = DEFAULT_RETRY_DELAY
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    if (retryCount >= maxRetries) {
      throw error;
    }
    
    console.warn(`Resource load failed, retrying (${retryCount + 1}/${maxRetries}):`, url);
    
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    
    // Exponential backoff
    const nextRetryDelay = retryDelay * 2;
    
    return loadResourceWithRetry(url, options, retryCount + 1, maxRetries, nextRetryDelay);
  }
}

/**
 * Preload a resource (for faster subsequent access)
 * @param url The resource URL to preload
 * @param type The type of resource
 */
export function preloadResource(url: string, type: ResourceType = 'image'): void {
  switch (type) {
    case 'image':
      const img = new Image();
      img.src = url;
      break;
    case 'pdf':
    case 'video':
    case 'audio':
    case 'other':
      // For other resource types, just make a HEAD request to warm up the connection
      fetch(url, { method: 'HEAD' }).catch(e => console.warn('Preload failed:', e));
      break;
  }
}

/**
 * Batch preload multiple resources
 * @param urls Array of resource URLs to preload
 * @param type The type of resources
 */
export function preloadResources(urls: string[], type: ResourceType = 'image'): void {
  urls.forEach(url => preloadResource(url, type));
}
