import React, { useState, useEffect } from 'react';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import LessonPlanDisplay from '@/components/LessonPlanDisplay';
import { TeacherResource } from '@/components/TeacherResources';
import ResourceDisplay from '@/components/ResourceDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// Dynamically load these resources and lesson plans when needed, rather than at import time
// This significantly improves initial load performance

// TestTeacherResources component
const TestTeacherResources: React.FC = () => {
  // Define interfaces for type safety
  interface PlanCollection {
    [key: string]: LessonPlan[];
  }

  interface ResourceCollection {
    [key: string]: TeacherResource[];
  }

  // State for lesson plans and resources
  const [book1Plans, setBook1Plans] = useState<PlanCollection>({
    unit1: []
  });

  const [book5Plans, setBook5Plans] = useState<PlanCollection>({
    unit1: [],
    unit5: [],
    unit9: [],
    unit13: []
  });

  const [book6Plans, setBook6Plans] = useState<PlanCollection>({
    unit5: [],
    unit7: [],
    unit9: [],
    unit11: [],
    unit14: []
  });

  // Group the resources
  const [book1Resources, setBook1Resources] = useState<ResourceCollection>({
    unit1: []
  });

  const [book6Resources, setBook6Resources] = useState<ResourceCollection>({
    unit9: [],
    unit11: [],
    unit14: []
  });
  
  // Loading states
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingInitialData(true);
      
      // Load lesson plans for Book 1
      try {
        const book1Unit1Module = await import('@/data/book1-unit1-implementation');
        const book1Unit1ResourcesModule = await import('@/data/book1-unit1-resources');
        
        setBook1Plans({
          unit1: book1Unit1Module.generateUnit1LessonPlans()
        });
        
        // Load resources for Book 1
        console.log('Book 1 Unit 1 resources loaded:', book1Unit1ResourcesModule.book1Unit1Resources);
        
        const filteredResources = book1Unit1ResourcesModule.book1Unit1Resources.filter(
          (r: TeacherResource) => r.resourceType === 'video' || r.resourceType === 'game'
        );
        console.log('Filtered resources:', filteredResources);
        
        setBook1Resources({
          unit1: filteredResources
        });
      } catch (error) {
        console.error('Error loading Book 1 data:', error);
      }
      
      // Load lesson plans for Book 5 (these are now loaded dynamically at runtime rather than at import time)
      try {
        const book5Unit1Module = await import('@/data/book5-unit1-implementation');
        const book5Unit5Module = await import('@/data/book5-unit5-implementation');
        const book5Unit9Module = await import('@/data/book5-unit9-implementation');
        const book5Unit13Module = await import('@/data/book5-unit13-implementation');
        
        setBook5Plans({
          unit1: book5Unit1Module.generateUnit1LessonPlans(),
          unit5: book5Unit5Module.generateUnit5LessonPlans(),
          unit9: book5Unit9Module.generateUnit9LessonPlans(),
          unit13: book5Unit13Module.generateUnit13LessonPlans()
        });
      } catch (error) {
        console.error('Error loading Book 5 lesson plans:', error);
      }
      
      // Load lesson plans for Book 6
      try {
        const book6Unit5Module = await import('@/data/book6-unit5-implementation');
        const book6Unit7Module = await import('@/data/book6-unit7-implementation');
        const book6Unit9ResourcesModule = await import('@/data/book6-unit9-resources');
        const book6Unit11ResourcesModule = await import('@/data/book6-unit11-resources');
        const book6Unit14ResourcesModule = await import('@/data/book6-unit14-resources');
        
        setBook6Plans({
          unit5: book6Unit5Module.getBook6Unit5LessonPlans(),
          unit7: book6Unit7Module.getBook6Unit7LessonPlans(),
          unit9: book6Unit9ResourcesModule.getBook6Unit9LessonPlans(),
          unit11: book6Unit11ResourcesModule.getBook6Unit11LessonPlans(),
          unit14: book6Unit14ResourcesModule.getBook6Unit14LessonPlans()
        });
        
        // Load resources for Book 6
        setBook6Resources({
          unit9: book6Unit9ResourcesModule.book6Unit9Resources.filter((r: TeacherResource) => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4),
          unit11: book6Unit11ResourcesModule.book6Unit11Resources.filter((r: TeacherResource) => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4),
          unit14: book6Unit14ResourcesModule.book6Unit14Resources.filter((r: TeacherResource) => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4)
        });
      } catch (error) {
        console.error('Error loading Book 6 data:', error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };
    
    loadData();
  }, []);

  // State for dynamic resource testing
  const [selectedBook, setSelectedBook] = useState('5');
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load resources dynamically
  const loadResources = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Dynamically import the resource module based on book and unit using a pattern Vite can analyze
      // Using /* @vite-ignore */ to suppress Vite warnings about dynamic imports
      let modulePath = '';
      
      if (selectedBook === '0a') {
        modulePath = `book0a-unit${selectedUnit}-resources`;
      } else if (selectedBook === '0b') {
        modulePath = `book0b-unit${selectedUnit}-resources`;
      } else if (selectedBook === '0c') {
        modulePath = `book0c-unit${selectedUnit}-resources`;
      } else if (selectedBook === '1') {
        modulePath = `book1-unit${selectedUnit}-resources`;
      } else if (selectedBook === '2') {
        modulePath = `book2-unit${selectedUnit}-resources`;
      } else if (selectedBook === '3') {
        modulePath = `book3-unit${selectedUnit}-resources`;
      } else if (selectedBook === '4') {
        modulePath = `book4-unit${selectedUnit}-resources`;
      } else if (selectedBook === '5') {
        modulePath = `book5-unit${selectedUnit}-resources`;
      } else if (selectedBook === '6') {
        modulePath = `book6-unit${selectedUnit}-resources`;
      } else if (selectedBook === '7') {
        modulePath = `book7-unit${selectedUnit}-resources`;
      }
      
      console.log(`Loading module: @/data/${modulePath}`);
      const module = await import(/* @vite-ignore */ `@/data/${modulePath}`);
      
      // Check if the module has a resources array or a getter function
      if (module.resources) {
        setResources(module.resources);
      } else if (typeof module.getResources === 'function') {
        setResources(module.getResources());
      } else if (typeof module[`getBook${selectedBook}Unit${selectedUnit}Resources`] === 'function') {
        setResources(module[`getBook${selectedBook}Unit${selectedUnit}Resources`]());
      } else if (module[`book${selectedBook}Unit${selectedUnit}Resources`]) {
        setResources(module[`book${selectedBook}Unit${selectedUnit}Resources`]);
      } else {
        // Try common resource variable patterns
        const commonVarName = `book${selectedBook}Unit${selectedUnit}Resources`;
        if (module[commonVarName]) {
          setResources(module[commonVarName]);
        } else {
          // If we got here, we found the module but couldn't extract resources
          console.log('Module found but no recognizable resource pattern:', Object.keys(module));
          setResources([]);
          setError('Resources found but in an unknown format. Check console for details.');
        }
      }
    } catch (error) {
      console.error('Error loading resources:', error);
      setResources([]);
      setError(`Failed to load resources for Book ${selectedBook} Unit ${selectedUnit}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Teacher Resources Test Page</h1>
      <p className="mb-8">This page demonstrates the lesson plans and resources that have been created for specific units in Book 5 and Book 6.</p>
      
      {isLoadingInitialData ? (
        <div className="w-full flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">Loading resources...</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a moment as resources are being loaded dynamically</p>
        </div>
      ) : (
        <Tabs defaultValue="lessonPlans" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lessonPlans">Lesson Plans</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="dynamicTest">Dynamic Resource Test</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessonPlans">
          <Tabs defaultValue="book1" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="book1">Book 1</TabsTrigger>
              <TabsTrigger value="book5">Book 5</TabsTrigger>
              <TabsTrigger value="book6">Book 6</TabsTrigger>
            </TabsList>
            
            <TabsContent value="book1">
              <h2 className="text-2xl font-bold mb-4">Book 1 Lesson Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 1 - Hello and Goodbye</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book1Plans.unit1.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="book5">
              <h2 className="text-2xl font-bold mb-4">Book 5 Lesson Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 1 - Schools in the UK and USA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book5Plans.unit1.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 5 - Winter Fun</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book5Plans.unit5.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 9 - Emotions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book5Plans.unit9.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 13 - Irregular Verbs - Past Tense</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book5Plans.unit13.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="book6">
              <h2 className="text-2xl font-bold mb-4">Book 6 Lesson Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 5 - Theme Park</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book6Plans.unit5.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 7 - What Your Body Can Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book6Plans.unit7.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 9 - Present Perfect - What Has Just Happened</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book6Plans.unit9.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 11 - Extreme Sports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book6Plans.unit11.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Unit 14 - Are You a Survivor?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] overflow-y-auto">
                      {book6Plans.unit14.map((plan: LessonPlan, index: number) => (
                        <div key={plan.id || index} className="mb-8">
                          <LessonPlanDisplay lessonPlan={plan} />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="resources">
          <h2 className="text-2xl font-bold mb-4">Sample Resources</h2>
          <p className="mb-4">These are sample videos and games from selected units in Book 1 and Book 6.</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Book 1 - Unit 1 - Hello and Goodbye</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book1Resources.unit1.map((resource: TeacherResource, index: number) => (
                <ResourceDisplay key={resource.id || index} resource={resource} />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Book 6 - Unit 9 - Present Perfect - What Has Just Happened</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book6Resources.unit9.map((resource: TeacherResource, index: number) => (
                <ResourceDisplay key={resource.id || index} resource={resource} />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Book 6 - Unit 11 - Extreme Sports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book6Resources.unit11.map((resource: TeacherResource, index: number) => (
                <ResourceDisplay key={resource.id || index} resource={resource} />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Book 6 - Unit 14 - Are You a Survivor?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book6Resources.unit14.map((resource: TeacherResource, index: number) => (
                <ResourceDisplay key={resource.id || index} resource={resource} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dynamicTest">
          <h2 className="text-2xl font-bold mb-4">Dynamic Resource Loading Test</h2>
          <p className="mb-4">This section tests the dynamic resource loading for any book and unit combination. This verifies that all units have resources available.</p>
          
          <div className="flex gap-4 mb-6">
            <div>
              <label htmlFor="book-select" className="block text-sm font-medium mb-1">Select Book</label>
              <select 
                id="book-select"
                className="py-2 px-3 border border-gray-300 rounded-md w-32"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
              >
                <option value="0a">Book 0A</option>
                <option value="0b">Book 0B</option>
                <option value="0c">Book 0C</option>
                <option value="1">Book 1</option>
                <option value="2">Book 2</option>
                <option value="3">Book 3</option>
                <option value="4">Book 4</option>
                <option value="5">Book 5</option>
                <option value="6">Book 6</option>
                <option value="7">Book 7</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="unit-select" className="block text-sm font-medium mb-1">Select Unit</label>
              <select 
                id="unit-select"
                className="py-2 px-3 border border-gray-300 rounded-md w-32"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(Number(e.target.value))}
              >
                {Array.from({ length: selectedBook.startsWith('0') || selectedBook === '1' || selectedBook === '2' || selectedBook === '3' ? 
                  (selectedBook.startsWith('0') ? 20 : 18) : 16 }, (_, i) => i + 1).map(unit => (
                  <option key={unit} value={unit}>Unit {unit}</option>
                ))}
              </select>
            </div>
            
            <div className="self-end">
              <Button onClick={loadResources}>Load Resources</Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading resources...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          ) : resources.length > 0 ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Book {selectedBook} - Unit {selectedUnit} Resources ({resources.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.filter(r => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4).map((resource: TeacherResource, index: number) => (
                  <ResourceDisplay key={resource.id || index} resource={resource} />
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-bold mb-2">All Resource Types:</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(resources.reduce((acc, resource) => {
                    acc[resource.resourceType] = (acc[resource.resourceType] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)).map(([type, count]) => (
                    <li key={type}>{type}: {count}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md mb-6">
              No resources loaded yet. Select a book and unit, then click "Load Resources".
            </div>
          )}
        </TabsContent>
      </Tabs>
      )}
    </div>
  );
};

export default TestTeacherResources;
