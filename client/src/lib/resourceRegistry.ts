/**
 * Resource Registry
 * 
 * This module provides a centralized mapping of book/unit combinations to resource files.
 * It allows for lazy-loading resources based on book and unit selection.
 * 
 * It also preloads Book 1 PDF resources and lesson plans from their respective files.
 */

import { BookId, UnitId } from '@/types/content';
import { TeacherResource } from '@/types/TeacherResource';
import { book1PdfResources, book1PdfResourcesByUnit } from '@/data/book1-pdf-resources';
import { book1LessonPlans, book1LessonPlansByUnit } from '@/data/book1-lesson-plans';

// Helper types
type ResourceLoader = () => Promise<TeacherResource[]>;
type ResourceMap = Record<string, Record<string, ResourceLoader>>;

// Registry for resource loaders
const resourceRegistry: ResourceMap = {};

/**
 * Registers a resource loader for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @param loader Function that loads the resources
 */
export function registerResourceLoader(
  bookId: BookId,
  unitId: UnitId,
  loader: ResourceLoader
): void {
  if (!resourceRegistry[bookId]) {
    resourceRegistry[bookId] = {};
  }
  
  resourceRegistry[bookId][unitId] = loader;
}

/**
 * Gets a resource loader for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns The resource loader or undefined if not found
 */
export function getResourceLoader(
  bookId: BookId,
  unitId: UnitId
): ResourceLoader | undefined {
  return resourceRegistry[bookId]?.[unitId];
}

/**
 * Loads resources for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Promise resolving to the resources or an empty array if not found
 */
export async function loadResources(
  bookId: BookId,
  unitId: UnitId
): Promise<TeacherResource[]> {
  const loader = getResourceLoader(bookId, unitId);
  
  if (loader) {
    try {
      const resources = await loader();
      
      // Additional validation to ensure we have a valid array
      if (!Array.isArray(resources)) {
        console.warn(`Invalid resource format for Book ${bookId} Unit ${unitId}, attempting fallback...`);
        
        // For Book 1, provide fallback to PDF resources and lesson plans
        if (bookId === '1') {
          const pdfResources = book1PdfResourcesByUnit[unitId] || [];
          const lessonPlans = book1LessonPlansByUnit[unitId] || [];
          return [...pdfResources, ...lessonPlans];
        }
        
        return [];
      }
      
      return resources;
    } catch (error) {
      console.error(`Error loading resources for Book ${bookId} Unit ${unitId}:`, error);
      
      // For Book 1, provide fallback to PDF resources and lesson plans
      if (bookId === '1') {
        console.log(`Attempting fallback for Book ${bookId} Unit ${unitId}...`);
        const pdfResources = book1PdfResourcesByUnit[unitId] || [];
        const lessonPlans = book1LessonPlansByUnit[unitId] || [];
        return [...pdfResources, ...lessonPlans];
      }
      
      return [];
    }
  }
  
  // No loader found
  console.warn(`No resource loader registered for Book ${bookId} Unit ${unitId}`);
  
  // For Book 1, provide fallback to PDF resources and lesson plans
  if (bookId === '1') {
    console.log(`No loader found for Book ${bookId} Unit ${unitId}, using fallback resources...`);
    const pdfResources = book1PdfResourcesByUnit[unitId] || [];
    const lessonPlans = book1LessonPlansByUnit[unitId] || [];
    if (pdfResources.length > 0 || lessonPlans.length > 0) {
      return [...pdfResources, ...lessonPlans];
    }
  }
  
  return [];
}

/**
 * Checks if resources are available for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns True if resources are available
 */
export function hasResources(bookId: BookId, unitId: UnitId): boolean {
  return !!getResourceLoader(bookId, unitId);
}

/**
 * Gets all book IDs that have registered resources
 * 
 * @returns Array of book IDs
 */
export function getRegisteredBookIds(): BookId[] {
  return Object.keys(resourceRegistry) as BookId[];
}

