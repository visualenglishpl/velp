/**
 * Visual English Book 2, Unit 16: TRANSPORT
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '16';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit16VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do You See? Song - DREAM ENGLISH TRANSPORT`,
    description: 'Fun song teaching various types of transportation.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=Ut-HbauKzDw',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ut-HbauKzDw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Vehicles Song - The Kids' Picture Show`,
    description: 'Educational video showing different types of vehicles.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=IlMm89Jl_xA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/IlMm89Jl_xA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Transportation Song - Super Simple Songs`,
    description: 'Catchy song with different modes of transport.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=biHFF25jpTs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/biHFF25jpTs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit16GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TRANSPORT VEHICLES (1)`,
    description: 'Interactive game to practice transport vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - LAND, AIR, WATER TRANSPORT (2)`,
    description: 'Sort vehicles by land, air, and water transportation.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - HOW DO YOU GO TO SCHOOL? (3)`,
    description: 'Practice asking and answering about transportation methods.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit16Resources: TeacherResource[] = [
  ...book2Unit16VideoResources,
  ...book2Unit16GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit16Resources = () => book2Unit16Resources;

export default book2Unit16Resources;