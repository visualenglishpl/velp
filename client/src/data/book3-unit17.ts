/**
 * Book 3 - Unit 17 (Household Chores) Resources
 */

import { TeacherResource } from '@/types/resources';

export const choresResources: TeacherResource[] = [
  {
    id: '1',
    title: 'This Is The Way We Clean The House',
    description: 'Song teaching household chores vocabulary',
    resourceType: 'video',
    bookId: '3',
    unitId: '17',
    provider: 'Super Simple Songs',
    youtubeVideoId: 'V7TIR8QvFlA',
    isYoutubeVideo: true,
    sourceUrl: 'https://www.youtube.com/watch?v=V7TIR8QvFlA'
  },
  {
    id: '2',
    title: 'Household Chores Flashcards',
    description: 'Printable flashcards with household chores vocabulary',
    resourceType: 'pdf',
    bookId: '3',
    unitId: '17',
    provider: 'Visual English Materials',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit17/household_chores_flashcards.pdf'
  },
  {
    id: '3',
    title: 'Household Chores - Interactive Game',
    description: 'Match chores with rooms in the house',
    resourceType: 'game',
    bookId: '3',
    unitId: '17',
    provider: 'Wordwall',
    wordwallGameId: '9275631',
    isWordwallGame: true,
    sourceUrl: 'https://wordwall.net/resource/9275631/household-chores'
  },
  {
    id: '4',
    title: 'Chores Memory Game',
    description: 'Memory matching game with household chores vocabulary',
    resourceType: 'game',
    bookId: '3',
    unitId: '17',
    provider: 'Visual English Materials',
    isIslCollective: true,
    islCollectiveId: '13562978',
    sourceUrl: 'https://en.islcollective.com/english-esl-worksheets/grammar/present-continuous-progressive-tense/household-chores-memory-game/13562978'
  },
  {
    id: '5',
    title: 'Household Chores Lesson Plan',
    description: 'Complete lesson plan for teaching household chores vocabulary',
    resourceType: 'lessonPlan',
    bookId: '3',
    unitId: '17',
    provider: 'Visual English Materials',
    content: `
      <h2>Household Chores Lesson Plan</h2>
      <h3>Objectives:</h3>
      <ul>
        <li>Students will learn vocabulary related to household chores</li>
        <li>Students will practice saying "I help with..." and "I don't help with..."</li>
        <li>Students will discuss responsibilities at home</li>
      </ul>
      <h3>Materials:</h3>
      <ul>
        <li>Household chores flashcards</li>
        <li>Picture of a house with different rooms</li>
        <li>Props for demonstration (optional)</li>
      </ul>
      <h3>Warm-up (5 minutes):</h3>
      <p>Ask students to share what chores they do at home to help their family.</p>
      <h3>Main Activities:</h3>
      <ol>
        <li>Introduce household chores vocabulary using flashcards (10 minutes)</li>
        <li>Practice "I help with..." sentences with each student (10 minutes)</li>
        <li>Chores mime game - students act out a chore for others to guess (15 minutes)</li>
        <li>Wordwall interactive game - match chores with rooms in the house (10 minutes)</li>
      </ol>
      <h3>Wrap-up:</h3>
      <p>Create a class chore chart - students draw pictures of themselves doing different chores.</p>
    `
  }
];