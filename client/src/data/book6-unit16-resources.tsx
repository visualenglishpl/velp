import { TeacherResource } from '@/components/TeacherResources';
import { BOOK6_UNIT_TITLES, generateBook6UnitResources } from './book6-resources-common';

/**
 * Generate resources specific to Book 6 Unit 16 (Fashion Accessories)
 * This extends the common resources with additional specific content
 */
export function generateBook6Unit16Resources(bookId: string): TeacherResource[] {
  // Get the standard resources first
  const resources = generateBook6UnitResources(bookId, '16');
  
  // Add the additional Fashion Accessories Game 4
  resources.push({
    id: 'book6-unit16-game4',
    bookId,
    unitId: '16',
    title: 'Fashion Accessories Game 4',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/62ec7fa4d36f47b9b5c3bdf4bb68d8d4',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/62ec7fa4d36f47b9b5c3bdf4bb68d8d4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  });

  return resources;
}
