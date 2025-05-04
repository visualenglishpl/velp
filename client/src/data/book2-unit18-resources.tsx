/**
 * Visual English Book 2, Unit 18: IN THE GARDEN
 * Resources including videos and games about garden and plants
 */

import { TeacherResource } from '@/components/TeacherResources';

// Video resources for this unit
export const book2Unit18VideoResources: TeacherResource[] = [
  {
    title: 'BBQ - Garden and Plants Song',
    description: 'Maple Leaf Learning song about garden and plants for young learners',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'WFFin4WDJUI'
    }
  }
];

// Game resources for this unit
export const book2Unit18GameResources: TeacherResource[] = [
  {
    title: 'In the Garden - Wordwall (1)',
    description: 'Interactive game to practice garden vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '20dd68449b8f47e9ba2a34e3856cb5dc'
    }
  },
  {
    title: 'In the Garden - Wordwall (2)',
    description: 'Practice plants and garden vocabulary with this word game',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: 'c35f64740bfd426fa82849b3df459767'
    }
  },
  {
    title: 'In the Garden - Wordwall (3)',
    description: 'Interactive exercises about plants and garden tools',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '175f2af730724d319e4bffbeefd1b85e'
    }
  },
  {
    title: 'Parts of the Plant - Wordwall (1)',
    description: 'Learn the different parts of plants with this interactive game',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: 'f9ea0d4fee904168a582271b6a366fca'
    }
  },
  {
    title: 'Parts of the Plant - Wordwall (2)',
    description: 'Practice identifying the parts of plants with this matching game',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: 'bcac2607a4694aedab1b373fd600be65'
    }
  },
  {
    title: 'Soup\'s Up - PBS Kids',
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