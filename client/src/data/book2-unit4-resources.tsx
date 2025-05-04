/**
 * Visual English Book 2, Unit 4: WEATHER
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '4';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Weather videos - imported from authentic content
export const book2Unit4VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - How's the Weather? Song`,
    description: 'Fun song teaching weather vocabulary and expressions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=rD6FRDd9Hew',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/rD6FRDd9Hew?si=DLT3lznrF8WMw2ye" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Weather Song for Kids`,
    description: 'Catchy song about different weather types.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XcW9Ct000yY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XcW9Ct000yY?si=xtMYjcL9dXvCCv5C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What's the Weather Like Today?`,
    description: 'Video about asking and answering weather questions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=DnGKfOX5bVQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DnGKfOX5bVQ?si=YRr9Ey4A1YQ_lM8R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Weather games - imported from authentic content
export const book2Unit4GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WEATHER VOCABULARY`,
    description: 'Interactive game to practice weather vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/07a8802120a84ba4b20b0e962e0abea2',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/07a8802120a84ba4b20b0e962e0abea2?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONTHS AND SEASONS`,
    description: 'Learn about months and seasonal changes.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f57988beef3c45abaf56f437166d60da',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f57988beef3c45abaf56f437166d60da?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WEATHER MATCHING`,
    description: 'Match weather vocabulary with pictures.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/947229a373254e199d8894dab724a595',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/947229a373254e199d8894dab724a595?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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