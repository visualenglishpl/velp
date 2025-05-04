/**
 * Visual English Book 2, Unit 17: WHERE ARE YOU FROM?
 * Resources including videos and games about nationalities
 */

import { TeacherResource } from '@/components/TeacherResources';

// Video resources for this unit
export const book2Unit17VideoResources: TeacherResource[] = [
  {
    title: 'What is your Nationality?',
    description: 'Song teaching nationality vocabulary and questions',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'LIUWCSD11MM'
    }
  },
  {
    title: 'Where Are You From? - Song',
    description: 'Maple Leaf Learning song about countries and nationalities',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'l6A2EFkjXq4'
    }
  },
  {
    title: 'Where Are You From? - Flags and Countries',
    description: 'Maple Leaf Learning song that connects country flags with nationality',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'XfFCaTgsW-I'
    }
  },
  {
    title: "What's Your Nationality? - Rap",
    description: 'ESL Music for Kids presents a fun rap about nationalities',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'VPvLduIe_lI'
    }
  }
];

// Game resources for this unit
export const book2Unit17GameResources: TeacherResource[] = [
  {
    title: 'Where Are You From? - Wordwall',
    description: 'Interactive matching game for countries and nationalities',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '714fe36db01541a99a77b717a178223b'
    }
  },
  {
    title: 'Countries and Nationalities - Wordwall',
    description: 'Practice matching countries with their nationalities',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '2342d6382619465d81a2acf23a5ea9d0'
    }
  }
];

// Combined resources
export const book2Unit17Resources: TeacherResource[] = [
  ...book2Unit17VideoResources,
  ...book2Unit17GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit17Resources = () => book2Unit17Resources;

export default book2Unit17Resources;