/**
 * Visual English Book 2, Unit 2: IN THE CLASSROOM
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book2Unit2VideoResources: TeacherResource[] = [
  {
    id: 'book2-unit2-video1',
    bookId: '2',
    unitId: '2',
    title: 'Magic Classroom Objects - WATTS ENGLISH',
    description: 'Fun video teaching classroom vocabulary with a magical theme.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XhKs634Y6KE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XhKs634Y6KE?si=FEm723PdNev-VouS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit2-video2',
    bookId: '2',
    unitId: '2',
    title: 'Classroom Objects Song',
    description: 'Catchy song about classroom objects with clear visuals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=g7kK989HiRQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/g7kK989HiRQ?si=_eU1Zs7cSWGVtDev" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit2-video3',
    bookId: '2',
    unitId: '2',
    title: 'Classroom Objects Vocabulary',
    description: 'Learn common classroom vocabulary with clear pronunciation.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=469JSP_l0l8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/469JSP_l0l8?si=qlSsJP2I07DcvZQB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit2-video4',
    bookId: '2',
    unitId: '2',
    title: 'School Supplies Song - The Singing Walrus',
    description: 'Fun animated song about classroom supplies and objects.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=AS5nhKzaOqo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AS5nhKzaOqo?si=r0N0Bce_MuDyeCLw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit2GameResources: TeacherResource[] = [
  {
    id: 'book2-unit2-game1',
    bookId: '2',
    unitId: '2',
    title: 'WORDWALL - IN THE CLASSROOM (1)',
    description: 'Interactive game to practice classroom vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/967741d63924428fb52879f26a253c6f',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/967741d63924428fb52879f26a253c6f?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit2-game2',
    bookId: '2',
    unitId: '2',
    title: 'WORDWALL - IN THE CLASSROOM (2)',
    description: 'Match classroom objects with their names in this interactive game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6a06d7b30b5a453188c06babef89a574',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6a06d7b30b5a453188c06babef89a574?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit2-game3',
    bookId: '2',
    unitId: '2',
    title: 'WORDWALL - CLASSROOM OBJECTS (3)',
    description: 'Quiz about classroom objects and stationery.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1346a2a9b7824ec2b33f68ff0e53dce3',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1346a2a9b7824ec2b33f68ff0e53dce3?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit2Resources: TeacherResource[] = [
  ...book2Unit2VideoResources,
  ...book2Unit2GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit2Resources = () => book2Unit2Resources;

export default book2Unit2Resources;