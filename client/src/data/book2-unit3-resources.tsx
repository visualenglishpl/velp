/**
 * Book 2 Unit 3 Resources
 * 
 * This file combines all resources for Book 2 Unit 3: What's the Time?
 * Auto-generated from CSV data.
 */

import { TeacherResource } from '@/types/TeacherResource';
import { videos } from './book2-unit3-video-resources';
import { games } from './book2-unit3-game-resources';
import { pdfs } from './book2-unit3-pdf-resources';
import { lessonPlans } from './book2-unit3-lesson-plans';

// Combine all resources for this unit
const resources: TeacherResource[] = [
  ...videos,
  ...games,
  ...pdfs,
  ...lessonPlans
];

export default resources;
