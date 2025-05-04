/**
 * Visual English Book 2, Unit 14: WHAT SPORTS DO YOU LIKE?
 * Resources including videos and games about sports
 */

import { TeacherResource } from '@/components/TeacherResources';

// Video resources for this unit
export const book2Unit14VideoResources: TeacherResource[] = [
  {
    title: 'Guess the Word - Sports Quiz',
    description: 'Interactive quiz to guess different sports from visual clues',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'dl7_ZgWq6Rg'
    }
  },
  {
    title: 'Sports Vocabulary English Game',
    description: 'Learn sports vocabulary through an engaging quiz game',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'mHwf5wMG2pU'
    }
  },
  {
    title: 'What Sport is This - Guessing Song',
    description: 'Fun guessing song for kids from Pancake Manor to learn sports',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'EZXI7l3eaOs'
    }
  },
  {
    title: 'What Sports Do You Like?',
    description: 'English Sing Sing presents a song about sports preferences',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'qkWlGmhBZVs'
    }
  }
];

// Game resources for this unit
export const book2Unit14GameResources: TeacherResource[] = [
  {
    title: 'Sports Groups - Wordwall',
    description: 'Interactive game to group different sports categories',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: 'f65a900b86cc40d69cfcce92d570dee9'
    }
  },
  {
    title: 'Sports Vocabulary - Wordwall',
    description: 'Practice sports vocabulary with interactive exercises',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '022ad691de2d4533a43eb46effe8c9ff'
    }
  }
];

// Combined resources
export const book2Unit14Resources: TeacherResource[] = [
  ...book2Unit14VideoResources,
  ...book2Unit14GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit14Resources = () => book2Unit14Resources;

export default book2Unit14Resources;