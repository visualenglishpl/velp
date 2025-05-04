/**
 * Visual English Book 2, Unit 13: WHAT ARE YOU DOING
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
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video 1`,
    description: 'Educational video about activities and actions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=HrHqq8xJiU4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HrHqq8xJiU4?si=wUO6e3XKEspoQKUL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video 2`,
    description: 'Educational video about ongoing activities.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=jeZ40aFoJPw',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jeZ40aFoJPw?si=20WgAQ6eCZN2bGUz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video 3`,
    description: 'Educational video about present continuous actions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=AhL6LZjRgKI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AhL6LZjRgKI?si=ksdEIdz-IX1IWFA1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit13GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - Present Continuous Game 1`,
    description: 'Interactive game to practice present continuous tense.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9b2894f2dd12456cae7777ab904c0ab7',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9b2894f2dd12456cae7777ab904c0ab7?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - Action Verbs Game`,
    description: 'Interactive game about action verbs.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/de1ddb02eff54d04a39272e4347a55ee',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/de1ddb02eff54d04a39272e4347a55ee?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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