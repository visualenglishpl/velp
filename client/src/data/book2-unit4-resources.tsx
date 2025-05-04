/**
 * Visual English Book 2, Unit 4: WEATHER
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '4';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit4VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - How's the Weather? Song`,
    description: 'Fun song teaching weather vocabulary and expressions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=rD6FRDd9Hew',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/rD6FRDd9Hew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Weather Song for Kids`,
    description: 'Catchy song about different weather types.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XcW9Ct000yY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XcW9Ct000yY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What's the Weather Like Today?`,
    description: 'Video about asking and answering weather questions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=DnGKfOX5bVQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DnGKfOX5bVQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit4GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WEATHER VOCABULARY (1)`,
    description: 'Interactive game to practice weather vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - HOW'S THE WEATHER? (2)`,
    description: 'Practice asking and answering "How\'s the weather?" questions.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WEATHER AND CLOTHES (3)`,
    description: 'Match appropriate clothing with different weather conditions.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit4Resources: TeacherResource[] = [
  ...book2Unit4VideoResources,
  ...book2Unit4GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit4Resources = () => book2Unit4Resources;

export default book2Unit4Resources;