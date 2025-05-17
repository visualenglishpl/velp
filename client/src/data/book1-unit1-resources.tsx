/**
 * Book 1 Unit 1 resources
 * 
 * Combined resources for Hello
 */
import book1Unit1VideoResources from './book1-unit1-video-resources';
import book1Unit1GameResources from './book1-unit1-game-resources';
import book1Unit1PdfResources from './book1-unit1-pdf-resources';
import book1Unit1LessonPlans from './book1-unit1-lesson-plans';

/**
 * All resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1Resources = [
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources,
  ...book1Unit1PdfResources,
  ...book1Unit1LessonPlans,
];

// Make sure both export approaches are available
// Default export for backward compatibility
export default book1Unit1Resources;
