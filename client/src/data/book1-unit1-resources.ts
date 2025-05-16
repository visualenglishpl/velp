/**
 * Book 1 Unit 1 Resources (Greetings)
 * 
 * This file provides teacher resources for Book 1 Unit 1.
 */

import { TeacherResource } from '@/types/resources';
import { v4 as uuidv4 } from 'uuid';

// Array of teacher resources for Book 1 Unit 1
const resources: TeacherResource[] = [
  // Videos
  {
    id: uuidv4(),
    title: 'Good Morning PINKFONG',
    description: 'Cheerful morning greetings song for young learners',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=CuI_p7a9VGs',
    youtubeVideoId: 'CuI_p7a9VGs',
    isYoutubeVideo: true,
    bookId: '1',
    unitId: '1',
    provider: 'PINKFONG'
  },
  {
    id: uuidv4(),
    title: 'Good Morning, Good Night - LITTLE FOX',
    description: 'Animation showing morning and evening greetings',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=eUXkj6j6Ezw',
    youtubeVideoId: 'eUXkj6j6Ezw',
    isYoutubeVideo: true,
    bookId: '1',
    unitId: '1',
    provider: 'Little Fox'
  },
  {
    id: uuidv4(),
    title: 'The Greetings Song - MAPLE LEAF',
    description: 'Song to practice different greetings',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=gVIFEVLzP4o',
    youtubeVideoId: 'gVIFEVLzP4o',
    isYoutubeVideo: true,
    bookId: '1',
    unitId: '1',
    provider: 'Maple Leaf Learning'
  },
  
  // Games
  {
    id: uuidv4(),
    title: 'Greetings and Introductions Game',
    description: 'Interactive game for practicing greetings',
    resourceType: 'game',
    sourceUrl: 'https://wordwall.net/resource/25799430/greetings',
    wordwallGameId: '25799430',
    isWordwallGame: true,
    bookId: '1',
    unitId: '1',
    provider: 'Wordwall'
  },
  {
    id: uuidv4(),
    title: 'Hello! Goodbye! - Matching Activity',
    description: 'Match greeting expressions with appropriate situations',
    resourceType: 'game',
    sourceUrl: 'https://wordwall.net/resource/39054715/hello-goodbye',
    wordwallGameId: '39054715',
    isWordwallGame: true,
    bookId: '1',
    unitId: '1',
    provider: 'Wordwall'
  },
  
  // PDFs
  {
    id: uuidv4(),
    title: 'Greetings Flashcards',
    description: 'Printable flashcards with common greetings',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book1/unit1/greetings_flashcards.pdf',
    bookId: '1',
    unitId: '1',
    provider: 'Visual English Materials'
  },
  {
    id: uuidv4(),
    title: 'Greetings Worksheet',
    description: 'Practice worksheet for greeting expressions',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book1/unit1/greetings_worksheet.pdf',
    bookId: '1',
    unitId: '1',
    provider: 'Visual English Materials'
  },
  {
    id: uuidv4(),
    title: 'Role-Play Cards',
    description: 'Situation cards for greeting role-plays',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book1/unit1/role_play_cards.pdf',
    bookId: '1',
    unitId: '1',
    provider: 'Visual English Materials'
  },
  
  // Lesson Plans
  {
    id: uuidv4(),
    title: 'Unit 1 Lesson Plan',
    description: 'Complete lesson plan for teaching greetings',
    resourceType: 'lesson',
    bookId: '1',
    unitId: '1',
    content: `# Book 1 Unit 1 - Greetings & Introductions

## Objectives
- Students will learn basic greeting expressions
- Students will be able to introduce themselves
- Students will understand the difference between formal and informal greetings
- Students will practice common classroom phrases

## Vocabulary Focus
- Greetings: Hello, Hi, Good morning, Good afternoon, Good evening, Good night
- Introductions: My name is..., I'm..., Nice to meet you
- Responses: Nice to meet you too, How are you?, I'm fine, thank you

## Activities
1. **Warm-up (5 min)**: Greeting circle - teacher greets each student
2. **Vocabulary Introduction (10 min)**: Present greetings with visual aids
3. **Practice (15 min)**: "Hello, my name is..." chain activity
4. **Game (10 min)**: Greeting role-play with situation cards
5. **Song (5 min)**: Greetings song with actions
6. **Wrap-up (5 min)**: Quick review of new expressions

## Materials Needed
- Greetings flashcards
- Role-play situation cards
- Song video
- Greeting worksheet

## Assessment
- Can students use appropriate greetings?
- Can students introduce themselves?
- Do students respond appropriately to greetings?`
  }
];

export default resources;