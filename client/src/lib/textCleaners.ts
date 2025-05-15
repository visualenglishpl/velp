/**
 * Helper functions for cleaning and formatting question and answer text
 * These functions standardize the display of Q&A by removing codes, prefixes, and adding proper punctuation
 */

/**
 * Clean question text by removing all code patterns, prefixes, and numbering
 * Returns empty string for null/undefined/empty input or if just contains codes
 */
export function cleanQuestionText(text: string): string {
  if (!text) return '';
  
  // First, clean the text by removing all patterns
  let cleaned = text
    // Remove alphanumeric section codes at the beginning (01 A B, 12M, etc.)
    .replace(/^(\d{1,2}\s*[A-Za-z](\s+[A-Za-z])?)\s+/i, '')
    .replace(/^(\d{1,2}[A-Za-z][A-Za-z]?)\s+/i, '')
    // Remove unit/section prefixes
    .replace(/^(unit|section)\s+\d+[\.\:]\s*/i, '')
    // Remove any numbering at the beginning of the text
    .replace(/^\d+[\.\)]\s*/, '')
    // Remove question labels
    .replace(/^Q\d*[\.\:]\s*/i, '')
    .replace(/^Question\s*\d*[\.\:]\s*/i, '')
    // Remove section letter codes like (A) or [B] at the beginning
    .replace(/^[\(\[\{][A-Za-z][\)\]\}]\s*/, '');
  
  // Ensure question ends with a question mark if it doesn't already
  if (cleaned && cleaned.length > 0 && !cleaned.endsWith('?')) {
    cleaned = cleaned + '?';
  }
  
  // If the result is too short or just numbers/symbols, return empty
  if (cleaned.length < 2 || !/[a-z]/i.test(cleaned)) {
    return '';
  }
  
  return cleaned;
}

/**
 * Clean answer text by removing all code patterns, prefixes, and numbering
 * Returns empty string for null/undefined/empty input
 */
export function cleanAnswerText(text: string): string {
  if (!text) return '';
  
  // Clean the text by removing all patterns
  let cleaned = text
    // Remove alphanumeric section codes
    .replace(/^(\d{1,2}\s*[A-Za-z](\s+[A-Za-z])?)\s+/i, '')
    .replace(/^(\d{1,2}[A-Za-z][A-Za-z]?)\s+/i, '')
    // Remove unit/section prefixes
    .replace(/^(unit|section)\s+\d+[\.\:]\s*/i, '')
    // Remove any numbering at the beginning
    .replace(/^\d+[\.\)]\s*/, '')
    // Remove answer labels
    .replace(/^A\d*[\.\:]\s*/i, '')
    .replace(/^Answer\s*\d*[\.\:]\s*/i, '')
    // Remove section letter codes like (A) or [B] at the beginning
    .replace(/^[\(\[\{][A-Za-z][\)\]\}]\s*/, '');
  
  // Ensure answer ends with a period if it doesn't already have ending punctuation
  if (cleaned && cleaned.length > 0 && !/[\.!?]$/.test(cleaned)) {
    cleaned = cleaned + '.';
  }
  
  return cleaned;
}

/**
 * Clean leading patterns from text (for titles and descriptions)
 * Returns empty string for null/undefined/empty input
 */
export function cleanLeadingPatterns(text: string): string {
  if (!text) return '';
  
  return text
    // Remove file code patterns like "01 A B" or "12M"
    .replace(/^(\d{1,2}\s*[A-Za-z](\s+[A-Za-z])?)\s+/i, '')
    .replace(/^(\d{1,2}[A-Za-z][A-Za-z]?)\s+/i, '')
    // Remove unit/section prefixes
    .replace(/^(unit|section)\s+\d+[\.\:]\s*/i, '')
    // Remove any numbering at the beginning
    .replace(/^\d+[\.\)]\s*/, '')
    // Remove question/answer labels
    .replace(/^[QA]\d*[\.\:]\s*/i, '')
    .replace(/^(Question|Answer)\s*\d*[\.\:]\s*/i, '')
    // Remove section letter codes like (A) or [B] at the beginning
    .replace(/^[\(\[\{][A-Za-z][\)\]\}]\s*/, '')
    // Remove specific content prefixes
    .replace(/^VIDEO\s+/i, '')
    .replace(/^ONLINE\s+GAME\s+/i, '');
}