/**
 * Book 2 Unit 1 Resources
 * 
 * This file combines all resources for Book 2 Unit 1: Hello and Greetings
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { videos } from './book2-unit1-video-resources';
import { games } from './book2-unit1-game-resources';
import { pdfs } from './book2-unit1-pdf-resources';
import { lessonPlans } from './book2-unit1-lesson-plans';

// Combine all resources for this unit
const resources: TeacherResource[] = [
  ...videos,
  ...games,
  ...pdfs,
  ...lessonPlans
];

export default resources;
