/**
 * Visual English Book 2, Unit 7: WHAT DO YOU WANT TO BE
 * Resources including videos and games about jobs and occupations
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '7';
const unitTitle = 'WHAT DO YOU WANT TO BE'; // Title from attached content

// Jobs and occupations videos - imported from authentic content
export const book2Unit7VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Jobs Song - Dream English 1`,
    description: 'Song about different jobs and occupations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=2nesqKP9-5c',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2nesqKP9-5c?si=4V23nnj_GqpopgvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Jobs Song - Dream English 2`,
    description: 'Another song about jobs and occupations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=3jtfUyAcFBU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3jtfUyAcFBU?si=phpMSyjkQCF2ckhV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What Do You Want To Be - ELT Songs`,
    description: 'Song exploring different occupations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=eejZ4UvMqoc',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/eejZ4UvMqoc?si=yo0Ndss1Sde7DUBF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Jobs for Kids - Watts English`,
    description: 'Video introducing different jobs for children.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=v-HZNelHoLk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v-HZNelHoLk?si=XAxKoxCxBm9oBNPY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Jobs ESL Classroom Game - Telepathy Game`,
    description: 'Interactive classroom game about jobs.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=JKiA4SmtIpU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JKiA4SmtIpU?si=2Jwz4dB4AjnqUG33" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Jobs ESL Guessing Game`,
    description: 'Guessing game for job vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ptZKKmydpc4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ptZKKmydpc4?si=O7rJXQeVDFmljeSe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Job games - imported from authentic content
export const book2Unit7GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - JOBS (1)`,
    description: 'Interactive game to practice job vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8747667a9e884ad4b200668acf01810d',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8747667a9e884ad4b200668acf01810d?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - JOBS (2)`,
    description: 'Match different jobs in this game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d684cccacf47498f93ab05c418406e54',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d684cccacf47498f93ab05c418406e54?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - JOBS (3)`,
    description: 'Another interactive game for job vocabulary practice.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ff19dbbf146647588149c73989ebdb23',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ff19dbbf146647588149c73989ebdb23?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - JOBS (4)`,
    description: 'Fourth job vocabulary practice game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/04867ef1784c47fd9725a70464feaf7f',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/04867ef1784c47fd9725a70464feaf7f?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit7Resources: TeacherResource[] = [
  ...book2Unit7VideoResources,
  ...book2Unit7GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit7Resources = () => book2Unit7Resources;

export default book2Unit7Resources;