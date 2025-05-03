import { TeacherResource } from '@/components/TeacherResources';

/**
 * This file contains common resources for Book 2
 */

// Unit titles for Book 2
export const BOOK2_TITLE = 'VISUAL 2';
export const BOOK2_UNIT_TITLES: Record<string, string> = {
  '1': 'Unit 1',
  '2': 'Unit 2',
  '3': 'Unit 3',
  '4': 'Unit 4',
  '5': 'Unit 5',
  '6': 'Unit 6',
  '7': 'Unit 7',
  '8': 'Unit 8',
  '9': 'Unit 9',
  '10': 'Unit 10',
  '11': 'Unit 11',
  '12': 'Unit 12',
  '13': 'Unit 13',
  '14': 'Unit 14',
  '15': 'Unit 15',
  '16': 'Unit 16',
  '17': 'Unit 17',
  '18': 'Unit 18',
};

// Generate default resources for any unit
export function generateBook2UnitResources(bookId: string, unitId: string): TeacherResource[] {
  const unitTitle = BOOK2_UNIT_TITLES[unitId] || `Unit ${unitId}`;

  return [
    {
      id: `book2-unit${unitId}-default-video`,
      bookId,
      unitId,
      title: `${unitTitle} - Video Resource`,
      resourceType: 'video',
      provider: 'YouTube',
      sourceUrl: 'https://www.youtube.com/embed/placeholder',
      embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
      id: `book2-unit${unitId}-default-game`,
      bookId,
      unitId,
      title: `${unitTitle} - Interactive Game`,
      resourceType: 'game',
      provider: 'Wordwall',
      sourceUrl: 'https://wordwall.net/resource/placeholder',
      embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
    }
  ];
}
