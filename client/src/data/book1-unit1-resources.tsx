/**
 * Teacher Resources for Book 1 - Unit 1 (Greetings)
 */

import { TeacherResource } from '@/types/resources';
import { createBook1VideoResource, createBook1GameResource, createBook1PdfResource } from './book1-resources-common';
import { UnitId } from '@/types/content';

// PDF resources
export const book1Unit1PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '1' as UnitId,
    'pdf-1',
    'Unit 1 - Greetings - Lesson Plan',
    'Complete lesson plan for teaching greetings to young learners.',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00%20A%20Visual%20English%201%20%E2%80%93%20Unit%201%20%E2%80%93%20New%20Version.pdf'
  )
];

// Video resources
export const book1Unit1VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '1' as UnitId,
    'video-1',
    'Good Morning - PINKFONG',
    'A cheerful song about morning greetings for young learners.',
    'https://www.youtube.com/watch?v=7CuZr1Dz3sk',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '1' as UnitId,
    'video-2',
    'Good Morning, Good Night - LITTLE FOX',
    'Learn about greetings for different times of the day.',
    'https://www.youtube.com/watch?v=7CuZr1Dz3sk',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '1' as UnitId,
    'video-3',
    'The Greetings Song - MAPLE LEAF',
    'A fun song teaching various English greetings.',
    'https://www.youtube.com/watch?v=gVIFEVLzP4o',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o?si=7yhM78fH9pFHwlgD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  )
];

// Online games resources
export const book1Unit1GameResources: TeacherResource[] = [
  createBook1GameResource(
    '1' as UnitId,
    'game-1',
    'Greetings - Wordwall Interactive Game',
    'Practice different greetings with this interactive game.',
    'https://wordwall.net/resource/7a5f9c9d02764745b1b471a56483ddf2',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  ),
  createBook1GameResource(
    '1' as UnitId,
    'game-2',
    'Times of the Day - Wordwall Interactive Game',
    'Match greetings with different times of the day.',
    'https://wordwall.net/resource/aa9083a0802940d7abd8dfbb0ea2113d',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  )
];

// Combined resources for Unit 1
export const book1Unit1Resources: TeacherResource[] = [
  ...book1Unit1PdfResources,
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit1Resources = () => book1Unit1Resources;

export default book1Unit1Resources;