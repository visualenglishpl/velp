/**
 * Visual English Book 2, Unit 11: THINGS IN THE HOUSE
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '11';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit11VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - New House for Kids - WATTS ENGLISH`,
    description: 'Educational video about rooms and items in a house.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_-yj0lNXBks',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_-yj0lNXBks?si=hwuv_9urSYrkNAto" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ESL Game - Rooms of the House hidden picture`,
    description: 'Interactive game-based video for practicing house vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=kIg__488rCs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/kIg__488rCs?si=SCzBToysLXwXna5a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Build A House - MAPLE LEAF 1`,
    description: 'Song about building a house and naming its parts.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=YBhJ8O7p2j8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YBhJ8O7p2j8?si=MMAnOKJizstD3A56" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Build A House - MAPLE LEAF 2`,
    description: 'Second version of the house-building song with different visuals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mTSUSkSgvE4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mTSUSkSgvE4?si=vENZt4E8ae41BtbI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit11GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROOMS IN THE HOUSE`,
    description: 'Interactive game to learn different rooms in a house.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/997e56154a3d4f41a7dfd5cce9f583dd',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/997e56154a3d4f41a7dfd5cce9f583dd?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROOMS IN THE HOUSE - BATHROOM`,
    description: 'Game focused on items found in a bathroom.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6804497304174f21874f5717bfb0c7c8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6804497304174f21874f5717bfb0c7c8?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROOMS IN THE HOUSE - BEDROOM`,
    description: 'Game focused on items found in a bedroom.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/4f6cf102055449e59f1d2e3ae3f24916',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4f6cf102055449e59f1d2e3ae3f24916?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROOMS IN THE HOUSE - KITCHEN`,
    description: 'Game focused on items found in a kitchen.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/17e11a35acdc4e82a909c59d016dd1fa',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/17e11a35acdc4e82a909c59d016dd1fa?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROOMS IN THE HOUSE - LIVING ROOM`,
    description: 'Game focused on items found in a living room.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/5f402e986f9642e88428c88b21011b5c',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5f402e986f9642e88428c88b21011b5c?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - THINGS IN THE HOUSE`,
    description: 'General game about various items found throughout a house.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/323edfca54e041298fa1f86693c12984',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/323edfca54e041298fa1f86693c12984?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game7`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROOMS AND THINGS IN THE HOUSE`,
    description: 'Game connecting rooms with the items typically found in them.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/343fe9765d1d42139b85436ef64778fb',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/343fe9765d1d42139b85436ef64778fb?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game8`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ABCYA - MAKE A HOUSE`,
    description: 'Fun interactive game to build and design your own house.',
    resourceType: 'game',
    provider: 'External Game',
    sourceUrl: 'https://www.abcya.com/games/make-a-house',
    embedCode: `<a href="https://www.abcya.com/games/make-a-house" target="_blank" class="external-game-link">Open Make a House Game</a>`
  }
];

// Combined resources
export const book2Unit11Resources: TeacherResource[] = [
  ...book2Unit11VideoResources,
  ...book2Unit11GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit11Resources = () => book2Unit11Resources;

export default book2Unit11Resources;