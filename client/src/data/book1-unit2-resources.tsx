/**
 * Book 1 Unit 2 resources
 * 
 * Combined resources for My School
 */
import book1Unit2VideoResources from './book1-unit2-video-resources';
import book1Unit2GameResources from './book1-unit2-game-resources';
import book1Unit2PdfResources from './book1-unit2-pdf-resources';
import book1Unit2LessonPlans from './book1-unit2-lesson-plans';

/**
 * All resources for Book 1 Unit 2 (My School)
 */
export const book1Unit2Resources = [
  ...book1Unit2VideoResources,
  ...book1Unit2GameResources,
  ...book1Unit2PdfResources,
  ...book1Unit2LessonPlans,
];

// Make sure we have both export formats available
// Default export for backward compatibility
export default book1Unit2Resources;
