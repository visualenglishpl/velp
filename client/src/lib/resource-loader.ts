import { TeacherResource } from "@/types/teacher-resources";

/**
 * Types exports to prevent type errors
 */
export interface ResourceLoaderModule {
  dynamicResourceImport: (book: string, unit: number) => Promise<TeacherResource[]>;
  dynamicLessonPlanImport: (book: string, unit: number) => Promise<TeacherResource[]>;
}

/**
 * Dynamically imports resources for a specific book and unit
 * 
 * @param book The book ID (e.g., '4' for Book 4)
 * @param unit The unit number (e.g., 7 for Unit 7)
 * @returns Promise resolving to an array of TeacherResource objects
 */
export const dynamicResourceImport = async (book: string, unit: number): Promise<TeacherResource[]> => {
  try {
    // Standardize the book ID format and validate input
    if (!book || unit === undefined || unit === null) {
      console.warn('Invalid book or unit parameters:', { book, unit });
      return [];
    }
    
    const bookId = book.toString();
    const unitInt = parseInt(unit.toString(), 10);
    
    if (isNaN(unitInt) || unitInt <= 0) {
      console.warn('Invalid unit number:', unit);
      return [];
    }
    
    console.log(`Loading resources for Book ${bookId}, Unit ${unitInt}...`);
    
    // Book 4 resources
    if (bookId === '4') {
      switch(unit) {
        case 1: {
          try {
            const module = await import('@/data/book4-unit1-resources');
            if ('getBook4Unit1Resources' in module) {
              return (module as any).getBook4Unit1Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit1Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit1Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 1 resource import:`, error);
            return [];
          }
        }
        case 2: {
          try {
            const module = await import('@/data/book4-unit2-resources');
            if ('getBook4Unit2Resources' in module) {
              return (module as any).getBook4Unit2Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit2Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit2Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 2 resource import:`, error);
            return [];
          }
        }
        case 3: {
          try {
            const module = await import('@/data/book4-unit3-resources');
            if ('getBook4Unit3Resources' in module) {
              return (module as any).getBook4Unit3Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit3Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit3Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 3 resource import:`, error);
            return [];
          }
        }
        case 4: {
          try {
            const module = await import('@/data/book4-unit4-resources');
            if ('getBook4Unit4Resources' in module) {
              return (module as any).getBook4Unit4Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit4Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit4Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 4 resource import:`, error);
            return [];
          }
        }
        case 5: {
          try {
            const module = await import('@/data/book4-unit5-resources');
            if ('getBook4Unit5Resources' in module) {
              return (module as any).getBook4Unit5Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit5Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit5Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 5 resource import:`, error);
            return [];
          }
        }
        case 6: {
          try {
            const module = await import('@/data/book4-unit6-resources');
            if ('getBook4Unit6Resources' in module) {
              return (module as any).getBook4Unit6Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit6Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit6Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 6 resource import:`, error);
            return [];
          }
        }
        case 7: {
          try {
            const module = await import('@/data/book4-unit7-resources');
            if ('getBook4Unit7Resources' in module) {
              return (module as any).getBook4Unit7Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit7Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit7Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 7 resource import:`, error);
            return [];
          }
        }
        case 8: {
          try {
            const module = await import('@/data/book4-unit8-resources');
            if ('getBook4Unit8Resources' in module) {
              return (module as any).getBook4Unit8Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit8Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit8Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 8 resource import:`, error);
            return [];
          }
        }
        case 9: {
          try {
            const module = await import('@/data/book4-unit9-resources');
            if ('getBook4Unit9Resources' in module) {
              return (module as any).getBook4Unit9Resources();
            } else if ('resources' in module) {
              // Backward compatibility with old resource format
              return (module as any).resources;
            } else if ('book4Unit9Resources' in module) {
              // Try specialized export
              return (module as any).book4Unit9Resources;
            } else if ('default' in module) {
              // Try default export
              return (module as any).default;
            }
            return [];
          } catch (error) {
            console.error(`Error in Unit 9 resource import:`, error);
            return [];
          }
        }
        default: return [];
      }
    }
    
    // Add similar blocks for other books as needed
    
    return [];
  } catch (error) {
    console.error(`Error loading resources for Book ${book}, Unit ${unit}:`, error);
    console.log(`Attempted to load resources from module, details:`, { book, unit });
    return [];
  }
};

/**
 * Loads lesson plans for a specific book and unit
 * 
 * @param book The book ID 
 * @param unit The unit number
 * @returns Promise resolving to an array of lesson plan TeacherResource objects
 */
