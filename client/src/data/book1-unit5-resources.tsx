/**
 * Visual English Book 1, Unit 5: Family
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit5VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit5-video1',
    bookId: '1',
    unitId: '5',
    title: 'The Finger Family',
    description: 'A catchy song that introduces family vocabulary through the finger family theme.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=1EyrquyRg5s',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/1EyrquyRg5s?si=3Zq8IQRNRyPxT6CU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video2',
    bookId: '1',
    unitId: '5',
    title: 'My family - WATTS ENGLISH',
    description: 'A fun video about family members and vocabulary for beginners.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=VvrG4JguNQk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video3',
    bookId: '1',
    unitId: '5',
    title: 'Baby Shark Dance - PINKFONG',
    description: 'The popular Baby Shark song that introduces family members in a fun and engaging way.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XqZsoesa55w',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video4',
    bookId: '1',
    unitId: '5',
    title: 'Baby Shark - SUPER SIMPLE SONGS',
    description: 'Super Simple Songs version of the baby shark song focusing on family members.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=GR2o6k8aPlI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-video5',
    bookId: '1',
    unitId: '5',
    title: 'Family - ENGLISH TREE',
    description: 'A clear introduction to family vocabulary with simple examples.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=d_WQEw13TCo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit5GameResources: TeacherResource[] = [
  {
    id: 'book1-unit5-game1',
    bookId: '1',
    unitId: '5',
    title: 'WORDWALL - FAMILY (1)',
    description: 'Interactive game to practice family vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e5f62afa86814cc98336327469ce1554',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-game2',
    bookId: '1',
    unitId: '5',
    title: 'WORDWALL - FAMILY (2)',
    description: 'Match family member names with their corresponding images.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d1bc1e8629a445468a696f03f372e5e9',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit5-game3',
    bookId: '1',
    unitId: '5',
    title: 'WORDWALL - FAMILY (3)',
    description: 'Quiz to test knowledge of family vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1c606c6af00643d692fc0199a60c2b2c',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
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
