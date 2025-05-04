/**
 * Visual English Book 2, Unit 5: WHAT DO YOU WANT TO EAT?
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '5';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit5VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do You Want To Eat - DREAM KIDS ENGLISH`,
    description: 'Fun song teaching food vocabulary and expressions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=juoOLF2rTb0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/juoOLF2rTb0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Food Song - Feed the Animals`,
    description: 'Interactive song about feeding animals different foods.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=JMEfDG5I0_g',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JMEfDG5I0_g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I'm Hungry Song`,
    description: 'Song about being hungry and different food items.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=aKK2ZEHUWxI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/aKK2ZEHUWxI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit5GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FOOD (1)`,
    description: 'Interactive game to practice food vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DO YOU LIKE? (2)`,
    description: 'Practice asking and answering "Do you like...?" questions.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT DO YOU WANT TO EAT? (3)`,
    description: 'Practice the question "What do you want to eat?" with different food items.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit5Resources: TeacherResource[] = [
  ...book2Unit5VideoResources,
  ...book2Unit5GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit5Resources = () => book2Unit5Resources;

export default book2Unit5Resources;