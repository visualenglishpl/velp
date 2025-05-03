import React, { useState, useEffect } from 'react';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import LessonPlanDisplay from '@/components/LessonPlanDisplay';
import { TeacherResource } from '@/components/TeacherResources';
import ResourceDisplay from '@/components/ResourceDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// Import lesson plans for Book 5
import { generateUnit1LessonPlans } from '@/data/book5-unit1-implementation';
import { generateUnit5LessonPlans } from '@/data/book5-unit5-implementation';
import { generateUnit9LessonPlans } from '@/data/book5-unit9-implementation';
import { generateUnit13LessonPlans } from '@/data/book5-unit13-implementation';

// Import lesson plans for Book 6
import { getBook6Unit5LessonPlans } from '@/data/book6-unit5-implementation';
import { getBook6Unit7LessonPlans } from '@/data/book6-unit7-implementation';
import { getBook6Unit9LessonPlans } from '@/data/book6-unit9-resources';
import { getBook6Unit11LessonPlans } from '@/data/book6-unit11-resources';
import { getBook6Unit14LessonPlans } from '@/data/book6-unit14-resources';

// Import resources for Book 6
import { book6Unit9Resources } from '@/data/book6-unit9-resources';
import { book6Unit11Resources } from '@/data/book6-unit11-resources';
import { book6Unit14Resources } from '@/data/book6-unit14-resources';

// TestTeacherResources component
const TestTeacherResources: React.FC = () => {
  // Group the lesson plans by book using getter functions
  const book5Plans = {
    unit1: generateUnit1LessonPlans(),
    unit5: generateUnit5LessonPlans(),
    unit9: generateUnit9LessonPlans(),
    unit13: generateUnit13LessonPlans()
  };

  const book6Plans = {
    unit5: getBook6Unit5LessonPlans(),
    unit7: getBook6Unit7LessonPlans(),
    unit9: getBook6Unit9LessonPlans(),
    unit11: getBook6Unit11LessonPlans(),
    unit14: getBook6Unit14LessonPlans()
  };

  // Group the resources
  const book6Resources = {
    unit9: book6Unit9Resources.filter(r => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4),
    unit11: book6Unit11Resources.filter(r => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4),
    unit14: book6Unit14Resources.filter(r => r.resourceType === 'video' || r.resourceType === 'game').slice(0, 4)
  };

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
      // Dynamically import the resource module based on book and unit
      const module = await import(`@/data/book${selectedBook}-unit${selectedUnit}-resources`);
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
        setResources([]);
        setError('Resources found but in an unknown format');
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
      
      <Tabs defaultValue="lessonPlans" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lessonPlans">Lesson Plans</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="dynamicTest">Dynamic Resource Test</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessonPlans">
          <Tabs defaultValue="book5" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="book5">Book 5</TabsTrigger>
              <TabsTrigger value="book6">Book 6</TabsTrigger>
            </TabsList>
            
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
          <p className="mb-4">These are sample videos and games from selected units in Book 6.</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Unit 9 - Present Perfect - What Has Just Happened</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book6Resources.unit9.map((resource: TeacherResource, index: number) => (
                <ResourceDisplay key={resource.id || index} resource={resource} />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Unit 11 - Extreme Sports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book6Resources.unit11.map((resource: TeacherResource, index: number) => (
                <ResourceDisplay key={resource.id || index} resource={resource} />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Unit 14 - Are You a Survivor?</h3>
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
    </div>
  );
};

export default TestTeacherResources;
