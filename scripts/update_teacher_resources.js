/**
 * Update Teacher Resources Component
 * 
 * This script updates the TeacherResources.tsx file to include support for all books (0A-7).
 * It modifies the dynamic import functions and adds the necessary book title constants.
 */

// Book configuration
const BOOKS = [
  { id: '0a', name: 'VISUAL 0A', units: 20, requiresLessonPlans: true },
  { id: '0b', name: 'VISUAL 0B', units: 20, requiresLessonPlans: true },
  { id: '0c', name: 'VISUAL 0C', units: 20, requiresLessonPlans: true },
  { id: '1', name: 'VISUAL 1', units: 18, requiresLessonPlans: false },
  { id: '2', name: 'VISUAL 2', units: 18, requiresLessonPlans: false },
  { id: '3', name: 'VISUAL 3', units: 18, requiresLessonPlans: false },
  { id: '4', name: 'VISUAL 4', units: 16, requiresLessonPlans: false },
  { id: '5', name: 'VISUAL 5', units: 16, requiresLessonPlans: false },
  { id: '6', name: 'VISUAL 6', units: 16, requiresLessonPlans: false },
  { id: '7', name: 'VISUAL 7', units: 16, requiresLessonPlans: false }
];

// Special unit configurations (units with no teacher resources)
const SPECIAL_UNITS = {
  '5': ['2', '3', '4', '6', '7', '8', '10']
};

// Generate dynamic import functions
function generateDynamicImportFunctions() {
  let implImport = `const dynamicImplImport = async (book: string, unit: number) => {\n`;
  implImport += `  try {\n`;
  
  // Generate implementation import for each book
  BOOKS.forEach(book => {
    implImport += `    if (book === '${book.id}') {\n`;
    implImport += `      switch(unit) {\n`;
    
    // Generate cases for each unit
    for (let i = 1; i <= book.units; i++) {
      // Skip special units that don't have resources
      if (SPECIAL_UNITS[book.id] && SPECIAL_UNITS[book.id].includes(i.toString())) {
        continue;
      }
      
      implImport += `        case ${i}:\n`;
      implImport += `          return import('@/data/book${book.id}-unit${i}-implementation');\n`;
    }
    
    implImport += `        default:\n`;
    implImport += `          return null;\n`;
    implImport += `      }\n`;
    implImport += `    }\n`;
  });
  
  implImport += `    return null;\n`;
  implImport += `  } catch (error) {\n`;
  implImport += `    console.error(\`Error loading implementation for Book \${book}, Unit \${unit}:\`, error);\n`;
  implImport += `    return null;\n`;
  implImport += `  }\n`;
  implImport += `};\n\n`;
  
  // Resources import function
  let resourceImport = `const dynamicResourceImport = async (book: string, unit: number) => {\n`;
  resourceImport += `  try {\n`;
  
  // Generate resource import for each book
  BOOKS.forEach(book => {
    resourceImport += `    if (book === '${book.id}') {\n`;
    resourceImport += `      switch(unit) {\n`;
    
    // Generate cases for each unit
    for (let i = 1; i <= book.units; i++) {
      // Skip special units that don't have resources
      if (SPECIAL_UNITS[book.id] && SPECIAL_UNITS[book.id].includes(i.toString())) {
        continue;
      }
      
      resourceImport += `        case ${i}:\n`;
      resourceImport += `          return import('@/data/book${book.id}-unit${i}-resources');\n`;
    }
    
    resourceImport += `        default:\n`;
    resourceImport += `          return null;\n`;
    resourceImport += `      }\n`;
    resourceImport += `    }\n`;
  });
  
  resourceImport += `    return null;\n`;
  resourceImport += `  } catch (error) {\n`;
  resourceImport += `    console.error(\`Error loading resources for Book \${book}, Unit \${unit}:\`, error);\n`;
  resourceImport += `    return null;\n`;
  resourceImport += `  }\n`;
  resourceImport += `};\n`;
  
  return implImport + resourceImport;
}

// Generate book title constants
function generateBookTitleConstants() {
  let constants = '';
  
  BOOKS.forEach(book => {
    constants += `// Unit titles for Book ${book.id}\n`;
    constants += `const BOOK${book.id.toUpperCase()}_UNIT_TITLES: Record<string, string> = {\n`;
    
    for (let i = 1; i <= book.units; i++) {
      constants += `  '${i}': 'Unit ${i}',\n`;
    }
    
    constants += `};\n\n`;
  });
  
  return constants;
}

