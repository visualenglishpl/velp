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
 * @returns Promise resolving to the resources or undefined if not found
 */
export async function loadResources(
  bookId: BookId,
  unitId: UnitId
): Promise<TeacherResource[] | undefined> {
  const loader = getResourceLoader(bookId, unitId);
  
  if (loader) {
    try {
      return await loader();
    } catch (error) {
      console.error(`Error loading resources for Book ${bookId} Unit ${unitId}:`, error);
      return [];
    }
  }
  
  return undefined;
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

// Units with CSV-generated resources (more structured approach)
const csvGeneratedUnits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

// Register all CSV-generated resources
csvGeneratedUnits.forEach(unit => {
  registerResourceLoader('1', unit as UnitId, 
    () => import(/* @vite-ignore */ `@/data/book1-unit${unit}-resources`).then(m => m.default)
  );
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
  
  // First check if there's already a resource loader for this unit
  if (resourceRegistry[bookId]?.[unitId]) {
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