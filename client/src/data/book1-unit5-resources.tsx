/**
 * Visual English Book 1, Unit 5: School Supplies
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit5VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit5-video1',
    bookId: '1',
    unitId: '5',
    title: 'School Supplies Song',
    description: 'A fun song about school supplies to help students learn vocabulary.',
    resourceType: 'video',
    provider: 'English Tree TV',
    sourceUrl: 'https://www.youtube.com/watch?v=AS5nhKzaOqo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AS5nhKzaOqo?si=UkRbD2hAw_q5jBM2" title="School Supplies Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video2',
    bookId: '1',
    unitId: '5',
    title: 'Back to School Mix',
    description: 'A collection of back to school scenarios to help students learn vocabulary.',
    resourceType: 'video',
    provider: 'Watts English',
    sourceUrl: 'https://www.youtube.com/watch?v=g2tKiX3ARdo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/g2tKiX3ARdo?si=LKMeRxhCe4PgJtJN" title="Back to School Mix" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video3',
    bookId: '1',
    unitId: '5',
    title: 'What is in Your Bag Song',
    description: 'A song about school supplies in a bag, ideal for practicing vocabulary.',
    resourceType: 'video',
    provider: 'Dream English',
    sourceUrl: 'https://www.youtube.com/watch?v=4dMbCLFMJmE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/4dMbCLFMJmE?si=Hw23MkQdP6XMbyKf" title="What is in Your Bag Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video4',
    bookId: '1',
    unitId: '5',
    title: 'Magic Crayons',
    description: 'A fun story about magic crayons to engage students in learning colors and school supplies.',
    resourceType: 'video',
    provider: 'Watts English',
    sourceUrl: 'https://www.youtube.com/watch?v=8YQ2amcQqZY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8YQ2amcQqZY?si=BnQR8XYPevHqXWP8" title="Magic Crayons" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit5GameResources: TeacherResource[] = [
  {
    id: 'book1-unit5-game1',
    bookId: '1',
    unitId: '5',
    title: 'WORDWALL - SCHOOL SUPPLIES (1)',
    description: 'Match the school supplies with their names.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/29163751/school-supplies',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/40d35a545aa94c26b01b53a33bad53f4?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-game2',
    bookId: '1',
    unitId: '5',
    title: 'WORDWALL - SCHOOL SUPPLIES (2)',
    description: 'Label the school objects with their correct names.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/18066347/school-objects',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5c9f25d0bbb04e23a92c2c5734a9a4de?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-game3',
    bookId: '1',
    unitId: '5',
    title: 'WORDWALL - SCHOOL SUPPLIES (3)',
    description: 'Quiz about school supplies that are in a pencil case.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1096018/in-my-pencil-case',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f47ca0a3ed604b6aa11a5be1121cbf9a?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit5Resources: TeacherResource[] = [
  ...book1Unit5VideoResources,
  ...book1Unit5GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit5Resources = () => book1Unit5Resources;

export default book1Unit5Resources;
