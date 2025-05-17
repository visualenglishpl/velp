# Book 2 Resource Implementation Guide

This document outlines the implementation of the CSV-based resource management system for Book 2 in the Visual English platform.

## Overview

Similar to the Book 1 implementation, we've created a system that:
1. Reads resource data from a CSV file (`book2-resources.csv`)
2. Generates separate resource files for videos, games, PDFs, and lesson plans
3. Registers these resources in the central registry for dynamic loading

## Current Implementation Status

Book 2 resources have been initially implemented for Units 1-5:

| Unit | Title              | Videos | Games | PDFs | Lesson Plans |
|------|-------------------|--------|-------|------|-------------|
| 1    | Hello and Greetings | ✓     | ✓     | ✓    | ✓           |
| 2    | Numbers            | ✓     | ✓     | ✓    | ✓           |
| 3    | What's the Time?   | ✓     | ✓     | ✓    | ✓           |
| 4    | Days of the Week   | ✓     | ✓     | ✓    | ✓           |
| 5    | The Weather        | ✓     | ✓     | ✓    | ✓           |

## File Structure

The Book 2 resources implementation follows the same structure as Book 1:

- `book2-resources.csv`: CSV file containing all resource data
- `generate-book2-resources-from-csv.js`: Script to generate resource files
- `client/src/data/book2-resources-common.ts`: Helper functions for creating Book 2 resources
- `client/src/data/book2-unit{N}-video-resources.tsx`: Unit-specific video resources
- `client/src/data/book2-unit{N}-game-resources.tsx`: Unit-specific game resources
- `client/src/data/book2-unit{N}-pdf-resources.tsx`: Unit-specific PDF resources
- `client/src/data/book2-unit{N}-lesson-plans.tsx`: Unit-specific lesson plans
- `client/src/data/book2-unit{N}-resources.tsx`: Combined resources for each unit

## Resource Registry Integration

Book 2 resources are registered in the `resourceRegistry.ts` file using the same pattern as Book 1:

```typescript
// Units with CSV-generated resources for Book 2
const book2CsvGeneratedUnits = ['1', '2', '3', '4', '5'];

// Register all Book 2 CSV-generated resources
book2CsvGeneratedUnits.forEach(unit => {
  registerResourceLoader('2', unit as UnitId, 
    () => import(/* @vite-ignore */ `@/data/book2-unit${unit}-resources`).then(m => m.default)
  );
});
```

## Adding More Units

To add more units to Book 2:

1. Add new entries to the `book2-resources.csv` file with the appropriate unit number
2. Run the generator script: `node generate-book2-resources-from-csv.js`
3. Update the `book2CsvGeneratedUnits` array in `resourceRegistry.ts` if needed

## Resource Type Guidelines

### Video Resources

Book 2 video resources should be structured as:
- `title`: Descriptive title of the video (e.g., "Greetings Dialogue")
- `provider`: Usually "YouTube" for consistency
- `embedUrl`: Full YouTube embed URL (e.g., "https://www.youtube.com/embed/MdEnuU6_idg")

### Game Resources

Book 2 game resources should be structured as:
- `title`: Descriptive title of the game (e.g., "Greetings and Introductions")
- `provider`: Usually "Wordwall" for consistency
- `embedUrl`: Full Wordwall resource URL (e.g., "https://wordwall.net/resource/43120/english/greetings")

### PDF Resources

Book 2 PDF resources should be structured as:
- `title`: Descriptive title of the PDF (e.g., "Unit 1: Hello and Greetings - PDF")
- `provider`: Usually "Visual English" for consistency
- `pdfUrl`: Full S3 URL to the PDF file

### Lesson Plan Resources

Book 2 lesson plan resources should be structured as:
- `title`: Descriptive title of the lesson plan (e.g., "Introducing Yourself Lesson Plan")
- `provider`: Usually "Visual English" for consistency
- `lessonType`: Type of lesson, typically "main", "phonics", or "conversation"
- `lessonObjective`: Learning objective for the lesson

## Testing Resources

You can test Book 2 resources by:

1. Using the web application and selecting Book 2 and the desired unit
2. Using the standalone resource viewer by selecting Book 2 in the dropdown
3. Directly accessing the generated files in the developer console

## Next Steps

Future enhancements for Book 2 resources:

1. Complete the implementation for all 18 units
2. Add additional lesson types (phonics, conversation) for each unit
3. Enhance PDF resources with thumbnails and descriptions
4. Create a unified resource browser for all books