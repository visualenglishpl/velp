/**
 * Resource Registry System
 * 
 * A centralized system for mapping book/unit combinations to their respective resource files.
 * This eliminates the need for complex conditional logic in components.
 */

import { TeacherResource } from '@/components/TeacherResources';

// Type definitions
export type BookId = string;
export type UnitId = string;
export type UnitVersion = 'default' | 'sports' | 'housechores';

// Interface for resource loaders
interface ResourceLoader {
  loader: () => Promise<{ default: TeacherResource[] }>;
  hasCustomImplementation: boolean;
}

// Maps book/unit combinations to their resource files
const resourceMap: Record<BookId, Record<UnitId, ResourceLoader>> = {
  '1': {
    '1': { 
      loader: () => import('@/data/book1-unit1-resources'),
      hasCustomImplementation: true
    },
    '2': { 
      loader: () => import('@/data/book1-unit2-resources'),
      hasCustomImplementation: true
    },
    '3': { 
      loader: () => import('@/data/book1-unit3-resources'),
      hasCustomImplementation: true
    },
    '4': { 
      loader: () => import('@/data/book1-unit4-resources'),
      hasCustomImplementation: true
    },
    '5': { 
      loader: () => import('@/data/book1-unit5-resources'),
      hasCustomImplementation: false
    },
    '6': { 
      loader: () => import('@/data/book1-unit6-resources'),
      hasCustomImplementation: false
    },
    '7': { 
      loader: () => import('@/data/book1-unit7-resources'),
      hasCustomImplementation: false
    },
    '8': { 
      loader: () => import('@/data/book1-unit8-resources'),
      hasCustomImplementation: false
    },
    '9': { 
      loader: () => import('@/data/book1-unit9-resources'),
      hasCustomImplementation: false
    },
    '10': { 
      loader: () => import('@/data/book1-unit10-resources'),
      hasCustomImplementation: false
    },
    '11': { 
      loader: () => import('@/data/book1-unit11-resources'),
      hasCustomImplementation: false
    },
    '12': { 
      loader: () => import('@/data/book1-unit12-resources'),
      hasCustomImplementation: false
    },
    '13': { 
      loader: () => import('@/data/book1-unit13-resources'),
      hasCustomImplementation: false
    },
    '14': { 
      loader: () => import('@/data/book1-unit14-resources'),
      hasCustomImplementation: false
    },
    '15': { 
      loader: () => import('@/data/book1-unit15-resources'),
      hasCustomImplementation: false
    },
    '16': { 
      loader: () => import('@/data/book1-unit16-resources'),
      hasCustomImplementation: false
    },
    '17': { 
      loader: () => import('@/data/book1-unit17-resources'),
      hasCustomImplementation: false
    },
    '18': { 
      loader: () => import('@/data/book1-unit18-resources'),
      hasCustomImplementation: false
    },
  },
  '2': {
    '5': { 
      loader: () => import('@/data/book2-unit5-resources'), 
      hasCustomImplementation: false
    },
    '8': { 
      loader: () => import('@/data/book2-unit8-resources'), 
      hasCustomImplementation: true
    },
    '10': { 
      loader: () => import('@/data/book2-unit10-resources'), 
      hasCustomImplementation: false
    },
    '11': { 
      loader: () => import('@/data/book2-unit11-resources'), 
      hasCustomImplementation: false
    },
    '12': { 
      loader: () => import('@/data/book2-unit12-resources'), 
      hasCustomImplementation: false
    },
    '13': { 
      loader: () => import('@/data/book2-unit13-resources'), 
      hasCustomImplementation: false
    },
    '14': { 
      loader: () => import('@/data/book2-unit14-resources'), 
      hasCustomImplementation: false
    },
    '15': { 
      loader: () => import('@/data/book2-unit15-resources'), 
      hasCustomImplementation: false
    },
    '16': { 
      loader: () => import('@/data/book2-unit16-resources'), 
      hasCustomImplementation: false
    },
    '17': { 
      loader: () => import('@/data/book2-unit17-resources'), 
      hasCustomImplementation: false
    },
    '18': { 
      loader: () => import('@/data/book2-unit18-resources'), 
      hasCustomImplementation: false
    },
  },
  '3': {
    '1': { 
      loader: () => import('@/data/book3-unit1-resources'), 
      hasCustomImplementation: false
    },
    '2': { 
      loader: () => import('@/data/book3-unit2-resources'), 
      hasCustomImplementation: false
    },
    '3': { 
      loader: () => import('@/data/book3-unit3-resources'), 
      hasCustomImplementation: false
    },
    '4': { 
      loader: () => import('@/data/book3-unit4-resources'), 
      hasCustomImplementation: false
    },
    '5': { 
      loader: () => import('@/data/book3-unit5-resources'), 
      hasCustomImplementation: false
    },
    '6': { 
      loader: () => import('@/data/book3-unit6-resources'), 
      hasCustomImplementation: false
    },
    '7': { 
      loader: () => import('@/data/book3-unit7-implementation'), 
      hasCustomImplementation: true
    },
    '8': { 
      loader: () => import('@/data/book3-unit8-implementation'), 
      hasCustomImplementation: true
    },
    '9': { 
      loader: () => import('@/data/book3-unit9-implementation'), 
      hasCustomImplementation: true
    },
    '10': { 
      loader: () => import('@/data/book3-unit10-implementation'), 
      hasCustomImplementation: true
    },
    '11': { 
      loader: () => import('@/data/book3-unit11-implementation'), 
      hasCustomImplementation: true
    },
    '12': { 
      loader: () => import('@/data/book3-unit12-implementation'), 
      hasCustomImplementation: true
    },
    '13': { 
      loader: () => import('@/data/book3-unit13-implementation'), 
      hasCustomImplementation: true
    },
    '14': { 
      loader: () => import('@/data/book3-unit14-implementation'), 
      hasCustomImplementation: true
    },
    '15': { 
      loader: () => import('@/data/book3-unit15-implementation'), 
      hasCustomImplementation: true
    },
    '16': { 
      loader: () => import('@/data/book3-unit16-sports-implementation'), 
      hasCustomImplementation: true
    },
    '17': { 
      loader: () => import('@/data/book3-unit17-implementation'), 
      hasCustomImplementation: true
    },
  },
  '4': {
    '1': { 
      loader: () => import('@/data/book4-unit1-implementation'), 
      hasCustomImplementation: true
    },
    '2': { 
      loader: () => import('@/data/book4-unit2-implementation'), 
      hasCustomImplementation: true
    },
    '3': { 
      loader: () => import('@/data/book4-unit3-implementation'), 
      hasCustomImplementation: true
    },
    '4': { 
      loader: () => import('@/data/book4-unit4-implementation'), 
      hasCustomImplementation: true
    },
    '5': { 
      loader: () => import('@/data/book4-unit5-implementation'), 
      hasCustomImplementation: true
    },
    '6': { 
      loader: () => import('@/data/book4-unit6-implementation'), 
      hasCustomImplementation: true
    },
    '7': { 
      loader: () => import('@/data/book4-unit7-implementation'), 
      hasCustomImplementation: true
    },
    '8': { 
      loader: () => import('@/data/book4-unit8-implementation'), 
      hasCustomImplementation: true
    },
    '9': { 
      loader: () => import('@/data/book4-unit9-implementation'), 
      hasCustomImplementation: true
    },
    '10': { 
      loader: () => import('@/data/book4-unit10-implementation'), 
      hasCustomImplementation: true
    },
    '11': { 
      loader: () => import('@/data/book4-unit11-implementation'), 
      hasCustomImplementation: true
    },
  },
  '5': {
    '1': { 
      loader: () => import('@/data/book5-unit1-implementation'), 
      hasCustomImplementation: true
    },
    '5': { 
      loader: () => import('@/data/book5-unit5-implementation'), 
      hasCustomImplementation: true
    },
    '9': { 
      loader: () => import('@/data/book5-unit9-implementation'), 
      hasCustomImplementation: true
    },
    '13': { 
      loader: () => import('@/data/book5-unit13-implementation'), 
      hasCustomImplementation: true
    },
  },
  '6': {
    '5': { 
      loader: () => import('@/data/book6-unit5-implementation'), 
      hasCustomImplementation: true
    },
    '6': { 
      loader: () => import('@/data/book6-unit6-implementation'), 
      hasCustomImplementation: true
    },
    '7': { 
      loader: () => import('@/data/book6-unit7-implementation'), 
      hasCustomImplementation: true
    },
    '8': { 
      loader: () => import('@/data/book6-unit8-implementation'), 
      hasCustomImplementation: true
    },
    '9': { 
      loader: () => import('@/data/book6-unit9-implementation'), 
      hasCustomImplementation: true
    },
    '10': { 
      loader: () => import('@/data/book6-unit10-implementation'), 
      hasCustomImplementation: true
    },
    '13': { 
      loader: () => import('@/data/book6-unit13-implementation'), 
      hasCustomImplementation: true
    },
    '14': { 
      loader: () => import('@/data/book6-unit14-implementation'), 
      hasCustomImplementation: true
    },
    '15': { 
      loader: () => import('@/data/book6-unit15-implementation'), 
      hasCustomImplementation: true
    },
    '16': { 
      loader: () => import('@/data/book6-unit16-implementation'), 
      hasCustomImplementation: true
    },
  },
};

