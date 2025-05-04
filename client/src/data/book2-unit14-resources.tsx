/**
 * Visual English Book 2, Unit 14: WHAT SPORTS DO YOU LIKE?
 * Resources including videos and games about sports
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '14';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Video resources for this unit
export const book2Unit14VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Guess the Word - Sports Quiz`,
    description: 'Interactive quiz to guess different sports from visual clues',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=dl7_ZgWq6Rg',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dl7_ZgWq6Rg?si=AcAnKXVmmEUP6KKu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Sports Vocabulary English Game`,
    description: 'Learn sports vocabulary through an engaging quiz game',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mHwf5wMG2pU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mHwf5wMG2pU?si=K9oaoEcEGYLvY0dD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Sport is This - Guessing Song`,
    description: 'Fun guessing song for kids from Pancake Manor to learn sports',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=EZXI7l3eaOs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/EZXI7l3eaOs?si=vY9cFFs1hogcNKHz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Sports Do You Like?`,
    description: 'English Sing Sing presents a song about sports preferences',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=qkWlGmhBZVs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qkWlGmhBZVs?si=SJFYD15O8XOX30uB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Game resources for this unit
export const book2Unit14GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME WORDWALL - SPORTS GROUPS`,
    description: 'Interactive game to group different sports categories',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f65a900b86cc40d69cfcce92d570dee9',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f65a900b86cc40d69cfcce92d570dee9?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME WORDWALL - SPORTS`,
    description: 'Practice sports vocabulary with interactive exercises',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/022ad691de2d4533a43eb46effe8c9ff',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/022ad691de2d4533a43eb46effe8c9ff?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit14Resources: TeacherResource[] = [
  ...book2Unit14VideoResources,
  ...book2Unit14GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit14Resources = () => book2Unit14Resources;

export default book2Unit14Resources;