/**
 * Gets all unit IDs that have registered resources for a specific book
 * 
 * @param bookId The book ID
 * @returns Array of unit IDs or empty array if book not found
 */
export function getRegisteredUnitIds(bookId: BookId): UnitId[] {
  if (!resourceRegistry[bookId]) {
    return [];
  }
  
  return Object.keys(resourceRegistry[bookId]) as UnitId[];
}

// Register commonly used book/unit combinations using a more automated approach

// Define book units mapping for better organization
// Updated to include all units for which we have generated resources
const bookUnitMap: Record<string, string[]> = {
  // All Book 1 units are now generated from CSV
  '3': ['16', '17']
};

// Units with CSV-generated resources for Book 1 (more structured approach)
const book1CsvGeneratedUnits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

// Register all Book 1 CSV-generated resources
book1CsvGeneratedUnits.forEach(unit => {
  try {
    registerResourceLoader('1', unit as UnitId, 
      async () => {
        try {
          // First try to get the module
          const module = await import(/* @vite-ignore */ `@/data/book1-unit${unit}-resources`);
          
          // Then try to get the resources, checking for named export with unit-specific name
          const unitResources = `book1Unit${unit}Resources`;
          
          if (Array.isArray(module.default)) {
            console.log(`Found default export in book1-unit${unit}-resources with ${module.default.length} resources`);
            return module.default;
          } else if (module[unitResources] && Array.isArray(module[unitResources])) {
            console.log(`Found named export "${unitResources}" in book1-unit${unit}-resources with ${module[unitResources].length} resources`);
            return module[unitResources];
          } else if (module.resources && Array.isArray(module.resources)) {
            console.log(`Found named export "resources" in book1-unit${unit}-resources with ${module.resources.length} resources`);
            return module.resources;
          } else {
            console.warn(`No valid exports found in book1-unit${unit}-resources, attempting fallback...`);
            console.log('Module content:', Object.keys(module));
            
            // Fall back to trying PDF resources
            const pdfResources = book1PdfResourcesByUnit[unit as UnitId] || [];
            const lessonPlans = book1LessonPlansByUnit[unit as UnitId] || [];
            
            return [...pdfResources, ...lessonPlans];
          }
        } catch (importError) {
          console.warn(`Error importing book1-unit${unit}-resources:`, importError);
          
          // Fall back to trying PDF resources
          const pdfResources = book1PdfResourcesByUnit[unit as UnitId] || [];
          const lessonPlans = book1LessonPlansByUnit[unit as UnitId] || [];
          
          return [...pdfResources, ...lessonPlans];
        }
      }
    );
  } catch (error) {
    console.warn(`Failed to register Book 1 Unit ${unit} resources:`, error);
  }
});

// Units with CSV-generated resources for Book 2
const book2CsvGeneratedUnits = ['1', '2', '3', '4', '5'];

// Register all Book 2 CSV-generated resources
book2CsvGeneratedUnits.forEach(unit => {
  try {
    registerResourceLoader('2', unit as UnitId, 
      async () => {
        try {
          // First try to get the module
          const module = await import(/* @vite-ignore */ `@/data/book2-unit${unit}-resources`);
          
          // Then try to get the resources, should have default export
          if (module.default) {
            return module.default;
          } else {
            console.warn(`No default export found in book2-unit${unit}-resources`);
            return [];
          }
        } catch (importError) {
          console.warn(`Error importing book2-unit${unit}-resources:`, importError);
          return [];
        }
      }
    );
  } catch (error) {
    console.warn(`Failed to register Book 2 Unit ${unit} resources:`, error);
  }
});

// Define specialized loader functions
const specialImports: Record<string, Record<string, ResourceLoader>> = {
  '3': {
    '16': async () => {
      const { sportsResources } = await import('@/data/book3-unit16');
      return sportsResources;
    },
    '17': async () => {
      const { choresResources } = await import('@/data/book3-unit17');
      return choresResources;
    }
  }
};

