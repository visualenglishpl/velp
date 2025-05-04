/**
 * Visual English Book 2, Unit 8: LET'S GO SHOPPING
 * Resources including videos and games about shopping
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '8';
const unitTitle = "LET'S GO SHOPPING"; // Title from attached content

// Shopping videos - imported from authentic content
export const book2Unit8VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 1`,
    description: 'Song about going shopping.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=YSC9Etw0ZHQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YSC9Etw0ZHQ?si=Zlb3WvBMr9OwRSFK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 2`,
    description: 'Another song about shopping activities.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=hugeGgKsYCA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hugeGgKsYCA?si=Acr6KKKTosk3sT3_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 3`,
    description: 'Third song about shopping vocabulary and phrases.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=75wLf80Yb84',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/75wLf80Yb84?si=aTtQf04FcwwcLRH6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 4`,
    description: 'Fourth shopping song for vocabulary practice.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mkQT3B06iHc',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mkQT3B06iHc?si=gP8fF4bLnC3vJVDZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Shopping games - imported from authentic content
export const book2Unit8GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TYPES OF SHOPS (1)`,
    description: 'Interactive game to learn different types of shops.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/faccf70603a342069c3ada20b85c03d8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/faccf70603a342069c3ada20b85c03d8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TYPES OF SHOPS (2)`,
    description: 'Second game about shop types and vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0e06a64038bf41c38b6e79a0885a53bc',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0e06a64038bf41c38b6e79a0885a53bc?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TYPES OF SHOPS (3)`,
    description: 'Third game about different types of shops.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ad812048d0e94751bc927275863173d8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ad812048d0e94751bc927275863173d8?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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