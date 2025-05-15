/**
 * Book 1, Unit 16: Jobs - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 16.
 */

import { book1Unit16Resources } from './book1-unit16-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 16
export const getBook1Unit16Resources = () => book1Unit16Resources;

// Also export the resources directly to match different import patterns
export const resources = book1Unit16Resources;
export const videos = book1Unit16Resources.filter(r => r.resourceType === 'video');
export const games = book1Unit16Resources.filter(r => r.resourceType === 'game');

// Generate lesson plans for Book 1, Unit 16
export const generateUnit16LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit16-lesson1",
      title: "Jobs Vocabulary Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for common jobs and occupations (teacher, doctor, police officer, etc.)",
        "Use 'He/She is a...' to describe jobs",
        "Connect jobs with their workplaces"
      ],
      materials: [
        "Jobs Song - Maple Leaf Learning video from Video Resources",
        "People Work video from Video Resources",
        "Job flashcards",
        "Workplace images (school, hospital, police station, etc.)",
        "Job tools and equipment pictures",
        "Drawing paper and coloring supplies"
      ],
      steps: [
        {
          title: "Warm-up: Jobs Song",
          duration: "5 minutes",
          description: "Play the 'Jobs Song' video. Have students watch first, then join in with actions mimicking each occupation during the second viewing."
        },
        {
          title: "Job Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key vocabulary: teacher, doctor, police officer, firefighter, chef, driver, pilot, farmer. Show flashcards. For each job, say 'He/She is a (job)' and have students repeat."
        },
        {
          title: "People Work Video",
          duration: "7 minutes",
          description: "Watch sections of the 'People Work' video, focusing on different professions and what they do. After watching, review the jobs from the video and have students recall what each profession does."
        },
        {
          title: "Jobs and Workplaces Matching",
          duration: "8 minutes",
          description: "Display workplace images (school, hospital, fire station, etc.) and job flashcards. Students match the jobs to their workplaces, saying 'A (job) works at/in a (workplace).'"
        },
        {
          title: "What Do They Do?",
          duration: "10 minutes",
          description: "Show pictures of job tools or actions (stethoscope, teaching at a board, putting out fire). Students guess the job and say 'He/She is a (job). He/She (action verb related to job).'"
        },
        {
          title: "What I Want to Be",
          duration: "5 minutes",
          description: "Students draw what they want to be when they grow up and write or say a simple sentence: 'I want to be a (job).' They can add what they would do in that job."
        }
      ]
    },
    {
      id: "book1-unit16-lesson2",
      title: "Asking About Jobs",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn to ask and answer 'What do you do?' questions",
        "Practice describing jobs using simple present tense verbs",
        "Connect jobs with specific activities and tools"
      ],
      materials: [
        "What Do You Do? video from Video Resources",
        "Job action cards",
        "Community helper props or costumes (optional)",
        "Job interview role-play cards",
        "Family job survey worksheet",
        "Wordwall game from Game Resources"
      ],
      steps: [
        {
          title: "Warm-up: What Do You Do?",
          duration: "5 minutes",
          description: "Play the 'What Do You Do?' video. Focus on the question and answer pattern. Practice asking and answering 'What do you do?' with simple responses."
        },
        {
          title: "Job Actions Review",
          duration: "8 minutes",
          description: "Review job vocabulary with actions: 'A teacher teaches.' 'A doctor helps sick people.' 'A chef cooks food.' Have students mime the actions while saying the sentences."
        },
        {
          title: "Job Interview Role-play",
          duration: "10 minutes",
          description: "Students practice simple job interviews in pairs. One asks 'What do you do?' and the other responds 'I am a (job). I (job action).' Using props or costume items adds fun to the activity."
        },
        {
          title: "Family Jobs",
          duration: "7 minutes",
          description: "Introduce vocabulary for discussing family members' jobs: 'My mother is a (job).' 'My father is a (job).' Students share information about their family members' occupations."
        },
        {
          title: "Community Jobs Walk",
          duration: "10 minutes",
          description: "Take an imaginary walk through a community (using pictures or a wall display). When stopping at different locations, discuss what jobs people do there: 'Who works at a hospital? A doctor and a nurse work at a hospital.'"
        },
        {
          title: "Jobs and Occupations Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Jobs and Occupations' game as a class. Students match job titles with pictures or descriptions of what they do."
        }
      ]
    }
  ];
};