// Generate isSpecialBookUnit function
function generateIsSpecialBookUnitFunction() {
  let func = `// Check if this is a special book/unit with predefined resources\n`;
  
  // Add comments for special unit configurations
  Object.entries(SPECIAL_UNITS).forEach(([bookId, units]) => {
    func += `// For Book ${bookId}, units ${units.join(', ')} have no teacher resources\n`;
  });
  
  func += `const isSpecialBookUnit = \n`;
  
  // Generate conditions for each book
  BOOKS.forEach((book, index) => {
    const units = [];
    
    for (let i = 1; i <= book.units; i++) {
      // Skip special units that don't have resources
      if (SPECIAL_UNITS[book.id] && SPECIAL_UNITS[book.id].includes(i.toString())) {
        continue;
      }
      
      units.push(`'${i}'`);
    }
    
    func += `  (bookId === '${book.id}' && [${units.join(', ')}].includes(unitId))`;
    
    if (index < BOOKS.length - 1) {
      func += ` ||\n`;
    } else {
      func += `;\n`;
    }
  });
  
  return func;
}

// Generate resource generation function for getMoreUnitResources
function generateResourceGenerationFunction() {
  let func = `// Function to get additional resources for specific book/unit combinations\n`;
  func += `const getMoreUnitResources = useCallback((): TeacherResource[] => {\n`;
  
  // Generate conditions for each book
  BOOKS.forEach(book => {
    func += `  // Book ${book.id} units - use centralized resource generator\n`;
    func += `  if (bookId === '${book.id}') {\n`;
    
    // Generate special cases for each unit
    for (let i = 1; i <= book.units; i++) {
      // Skip special units that don't have resources
      if (SPECIAL_UNITS[book.id] && SPECIAL_UNITS[book.id].includes(i.toString())) {
        continue;
      }
      
      func += `    // Special case for Unit ${i}\n`;
      func += `    if (unitId === '${i}') {\n`;
      func += `      try {\n`;
      func += `        console.log('Loading Book ${book.id} Unit ${i} resources from implementation');\n`;
      func += `        return getBook${book.id}Unit${i}Resources(bookId, unitId);\n`;
      func += `      } catch (error) {\n`;
      func += `        console.error('Error getting Book ${book.id} Unit ${i} resources, falling back to common resources:', error);\n`;
      func += `        return generateBook${book.id}UnitResources(bookId, unitId);\n`;
      func += `      }\n`;
      func += `    }\n`;
    }
    
    func += `    // For other units, use the centralized resource generator\n`;
    func += `    const resources = generateBook${book.id}UnitResources(bookId, unitId);\n`;
    func += `    console.log(\`Generated \${resources.length} resources for Book ${book.id} Unit \${unitId}\`);\n`;
    func += `    return resources;\n`;
    func += `  }\n`;
  });
  
  func += `  // Default resource generation\n`;
  func += `  console.log(\`No specific resource generator for Book \${bookId} Unit \${unitId}, using empty array\`);\n`;
  func += `  return [];\n`;
  func += `}, [bookId, unitId]);\n`;
  
  return func;
}

// Generate the complete updated file content
function generateUpdatedFile() {
  const dynamicImportFunctions = generateDynamicImportFunctions();
  const bookTitleConstants = generateBookTitleConstants();
  const isSpecialBookUnitFunction = generateIsSpecialBookUnitFunction();
  const resourceGenerationFunction = generateResourceGenerationFunction();
  
  console.log('Generated dynamic import functions');
  console.log('Generated book title constants');
  console.log('Generated isSpecialBookUnit function');
  console.log('Generated resource generation function');
  
  console.log('\nTo update TeacherResources.tsx:\n');
  console.log('1. Replace the dynamicImplImport and dynamicResourceImport functions');
  console.log('2. Add the book title constants at the top of the file');
  console.log('3. Replace the isSpecialBookUnit function');
  console.log('4. Replace the getMoreUnitResources function');
  
  console.log('\nGenerated code is ready for use.');
}

// Run the generation
generateUpdatedFile();
