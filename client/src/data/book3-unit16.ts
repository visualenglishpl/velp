/**
 * Book 3 Unit 16 Resources
 * 
 * This file provides resources for Book 3 Unit 16 with support for multiple versions:
 * - Sports version
 * - House Chores version
 */

import { TeacherResource } from '@/types/resources';
import { v4 as uuidv4 } from 'uuid';

// Common resources shared between both versions
export const commonResources: TeacherResource[] = [
  {
    id: uuidv4(),
    title: 'Unit 16 Overview',
    description: 'Introduction to activities and daily routines',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '16',
    content: `# Book 3 Unit 16 - Activities and Routines

This unit focuses on teaching students about daily activities and routines. It covers:
- Talking about regular activities
- Describing frequency (how often)
- Discussing preferences
- Using present simple tense correctly

## Teaching Tips
- Use visual aids to reinforce vocabulary
- Practice question formation with role-plays
- Incorporate real-life routines into exercises
- Connect the lesson to students' personal experiences`
  },
  {
    id: uuidv4(),
    title: 'Present Simple Tense - Grammar Explanation',
    description: 'Grammar lesson on using present simple for routines',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit16/present_simple_grammar.pdf',
    bookId: '3',
    unitId: '16',
    provider: 'Visual English Materials'
  },
  {
    id: uuidv4(),
    title: 'Frequency Adverbs Song',
    description: 'Song to help students learn frequency adverbs',
    resourceType: 'video',
    sourceUrl: 'https://www.youtube.com/watch?v=XDZ3v6TkIvs',
    youtubeVideoId: 'XDZ3v6TkIvs',
    isYoutubeVideo: true,
    bookId: '3',
    unitId: '16',
    provider: 'English Tree TV'
  }
];

// Sports version resources
export const sportsVersionResources: TeacherResource[] = [
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
  }
];

// House Chores version resources
export const choresVersionResources: TeacherResource[] = [
  {
    id: uuidv4(),
    title: 'House Chores Vocabulary Flashcards',
    description: 'Printable flashcards with household chores vocabulary',
    resourceType: 'pdf',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit16/household_chores_flashcards.pdf',
    bookId: '3',
    unitId: '16',
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
    unitId: '16',
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
    unitId: '16',
    provider: 'Maple Leaf Learning'
  },
  {
    id: uuidv4(),
    title: 'House Chores Lesson Plan',
    description: 'Complete lesson plan for teaching household chores and responsibilities',
    resourceType: 'lesson',
    bookId: '3',
    unitId: '16',
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
  }
];