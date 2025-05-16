# TeacherResources Component Refactoring

This folder contains a refactored version of the original `TeacherResources` component. The original component had grown to over 4400 lines of code and was difficult to maintain. The new architecture splits the functionality into smaller, more focused components and utilizes custom hooks for logic separation.

## Architecture Overview

The new architecture consists of:

1. **ResourceRegistry (`client/src/lib/resourceRegistry.ts`)**
   - Centralized mapping of book/unit combinations to resource files
   - Handles special cases like multi-version units (Book 3 Unit 16)
   - Provides utility functions to check resource availability
   - Implements flexible resource loading from various module structures

2. **useTeacherResources Hook (`client/src/hooks/useTeacherResources.ts`)**
   - Custom hook that abstracts resource loading logic
   - Handles both server-stored and dynamically loaded resources
   - Provides filtering, version management, and caching

3. **Component Structure**
   - **TeacherResourcesContainer**: Main container component that manages state and user interactions
   - **ResourceList**: Displays filtered resources in a grid with consistent styling
   - **ResourceEditor**: Form for adding or editing resources

## How to Use

Replace usages of the original `TeacherResources` component with the new `TeacherResourcesContainer`:

```tsx
// Old
import TeacherResources from '@/components/TeacherResources';
<TeacherResources bookId={bookId} unitId={unitId} />

// New
import TeacherResourcesContainer from '@/components/resources/TeacherResourcesContainer';
<TeacherResourcesContainer bookId={bookId} unitId={unitId} />
```

### Properties

The `TeacherResourcesContainer` accepts the following props:

- `bookId`: The ID of the book (required)
- `unitId`: The ID of the unit (required)
- `initialResourceType`: The initial resource type to display ('video', 'game', 'lesson', 'pdf')
- `isEditMode`: Whether to start in edit mode (default: false)

### Testing

A test page is available at `/test/teacher-resources` that allows you to select different book/unit combinations to see the refactored component in action.

## Benefits of the New Architecture

1. **Better Separation of Concerns**
   - Logic is separated from presentation
   - Each component has a single responsibility
   - Data fetching is centralized in hooks

2. **Improved Maintainability**
   - Smaller components are easier to understand and test
   - Changes to one component won't affect others
   - Resource definitions are clearly separated from UI

3. **Enhanced Performance**
   - More efficient resource loading with proper caching
   - Fewer re-renders due to better state management
   - Optimized dynamic imports

4. **Better User Experience**
   - Improved loading states
   - Consistent error handling
   - More responsive UI

## Future Improvements

1. Add unit tests for each component
2. Implement better error boundaries
3. Add caching for resource loading to improve performance
4. Create a more robust resource versioning system