/**
 * Visual English Book 2, Unit 12: AT THE DOCTORS
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '12';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

export const book2Unit12VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Robot Doctor - D Billions Kids Songs`,
    description: 'Fun song about visiting the doctor with a robot theme.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ZNX0uTBp7_U',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZNX0uTBp7_U?si=drUntNtdT_ES956w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit12GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT IS THE MATTER - AT THE DOCTOR'S (1)`,
    description: 'Interactive game about common health problems and doctor visits.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f09b2fc9e4d4413e9485eabd9a58d559',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f09b2fc9e4d4413e9485eabd9a58d559?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT IS THE MATTER - AT THE DOCTOR'S (2)`,
    description: 'Second interactive game about health problems and doctor visits.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c20c731038e1473c933d26b8124e99b3',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c20c731038e1473c933d26b8124e99b3?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit12Resources: TeacherResource[] = [
  ...book2Unit12VideoResources,
  ...book2Unit12GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit12Resources = () => book2Unit12Resources;

export default book2Unit12Resources;