/**
 * Visual English Book 2, Unit 6: TOYS AND GAMES
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '6';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit6VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Toys and Games Song`,
    description: 'Fun song teaching various toys and games vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=8-SWzpdcl6E',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8-SWzpdcl6E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - This is My Toy - Kids Song`,
    description: 'Catchy song about different toys.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=8jaWcB7tJpE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8jaWcB7tJpE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Play with Toys`,
    description: 'Educational video showing different toys and how to play with them.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=CoQMtz-Jj7E',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/CoQMtz-Jj7E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit6GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TOYS VOCABULARY (1)`,
    description: 'Interactive game to practice toys vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - IS IT A TOY OR A GAME? (2)`,
    description: 'Sort items into toys or games categories.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT'S YOUR FAVORITE TOY? (3)`,
    description: 'Practice asking and answering about favorite toys.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit6Resources: TeacherResource[] = [
  ...book2Unit6VideoResources,
  ...book2Unit6GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit6Resources = () => book2Unit6Resources;

export default book2Unit6Resources;