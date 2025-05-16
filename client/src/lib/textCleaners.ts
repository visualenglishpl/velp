/**
 * Text Cleaner Utilities
 * 
 * This library provides functions for cleaning and formatting text throughout the application.
 */

/**
 * Removes specific prefixes from a question string
 * 
 * @param text The text to clean
 * @returns Cleaned text without prefixes
 */
export function removePrefixes(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/^Q:/i, '')
    .replace(/^Question:/i, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/^-\s*/, '')
    .trim();
}

/**
 * Removes specific prefixes from an answer string
 * 
 * @param text The text to clean
 * @returns Cleaned text without prefixes
 */
export function removeAnswerPrefixes(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/^A:/i, '')
    .replace(/^Answer:/i, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/^-\s*/, '')
    .trim();
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param text The text to capitalize
 * @returns Text with first letter capitalized
 */
export function capitalizeFirstLetter(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Ensures text ends with proper punctuation
 * 
 * @param text The text to check
 * @returns Text with proper ending punctuation
 */
export function ensureProperPunctuation(text: string): string {
  if (!text) return '';
  
  const trimmedText = text.trim();
  const lastChar = trimmedText.charAt(trimmedText.length - 1);
  
  // If already has ending punctuation, return as is
  if (['?', '.', '!', ',', ':', ';'].includes(lastChar)) {
    return trimmedText;
  }
  
  // Add period if it's a statement, or question mark if it seems like a question
  if (trimmedText.toLowerCase().startsWith('who') || 
      trimmedText.toLowerCase().startsWith('what') || 
      trimmedText.toLowerCase().startsWith('when') ||
      trimmedText.toLowerCase().startsWith('where') ||
      trimmedText.toLowerCase().startsWith('why') ||
      trimmedText.toLowerCase().startsWith('how') ||
      trimmedText.toLowerCase().startsWith('is') ||
      trimmedText.toLowerCase().startsWith('are') ||
      trimmedText.toLowerCase().startsWith('do') ||
      trimmedText.toLowerCase().startsWith('does') ||
      trimmedText.toLowerCase().startsWith('can') ||
      trimmedText.toLowerCase().startsWith('could') ||
      trimmedText.toLowerCase().startsWith('would') ||
      trimmedText.toLowerCase().startsWith('should')) {
    return trimmedText + '?';
  }
  
  return trimmedText + '.';
}

/**
 * Cleans question text with all necessary formatting
 * 
 * @param text The question text to clean
 * @returns Properly formatted question text
 */
export function cleanQuestionText(text: string): string {
  if (!text) return '';
  
  let cleaned = removePrefixes(text);
  cleaned = capitalizeFirstLetter(cleaned);
  cleaned = ensureProperPunctuation(cleaned);
  
  return cleaned;
}

/**
 * Cleans answer text with all necessary formatting
 * 
 * @param text The answer text to clean
 * @returns Properly formatted answer text
 */
export function cleanAnswerText(text: string): string {
  if (!text) return '';
  
  let cleaned = removeAnswerPrefixes(text);
  cleaned = capitalizeFirstLetter(cleaned);
  cleaned = ensureProperPunctuation(cleaned);
  
  return cleaned;
}

/**
 * Generates possible answers from a yes/no question
 * 
 * @param question The yes/no question
 * @returns Array of possible answers [positive, negative]
 */
export function generateYesNoAnswers(question: string): [string, string] {
  const q = question.toLowerCase().trim();
  
  if (q.startsWith('do you')) {
    return ['Yes, I do.', 'No, I don\'t.'];
  } else if (q.startsWith('does he')) {
    return ['Yes, he does.', 'No, he doesn\'t.'];
  } else if (q.startsWith('does she')) {
    return ['Yes, she does.', 'No, she doesn\'t.'];
  } else if (q.startsWith('can you')) {
    return ['Yes, I can.', 'No, I can\'t.'];
  } else if (q.startsWith('can he')) {
    return ['Yes, he can.', 'No, he can\'t.'];
  } else if (q.startsWith('can she')) {
    return ['Yes, she can.', 'No, she can\'t.'];
  } else if (q.startsWith('is it')) {
    return ['Yes, it is.', 'No, it isn\'t.'];
  } else if (q.startsWith('is he')) {
    return ['Yes, he is.', 'No, he isn\'t.'];
  } else if (q.startsWith('is she')) {
    return ['Yes, she is.', 'No, she isn\'t.'];
  } else if (q.startsWith('are you')) {
    return ['Yes, I am.', 'No, I\'m not.'];
  } else if (q.startsWith('are they')) {
    return ['Yes, they are.', 'No, they aren\'t.'];
  } else if (q.startsWith('have you')) {
    return ['Yes, I have.', 'No, I haven\'t.'];
  } else if (q.startsWith('has he')) {
    return ['Yes, he has.', 'No, he hasn\'t.'];
  } else if (q.startsWith('has she')) {
    return ['Yes, she has.', 'No, she hasn\'t.'];
  } else if (q.startsWith('did you')) {
    return ['Yes, I did.', 'No, I didn\'t.'];
  } else if (q.startsWith('would you')) {
    return ['Yes, I would.', 'No, I wouldn\'t.'];
  } else if (q.startsWith('could you')) {
    return ['Yes, I could.', 'No, I couldn\'t.'];
  } else if (q.startsWith('should we')) {
    return ['Yes, we should.', 'No, we shouldn\'t.'];
  }
  
  // Default responses
  return ['Yes.', 'No.'];
}

/**
 * Truncates text to a specific length and adds ellipsis if needed
 * 
 * @param text The text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength) + '...';
}

/**
 * Cleans and formats text for display in UI components
 * 
 * @param text The text to format
 * @returns Cleaned and formatted text
 */
export function formatDisplayText(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .replace(/\n+/g, ' ')  // Replace newlines with spaces
    .trim();
}