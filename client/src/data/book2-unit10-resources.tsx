/**
 * Visual English Book 2, Unit 10: MONTHS AND SEASONS
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '10';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit10VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - The Months of the Year Song`,
    description: 'Fun song teaching the months of the year.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=Fe9bnYRzFvk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Fe9bnYRzFvk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Seasons Song for Kids`,
    description: 'Educational song about the four seasons.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=8ZjpI6fgYSY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8ZjpI6fgYSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Season Song - Pancake Manor`,
    description: 'Fun animated song about the seasons with characters.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=v6WA-RQyVpQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v6WA-RQyVpQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit10GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONTHS OF THE YEAR (1)`,
    description: 'Interactive game to practice the months of the year.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - SEASONS (2)`,
    description: 'Practice matching seasons with their characteristics.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONTHS AND SEASONS MATCHING (3)`,
    description: 'Match months with their corresponding seasons.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit10Resources: TeacherResource[] = [
  ...book2Unit10VideoResources,
  ...book2Unit10GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit10Resources = () => book2Unit10Resources;

export default book2Unit10Resources;