export const dynamicLessonPlanImport = async (book: string, unit: number): Promise<TeacherResource[]> => {
  try {
    // Standardize the book ID format and validate input
    if (!book || unit === undefined || unit === null) {
      console.warn('Invalid book or unit parameters for lesson plan import:', { book, unit });
      return [];
    }
    
    const bookId = book.toString();
    const unitInt = parseInt(unit.toString(), 10);
    
    if (isNaN(unitInt) || unitInt <= 0) {
      console.warn('Invalid unit number for lesson plan import:', unit);
      return [];
    }
    
    console.log(`Loading lesson plans for Book ${bookId}, Unit ${unitInt}...`);
    
    // Book 4 lesson plans
    if (bookId === '4') {
      switch(unit) {
        case 1: {
          try {
            const module = await import('@/data/book4-unit1-resources');
            if ('getBook4Unit1LessonPlans' in module) {
              return (module as any).getBook4Unit1LessonPlans();
            } else if ('book4Unit1LessonPlans' in module) {
              return (module as any).book4Unit1LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 1 lesson plan import:`, error);
            return [];
          }
        }
        case 2: {
          try {
            const module = await import('@/data/book4-unit2-resources');
            if ('getBook4Unit2LessonPlans' in module) {
              return (module as any).getBook4Unit2LessonPlans();
            } else if ('book4Unit2LessonPlans' in module) {
              return (module as any).book4Unit2LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 2 lesson plan import:`, error);
            return [];
          }
        }
        case 3: {
          try {
            const module = await import('@/data/book4-unit3-resources');
            if ('getBook4Unit3LessonPlans' in module) {
              return (module as any).getBook4Unit3LessonPlans();
            } else if ('book4Unit3LessonPlans' in module) {
              return (module as any).book4Unit3LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 3 lesson plan import:`, error);
            return [];
          }
        }
        case 4: {
          try {
            const module = await import('@/data/book4-unit4-resources');
            if ('getBook4Unit4LessonPlans' in module) {
              return (module as any).getBook4Unit4LessonPlans();
            } else if ('book4Unit4LessonPlans' in module) {
              return (module as any).book4Unit4LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 4 lesson plan import:`, error);
            return [];
          }
        }
        case 5: {
          try {
            const module = await import('@/data/book4-unit5-resources');
            if ('getBook4Unit5LessonPlans' in module) {
              return (module as any).getBook4Unit5LessonPlans();
            } else if ('book4Unit5LessonPlans' in module) {
              return (module as any).book4Unit5LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 5 lesson plan import:`, error);
            return [];
          }
        }
        case 6: {
          try {
            const module = await import('@/data/book4-unit6-resources');
            if ('getBook4Unit6LessonPlans' in module) {
              return (module as any).getBook4Unit6LessonPlans();
            } else if ('book4Unit6LessonPlans' in module) {
              return (module as any).book4Unit6LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 6 lesson plan import:`, error);
            return [];
          }
        }
        case 7: {
          try {
            const module = await import('@/data/book4-unit7-resources');
            if ('getBook4Unit7LessonPlans' in module) {
              return (module as any).getBook4Unit7LessonPlans();
            } else if ('book4Unit7LessonPlans' in module) {
              return (module as any).book4Unit7LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 7 lesson plan import:`, error);
            return [];
          }
        }
        case 8: {
          try {
            const module = await import('@/data/book4-unit8-resources');
            if ('getBook4Unit8LessonPlans' in module) {
              return (module as any).getBook4Unit8LessonPlans();
            } else if ('book4Unit8LessonPlans' in module) {
              return (module as any).book4Unit8LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 8 lesson plan import:`, error);
            return [];
          }
        }
        case 9: {
          try {
            const module = await import('@/data/book4-unit9-resources');
            if ('getBook4Unit9LessonPlans' in module) {
              return (module as any).getBook4Unit9LessonPlans();
            } else if ('book4Unit9LessonPlans' in module) {
              return (module as any).book4Unit9LessonPlans;
            } else {
              return [];
            }
          } catch (error) {
            console.error(`Error in Unit 9 lesson plan import:`, error);
            return [];
          }
        }
        default: return [];
      }
    }
    
    // Add similar blocks for other books as needed
    
    return [];
  } catch (error) {
    console.error(`Error loading lesson plans for Book ${book}, Unit ${unit}:`, error);
    return [];
  }
};
