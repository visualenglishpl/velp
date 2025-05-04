/**
 * Visual English Book 2, Unit 1: DAYS OF THE WEEK
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '1';
const unitTitle = 'DAYS OF THE WEEK'; // Title from attached content

// Days of the Week videos - imported from authentic content
export const book2Unit1VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Days of The Week - DREAM ENGLISH KIDS`,
    description: 'Fun song teaching days of the week vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=36n93jvjkDs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/36n93jvjkDs?si=Ulyp9ynbXeq7kROn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Days of The Week - PLANET POP ELT`,
    description: 'Catchy song about days of the week.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=bLdFvCJNtOk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/bLdFvCJNtOk?si=NDQ9aybLLNo0GH_c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Days of The Week - SINGING WALRUS`,
    description: 'Educational song about days of the week with animations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mXMofxtDPUQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mXMofxtDPUQ?si=HIpwuWxQzRG5ath5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Days of The Week - SINGING WALRUS (Alternative)`,
    description: 'Another fun song about days of the week.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=fSWfRL3LKm0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fSWfRL3LKm0?si=u-b_A47uP-KxIiiG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Time: Yesterday, Today, and Tomorrow - STORYBOTS`,
    description: 'Educational video about concepts of time.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XE-VWAI805g',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XE-VWAI805g?si=wojfwkssWtyL6gu4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Time: Yesterday, Today, and Tomorrow - ZOO ZOO SONG`,
    description: 'Song about yesterday, today and tomorrow concepts.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=heMRD8A5Sxk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/heMRD8A5Sxk?si=SJyY_bLB6gZ3qz6K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video7`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - The Very Hungry Caterpillar by Eric Carle 1`,
    description: 'Classic story that includes days of the week.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=UTlJHDHeZzU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/UTlJHDHeZzU?si=rateMipoghEv8VLI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video8`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - The Very Hungry Caterpillar by Eric Carle 2`,
    description: 'Another version of the classic story with days of the week.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=CTVbV8o_j6Y',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/CTVbV8o_j6Y?si=1nB5cBEaWli1G7Wh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video9`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Crazy Magic Menu for Kids WATTS ENGLISH`,
    description: 'Fun video with food-related vocabulary throughout the week.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=yCdrxeQ63Ic',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yCdrxeQ63Ic?si=HSgaRbs4Ei6FXMMc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video10`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Days of the week STORYBOTS`,
    description: 'Animated song about days of the week from StorybPts.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ieCxOOY0RTs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ieCxOOY0RTs?si=r_lJt9GytYcvCjFL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Days of the Week games - imported from authentic content
export const book2Unit1GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK`,
    description: 'Interactive game to practice days of the week.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/03c94532111b41098308577ff08cb919',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/03c94532111b41098308577ff08cb919?themeId=2&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK - ENGLISH POLISH`,
    description: 'Match English and Polish days of the week.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/fc76f983a608403bb09baadf60d486a4',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/fc76f983a608403bb09baadf60d486a4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK - ORDINAL NUMBERS`,
    description: 'Learn ordinal numbers with days of the week.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8156a7000e7d49a398545c3f150a2ca4',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8156a7000e7d49a398545c3f150a2ca4?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK - ANAGRAM`,
    description: 'Rearrange letters to form days of the week.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/a540f89490d14b488721011897672473',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a540f89490d14b488721011897672473?themeId=23&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK - LISTENING - SPELLING`,
    description: 'Practice listening and spelling days of the week.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8049e73c956444bb8771b9171c79af2a',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8049e73c956444bb8771b9171c79af2a?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK - HUNGRY CATERPILLAR`,
    description: 'Game based on the Very Hungry Caterpillar book.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e222d7efd3c94f80a80247f3d106ea64',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e222d7efd3c94f80a80247f3d106ea64?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game7`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FEED THE CATERPILLAR`,
    description: 'Interactive game where you feed a caterpillar.',
    resourceType: 'game',
    provider: 'External Link',
    sourceUrl: 'http://boowakwala.uptoten.com/kids/boowakwala-adventures-butterfly-caterpillarcolor.html',
    embedCode: `<a href="http://boowakwala.uptoten.com/kids/boowakwala-adventures-butterfly-caterpillarcolor.html" target="_blank" rel="noopener noreferrer">Play Feed the Caterpillar Game</a>`
  },
  {
    id: `book2-unit${unitNumber}-game8`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - LIVEWORKSHEETS - DAYS OF THE WEEK - HUNGRY CATERPILLAR`,
    description: 'Interactive worksheet about The Hungry Caterpillar and days of the week.',
    resourceType: 'game',
    provider: 'External Link',
    sourceUrl: 'https://www.liveworksheets.com/w/en/english-second-language-esl/116834',
    embedCode: `<a href="https://www.liveworksheets.com/w/en/english-second-language-esl/116834" target="_blank" rel="noopener noreferrer">Open Hungry Caterpillar Worksheet</a>`
  }
];

// Combined resources
export const book2Unit1Resources: TeacherResource[] = [
  ...book2Unit1VideoResources,
  ...book2Unit1GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit1Resources = () => book2Unit1Resources;

export default book2Unit1Resources;