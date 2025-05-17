import React from 'react';
import { SideBySideLessonPlanView } from '@/components/resources/SideBySideLessonPlanView';
import { TeacherResource } from '@/types/TeacherResource';

export default function TeacherResourcesTest() {
  // Sample lesson plans for testing
  const sampleLessonPlans: TeacherResource[] = [
    {
      id: '1',
      title: 'Hello Lesson Plan',
      resourceType: 'lessonPlan',
      description: 'A lesson plan focusing on teaching hello vocabulary',
      bookId: '1',
      unitId: '1',
      lessonPlan: {
        duration: '45 minutes',
        objectives: [
          'Learn vocabulary related to hello',
          'Practice speaking and listening skills',
          'Engage in interactive activities'
        ],
        steps: [
          {
            title: 'Warm-up',
            description: 'Introduction to hello vocabulary',
            duration: '5-7 minutes',
            resources: ['images', 'songs']
          },
          {
            title: 'Presentation', 
            description: 'Introduce key phrases with flashcards',
            duration: '10 minutes',
            resources: ['images']
          },
          {
            title: 'Practice',
            description: 'Students repeat phrases and practice in pairs',
            duration: '15 minutes',
            resources: ['worksheets']
          }
        ],
        materials: ['Flashcards', 'Audio recordings', 'Worksheets']
      }
    },
    {
      id: '2',
      title: 'Greetings Lesson Plan',
      resourceType: 'lessonPlan',
      description: 'A lesson plan focusing on teaching various greetings',
      bookId: '1',
      unitId: '1',
      lessonPlan: {
        duration: '45 minutes',
        objectives: [
          'Learn different greetings for various times of day',
          'Practice conversations with peers',
          'Use gestures and actions while greeting'
        ],
        steps: [
          {
            title: 'Warm-up',
            description: 'Morning and evening greetings',
            duration: '5-7 minutes',
            resources: ['images', 'songs']
          },
          {
            title: 'Dialogue',
            description: 'Practice greetings in pairs using dialogue cards',
            duration: '15 minutes',
            resources: ['cards']
          },
          {
            title: 'Game',
            description: 'Play "Greeting Chain" where students pass greetings around',
            duration: '10 minutes',
            resources: []
          }
        ],
        materials: ['Greeting cards', 'Audio recordings', 'Puppets']
      }
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Resources Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <SideBySideLessonPlanView lessonPlans={sampleLessonPlans} />
      </div>
    </div>
  );
}