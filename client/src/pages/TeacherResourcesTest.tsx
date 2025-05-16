/**
 * Teacher Resources Test Page
 * 
 * This page demonstrates the refactored TeacherResources component
 * with the new modular architecture.
 */

import { TeacherResourcesContainer } from '@/components/resources/TeacherResourcesContainer';

export default function TeacherResourcesTest() {
  return (
    <div className="container py-8 px-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Teacher Resources (Refactored)
      </h1>
      
      <div className="mb-10 text-center">
        <p className="text-lg text-muted-foreground">
          This page demonstrates the refactored TeacherResources component with a modular architecture.
          <br />
          The original 4400+ line component has been split into smaller, focused components.
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Demo: Book 3 Unit 16 (Multiple Versions Support)
        </h2>
        <TeacherResourcesContainer 
          initialBookId="3" 
          initialUnitId="16"
          showSelection={true}
          enableEditing={true}
        />
      </div>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Demo: Book 1 Unit 1
        </h2>
        <TeacherResourcesContainer 
          initialBookId="1" 
          initialUnitId="1"
          showSelection={false}
          enableEditing={false}
          readOnly={true}
        />
      </div>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Demo: Empty State (No Selection)
        </h2>
        <TeacherResourcesContainer 
          showEmptyState={true}
        />
      </div>
    </div>
  );
}