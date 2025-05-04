/**
 * Visual English Book 2, Unit 3: SEASONS
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '3';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit3VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Four Seasons Song`,
    description: 'Song teaching the four seasons of the year.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=8ZjpI6fgYSY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8ZjpI6fgYSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Season Song - Pancake Manor`,
    description: 'Fun animated song about the seasons with characters.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=v6WA-RQyVpQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v6WA-RQyVpQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Weather and Seasons Vocabulary`,
    description: 'Learn vocabulary related to weather and seasons.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XcW9Ct000yY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XcW9Ct000yY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit3GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FOUR SEASONS (1)`,
    description: 'Interactive game to learn about the four seasons.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - SEASONAL ACTIVITIES (2)`,
    description: 'Match activities with the appropriate seasons.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - SEASONAL WEATHER (3)`,
    description: 'Learn about different weather conditions associated with each season.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit3Resources: TeacherResource[] = [
  ...book2Unit3VideoResources,
  ...book2Unit3GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit3Resources = () => book2Unit3Resources;

export default book2Unit3Resources;