import { TeacherResource } from '@/components/TeacherResources';

/**
 * Resources for Book 4 Unit 15 - AT THE CIRCUS
 */

// Videos for Unit 15
export const videos: TeacherResource[] = [
  {
    id: `book4-unit15-video-1`,
    bookId: '4',
    unitId: '15',
    title: 'VISUAL 4 - UNIT 15 - AT THE CIRCUS - Video',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/K7uZZcyysP8',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/K7uZZcyysP8?si=qRNRVyaeo7BU8gMd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'K7uZZcyysP8'
    }
  }
];

// Interactive lessons for Unit 15
export const lessons: TeacherResource[] = [
  {
    id: `book4-unit15-lesson-1`,
    bookId: '4',
    unitId: '15',
    title: 'VISUAL 4 - UNIT 15 - AT THE CIRCUS - Interactive Lesson',
    resourceType: 'lesson',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/856546',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/856546" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/856546'
    }
  }
];

// Games for Unit 15
export const games: TeacherResource[] = [
  {
    id: `book4-unit15-game-1`,
    bookId: '4',
    unitId: '15',
    title: 'VISUAL 4 - UNIT 15 - AT THE CIRCUS - Circus Vocabulary Game 1',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/94c4f083575e4321bd59f57bc024dbd3',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/94c4f083575e4321bd59f57bc024dbd3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/94c4f083575e4321bd59f57bc024dbd3?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit15-game-2`,
    bookId: '4',
    unitId: '15',
    title: 'VISUAL 4 - UNIT 15 - AT THE CIRCUS - Circus Vocabulary Game 2',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6c0d9d6d5b1d40b78d0d23df4539e1e1',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6c0d9d6d5b1d40b78d0d23df4539e1e1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6c0d9d6d5b1d40b78d0d23df4539e1e1?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit15-game-3`,
    bookId: '4',
    unitId: '15',
    title: 'VISUAL 4 - UNIT 15 - AT THE CIRCUS - Circus Animals Game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1c724495ff684609895ed535379cbec0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1c724495ff684609895ed535379cbec0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/1c724495ff684609895ed535379cbec0?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...lessons, ...games];

// Main export for backward compatibility
export const book4Unit15Resources = resources;
