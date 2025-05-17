# Visual English Resource Generator

This document describes how to use the resource generator script to automate the creation of resource files for Book 1 units.

## Overview

The resource generator:
- Takes a structured data input (from JSON/CSV or inline in the script)
- Generates separate resource files for each unit (videos, games, PDFs, and lesson plans)
- Creates a combined resources file for each unit
- Provides code to update the resource registry

## Usage Instructions

### 1. Prepare Your Resource Data

Two options:

#### Option A: Edit the Sample Data in the Script

Modify the `resourcesData` array in `scripts/generate-book1-resources.ts` with your actual resources.

```typescript
const resourcesData: ResourceData[] = [
  // Unit 1 resources
  { 
    unit: '1', 
    type: 'video',
    title: 'Hello Song',
    provider: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/abc123'
  } as VideoResourceData,
  // Add more resources...
];
```

#### Option B: Create a CSV/JSON File

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
npx tsx scripts/generate-book1-resources.ts
```

This will generate unit-specific resource files in the `client/src/data` directory:
- `book1-unit{N}-video-resources.tsx`
- `book1-unit{N}-game-resources.tsx`
- `book1-unit{N}-pdf-resources.tsx`
- `book1-unit{N}-resources.tsx` (combined)

### 3. Update Resource Registry

The script will output code to update `client/src/lib/resourceRegistry.ts`. Copy and paste this code into the appropriate section of the registry file.

Example:
```typescript
// Register Book 1 Unit 1 resources
registerResourceLoader('1', '1', () => import('@/data/book1-unit1-resources').then(m => m.default));

// Register Book 1 Unit 2 resources
registerResourceLoader('1', '2', () => import('@/data/book1-unit2-resources').then(m => m.default));
```

### 4. Unit-Specific PDFs

Following your instructions, PDF resources are now properly organized by unit. Each unit's PDF resources are contained in their own file (`book1-unit{N}-pdf-resources.tsx`) and are only displayed when viewing that specific unit.

The existing `book1-pdf-resources.tsx` file has been updated to use the same unified approach, but can be maintained as a central registry of all PDFs if needed for the "All PDFs" tab.

## CSV Format Example

If using a CSV file, format it like this:

```csv
unit,type,title,provider,embedUrl,pdfUrl,lessonType,lessonObjective
1,video,Hello Song,YouTube,https://www.youtube.com/embed/abc123,,,
1,game,Greetings Match Game,Wordwall,https://wordwall.net/embed/xyz456,,,
1,pdf,Unit 1: Hello - PDF,Visual English,,https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf,,
1,lesson,Greetings Lesson Plan,Visual English,,,main,Learn basic greetings in English
```

## Customization

You can customize the generator by:

1. Modifying the resource creation functions
2. Adding additional resource types
3. Changing the file naming conventions
4. Adapting the output format for different components

## Benefits

This automated approach:
1. Creates consistent resource files for all units
2. Properly organizes resources by unit
3. Ensures compatibility with the UI components
4. Saves time when adding new resources
5. Makes large-scale updates easier