/**
 * Visual English Book 2, Unit 18: IN THE GARDEN
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book2Unit18VideoResources: TeacherResource[] = [
  {
    id: 'book2-unit18-video1',
    bookId: '2',
    unitId: '18',
    title: 'BBQ - MAPLE LEAF LEARNING',
    description: 'Educational video about BBQ and outdoor activities in a garden.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=WFFin4WDJUI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WFFin4WDJUI?si=ePcl_l4eUQMjMFEB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit18GameResources: TeacherResource[] = [
  {
    id: 'book2-unit18-game1',
    bookId: '2',
    unitId: '18',
    title: 'WORDWALL - IN THE GARDEN (1)',
    description: 'Interactive game about garden vocabulary and items.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/20dd68449b8f47e9ba2a34e3856cb5dc',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/20dd68449b8f47e9ba2a34e3856cb5dc?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit18-game2',
    bookId: '2',
    unitId: '18',
    title: 'WORDWALL - IN THE GARDEN (2)',
    description: 'Second garden-themed vocabulary game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c35f64740bfd426fa82849b3df459767',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c35f64740bfd426fa82849b3df459767?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit18-game3',
    bookId: '2',
    unitId: '18',
    title: 'WORDWALL - IN THE GARDEN (3)',
    description: 'Third garden vocabulary practice game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/175f2af730724d319e4bffbeefd1b85e',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/175f2af730724d319e4bffbeefd1b85e?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit18-game4',
    bookId: '2',
    unitId: '18',
    title: 'WORDWALL - PARTS OF THE PLANT (1)',
    description: 'Game focusing on plant vocabulary relevant to gardens.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f9ea0d4fee904168a582271b6a366fca',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f9ea0d4fee904168a582271b6a366fca?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit18-game5',
    bookId: '2',
    unitId: '18',
    title: 'WORDWALL - PARTS OF THE PLANT (2)',
    description: 'Another game about plant parts and structure.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/bcac2607a4694aedab1b373fd600be65',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bcac2607a4694aedab1b373fd600be65?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit18-game6',
    bookId: '2',
    unitId: '18',
    title: 'PBS KIDS - SOUPS UP',
    description: 'Interactive game about cooking with garden ingredients.',
    resourceType: 'game',
    provider: 'External Game',
    sourceUrl: 'https://pbskids.org/elinor/games/elinor-soups-up',
    embedCode: `<a href="https://pbskids.org/elinor/games/elinor-soups-up" target="_blank" class="external-game-link">Open Soups Up Game</a>`
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