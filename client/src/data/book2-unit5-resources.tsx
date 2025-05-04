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
    sourceUrl: 'https://www.youtube.com/watch?v=yUw3-im44qY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yUw3-im44qY?si=OkO3llAl0TJmeNRB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do You Want To Eat 2 - DREAM KIDS ENGLISH`,
    description: 'Additional expressions for food vocabulary and "What do you want to eat?" questions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_ctPAlJVDQk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_ctPAlJVDQk?si=LXM-caCAjzaIOpnq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do You Want To Drink - DREAM KIDS ENGLISH`,
    description: 'Song about drinks and asking "What do you want to drink?"',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=8kBbNmd8i-s',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8kBbNmd8i-s?si=HoBo7YC0mhSb50EP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit5GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - CRAZY FOOD`,
    description: 'Interactive game to practice food vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/06164e7e3475449591de546d6651f0d7',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/06164e7e3475449591de546d6651f0d7?themeId=1&templateId=86&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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