/**
 * Visual English Book 2, Unit 14: WHAT SPORTS DO YOU LIKE?
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit14Resources } from './book2-unit14-resources';

// Function to get resources for this unit
export function getBook2Unit14Resources(): TeacherResource[] {
  return book2Unit14Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit14LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit14-lesson1',
      title: 'Sports Vocabulary - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common sports',
        'Students will practice pronunciation of sports vocabulary',
        'Students will identify different types of sports'
      ],
      materials: [
        'Visual English Book 2 Unit 14 slides',
        'Sports flashcards', 
        'Sports quiz videos',
        'Ball (for demonstration)',
        'Sports equipment pictures'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students pictures of famous athletes or sports equipment. Ask if they recognize the sports.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present common sports with flashcards and pictures. Practice pronunciation focusing on stress patterns in multi-syllable words like "basketball" and "volleyball".'
        },
        {
          title: 'Sports Guessing Game',
          duration: '8 minutes',
          description: 'Play the "Guess the Word - Sports Quiz" video. Pause before answers are revealed to allow students to guess.'
        },
        {
          title: 'Categorizing Sports',
          duration: '10 minutes',
          description: 'Create categories on the board (team sports, individual sports, water sports, etc.) and have students help categorize sports vocabulary into appropriate groups.'
        },
        {
          title: 'Sports Charades',
          duration: '10 minutes',
          description: 'Divide class into teams. Students take turns miming different sports while their team tries to guess the correct sport name within a time limit.'
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the "Sports Groups - Wordwall" game as a class activity to reinforce sports categories.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of sports vocabulary and observe students\'s ability to categorize different types of sports.',
      homeworkIdeas: [
        'Draw and label your favorite sport',
        'Write three sentences about sports you like/dislike using "I like" and "I don\'t like"'
      ]
    },
    {
      id: 'book2-unit14-lesson2',
      title: 'Sports Preferences - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn to express sports preferences using "I like" and "I don\'t like"',
        'Students will practice asking and answering "What sports do you like?"',
        'Students will create a class survey about favorite sports'
      ],
      materials: [
        'Visual English Book 2 Unit 14 slides',
        'What Sports Do You Like? song video',
        'Sports vocabulary flashcards',
        'Survey worksheets',
        'Sports vocabulary games'
      ],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of sports vocabulary using flashcards or by playing the "What Sport is This - Guessing Song".'
        },
        {
          title: 'Likes/Dislikes Language',
          duration: '8 minutes',
          description: 'Teach the question "What sports do you like?" and response structures "I like [sport]" and "I don\'t like [sport]". Model with several examples.'
        },
        {
          title: 'Song Activity',
          duration: '7 minutes',
          description: 'Play the "What Sports Do You Like?" song by English Sing Sing. Have students listen first, then sing along focusing on the question and answer pattern.'
        },
        {
          title: 'Sports Survey',
          duration: '10 minutes',
          description: 'Give students a survey worksheet with different sports listed. Have them interview 5 classmates about which sports they like/don\'t like and record answers.'
        },
        {
          title: 'Survey Results',
          duration: '10 minutes',
          description: 'Create a class chart showing the most popular and least popular sports based on the survey results. Practice saying "Most students like [sport]" and "Few students like [sport]".'
        },
        {
          title: 'Vocabulary Game',
          duration: '8 minutes',
          description: 'Play the "Sports Vocabulary - Wordwall" game to reinforce vocabulary and assess learning.'
        }
      ],
      assessmentTips: 'Observe students\' ability to ask and respond to the sports preference question correctly. Check for proper use of "like" and "don\'t like" structures.',
      homeworkIdeas: [
        'Interview family members about their favorite sports and record their answers',
        'Draw yourself playing your favorite sport and write 2-3 sentences about why you like it'
      ],
      additionalResources: [
        {
          title: "Sports Vocabulary English Game",
          url: 'https://www.youtube.com/watch?v=mHwf5wMG2pU'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit14Resources,
  generateUnit14LessonPlans
};