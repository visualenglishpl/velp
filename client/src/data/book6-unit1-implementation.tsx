// This file imports and exports the resources and lesson plans for Book 6, Unit 1

import { book6Unit1Resources } from './book6-unit1-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Define lesson plans directly in the implementation file
const jobsOccupationsLessonPlan: LessonPlan = {
  id: 'book6-unit1-jobs-occupations-lesson',
  title: 'Jobs and Occupations',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to common jobs and occupations',
    'Practice using job-related vocabulary in context',
    'Develop speaking skills discussing job responsibilities'
  ],
  materials: [
    'Visual English Book 6 Unit 1 slides',
    'Wordwall vocabulary games',
    'Job flashcards'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5-10 minutes',
      description: 'Introduce jobs vocabulary with visual aids',
      instructions: ['Show job images', 'Ask students to name occupations they recognize', 'Build initial vocabulary list']
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Present job titles and responsibilities',
      materials: ['Job flashcards', 'Visual English slides'],
      instructions: ['Present job vocabulary', 'Discuss responsibilities for each job', 'Have students repeat and practice pronunciation']
    },
    {
      title: 'Practice Activities',
      duration: '15 minutes',
      description: 'Interactive job matching activities',
      materials: ['Wordwall games'],
      instructions: ['Have students match job titles with responsibilities', 'Complete job vocabulary games', 'Practice using vocabulary in sentences']
    },
    {
      title: 'Production',
      duration: '10-15 minutes',
      description: 'Role-play job interviews',
      instructions: ['Pair students for mock interviews', 'Have them discuss qualifications and responsibilities', 'Give feedback on vocabulary usage']
    }
  ],
  assessmentTips: 'Monitor accurate use of job vocabulary. Check comprehension of responsibilities. Evaluate fluency in interview activity.',
  homeworkIdeas: [
    'Research a dream job and prepare a short presentation',
    'Write a mock job application for a position of interest',
    'Complete online vocabulary reinforcement activities'
  ],
  notes: 'Focus on vocabulary that matches students\'  interests. For advanced students, discuss more specialized occupations.'
};

const jobSkillsLessonPlan: LessonPlan = {
  id: 'book6-unit1-job-skills-lesson',
  title: 'Job Skills and Qualifications',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to job skills and qualifications',
    'Practice discussing strengths and abilities for different jobs',
    'Develop speaking skills through job skill discussions'
  ],
  materials: [
    'Visual English Book 6 Unit 1 slides',
    'Job skills vocabulary list',
    'Sample resumes/CVs'
  ],
  steps: [
    {
      title: 'Review',
      duration: '5 minutes',
      description: 'Quick review of job vocabulary',
      instructions: ['Review job titles from previous lesson', 'Activate prior knowledge about job responsibilities']
    },
    {
      title: 'Skills Vocabulary',
      duration: '15 minutes',
      description: 'Present job skills and qualifications vocabulary',
      materials: ['Skills vocabulary list', 'Visual English slides'],
      instructions: ['Present key skills vocabulary', 'Discuss qualifications for different jobs', 'Match skills to appropriate positions']
    },
    {
      title: 'Resume Activity',
      duration: '15 minutes',
      description: 'Analyze sample resumes/CVs',
      materials: ['Sample resumes', 'Skill identification worksheet'],
      instructions: ['Examine sample resumes in pairs', 'Identify skills and qualifications', 'Discuss appropriate skills for different positions']
    },
    {
      title: 'Personal Skills Discussion',
      duration: '10 minutes',
      description: 'Students discuss their own skills',
      instructions: ['Students identify their personal skills', 'Share with partners what jobs match their abilities', 'Class discussion about skill development']
    }
  ],
  assessmentTips: 'Evaluate accurate use of skills vocabulary. Check comprehension of qualification requirements. Monitor discussions for appropriate skill-job matching.',
  homeworkIdeas: [
    'Create a personal skills inventory',
    'Research qualifications needed for a specific career',
    'Draft a simple resume highlighting skills and qualifications'
  ],
  notes: 'Emphasize transferable skills that apply to multiple positions. For lower-level students, focus on basic skill vocabulary.'
};

// Use type definition directly since importing from components can cause circular dependencies
type TeacherResource = {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
  lessonPlan?: any; // Using any to avoid circular import issues
};

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan as ImportedLessonPlan } from '@/components/LessonPlanTemplate';

// Use imported type to ensure compatibility
type LessonPlan = ImportedLessonPlan;

// Function to get lesson plans for this unit
export const getBook6Unit1LessonPlans = (): LessonPlan[] => {
  return [
    jobsOccupationsLessonPlan,
    jobSkillsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit1Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit1Resources.map(resource => ({
    id: `book6-unit1-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit1Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  jobsOccupationsLessonPlan,
  jobSkillsLessonPlan
];
