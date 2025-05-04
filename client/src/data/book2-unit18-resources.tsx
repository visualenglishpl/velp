/**
 * Visual English Book 2, Unit 18: IN THE GARDEN
 * Resources including videos and games about garden and plants
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '18';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Video resources for this unit
export const book2Unit18VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - BBQ - Garden and Plants Song`,
    description: 'Maple Leaf Learning song about garden and plants for young learners',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=WFFin4WDJUI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WFFin4WDJUI?si=XPSNGa5GCXGW0hZk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Game resources for this unit
export const book2Unit18GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - In the Garden (1)`,
    description: 'Interactive game to practice garden vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/20dd68449b8f47e9ba2a34e3856cb5dc',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/20dd68449b8f47e9ba2a34e3856cb5dc?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - In the Garden (2)`,
    description: 'Practice plants and garden vocabulary with this word game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c35f64740bfd426fa82849b3df459767',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c35f64740bfd426fa82849b3df459767?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - In the Garden (3)`,
    description: 'Interactive exercises about plants and garden tools',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/175f2af730724d319e4bffbeefd1b85e',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/175f2af730724d319e4bffbeefd1b85e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - Parts of the Plant (1)`,
    description: 'Learn the different parts of plants with this interactive game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f9ea0d4fee904168a582271b6a366fca',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f9ea0d4fee904168a582271b6a366fca?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - Parts of the Plant (2)`,
    description: 'Practice identifying the parts of plants with this matching game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/bcac2607a4694aedab1b373fd600be65',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bcac2607a4694aedab1b373fd600be65?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game6`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - PBS Kids - Soup's Up`,
    description: 'Help Elinor gather vegetables from the garden to make soup',
    resourceType: 'game',
    provider: 'PBS Kids',
    sourceUrl: 'https://pbskids.org/elinor/games/elinor-soups-up'
  }
];

// Combined resources
export const book2Unit18Resources: TeacherResource[] = [
  ...book2Unit18VideoResources,
  ...book2Unit18GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit18Resources = () => book2Unit18Resources;

export default book2Unit18Resources;