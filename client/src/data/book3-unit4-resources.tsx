import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 4 - FREE TIME - HOBBIES
 * Resources including videos and games
 */

const unitNumber = '4';
const unitTitle = 'FREE TIME - HOBBIES';

export const book3Unit4Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Free Time Activities`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/vjJuXqvFBD0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/vjJuXqvFBD0?si=vbVMW3_lpg7Xt4tp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FREE TIME (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/2150eec2dde04b2a9fceccbfbe8bc1d1',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2150eec2dde04b2a9fceccbfbe8bc1d1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FREE TIME (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f0c4c65de73740e5aa910e66b951e291',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f0c4c65de73740e5aa910e66b951e291?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit4Resources;
