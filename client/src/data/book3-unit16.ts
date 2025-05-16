/**
 * Book 3 - Unit 16 (Sports) Resources
 */

import { TeacherResource } from '@/types/resources';

export const sportsResources: TeacherResource[] = [
  {
    id: '1',
    title: 'Sports Vocabulary Song',
    description: 'Fun song teaching different sports vocabulary',
    resourceType: 'video',
    bookId: '3',
    unitId: '16',
    provider: 'Dream English Kids',
    youtubeVideoId: 'tgUSHk6JaTY',
    isYoutubeVideo: true,
    sourceUrl: 'https://www.youtube.com/watch?v=tgUSHk6JaTY'
  },
  {
    id: '2',
    title: 'Sports Flashcards - Printable',
    description: 'Printable flashcards with sports vocabulary',
    resourceType: 'pdf',
    bookId: '3',
    unitId: '16',
    provider: 'Visual English Materials',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit16/sports_flashcards.pdf'
  },
  {
    id: '3',
    title: 'Sports Activities - Interactive Game',
    description: 'Match sports with actions',
    resourceType: 'game',
    bookId: '3',
    unitId: '16',
    provider: 'Wordwall',
    wordwallGameId: '16354982',
    isWordwallGame: true,
    sourceUrl: 'https://wordwall.net/resource/16354982/sports-activities'
  },
  {
    id: '4',
    title: 'Sports Equipment - Interactive Game',
    description: 'Match sports with their equipment',
    resourceType: 'game',
    bookId: '3',
    unitId: '16',
    provider: 'Wordwall',
    wordwallGameId: '23546781',
    isWordwallGame: true,
    sourceUrl: 'https://wordwall.net/resource/23546781/sports-equipment'
  },
  {
    id: '5',
    title: 'Sports Lesson Plan',
    description: 'Complete lesson plan for teaching sports vocabulary',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '16',
    provider: 'Visual English Materials',
    content: `
      <h2>Sports Vocabulary Lesson Plan</h2>
      <h3>Objectives:</h3>
      <ul>
        <li>Students will learn names of different sports</li>
        <li>Students will practice saying "I play..." and "I don't play..."</li>
        <li>Students will discuss their favorite sports</li>
      </ul>
      <h3>Materials:</h3>
      <ul>
        <li>Sports flashcards</li>
        <li>Sports equipment pictures</li>
        <li>Ball for class activity</li>
      </ul>
      <h3>Warm-up (5 minutes):</h3>
      <p>Show students pictures of famous sports players and ask if they recognize them and what sport they play.</p>
      <h3>Main Activities:</h3>
      <ol>
        <li>Introduce sports vocabulary using flashcards (10 minutes)</li>
        <li>Practice "I play..." sentences with each student (10 minutes)</li>
        <li>Sports mime game - students act out a sport for others to guess (15 minutes)</li>
        <li>Wordwall interactive game - match sports with equipment (10 minutes)</li>
      </ol>
      <h3>Wrap-up:</h3>
      <p>Class survey - ask students what their favorite sports are and create a class chart.</p>
    `
  }
];