// Special cases for books/units
interface NoResourceCase {
  bookId: BookId;
  units: UnitId[];
}

interface MultiVersionCase {
  bookId: BookId;
  unitId: UnitId;
  versions: UnitVersion[];
  loaders: Record<UnitVersion, () => Promise<{ default: TeacherResource[] }>>;
}

// Units with no resources
const noResourceCases: NoResourceCase[] = [
  { bookId: '5', units: ['2', '3', '4', '6', '7', '8', '10'] },
];

// Units with multiple versions
const multiVersionCases: MultiVersionCase[] = [
  { 
    bookId: '3', 
    unitId: '16', 
    versions: ['sports', 'housechores'],
    loaders: {
      sports: () => import('@/data/book3-unit16-sports-implementation'),
      housechores: () => import('@/data/book3-unit16-housechores-implementation'),
      default: () => import('@/data/book3-unit16-housechores-implementation')
    }
  },
];

// Helper functions
export const hasResources = (bookId: BookId, unitId: UnitId): boolean => {
  // Check if this book/unit is in the no-resources list
  const noResourceCase = noResourceCases.find(
    (item) => item.bookId === bookId && item.units.includes(unitId)
  );
  
  return !noResourceCase;
};

export const isMultiVersionUnit = (bookId: BookId, unitId: UnitId): boolean => {
  return multiVersionCases.some(
    (item) => item.bookId === bookId && item.unitId === unitId
  );
};

