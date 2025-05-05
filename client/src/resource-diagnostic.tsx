/**
 * Simple diagnostic component to test resource loading
 * This directly imports resource files and logs their contents
 */

import React, { useEffect } from 'react';

export default function ResourceDiagnostic() {
  useEffect(() => {
    console.log('Resource Diagnostic Component - Starting tests');
    
    const runDiagnostics = async () => {
      // Book 4 Unit 4
      try {
        console.log('Testing Book 4 Unit 4');
        const unit4Resources = await import('./data/book4-unit4-resources');
        console.log('Book 4 Unit 4 resources found:', unit4Resources);
        if (unit4Resources.resources) {
          console.log(`Book 4 Unit 4 has ${unit4Resources.resources.length} resources`);
        } else {
          console.error('Book 4 Unit 4 resources array not found');
        }
      } catch (error) {
        console.error('Error loading Book 4 Unit 4 resources:', error);
      }
      
      // Book 4 Unit 5
      try {
        console.log('Testing Book 4 Unit 5');
        const unit5Resources = await import('./data/book4-unit5-resources');
        console.log('Book 4 Unit 5 resources found:', unit5Resources);
        if (unit5Resources.resources) {
          console.log(`Book 4 Unit 5 has ${unit5Resources.resources.length} resources`);
        } else {
          console.error('Book 4 Unit 5 resources array not found');
        }
      } catch (error) {
        console.error('Error loading Book 4 Unit 5 resources:', error);
      }
      
      // Book 4 Unit 6
      try {
        console.log('Testing Book 4 Unit 6');
        const unit6Resources = await import('./data/book4-unit6-resources');
        console.log('Book 4 Unit 6 resources found:', unit6Resources);
        if (unit6Resources.resources) {
          console.log(`Book 4 Unit 6 has ${unit6Resources.resources.length} resources`);
        } else {
          console.error('Book 4 Unit 6 resources array not found');
        }
      } catch (error) {
        console.error('Error loading Book 4 Unit 6 resources:', error);
      }
      
      // Book 4 Unit 7
      try {
        console.log('Testing Book 4 Unit 7');
        const unit7Resources = await import('./data/book4-unit7-resources');
        console.log('Book 4 Unit 7 resources found:', unit7Resources);
        if (unit7Resources.resources) {
          console.log(`Book 4 Unit 7 has ${unit7Resources.resources.length} resources`);
        } else {
          console.error('Book 4 Unit 7 resources array not found');
        }
      } catch (error) {
        console.error('Error loading Book 4 Unit 7 resources:', error);
      }
      
      // Test implementation files as well
      try {
        console.log('Testing Book 4 Unit 4 implementation');
        const unit4Implementation = await import('./data/book4-unit4-implementation');
        console.log('Book 4 Unit 4 implementation found:', unit4Implementation);
        if (unit4Implementation.getBook4Unit4Resources) {
          console.log('getBook4Unit4Resources function exists');
          const resources = unit4Implementation.getBook4Unit4Resources();
          console.log(`Function returned ${resources.length} resources`);
        } else {
          console.error('getBook4Unit4Resources function not found');
        }
      } catch (error) {
        console.error('Error loading Book 4 Unit 4 implementation:', error);
      }
    };
    
    runDiagnostics();
  }, []);
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Resource Diagnostic Tool</h1>
      <p>Check console for detailed diagnostic information</p>
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800">Diagnosing Book 4 Unit resources...</p>
      </div>
    </div>
  );
}
