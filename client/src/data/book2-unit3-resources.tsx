/**
 * Visual English Book 2, Unit 3: WHAT IS YOUR TELEPHONE NUMBERS 1-20
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '3';
const unitTitle = 'WHAT IS YOUR TELEPHONE NUMBERS 1-20'; // Title from attached content

// Numbers and telephone videos - imported from authentic content
export const book2Unit3VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Learn to Count 1 to 10 with Number Zoo`,
    description: 'Fun song teaching numbers 1-10.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=nsDanlM8_3c',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nsDanlM8_3c?si=4TrU4Lz5VTRsy6Lg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - SPELLING salamander 1-10`,
    description: 'Video teaching the spelling of numbers 1-10.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=HG361wJyDY0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HG361wJyDY0?si=9Xp-FAD0h-C45YQq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What's Your Telephone Number`,
    description: 'Song teaching telephone number vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=HEym20_e84M',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HEym20_e84M?si=-ZFKJrjtZKPAroSC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WATCH AND WRITE - Spelling numbers 11-20`,
    description: 'Video teaching the spelling of numbers 11-20.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=D0Ajq682yrA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/D0Ajq682yrA?si=mm52k1PARCV_QBhX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Learn to Count 10 to 20 with Number Zoo`,
    description: 'Fun song teaching numbers 10-20.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=snUGqgAmz-c',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/snUGqgAmz-c?si=shDxPwK291oor4fV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Numbers and telephone games - imported from authentic content
export const book2Unit3GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 1-10`,
    description: 'Interactive game to practice numbers 1-10.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d50689afd0ed4cbbb59042cfccfdd896',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d50689afd0ed4cbbb59042cfccfdd896?themeId=23&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 11-20 (1)`,
    description: 'Practice numbers 11-20.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0d7f861634bd4b51ad48bab7cfa87c5e',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0d7f861634bd4b51ad48bab7cfa87c5e?themeId=26&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 11-20 (2)`,
    description: 'Another game to learn numbers 11-20.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/82950f4c8bf8445bbd8cfdd9d2d0b86f',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/82950f4c8bf8445bbd8cfdd9d2d0b86f?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 11-20 (3)`,
    description: 'Match numbers 11-20 with their spellings.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/22fca37117d645df8da8d7baf6265c26',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/22fca37117d645df8da8d7baf6265c26?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 1-20`,
    description: 'Comprehensive game covering numbers 1-20.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ac9e33ec3d354a3c94cf7eb3b0ba2b46',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ac9e33ec3d354a3c94cf7eb3b0ba2b46?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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