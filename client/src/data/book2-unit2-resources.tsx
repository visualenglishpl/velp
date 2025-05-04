/**
 * Visual English Book 2, Unit 2: IN THE CLASSROOM
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '2';
const unitTitle = 'IN THE CLASSROOM'; // Title from attached content

// Classroom objects videos - imported from authentic content
export const book2Unit2VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Magic Classroom Objects - WATTS ENGLISH`,
    description: 'Fun video teaching classroom objects vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XhKs634Y6KE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XhKs634Y6KE?si=FEm723PdNev-VouS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Classroom objects games - imported from authentic content
export const book2Unit2GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - IN THE CLASSROOM (1)`,
    description: 'Interactive game to practice classroom objects vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/967741d63924428fb52879f26a253c6f',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/967741d63924428fb52879f26a253c6f?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - IN THE CLASSROOM (2)`,
    description: 'Match classroom objects with their names.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6a06d7b30b5a453188c06babef89a574',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6a06d7b30b5a453188c06babef89a574?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit2Resources: TeacherResource[] = [
  ...book2Unit2VideoResources,
  ...book2Unit2GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit2Resources = () => book2Unit2Resources;

export default book2Unit2Resources;