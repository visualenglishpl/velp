import { TeacherResource } from '@/components/TeacherResources';
import { BOOK6_UNIT_TITLES, generateBook6UnitResources } from './book6-resources-common';

/**
 * Generate resources specific to Book 6 Unit 14 (At The Airport)
 * This extends the common resources with additional specific content
 */
export function generateBook6Unit14Resources(bookId: string): TeacherResource[] {
  // Get the standard resources first
  const resources = generateBook6UnitResources(bookId, '14');
  
  // Add specific Airport Word Wall games
  resources.push({
    id: 'book6-unit14-game1',
    bookId,
    unitId: '14',
    title: 'Airport Vocabulary Game 1',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/25946376',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/07be00511a0b455095dd11ac8cb62ff8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  });

  resources.push({
    id: 'book6-unit14-game2',
    bookId,
    unitId: '14',
    title: 'Airport Vocabulary Game 2',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1882093',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/27fb8eb4af7c4afcbffbc55c9c5caec5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  });

  resources.push({
    id: 'book6-unit14-game3',
    bookId,
    unitId: '14',
    title: 'Airport Vocabulary Game 3',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9235677',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/aec3bb63b33a4b88a3e2ae6deacd2ede?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  });

  resources.push({
    id: 'book6-unit14-game4',
    bookId,
    unitId: '14',
    title: 'Airport Vocabulary Game 4',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/38531814',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c3a3d7682c56433e9e40ca37b86a0b10?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  });

  return resources;
}
