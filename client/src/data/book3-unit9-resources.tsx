import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 9 - LET'S EAT OUT
 * Resources including videos and games
 */

const unitNumber = '9';
const unitTitle = "LET'S EAT OUT";

export const book3Unit9Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - All about Restaurant Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/bgfdqVmVjfk',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bgfdqVmVjfk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - LET'S EAT OUT - FOOD TRUCKS`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/7d933cc3c94a4df9869e6eaf36162f55',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7d933cc3c94a4df9869e6eaf36162f55?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - THINGS IN THE RESTAURANT (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0318c6975bc44459b201ef8c5b1f5409',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0318c6975bc44459b201ef8c5b1f5409?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - THINGS IN THE RESTAURANT (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f67b9330fa9c42a28af908e56e7e8213',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f67b9330fa9c42a28af908e56e7e8213?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit9Resources;