export const getMultiVersionOptions = (bookId: BookId, unitId: UnitId): UnitVersion[] => {
  const multiVersionCase = multiVersionCases.find(
    (item) => item.bookId === bookId && item.unitId === unitId
  );
  
  return multiVersionCase?.versions || ['default'];
};

// Common resource generators for different books
interface CommonResourceGenerators {
  [key: string]: (unitId: string) => TeacherResource[];
}

const commonResourceGenerators: CommonResourceGenerators = {
  '3': (unitId: string) => {
    // Try to dynamically import the common generator
    try {
      const commonModule = require('@/data/book3-resources-common');
      if (typeof commonModule.generateBook3UnitResources === 'function') {
        return commonModule.generateBook3UnitResources(unitId);
      }
    } catch (error) {
      console.error('Error importing book3-resources-common:', error);
    }
    return [];
  },
  '4': (unitId: string) => {
    try {
      const commonModule = require('@/data/book4-resources-common');
      if (typeof commonModule.generateBook4UnitResources === 'function') {
        return commonModule.generateBook4UnitResources(unitId);
      }
    } catch (error) {
      console.error('Error importing book4-resources-common:', error);
    }
    return [];
  },
  '5': (unitId: string) => {
    try {
      const commonModule = require('@/data/book5-resources-common');
      if (typeof commonModule.generateBook5UnitResources === 'function') {
        return commonModule.generateBook5UnitResources(unitId);
      }
    } catch (error) {
      console.error('Error importing book5-resources-common:', error);
    }
    return [];
  },
  '6': (unitId: string) => {
    try {
      const commonModule = require('@/data/book6-resources-common');
      if (typeof commonModule.generateBook6UnitResources === 'function') {
        return commonModule.generateBook6UnitResources(unitId);
      }
    } catch (error) {
      console.error('Error importing book6-resources-common:', error);
    }
    return [];
  },
  '7': (unitId: string) => {
    try {
      const commonModule = require('@/data/book7-resources-common');
      if (typeof commonModule.generateBook7UnitResources === 'function') {
        return commonModule.generateBook7UnitResources(unitId);
      }
    } catch (error) {
      console.error('Error importing book7-resources-common:', error);
    }
    return [];
  },
};

// Main resource loading function
export const loadResourcesForBookUnit = async (
  bookId: BookId, 
  unitId: UnitId, 
  version: UnitVersion = 'default'
): Promise<TeacherResource[]> => {
  console.log(`📚 ResourceRegistry: Loading resources for Book ${bookId}, Unit ${unitId}, Version ${version}`);
  
  // Check if this book/unit has resources
  if (!hasResources(bookId, unitId)) {
    console.log(`📚 ResourceRegistry: No resources for Book ${bookId}, Unit ${unitId}`);
    return [];
  }
  
  try {
    // Handle multi-version units
    if (isMultiVersionUnit(bookId, unitId)) {
      const multiVersionCase = multiVersionCases.find(
        (item) => item.bookId === bookId && item.unitId === unitId
      );
      
      if (multiVersionCase) {
        const loader = multiVersionCase.loaders[version] || multiVersionCase.loaders.default;
        const module = await loader();
        return module.default || [];
      }
    }
    
    // Regular resource loading
    const unitLoader = resourceMap[bookId]?.[unitId];
    
    if (unitLoader) {
      try {
        const module = await unitLoader.loader();
        return module.default || [];
      } catch (error) {
        console.error(`Error loading specific resources for Book ${bookId}, Unit ${unitId}:`, error);
      }
    }
    
    // Fallback to common resource generators if specific resources not found
    if (commonResourceGenerators[bookId]) {
      console.log(`📚 ResourceRegistry: Using common generator for Book ${bookId}, Unit ${unitId}`);
      return commonResourceGenerators[bookId](unitId);
    }
    
    console.log(`📚 ResourceRegistry: No specific or common resources found for Book ${bookId}, Unit ${unitId}`);
    return [];
  } catch (error) {
    console.error(`Error loading resources for Book ${bookId}, Unit ${unitId}:`, error);
    return [];
  }
};

export default {
  loadResourcesForBookUnit,
  hasResources,
  isMultiVersionUnit,
  getMultiVersionOptions,
};