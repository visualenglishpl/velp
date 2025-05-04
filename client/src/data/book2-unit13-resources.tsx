/**
 * Visual English Book 2, Unit 13: FARM ANIMALS
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '13';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit13VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals Song`,
    description: 'Fun song teaching farm animal vocabulary with sounds.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=HrHqq8xJiU4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HrHqq8xJiU4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Old MacDonald Had a Farm`,
    description: 'Classic song about farm animals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_6HzoUcx3eo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_6HzoUcx3eo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do Farm Animals Say?`,
    description: 'Learn the sounds that different farm animals make.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=hewioIU4a64',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hewioIU4a64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit13GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FARM ANIMALS (1)`,
    description: 'Interactive game to practice farm animal vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ANIMAL SOUNDS (2)`,
    description: 'Match farm animals with the sounds they make.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ON THE FARM (3)`,
    description: 'Explore vocabulary related to the farm environment.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit13Resources: TeacherResource[] = [
  ...book2Unit13VideoResources,
  ...book2Unit13GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit13Resources = () => book2Unit13Resources;

export default book2Unit13Resources;