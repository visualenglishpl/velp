import React from 'react';
import { TeacherResource } from '@/types/TeacherResource';
import { FileText, CheckCircle2 } from 'lucide-react';

interface SideBySideLessonPlanViewProps {
  lessonPlans: TeacherResource[];
}

export function SideBySideLessonPlanView({ lessonPlans }: SideBySideLessonPlanViewProps) {
  // If we don't have exactly 2 lesson plans, display a message
  if (lessonPlans.length !== 2) {
    return (
      <div className="text-center py-8 text-gray-500">
        A side-by-side view requires exactly 2 lesson plans. {lessonPlans.length} lesson plans available.
      </div>
    );
  }

  // Extract the two lesson plans
  const [greenPlan, bluePlan] = lessonPlans;

  // Helper function to generate random duration if not provided
  const getDuration = (resource: TeacherResource): string => {
    return resource.lessonPlan?.duration || '45 minutes';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Educational Videos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Green Lesson Plan on Left */}
        <div className="bg-emerald-500 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center text-white">
            <h3 className="font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {greenPlan.title || "Hello Lesson Plan"}
            </h3>
            <span className="bg-white text-emerald-600 text-xs font-medium px-3 py-1 rounded-full">
              {getDuration(greenPlan)}
            </span>
          </div>
          
          <div className="p-4 bg-white">
            {/* Objectives */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Objectives:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {greenPlan.lessonPlan?.objectives ? (
                  greenPlan.lessonPlan.objectives.map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))
                ) : (
                  <>
                    <li>Learn vocabulary related to hello</li>
                    <li>Practice speaking and listening skills</li>
                    <li>Engage in interactive activities</li>
                  </>
                )}
              </ul>
            </div>
            
            {/* Lesson Steps */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Lesson Steps:</h4>
              <ul className="space-y-3">
                {greenPlan.lessonPlan?.steps ? (
                  greenPlan.lessonPlan.steps.map((step: any, index: number) => (
                    <li key={index} className="flex">
                      <div className="bg-emerald-100 text-emerald-700 rounded-full p-1 mt-0.5 mr-2 h-5 w-5 flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{step.title}:</span> {step.description}
                        </p>
                        <p className="text-xs text-gray-500">({step.duration || '5-7 minutes'})</p>
                        {step.resources && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {step.resources.includes('images') && (
                              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Images</span>
                            )}
                            {step.resources.includes('songs') && (
                              <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">Songs</span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex">
                    <div className="bg-emerald-100 text-emerald-700 rounded-full p-1 mt-0.5 mr-2 h-5 w-5 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Warm-up: Introduction to hello vocabulary</span></p>
                      <p className="text-xs text-gray-500">(5-7 minutes)</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Images</span>
                        <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">Songs</span>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Blue Lesson Plan on Right */}
        <div className="bg-blue-500 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center text-white">
            <h3 className="font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {bluePlan.title || "Greetings Lesson Plan"}
            </h3>
            <span className="bg-white text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
              {getDuration(bluePlan)}
            </span>
          </div>
          
          <div className="p-4 bg-white">
            {/* Objectives */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Objectives:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {bluePlan.lessonPlan?.objectives ? (
                  bluePlan.lessonPlan.objectives.map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))
                ) : (
                  <>
                    <li>Learn different greetings for various times of day</li>
                    <li>Practice conversations with peers</li>
                    <li>Use gestures and actions while greeting</li>
                  </>
                )}
              </ul>
            </div>
            
            {/* Lesson Steps */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Lesson Steps:</h4>
              <ul className="space-y-3">
                {bluePlan.lessonPlan?.steps ? (
                  bluePlan.lessonPlan.steps.map((step: any, index: number) => (
                    <li key={index} className="flex">
                      <div className="bg-blue-100 text-blue-700 rounded-full p-1 mt-0.5 mr-2 h-5 w-5 flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{step.title}:</span> {step.description}
                        </p>
                        <p className="text-xs text-gray-500">({step.duration || '5-7 minutes'})</p>
                        {step.resources && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {step.resources.includes('images') && (
                              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Images</span>
                            )}
                            {step.resources.includes('songs') && (
                              <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">Songs</span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-1 mt-0.5 mr-2 h-5 w-5 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Warm-up: Morning and evening greetings</span></p>
                      <p className="text-xs text-gray-500">(5-7 minutes)</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Images</span>
                        <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">Songs</span>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}