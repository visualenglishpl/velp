/**
 * Book 1 Unit 1 resources
 * 
 * Combined resources for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { BookId, UnitId } from '@/types/content';

// Define helper functions directly in this file to avoid import issues
function createVideoResource(
  unitId: UnitId,
  id: string,
  title: string,
  description: string,
  youtubeUrl: string,
  embedCode?: string
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description,
    resourceType: 'video',
    bookId: '1' as BookId,
    unitId,
    provider: 'YouTube',
    sourceUrl: youtubeUrl,
    embedCode,
    isYoutubeVideo: true
  };
}

function createGameResource(
  unitId: UnitId,
  id: string,
  title: string,
  description: string,
  wordwallUrl: string,
  embedCode?: string
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description,
    resourceType: 'game',
    bookId: '1' as BookId,
    unitId,
    provider: 'Wordwall',
    sourceUrl: wordwallUrl,
    embedCode,
    isWordwallGame: true
  };
}

function createPdfResource(
  unitId: UnitId,
  id: string,
  title: string,
  description: string,
  pdfUrl: string
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description,
    resourceType: 'pdf',
    bookId: '1' as BookId,
    unitId,
    provider: 'Visual English',
    sourceUrl: pdfUrl,
    pdfUrl
  };
}

function createLessonPlanResource(
  unitId: UnitId,
  id: string,
  title: string,
  objective: string,
  lessonType: string = 'main'
): TeacherResource {
  return {
    id: `b1u${unitId}-${id}`,
    title,
    description: objective,
    resourceType: 'lessonPlan',
    bookId: '1' as BookId,
    unitId,
    provider: 'Visual English',
    content: {
      type: 'lesson-plan',
    },
    lessonPlan: {
      id: `book1-unit${unitId}-${id}`,
      title,
      duration: "45 minutes",
      level: "Beginner",
      objectives: [objective],
      materials: ["Visual English Book 1 digital or printed materials", "Interactive whiteboard or projector", "Optional: flashcards, props"],
      warmUp: "Use greetings with each student. Practice saying hello and goodbye.",
      mainActivities: ["Introduce greetings vocabulary", "Practice dialogues with partners", "Role-play different greeting scenarios"],
      assessment: "Monitor student participation and correct pronunciation.",
      extension: "Create greeting cards or role-play additional scenarios.",
      type: lessonType
    }
  };
}

// Video Resources
const videoResources: TeacherResource[] = [
  createVideoResource(
    '1',
    'video-1',
    'Good Morning PINKFONG',
    'Good Morning song by PINKFONG - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/7CuZr1Dz3sk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  ),
  createVideoResource(
    '1',
    'video-2',
    'Good Morning, Good Night LITTLE FOX',
    'Good Morning, Good Night by LITTLE FOX - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/7CuZr1Dz3sk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  ),
  createVideoResource(
    '1',
    'video-3',
    'The Greetings Song MAPLE LEAF',
    'The Greetings Song by MAPLE LEAF - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/gVIFEVLzP4o',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o?si=7yhM78fH9pFHwlgD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  ),
];

// Game Resources
const gameResources: TeacherResource[] = [
  createGameResource(
    '1',
    'game-1',
    'WORDWALL - GREETINGS',
    'Greetings Matching - Interactive activity for Unit 1',
    'https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2',
    `<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  ),
  createGameResource(
    '1',
    'game-2',
    'WORDWALL - TIMES OF THE DAY',
    'Times of the Day Matching - Interactive activity for Unit 1',
    'https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d',
    `<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  ),
];

// PDF Resources
const pdfResources: TeacherResource[] = [
  createPdfResource(
    '1',
    'pdf-1',
    'Unit 1: Hello - PDF',
    'PDF lesson materials for Unit 1',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf'
  ),
];

// Lesson Plan Resources
const lessonPlanResources: TeacherResource[] = [
  createLessonPlanResource(
    '1',
    'lesson-1',
    'Greetings Lesson Plan',
    'Learn basic greetings in English',
    'main'
  ),
];

/**
 * All resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1Resources = [
  ...videoResources,
  ...gameResources,
  ...pdfResources,
  ...lessonPlanResources,
];

// Default export for backward compatibility
export default book1Unit1Resources;
