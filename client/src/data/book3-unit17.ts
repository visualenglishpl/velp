/**
 * Book 3 Unit 17 Resources (Household Chores)
 * 
 * This file provides resources for Book 3 Unit 17 focused on Household Chores
 */

import { TeacherResource } from '@/types/resources';
import { v4 as uuidv4 } from 'uuid';

// Resources for Book 3 Unit 17 (Household Chores)
export const choresResources: TeacherResource[] = [
  {
    id: uuidv4(),
    title: 'Household Chores Unit Overview',
    description: 'Introduction to household chores and responsibilities',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '17',
    content: `# Book 3 Unit 17 - Household Chores

This unit focuses on teaching students about household responsibilities and daily chores. It covers:
- Common household tasks and cleaning activities
- Talking about family responsibilities
- Expressing frequency of chores
- Using action verbs for household activities

## Teaching Tips
- Use visual aids to reinforce chores vocabulary
- Practice question formation with role-plays
- Incorporate demonstrations when possible
- Connect the lesson to students' personal experiences at home`
  },
  {
    id: uuidv4(),
    title: 'House Chores Vocabulary Flashcards',
    description: 'Printable flashcards with household chores vocabulary',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit17/household_chores_flashcards.pdf',
    bookId: '3',
    unitId: '17',
    provider: 'Visual English Materials'
  },
  {
    id: uuidv4(),
    title: 'Household Chores - Interactive Game',
    description: 'Match chores with rooms in the house',
    resourceType: 'game',
    sourceUrl: 'https://wordwall.net/resource/9275631/household-chores',
    wordwallGameId: '9275631',
    isWordwallGame: true,
    bookId: '3',
    unitId: '17',
    provider: 'Wordwall'
  },
  {
    id: uuidv4(),
    title: 'Household Chores Song',
    description: 'Fun song about household activities',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=CT-D6QuS35I',
    youtubeVideoId: 'CT-D6QuS35I',
    isYoutubeVideo: true,
    bookId: '3',
    unitId: '17',
    provider: 'Maple Leaf Learning'
  },
  {
    id: uuidv4(),
    title: 'House Chores Lesson Plan',
    description: 'Complete lesson plan for teaching household chores and responsibilities',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '17',
    content: `# Household Chores Lesson Plan

## Objectives
- Students will learn at least 10 different household chores
- Students will be able to express which chores they do at home
- Students will be able to describe when they do different chores
- Students will practice using frequency adverbs with household activities

## Vocabulary Focus
- Washing dishes, making the bed, taking out the trash, sweeping the floor, dusting, vacuuming, doing laundry, cleaning the bathroom, setting the table, watering plants
- Frequency: every day, once a week, twice a month, on weekends

## Activities
1. **Warm-up (5 min)**: Chores mime game - students act out household activities
2. **Vocabulary Introduction (10 min)**: Present chores with visual aids
3. **Practice (15 min)**: "Do you help with...?" pair work activity
4. **Game (10 min)**: Chores matching game
5. **Wrap-up (5 min)**: Quick review of new vocabulary

## Materials Needed
- Household items flashcards
- Worksheets
- Cleaning prop items (optional)`
  },
  {
    id: uuidv4(),
    title: 'This is the Way We Clean the House',
    description: 'Classic children\'s song about household chores',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=1MkdyNoRW7A',
    youtubeVideoId: '1MkdyNoRW7A',
    isYoutubeVideo: true,
    bookId: '3',
    unitId: '17',
    provider: 'Super Simple Songs'
  }
];