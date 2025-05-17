/**
 * Visual English Book 1, Unit 5: My Family
 * Resources including videos and games
 */

import { TeacherResource } from '@/types/resources';
import { UnitId } from '@/types/content';
import { createBook1VideoResource, createBook1GameResource, createBook1PdfResource } from './book1-resources-common';

// Video resources for Unit 5
export const book1Unit5VideoResources: TeacherResource[] = [
  {
    ...createBook1VideoResource(
      '5' as UnitId,
      'video-1',
      'Finger Family Song - Family Members',
      'A popular song that introduces family members through the engaging "finger family" concept.',
      'https://www.youtube.com/watch?v=mjFcrv6Lfx8'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mjFcrv6Lfx8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '5' as UnitId,
      'video-2',
      'My Family - Watts English',
      'Clear presentation of family vocabulary with simple sentences and visuals.',
      'https://www.youtube.com/watch?v=FHaObkHEkHQ'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FHaObkHEkHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '5' as UnitId,
      'video-3',
      'Baby Shark Dance - Pinkfong',
      'Popular and engaging song that young learners love, featuring family vocabulary (baby, mommy, daddy, grandma, grandpa).',
      'https://www.youtube.com/watch?v=XqZsoesa55w'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/XqZsoesa55w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '5' as UnitId,
      'video-4',
      'Family Song - Super Simple Songs',
      'A gentle, melodic song about family members with clear visuals and repetitive structure.',
      'https://www.youtube.com/watch?v=d_WQEw13TCo'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/d_WQEw13TCo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '5' as UnitId,
      'video-5',
      'Family Tree Vocabulary - English ESL',
      'Educational video explaining family relationships with a clear family tree diagram.',
      'https://www.youtube.com/watch?v=FiZBiLJIQwM'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FiZBiLJIQwM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  }
];

// Game resources for Unit 5
export const book1Unit5GameResources: TeacherResource[] = [
  {
    ...createBook1GameResource(
      '5' as UnitId,
      'game-1',
      'WORDWALL - FAMILY MEMBERS MATCH',
      'Interactive matching game to practice identifying family members with images and vocabulary.',
      'https://wordwall.net/resource/20008932/family-vocabulary'
    ),
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7d23ca3ef2094c6fab2ead75d20d1bb5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    ...createBook1GameResource(
      '5' as UnitId,
      'game-2',
      'WORDWALL - WHO AM I? FAMILY EDITION',
      'Fun guessing game where students identify family members based on clues and descriptions.',
      'https://wordwall.net/resource/27553416/family-members'
    ),
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4d6e89f9f0d943f196e580e5e63bb2f9?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    ...createBook1GameResource(
      '5' as UnitId,
      'game-3',
      'WORDWALL - FAMILY VOCABULARY QUIZ',
      'Interactive quiz to practice and assess students\' knowledge of family vocabulary.',
      'https://wordwall.net/resource/44835826/family-members'
    ),
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/dfa5c84ce1dd41ee9f542eebfca2bc0c?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

// PDF resources for Unit 5
export const book1Unit5PdfResources: TeacherResource[] = [
  {
    ...createBook1PdfResource(
      '5' as UnitId,
      'pdf-1',
      'Visual English Book 1 - Unit 5 - Resources',
      'PDF guide with links to videos and games for teaching Unit 5 (My Family).',
      'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit5/18+A+Visual+English+Book+1+%E2%80%93+Unit+5+%E2%80%93+Linki+Do+Filmy+I+Gry.pdf'
    )
  }
];

// Combined resources for Unit 5
export const book1Unit5Resources: TeacherResource[] = [
  ...book1Unit5VideoResources,
  ...book1Unit5GameResources,
  ...book1Unit5PdfResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit5Resources = () => book1Unit5Resources;

export default book1Unit5Resources;