/**
 * Test script for Book 1 Unit 1 resources
 * 
 * This script attempts to directly load and display the Book 1 Unit 1 resources
 * to diagnose loading issues.
 */

// Try loading Unit 1 resources directly
async function testUnitResources() {
  try {
    console.log('Attempting to load Book 1 Unit 1 resources...');
    
    // First attempt - dynamic import with tsx extension
    try {
      console.log('Method 1: Dynamic import with .tsx extension');
      const module = await import('./client/src/data/book1-unit1-resources.tsx');
      
      if (module.default && Array.isArray(module.default)) {
        console.log('SUCCESS: Resources loaded via default export:', module.default.length);
        console.log('First few resources:', module.default.slice(0, 2));
      } else if (module.book1Unit1Resources && Array.isArray(module.book1Unit1Resources)) {
        console.log('SUCCESS: Resources loaded via named export:', module.book1Unit1Resources.length);
        console.log('First few resources:', module.book1Unit1Resources.slice(0, 2));
      } else {
        console.log('FAIL: Module loaded but no valid resources found:', module);
      }
    } catch (err) {
      console.error('Error with Method 1:', err.message);
    }

    // Second attempt - component imports
    try {
      console.log('\nMethod 2: Loading component resources separately');
      
      const videoModule = await import('./client/src/data/book1-unit1-video-resources');
      const gameModule = await import('./client/src/data/book1-unit1-game-resources');
      const pdfModule = await import('./client/src/data/book1-unit1-pdf-resources');
      const lessonModule = await import('./client/src/data/book1-unit1-lesson-plans');
      
      console.log('Video resources:', videoModule.default?.length || 'None');
      console.log('Game resources:', gameModule.default?.length || 'None');
      console.log('PDF resources:', pdfModule.default?.length || 'None');
      console.log('Lesson plans:', lessonModule.default?.length || 'None');
      
      // Try to combine them
      const allResources = [
        ...(videoModule.default || []),
        ...(gameModule.default || []),
        ...(pdfModule.default || []),
        ...(lessonModule.default || [])
      ];
      
      console.log('Combined resources count:', allResources.length);
      if (allResources.length > 0) {
        console.log('Resource types:', allResources.map(r => r.resourceType).join(', '));
      }
    } catch (err) {
      console.error('Error with Method 2:', err.message);
    }
    
    console.log('\nTest complete.');
  } catch (err) {
    console.error('Test failed with error:', err);
  }
}

testUnitResources();