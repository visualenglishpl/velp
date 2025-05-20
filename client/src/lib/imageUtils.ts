/**
 * Image Utilities
 * 
 * This library provides functions for handling image paths, URLs and encoding
 * to ensure proper loading of images with spaces or special characters.
 */

/**
 * Properly encodes an S3 image path to handle spaces and special characters
 * 
 * @param path The S3 path or filename
 * @returns Properly encoded URL path
 */
export function encodeS3Path(path: string): string {
  if (!path) return '';
  
  // Split the path into segments
  const segments = path.split('/');
  
  // Encode each segment properly
  const encodedSegments = segments.map(segment => encodeURIComponent(segment));
  
  // Rejoin the segments with slashes
  return encodedSegments.join('/');
}

/**
 * Cleans up the filename portion from S3 paths
 * 
 * @param filename The filename or path to clean
 * @returns Cleaned filename without path or extensions
 */
export function cleanFilename(filename: string): string {
  if (!filename) return '';
  
  // Extract just the filename without the path
  const filenameOnly = filename.split('/').pop() || filename;
  
  // Remove file extension
  return filenameOnly.replace(/\.[^/.]+$/, '');
}

/**
 * Extracts Visual English question codes from filenames
 * (like "02 I E" from "02 I E What Do You Eat in the Afternoon.jpg")
 * 
 * @param filename The filename to extract code from
 * @returns The question code if found, empty string otherwise
 */
export function extractQuestionCode(filename: string): string {
  if (!filename) return '';
  
  // Get just the filename without path
  const filenameOnly = filename.split('/').pop() || filename;
  
  // Look for patterns like "01 R A" in the filename
  const fileCodeMatch = filenameOnly.match(/^(\d+\s+[A-Z]\s+[A-Z])/);
  if (fileCodeMatch) {
    return fileCodeMatch[0];
  }
  
  // Look for simpler patterns like "01 R" in the filename
  const simpleCodeMatch = filenameOnly.match(/^(\d+\s+[A-Z])/);
  if (simpleCodeMatch) {
    return simpleCodeMatch[0];
  }
  
  return '';
}

/**
 * Creates a properly encoded URL for an S3 image with proper error handling
 * 
 * @param baseUrl The base URL for the S3 bucket or API endpoint
 * @param path The path to the image within the bucket
 * @returns A properly encoded full URL to the image
 */
export function createS3ImageUrl(baseUrl: string, path: string): string {
  if (!baseUrl || !path) return '';
  
  try {
    // Ensure the base URL ends with a slash if it's not empty
    const baseWithSlash = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    
    // Encode the path properly
    const encodedPath = encodeS3Path(path);
    
    // Combine them
    return `${baseWithSlash}${encodedPath}`;
  } catch (error) {
    console.error('Error creating S3 image URL:', error);
    
    // Fallback to basic encoding
    return `${baseUrl}/${encodeURIComponent(path)}`;
  }
}

/**
 * Extracts a readable title from a Visual English filename
 * by removing codes and improving formatting
 * 
 * @param filename The filename to convert to a title
 * @returns A cleaned up, readable title
 */
export function filenameToTitle(filename: string): string {
  if (!filename) return '';
  
  // Get just the filename without path or extension
  const filenameOnly = cleanFilename(filename);
  
  // Remove Visual English question codes like "02 I E" at the beginning
  let title = filenameOnly
    .replace(/^\d+\s+[A-Z]+\s+[A-Z]+\s+/i, '')
    .replace(/^\d+\s+[A-Z]+\s+/i, '')
    .replace(/^\d+\s+/i, '');
  
  // Replace underscores and hyphens with spaces
  title = title.replace(/[_-]/g, ' ');
  
  // Capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1);
  
  // Ensure proper question mark if it looks like a question
  if (
    title.toLowerCase().startsWith('what') ||
    title.toLowerCase().startsWith('where') ||
    title.toLowerCase().startsWith('when') ||
    title.toLowerCase().startsWith('why') ||
    title.toLowerCase().startsWith('how') ||
    title.toLowerCase().startsWith('which') ||
    title.toLowerCase().startsWith('who') ||
    title.toLowerCase().startsWith('is') ||
    title.toLowerCase().startsWith('are') ||
    title.toLowerCase().startsWith('do') ||
    title.toLowerCase().startsWith('does') ||
    title.toLowerCase().startsWith('can')
  ) {
    if (!title.endsWith('?')) {
      title = `${title}?`;
    }
  }
  
  return title;
}