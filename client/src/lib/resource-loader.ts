import { TeacherResource } from "@/types/teacher-resources";

/**
 * Types exports to prevent type errors
 */
export type ResourceLoaderModule = {
  dynamicResourceImport: (book: string, unit: number) => Promise<TeacherResource[]>;
  dynamicLessonPlanImport: (book: string, unit: number) => Promise<TeacherResource[]>;
};

/**
 * Dynamically imports resources for a specific book and unit
 * 
 * @param book The book ID (e.g., '4' for Book 4)
 * @param unit The unit number (e.g., 7 for Unit 7)
 * @returns Promise resolving to an array of TeacherResource objects
 */
export const dynamicResourceImport = async (book: string, unit: number): Promise<TeacherResource[]> => {
  try {
    // Standardize the book ID format
    const bookId = book.toString();
    
    // Book 4 resources
    if (bookId === '4') {
      switch(unit) {
        case 1: {
          try {
            const module = await import('@/data/book4-unit1-resources');
            if (module.getBook4Unit1Resources) {
              return module.getBook4Unit1Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit2Resources) {
              return module.getBook4Unit2Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit2Resources) {
              // Try specialized export
              return module.book4Unit2Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit3Resources) {
              return module.getBook4Unit3Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit3Resources) {
              // Try specialized export
              return module.book4Unit3Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit4Resources) {
              return module.getBook4Unit4Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit4Resources) {
              // Try specialized export
              return module.book4Unit4Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit5Resources) {
              return module.getBook4Unit5Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit5Resources) {
              // Try specialized export
              return module.book4Unit5Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit6Resources) {
              return module.getBook4Unit6Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit6Resources) {
              // Try specialized export
              return module.book4Unit6Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit7Resources) {
              return module.getBook4Unit7Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit7Resources) {
              // Try specialized export
              return module.book4Unit7Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit8Resources) {
              return module.getBook4Unit8Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit8Resources) {
              // Try specialized export
              return module.book4Unit8Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
            if (module.getBook4Unit9Resources) {
              return module.getBook4Unit9Resources();
            } else if (module.resources) {
              // Backward compatibility with old resource format
              return module.resources;
            } else if (module.book4Unit9Resources) {
              // Try specialized export
              return module.book4Unit9Resources;
            } else if (module.default) {
              // Try default export
              return module.default;
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
    // Standardize the book ID format
    const bookId = book.toString();
    
    // Book 4 lesson plans
    if (bookId === '4') {
      switch(unit) {
        case 1: {
          try {
            const module = await import('@/data/book4-unit1-resources');
            if (module.getBook4Unit1LessonPlans) {
              return module.getBook4Unit1LessonPlans();
            } else if (module.book4Unit1LessonPlans) {
              return module.book4Unit1LessonPlans;
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
            if (module.getBook4Unit2LessonPlans) {
              return module.getBook4Unit2LessonPlans();
            } else if (module.book4Unit2LessonPlans) {
              return module.book4Unit2LessonPlans;
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
            if (module.getBook4Unit3LessonPlans) {
              return module.getBook4Unit3LessonPlans();
            } else if (module.book4Unit3LessonPlans) {
              return module.book4Unit3LessonPlans;
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
            if (module.getBook4Unit4LessonPlans) {
              return module.getBook4Unit4LessonPlans();
            } else if (module.book4Unit4LessonPlans) {
              return module.book4Unit4LessonPlans;
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
            if (module.getBook4Unit5LessonPlans) {
              return module.getBook4Unit5LessonPlans();
            } else if (module.book4Unit5LessonPlans) {
              return module.book4Unit5LessonPlans;
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
            if (module.getBook4Unit6LessonPlans) {
              return module.getBook4Unit6LessonPlans();
            } else if (module.book4Unit6LessonPlans) {
              return module.book4Unit6LessonPlans;
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
            if (module.getBook4Unit7LessonPlans) {
              return module.getBook4Unit7LessonPlans();
            } else if (module.book4Unit7LessonPlans) {
              return module.book4Unit7LessonPlans;
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
            if (module.getBook4Unit8LessonPlans) {
              return module.getBook4Unit8LessonPlans();
            } else if (module.book4Unit8LessonPlans) {
              return module.book4Unit8LessonPlans;
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
            if (module.getBook4Unit9LessonPlans) {
              return module.getBook4Unit9LessonPlans();
            } else if (module.book4Unit9LessonPlans) {
              return module.book4Unit9LessonPlans;
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
