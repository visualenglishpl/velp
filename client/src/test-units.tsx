import React, { useEffect, useState } from 'react';
import { TeacherResource } from './components/TeacherResources';

export default function TestUnits() {
  const [unit4Resources, setUnit4Resources] = useState<TeacherResource[]>([]);
  const [unit5Resources, setUnit5Resources] = useState<TeacherResource[]>([]);
  const [unit6Resources, setUnit6Resources] = useState<TeacherResource[]>([]);
  const [unit7Resources, setUnit7Resources] = useState<TeacherResource[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  
  useEffect(() => {
    console.log('TestUnits component mounted');
    
    const loadResources = async () => {
      try {
        console.log('Trying to import Book 4 Unit 4 implementation');
        const unit4Module = await import('./data/book4-unit4-implementation');
        if (unit4Module.getBook4Unit4Resources) {
          console.log('Found getBook4Unit4Resources function');
          const resources = unit4Module.getBook4Unit4Resources();
          console.log(`Got ${resources.length} resources for Unit 4`);
          setUnit4Resources(resources);
        } else {
          setErrors(prev => [...prev, 'Unit 4: getBook4Unit4Resources function not found']);
        }
      } catch (error) {
        console.error('Error loading Unit 4 resources:', error);
        setErrors(prev => [...prev, `Unit 4: ${(error as Error).message}`]);
      }
      
      try {
        console.log('Trying to import Book 4 Unit 5 implementation');
        const unit5Module = await import('./data/book4-unit5-implementation');
        if (unit5Module.getBook4Unit5Resources) {
          console.log('Found getBook4Unit5Resources function');
          const resources = unit5Module.getBook4Unit5Resources();
          console.log(`Got ${resources.length} resources for Unit 5`);
          setUnit5Resources(resources);
        } else {
          setErrors(prev => [...prev, 'Unit 5: getBook4Unit5Resources function not found']);
        }
      } catch (error) {
        console.error('Error loading Unit 5 resources:', error);
        setErrors(prev => [...prev, `Unit 5: ${(error as Error).message}`]);
      }
      
      try {
        console.log('Trying to import Book 4 Unit 6 implementation');
        const unit6Module = await import('./data/book4-unit6-implementation');
        if (unit6Module.getBook4Unit6Resources) {
          console.log('Found getBook4Unit6Resources function');
          const resources = unit6Module.getBook4Unit6Resources();
          console.log(`Got ${resources.length} resources for Unit 6`);
          setUnit6Resources(resources);
        } else {
          setErrors(prev => [...prev, 'Unit 6: getBook4Unit6Resources function not found']);
        }
      } catch (error) {
        console.error('Error loading Unit 6 resources:', error);
        setErrors(prev => [...prev, `Unit 6: ${(error as Error).message}`]);
      }
      
      try {
        console.log('Trying to import Book 4 Unit 7 implementation');
        const unit7Module = await import('./data/book4-unit7-implementation');
        if (unit7Module.getBook4Unit7Resources) {
          console.log('Found getBook4Unit7Resources function');
          const resources = unit7Module.getBook4Unit7Resources();
          console.log(`Got ${resources.length} resources for Unit 7`);
          setUnit7Resources(resources);
        } else {
          setErrors(prev => [...prev, 'Unit 7: getBook4Unit7Resources function not found']);
        }
      } catch (error) {
        console.error('Error loading Unit 7 resources:', error);
        setErrors(prev => [...prev, `Unit 7: ${(error as Error).message}`]);
      }
    };
    
    loadResources();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Book 4 Unit Resources Test</h1>
      
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Errors:</h2>
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index} className="text-red-600">{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Unit 4 Resources</h2>
          <p className="text-xl">{unit4Resources.length} resources loaded</p>
          {unit4Resources.length > 0 && (
            <ul className="mt-4 list-disc pl-5">
              {unit4Resources.map((resource, index) => (
                <li key={index} className="text-sm">{resource.title}</li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Unit 5 Resources</h2>
          <p className="text-xl">{unit5Resources.length} resources loaded</p>
          {unit5Resources.length > 0 && (
            <ul className="mt-4 list-disc pl-5">
              {unit5Resources.map((resource, index) => (
                <li key={index} className="text-sm">{resource.title}</li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Unit 6 Resources</h2>
          <p className="text-xl">{unit6Resources.length} resources loaded</p>
          {unit6Resources.length > 0 && (
            <ul className="mt-4 list-disc pl-5">
              {unit6Resources.map((resource, index) => (
                <li key={index} className="text-sm">{resource.title}</li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Unit 7 Resources</h2>
          <p className="text-xl">{unit7Resources.length} resources loaded</p>
          {unit7Resources.length > 0 && (
            <ul className="mt-4 list-disc pl-5">
              {unit7Resources.map((resource, index) => (
                <li key={index} className="text-sm">{resource.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
