/**
 * Book 3 Unit 16 Resources (Sports)
 * 
 * This file provides resources for Book 3 Unit 16 focused on Sports
 */

import { TeacherResource } from '@/types/resources';
import { v4 as uuidv4 } from 'uuid';

// Resources for Book 3 Unit 16 (Sports)
export const sportsResources: TeacherResource[] = [
  {
    id: uuidv4(),
    title: 'Sports Unit Overview',
    description: 'Introduction to sports activities and related vocabulary',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '16',
    content: `# Book 3 Unit 16 - Sports Activities

This unit focuses on teaching students about sports and physical activities. It covers:
- Different types of sports and games
- Discussing preferences in sports
- Expressing abilities with sports
- Using action verbs correctly

## Teaching Tips
- Use visual aids to reinforce sports vocabulary
- Practice question formation with role-plays
- Incorporate physical movements when possible 
- Connect the lesson to students' personal sports experiences`
  },
  {
    id: uuidv4(),
    title: 'Sports Vocabulary Flashcards',
    description: 'Printable flashcards with sports vocabulary',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit16/sports_flashcards.pdf',
    bookId: '3',
    unitId: '16',
    provider: 'Visual English Materials'
  },
  {
    id: uuidv4(),
    title: 'Sports Activities - Interactive Game',
    description: 'Match sports with actions',
    resourceType: 'game',
    sourceUrl: 'https://wordwall.net/resource/16354982/sports-activities',
    wordwallGameId: '16354982',
    isWordwallGame: true,
    bookId: '3',
    unitId: '16',
    provider: 'Wordwall'
  },
  {
    id: uuidv4(),
    title: 'Sports Song for Kids',
    description: 'Fun song about different sports',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=EfD2k9beP-4',
    youtubeVideoId: 'EfD2k9beP-4',
    isYoutubeVideo: true,
    bookId: '3',
    unitId: '16',
    provider: 'Dream English Kids'
  },
  {
    id: uuidv4(),
    title: 'Sports Lesson Plan',
    description: 'Complete lesson plan for teaching sports vocabulary and activities',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '16',
    content: `# Sports Activities Lesson Plan

## Objectives
- Students will learn at least 10 different sports
- Students will be able to express which sports they like/don't like
- Students will be able to describe sports using basic adjectives
- Students will practice using frequency adverbs with sports activities

## Vocabulary Focus
- Football, basketball, swimming, running, tennis, volleyball, skiing, cycling, skating, gymnastics
- Verbs: play, do, go
- Frequency: always, usually, sometimes, never

## Activities
1. **Warm-up (5 min)**: Sports mime game - students act out sports
2. **Vocabulary Introduction (10 min)**: Present sports with visual aids
3. **Practice (15 min)**: "Do you like...?" pair work activity
4. **Game (10 min)**: Sports matching game
5. **Wrap-up (5 min)**: Quick review of new vocabulary

## Materials Needed
- Sports flashcards
- Worksheets
- Ball for class activities`
  },
  {
    id: uuidv4(),
    title: 'Play Sports (Super Simple Songs)',
    description: 'Catchy song teaching various sports activities',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=X1bQUrNXUAo',
    youtubeVideoId: 'X1bQUrNXUAo',
    isYoutubeVideo: true,
    bookId: '3',
    unitId: '16',
    provider: 'Super Simple Songs'
  }
];