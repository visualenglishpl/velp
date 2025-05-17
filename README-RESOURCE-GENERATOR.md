# Visual English Resource Generator

This document describes how to use the CSV-based resource generator script to automate the creation of resource files for Book 1 units. The system has been enhanced to provide a simpler and more maintainable approach for managing educational resources.

## Overview

The resource generator:
- Takes a structured data input (from JSON/CSV or inline in the script)
- Generates separate resource files for each unit (videos, games, PDFs, and lesson plans)
- Creates a combined resources file for each unit
- Provides code to update the resource registry

## Usage Instructions

### 1. Prepare Your Resource Data

The recommended approach is to use the CSV file:

#### Using the CSV File (Recommended)

Create a CSV file with columns:
- unit: The unit number (1-18)
- type: The resource type (video, game, pdf, lesson)
- title: The resource title
- provider: The provider name (YouTube, Wordwall, Visual English, etc.)
- embedUrl: For videos and games
- pdfUrl: For PDFs
- lessonType: For lesson plans
- lessonObjective: For lesson plans

Then modify the script to import from this file.

### 2. Run the Generator

Execute the script with:

```bash
node generate-book1-resources-from-csv.js
```

This will:
1. Read the CSV file (`book1-resources.csv`)
2. Group resources by unit
3. Generate the following unit-specific resource files in the `client/src/data` directory:
   - `book1-unit{N}-video-resources.tsx`: Contains video resources
   - `book1-unit{N}-game-resources.tsx`: Contains game resources
   - `book1-unit{N}-pdf-resources.tsx`: Contains PDF resources
   - `book1-unit{N}-lesson-plans.tsx`: Contains lesson plans
   - `book1-unit{N}-resources.tsx`: Combined resources file that imports all of the above

### 3. Update Resource Registry

The script will output code to update `client/src/lib/resourceRegistry.ts`. You have two options for registering resources:

#### Option A: Manual Registration (Traditional)

Copy and paste the output code into the appropriate section of the registry file:

```typescript
// Register Book 1 Unit 1 resources
registerResourceLoader('1', '1', () => import('@/data/book1-unit1-resources').then(m => m.default));

// Register Book 1 Unit 2 resources
registerResourceLoader('1', '2', () => import('@/data/book1-unit2-resources').then(m => m.default));
```

#### Option B: Automatic Registration (Advanced)

For a more maintainable approach, you can use the dynamic registration pattern that's already implemented in the resource registry:

```typescript
// Define units with CSV-generated resources
const csvGeneratedUnits = ['1', '2', '3', '4', '5', '6', '7', '8'];

// Register all CSV-generated resources
csvGeneratedUnits.forEach(unit => {
  registerResourceLoader('1', unit as UnitId, 
    () => import(`@/data/book1-unit${unit}-resources`).then(m => m.default)
  );
});
```

This approach automatically registers all units listed in the `csvGeneratedUnits` array, making it easier to add more units in the future.

### 4. Unit-Specific PDFs

Following your instructions, PDF resources are now properly organized by unit. Each unit's PDF resources are contained in their own file (`book1-unit{N}-pdf-resources.tsx`) and are only displayed when viewing that specific unit.

The existing `book1-pdf-resources.tsx` file has been updated to use the same unified approach, but can be maintained as a central registry of all PDFs if needed for the "All PDFs" tab.

## CSV Format Example

The CSV file format has been standardized to make resource management more straightforward. Here's the current format:

```csv
unit,type,title,provider,embedUrl,fileUrl,lessonType,lessonObjective,pdfUrl
1,video,Hello Song,YouTube,https://www.youtube.com/embed/tVlcKp3bWH8,,,,
1,video,Good Morning Song,YouTube,https://www.youtube.com/embed/CuI_p7a9VGs,,,,
1,game,Greetings Matching,Wordwall,https://wordwall.net/resource/11837368/greetings,,,,
1,pdf,Unit 1: Hello - PDF,Visual English,,,,,https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf
1,lesson,Greetings Lesson Plan,Visual English,,,main,Learn basic greetings in English,
```

Note the specific formatting requirements:
- All columns must be present in the header row
- The `unit` column should contain only the unit number (1-18)
- The `type` column must be one of: video, game, pdf, lesson
- For video resources, provide the YouTube embed URL in the `embedUrl` column
- For game resources, provide the game embed URL in the `embedUrl` column
- For PDF resources, provide the PDF URL in the `pdfUrl` column
- For lesson plans, provide the lesson type in `lessonType` and the objective in `lessonObjective`

## Implementation Details

### Resource Creation Functions

The generator uses helper functions from `client/src/data/book1-resources-common.ts` to create properly structured resources:

- `createBook1VideoResource`: Creates YouTube video resources
- `createBook1GameResource`: Creates interactive game resources
- `createBook1PdfResource`: Creates PDF document resources
- `createBook1LessonPlanResource`: Creates lesson plan resources

These functions ensure that all resources have consistent structure and adhere to the type definitions in `client/src/types/TeacherResource.ts`.

### Resource Registry Integration

The resource registry in `client/src/lib/resourceRegistry.ts` is designed to automatically find and load the appropriate resources for each book and unit. The system first attempts to load unit-specific resources, and only falls back to older approaches if those aren't found.

The current implementation includes:
1. **Dynamic import pattern**: Uses `() => import(...)` for lazy loading
2. **Unit-specific loading**: Each unit's resources are stored in separate files
3. **Automatic registration**: Using `csvGeneratedUnits` to register multiple units at once

### Resource Display

The TeacherResourcesContainer component automatically loads and displays the resources based on the selected book and unit. It uses the `useTeacherResources` hook which:

1. Fetches the resources for the current book and unit
2. Filters them by type (video, game, pdf, lesson)
3. Displays them in the appropriate tabs

## Customization

You can customize the generator by:

1. Modifying the resource creation functions in `book1-resources-common.ts`
2. Adding additional resource types to the CSV format
3. Changing the file naming conventions in the generator script
4. Adapting the output format for different components

## Benefits

This CSV-based approach offers significant advantages:

1. **Non-technical Content Management**: Content creators can add or modify resources without coding knowledge
2. **Consistent Organization**: Resources are properly organized by unit and type
3. **Separation of Concerns**: Each unit's resources are isolated in their own files
4. **Maintainable Structure**: Changes to one unit don't affect others
5. **Automated Workflow**: Generate resources with a single command
6. **Proper PDF Organization**: PDF resources are now organized by unit, not all in Unit 1
7. **Future-Proof Design**: Easy to extend to other books and resource types
8. **Reduced Duplication**: Reuses common helper functions for resource creation