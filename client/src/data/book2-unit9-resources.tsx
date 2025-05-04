/**
 * Visual English Book 2, Unit 9: BODY
 * Resources including videos and games about body parts
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '9';
const unitTitle = 'BODY'; // Title from attached content

// Body parts videos - imported from authentic content
export const book2Unit9VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Head, Shoulders, Knees and Toes - Genki English`,
    description: 'Classic song for learning body parts vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=h4eueDYPTIg',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/h4eueDYPTIg?si=YSAqhbmciieKtmrD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Head, Shoulders, Knees and Toes - Song`,
    description: 'Another version of the popular body parts song.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ZanHgPprl-0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZanHgPprl-0?si=Ftq9Gfwtbs0f7ePI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Move Your Legs and Arms`,
    description: 'Song with actions for learning body part vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=CNMyh5OyfGE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/CNMyh5OyfGE?si=zp6bpSx6iTBv_ztQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Guess the Body Parts Word`,
    description: 'Interactive quiz to test body part vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=WVTUTKQ3Fgk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WVTUTKQ3Fgk?si=fqEV81DZ9F8KcK80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Body Parts for Kids - Watts English`,
    description: 'Video teaching body parts vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ECcO05W0OJ4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ECcO05W0OJ4?si=BSi9Zd8Ayeftp6dm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Body Parts for Kids - Watts English (2)`,
    description: 'Additional video for learning body parts.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XAVzrlIhgOA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XAVzrlIhgOA?si=0voj1occYRFG3ZAH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Body parts games - imported from authentic content
export const book2Unit9GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - BODY PARTS`,
    description: 'Interactive game to practice body parts vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6a013fd3cd144c8f9fef637be9dbd806',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6a013fd3cd144c8f9fef637be9dbd806?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONSTER BODY PARTS`,
    description: 'Match different monster body parts in this game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6853d3568495494e8b907afd79037859',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6853d3568495494e8b907afd79037859?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROBOT BODY PARTS (1)`,
    description: 'Interactive game with robot body parts.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f9176ec1b03c4d1082a920ab5d5aeed6',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f9176ec1b03c4d1082a920ab5d5aeed6?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROBOT BODY PARTS (2)`,
    description: 'Another robot body parts game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9447ebd8ff714ad69e4bf0ebbb3b886d',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9447ebd8ff714ad69e4bf0ebbb3b886d?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ROBOT BODY PARTS (3)`,
    description: 'Third robot body parts practice game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/bc570f077ded41629c4407a68c634b4e',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bc570f077ded41629c4407a68c634b4e?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Games to Learn English - BODY PARTS`,
    description: 'Interactive body parts game on GamesToLearnEnglish.com.',
    resourceType: 'game',
    provider: 'GamesToLearnEnglish',
    sourceUrl: 'https://www.gamestolearnenglish.com/body-parts/',
    embedCode: `<a href="https://www.gamestolearnenglish.com/body-parts/" target="_blank">Play Body Parts Game</a>`
  },
  {
    id: `book2-unit${unitNumber}-game7`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ABCYA - MAKE A ROBOT`,
    description: 'Create a robot using different body parts.',
    resourceType: 'game',
    provider: 'ABCYA',
    sourceUrl: 'https://www.abcya.com/games/make_a_robot',
    embedCode: `<a href="https://www.abcya.com/games/make_a_robot" target="_blank">Play Make a Robot Game</a>`
  }
];

// Combined resources
export const book2Unit9Resources: TeacherResource[] = [
  ...book2Unit9VideoResources,
  ...book2Unit9GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit9Resources = () => book2Unit9Resources;

export default book2Unit9Resources;