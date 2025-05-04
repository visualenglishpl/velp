/**
 * Visual English Book 2, Unit 4: FASHION WEEK
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '4';
const unitTitle = 'FASHION WEEK'; // Title from attached content

// Fashion videos - imported from authentic content
export const book2Unit4VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Fashion Show`,
    description: 'Fashion show video for children.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ZkIzvwfvpGg',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZkIzvwfvpGg?si=BoGi927I_mQP-i37" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Put On Your Shoes - Super Simple Songs 1`,
    description: 'Fun song about putting on different clothing items.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=-jBfb33_KHU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-jBfb33_KHU?si=5IPyJatrIZpP9uNv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Put On Your Shoes - Super Simple Songs 2`,
    description: 'Another song about putting on clothing items.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=AsZwvuUmHGU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AsZwvuUmHGU?si=J_MMF9UFrzwv5uR9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Clothes Vocabulary Guessing Game`,
    description: 'Interactive quiz to test clothes vocabulary knowledge.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=rAtqLPCiTpk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/rAtqLPCiTpk?si=fzqmzqdeXyEunGV_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Fashion games - imported from authentic content
export const book2Unit4GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - CLOTHES (1)`,
    description: 'Interactive game to practice clothes vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d3f76d6242dd4223a9b80244dcb7f20c',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d3f76d6242dd4223a9b80244dcb7f20c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FUNNY CLOTHES`,
    description: 'Match different funny clothing items in this game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/42e3e417f8b84f54b4804df5a45f9886',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/42e3e417f8b84f54b4804df5a45f9886?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - CLOTHES (2)`,
    description: 'Another interactive game for clothes vocabulary practice.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/46dac4d85f3d4080b88c4e5c9181ddfc',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/46dac4d85f3d4080b88c4e5c9181ddfc?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit4Resources: TeacherResource[] = [
  ...book2Unit4VideoResources,
  ...book2Unit4GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit4Resources = () => book2Unit4Resources;

export default book2Unit4Resources;