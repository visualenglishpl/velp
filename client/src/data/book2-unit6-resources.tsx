/**
 * Visual English Book 2, Unit 6: TOYS AND GAMES
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '6';
const unitTitle = 'LETS GO TO THE ZOO'; // Title from attached content

// Zoo Animals videos - imported from authentic content
export const book2Unit6VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go To The Zoo Song`,
    description: 'Fun song about going to the zoo and seeing different animals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=c8xLYucaawE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/c8xLYucaawE?si=Yvl-v0t-9RuZt3Tk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do You See Wild Animals Song`,
    description: 'Song about seeing wild animals at the zoo.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=p5qwOxlvyhk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/p5qwOxlvyhk?si=WQETSA_xRNbcKa4P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Wild Animal Safari - Watts English`,
    description: 'Educational video showing different animals on a safari.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=qck_LYQ_4bA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qck_LYQ_4bA?si=lxriRzL4dSccQ2Nw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - In the Zoo - Watts English`,
    description: 'Engaging video about visiting the zoo.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=qb1oKClLzRM',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qb1oKClLzRM?si=1bEYj56M8a_lk3b5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Story Time - Good Night Gorilla`,
    description: 'Bedtime story about a zoo gorilla.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=nbN2Y5h2ze0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nbN2Y5h2ze0?si=UdNlGWRiBo7VbnXS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go To The Zoo Song (Alternative)`,
    description: 'Another fun song about visiting the zoo.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=OwRmivbNgQk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OwRmivbNgQk?si=dwwcg2X577AsP9QW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Zoo animals games - imported from authentic content
export const book2Unit6GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TYPES OF SHOPS`,
    description: 'Learn about different types of shops.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/faccf70603a342069c3ada20b85c03d8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/faccf70603a342069c3ada20b85c03d8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TYPES OF SHOPS (2)`,
    description: 'Match items with the appropriate shops.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0e06a64038bf41c38b6e79a0885a53bc',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0e06a64038bf41c38b6e79a0885a53bc?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - TYPES OF SHOPS (3)`,
    description: 'Interactive game about different types of shops.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ad812048d0e94751bc927275863173d8',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ad812048d0e94751bc927275863173d8?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit6Resources: TeacherResource[] = [
  ...book2Unit6VideoResources,
  ...book2Unit6GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit6Resources = () => book2Unit6Resources;

export default book2Unit6Resources;