// Register legacy book units automatically if needed
// Book 1 is now fully managed through CSV-generated resources
Object.keys(bookUnitMap).forEach(bookId => {
  if (bookId === '1') {
    // Skip Book 1 since it's now fully managed via CSV
    return;
  }
  
  for (const unit of bookUnitMap[bookId]) {
    registerResourceLoader(bookId as BookId, unit as UnitId, async () => {
      try {
        // Try to load the unit-specific resources if they exist
        const modulePathUnit = `@/data/book${bookId}-unit${unit}-resources`;
        
        // Fallback to legacy resources if needed
        let resources: TeacherResource[] = [];
        try {
          // Using /* @vite-ignore */ to suppress the dynamic import warning
          const { default: unitResources } = await import(/* @vite-ignore */ modulePathUnit);
          resources = unitResources;
        } catch (err) {
          console.warn(`No specific resources found for Book ${bookId} Unit ${unit}, using fallbacks.`);
          
          // For Book 1, we can add PDF resources and lesson plans from global collections
          if (bookId === '1') {
            // Add PDF resources for this unit from the global collection
            if (book1PdfResourcesByUnit[unit]) {
              resources = [...resources, ...book1PdfResourcesByUnit[unit]];
            }
            
            // Add lesson plans for this unit from the global collection
            if (book1LessonPlansByUnit[unit]) {
              resources = [...resources, ...book1LessonPlansByUnit[unit]];
            }
          }
        }
        
        return resources;
      } catch (error) {
        console.error(`Error loading Book ${bookId} Unit ${unit} resources:`, error);
        return [];
      }
    });
  }
});

// Register other book units with special import patterns
Object.keys(specialImports).forEach(bookId => {
  Object.keys(specialImports[bookId]).forEach(unitId => {
    const loader = specialImports[bookId][unitId];
    registerResourceLoader(bookId as BookId, unitId as UnitId, loader);
  });
});

