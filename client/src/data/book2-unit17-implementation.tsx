/**
 * Visual English Book 2, Unit 17: WHERE ARE YOU FROM?
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit17Resources } from './book2-unit17-resources';

// Function to get resources for this unit
export function getBook2Unit17Resources(): TeacherResource[] {
  return book2Unit17Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit17LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit17-lesson1',
      title: 'Countries and Nationalities - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common countries and their nationalities',
        'Students will practice saying country names and nationalities correctly',
        'Students will identify various country flags'
      ],
      materials: [
        'Visual English Book 2 Unit 17 slides',
        'World map with country names',
        'Country and nationality flashcards',
        'Country flag pictures',
        'Nationality song videos'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students a world map and point to various countries. Ask if they know the English names of any countries.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present 10-12 common countries with their flags and corresponding nationalities. Practice pronunciation with the whole class, focusing on nationality suffixes (-ish, -ian, -ese, etc.).'
        },
        {
          title: 'Where Are You From? Song',
          duration: '8 minutes',
          description: 'Play "Where Are You From?" song by Maple Leaf Learning. First, have students listen, then play it again and encourage them to sing along.'
        },
        {
          title: 'Country-Nationality Matching',
          duration: '10 minutes',
          description: 'Divide the class into pairs and give each pair a set of cards with country names and nationalities. Have them match countries with the correct nationalities.'
        },
        {
          title: 'Flag Identification',
          duration: '10 minutes',
          description: 'Show students various country flags and have them identify the country and nationality. Use the "Where Are You From? - Flags and Countries" video as a reference.'
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the "Where Are You From? - Wordwall" game as a class activity to reinforce country and nationality vocabulary.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of country names and nationality forms. Check students\' ability to match countries with their nationalities.',
      homeworkIdeas: [
        'Draw and color three country flags and write the country name and nationality for each',
        'Write a list of five countries you would like to visit and why'
      ]
    },
    {
      id: 'book2-unit17-lesson2',
      title: 'Where Are You From? - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn to ask and answer "Where are you from?"',
        'Students will practice saying "I am from [country]. I am [nationality]."',
        'Students will create a class map of nationalities'
      ],
      materials: [
        'Visual English Book 2 Unit 17 slides',
        'Nationality rap video',
        'World map',
        'Small flags or flag stickers',
        'Nationality wordwall games'
      ],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of country and nationality vocabulary using flashcards or by singing one of the nationality songs again.'
        },
        {
          title: 'Dialogue Introduction',
          duration: '8 minutes',
          description: 'Teach the question "Where are you from?" and the response structures "I am from [country]. I am [nationality]." Model with several examples using the world map.'
        },
        {
          title: 'Nationality Rap',
          duration: '7 minutes',
          description: 'Play the "What\'s Your Nationality? - Rap" video. Have students listen first, then play again having them focus on the question-answer pattern.'
        },
        {
          title: 'Interview Activity',
          duration: '10 minutes',
          description: 'Give students role-play identities from different countries. Have them mingle around the classroom, asking each other "Where are you from?" and responding with their assigned identities.'
        },
        {
          title: 'Class Nationality Map',
          duration: '10 minutes',
          description: 'Place a large world map on the wall. Have each student choose a country they would like to be from, and place a flag or pin on that country with their name written on it.'
        },
        {
          title: 'Nationality Matching Game',
          duration: '8 minutes',
          description: 'Play the "Countries and Nationalities - Wordwall" game to assess and reinforce learning.'
        }
      ],
      assessmentTips: 'Observe students\' ability to ask and respond to "Where are you from?" correctly. Check for proper pronunciation of country names and nationalities.',
      homeworkIdeas: [
        'Interview a family member about which countries they have visited or would like to visit',
        'Create a "passport" with information about yourself, including your pretend nationality'
      ],
      additionalResources: [
        {
          title: "What is your Nationality? Song",
          url: 'https://www.youtube.com/watch?v=LIUWCSD11MM'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit17Resources,
  generateUnit17LessonPlans
};