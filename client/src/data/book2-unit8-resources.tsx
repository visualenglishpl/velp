/**
 * Visual English Book 2, Unit 8: LET'S GO SHOPPING
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '8';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit8VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 1`,
    description: 'Fun song teaching shopping vocabulary and expressions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=GUWbkZYhDNY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/GUWbkZYhDNY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 2`,
    description: 'Another shopping song with different vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=Yn5vuYQhBSQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Yn5vuYQhBSQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Shopping Dialogue`,
    description: 'Dialogue about shopping and asking for prices.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=t2lYNJFsUHA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/t2lYNJFsUHA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit8GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - SHOPPING ITEMS (1)`,
    description: 'Interactive game to practice shopping vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - HOW MUCH IS IT? (2)`,
    description: 'Practice asking and answering "How much is it?" with different items.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - STORE VOCABULARY (3)`,
    description: 'Learn and practice vocabulary related to different types of stores.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit8Resources: TeacherResource[] = [
  ...book2Unit8VideoResources,
  ...book2Unit8GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit8Resources = () => book2Unit8Resources;

export default book2Unit8Resources;