// Register PDF resources and lesson plans for Book 1
// This ensures they are available for all Book 1 units (1-18)
for (let unitNum = 1; unitNum <= 18; unitNum++) {
  const unitId = unitNum.toString() as UnitId;
  const bookId = '1' as BookId;
  
  // Create a direct import loader for specific problematic units
  if (unitId === '1' || unitId === '2') {
    // Special handler for Book 1 Unit 1 and Unit 2 that had import issues
    const unitNumber = unitId; // '1' or '2'
    registerResourceLoader(bookId, unitId, async () => {
      try {
        console.log(`Loading Book 1 Unit ${unitNumber} resources directly...`);
        
        // PHASE 1: Try loading individual resource components
        console.log(`PHASE 1: Loading individual component resources for Book 1 Unit ${unitNumber}`);
        console.log(`Debugging Book 1 Unit ${unitNumber} - Here are the resource files being loaded:`);
        console.log(`- Video resources: @/data/book1-unit${unitNumber}-video-resources`);
        console.log(`- Game resources: @/data/book1-unit${unitNumber}-game-resources`);
        console.log(`- PDF resources: @/data/book1-unit${unitNumber}-pdf-resources`);
        console.log(`- Lesson plans: @/data/book1-unit${unitNumber}-lesson-plans`);
        
        try {
          // Load each resource type individually
          const videoModule = await import(/* @vite-ignore */ `@/data/book1-unit${unitNumber}-video-resources`);
          console.log(`Video module loaded successfully:`, Object.keys(videoModule));
          
          const gameModule = await import(/* @vite-ignore */ `@/data/book1-unit${unitNumber}-game-resources`);
          console.log(`Game module loaded successfully:`, Object.keys(gameModule));
          
          const pdfModule = await import(/* @vite-ignore */ `@/data/book1-unit${unitNumber}-pdf-resources`);
          console.log(`PDF module loaded successfully:`, Object.keys(pdfModule));
          
          const lessonModule = await import(/* @vite-ignore */ `@/data/book1-unit${unitNumber}-lesson-plans`);
          console.log(`Lesson module loaded successfully:`, Object.keys(lessonModule));
          
          // Combine all resources
          const videoResources = videoModule.default || [];
          const gameResources = gameModule.default || [];
          const pdfResources = pdfModule.default || [];
          const lessonResources = lessonModule.default || [];
          
          const combinedResources = [
            ...videoResources,
            ...gameResources,
            ...pdfResources,
            ...lessonResources
          ];
          
          console.log(`SUCCESS: Loaded resources individually - Videos: ${videoResources.length}, Games: ${gameResources.length}, PDFs: ${pdfResources.length}, Lessons: ${lessonResources.length}`);
          return combinedResources;
        } catch (componentError: unknown) {
          const errorMessage = componentError instanceof Error ? componentError.message : String(componentError);
          console.warn(`Failed loading component resources for Book 1 Unit ${unitNumber}:`, errorMessage);
        }
        
        // PHASE 2: Try loading the combined resources file
        console.log(`PHASE 2: Trying combined resource file for Book 1 Unit ${unitNumber}`);
        try {
          // Direct import for Book 1 Unit resources
          const module = await import(/* @vite-ignore */ `@/data/book1-unit${unitNumber}-resources`);
          
          if (Array.isArray(module.default)) {
            console.log(`SUCCESS: Resources loaded via default export: ${module.default.length}`);
            return module.default;
          } else if (module[`book1Unit${unitNumber}Resources`] && Array.isArray(module[`book1Unit${unitNumber}Resources`])) {
            console.log(`SUCCESS: Resources loaded via named export: ${module[`book1Unit${unitNumber}Resources`].length}`);
            return module[`book1Unit${unitNumber}Resources`];
          } else {
            console.warn(`Failed to find resources in module, structure:`, Object.keys(module));
          }
        } catch (moduleError: unknown) {
          const errorMessage = moduleError instanceof Error ? moduleError.message : String(moduleError);
          console.warn(`Failed loading combined resource file:`, errorMessage);
        }
        
        // PHASE 3: Fall back to PDF resources and lesson plans from global collections
        console.log(`PHASE 3: Using fallback global PDF and lesson plan collections`);
        const pdfResources = book1PdfResourcesByUnit[unitId] || [];
        const lessonPlans = book1LessonPlansByUnit[unitId] || [];
        const fallbackResources = [...pdfResources, ...lessonPlans];
        
        console.log(`Using ${fallbackResources.length} fallback resources (${pdfResources.length} PDFs, ${lessonPlans.length} lesson plans)`);
        return fallbackResources;
      } catch (error) {
        console.error(`All resource loading methods failed for Book 1 Unit ${unitNumber}:`, error);
        return [];
      }
    });
  }
  // First check if there's already a resource loader for this unit
  else if (resourceRegistry[bookId]?.[unitId]) {
    // If there is, we'll enhance it to include PDF resources and lesson plans
    const originalLoader = resourceRegistry[bookId][unitId];
    
    // Create a new loader that combines the original resources with PDFs and lesson plans
    registerResourceLoader(bookId, unitId, async () => {
      // Load the original resources
      const originalResources = await originalLoader();
      
      // Get PDF resources for this unit
      const pdfResources = book1PdfResourcesByUnit[unitId] || [];
      
      // Get lesson plans for this unit
      const lessonPlans = book1LessonPlansByUnit[unitId] || [];
      
      // Combine and return all resources
      return [...originalResources, ...pdfResources, ...lessonPlans];
    });
  } else {
    // If there's no loader yet, create one just for PDFs and lesson plans
    registerResourceLoader(bookId, unitId, async () => {
      // Get PDF resources for this unit
      const pdfResources = book1PdfResourcesByUnit[unitId] || [];
      
      // Get lesson plans for this unit
      const lessonPlans = book1LessonPlansByUnit[unitId] || [];
      
      // Combine and return all resources
      return [...pdfResources, ...lessonPlans];
    });
  }
}