import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 14
 * Resources including videos and games
 */

const unitNumber = '14';
const unitTitle = 'JOBS';

export const book3Unit14Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Jobs Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/ckKQclquAXU',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ckKQclquAXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - People Who Help Us`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/M8Psza6N2Os',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/M8Psza6N2Os" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - JOBS (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/2035975/jobs',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2035975/jobs" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - JOBS (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/11609918/jobs',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/11609918/jobs" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit14Resources;