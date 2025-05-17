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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Green Lesson Plan on Left */}
      <div className="border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-200">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 text-white">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {greenPlan.title}
            </h4>
            <span className="bg-white text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {greenPlan.lessonPlan?.duration || '45 minutes'}
            </span>
          </div>
        </div>
        <div className="p-3">
          {greenPlan.lessonPlan?.objectives && (
            <div className="mb-2">
              <h5 className="text-xs font-medium text-teal-800 mb-1">Objectives:</h5>
              <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                {greenPlan.lessonPlan.objectives.slice(0, 3).map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}
          
          {greenPlan.lessonPlan?.steps && (
            <>
              <h5 className="text-xs font-medium text-teal-800 mb-1 mt-3">Lesson Steps:</h5>
              <ul className="space-y-2 text-sm">
                {greenPlan.lessonPlan.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>
                      <span className="font-medium text-teal-800">{step.title}:</span> {step.description} 
                      {step.duration && <span className="text-xs text-gray-500">({step.duration})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {greenPlan.lessonPlan?.materials && greenPlan.lessonPlan.materials.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-medium text-teal-800 mb-1">Materials:</h5>
              <p className="text-xs text-gray-600">{greenPlan.lessonPlan.materials.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Blue Lesson Plan on Right */}
      <div className="border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-200">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 text-white">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {bluePlan.title}
            </h4>
            <span className="bg-white text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {bluePlan.lessonPlan?.duration || '45 minutes'}
            </span>
          </div>
        </div>
        <div className="p-3">
          {bluePlan.lessonPlan?.objectives && (
            <div className="mb-2">
              <h5 className="text-xs font-medium text-blue-800 mb-1">Objectives:</h5>
              <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                {bluePlan.lessonPlan.objectives.slice(0, 3).map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}
          
          {bluePlan.lessonPlan?.steps && (
            <>
              <h5 className="text-xs font-medium text-blue-800 mb-1 mt-3">Lesson Steps:</h5>
              <ul className="space-y-2 text-sm">
                {bluePlan.lessonPlan.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-1 mt-0.5 mr-2">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>
                      <span className="font-medium text-blue-800">{step.title}:</span> {step.description} 
                      {step.duration && <span className="text-xs text-gray-500">({step.duration})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {bluePlan.lessonPlan?.materials && bluePlan.lessonPlan.materials.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-medium text-blue-800 mb-1">Materials:</h5>
              <p className="text-xs text-gray-600">{bluePlan.lessonPlan.materials.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}