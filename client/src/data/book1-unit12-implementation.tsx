/**
 * Visual English Book 1, Unit 12: Home Sweet Home
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit12Resources } from './book1-unit12-resources';

// Export a function to get resources for this unit
export const getBook1Unit12Resources = (): TeacherResource[] => {
  return book1Unit12Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit12LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Rooms in the House (45 minutes)
    {
      id: 'book1-unit12-lesson1',
      title: 'Introduction to Rooms in the House',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn names of the main rooms in a house (bathroom, bedroom, kitchen, living room)',
        'Identify objects found in different rooms',
        'Use simple sentences to name rooms and their functions'
      ],
      materials: [
        'Visual English Book 1 - Unit 12 slides',
        'House room flashcards',
        'Rooms Of The House Song - Planet Pop video',
        'Drawing paper and colored pencils',
        'Pictures of rooms in a house'
      ],
      steps: [
        {
          title: 'House Song Introduction',
          duration: '5 minutes',
          description: 'Play the "Rooms Of The House Song - Planet Pop" video. Have students watch and listen first time, then encourage them to join in with actions during the second viewing.'
        },
        {
          title: 'Room Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Use flashcards to introduce the main rooms: bathroom, bedroom, kitchen, living room. For each room, discuss what we do there (sleep in bedroom, cook in kitchen, etc.).'
        },
        {
          title: 'Room Objects Matching',
          duration: '8 minutes',
          description: 'Show pictures of various household objects and have students identify which room they belong in. Ask: "Where is the [bed/stove/sofa]?" Students respond: "It\'s in the [room]."'
        },
        {
          title: 'Dream House Drawing Activity',
          duration: '15 minutes',
          description: 'Have students draw a simple floor plan of a house with different rooms. They should label each room and draw at least one object that belongs in each room.'
        },
        {
          title: 'Room Location Game',
          duration: '7 minutes',
          description: 'Teacher calls out an action ("sleeping", "cooking", "washing") and students respond with the room name. Then reverse: teacher says a room and students mime an activity done there.'
        }
      ],
      assessmentTips: 'Check if students can correctly name rooms and place objects in appropriate rooms. Listen for proper pronunciation of room names.',
      homeworkIdeas: [
        'Draw and label their own bedroom or favorite room in their house',
        'Complete a worksheet matching objects to different rooms'
      ],
      additionalResources: [
        {
          title: 'House and Home Resources',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    },
    
    // Lesson Plan 2 - Objects in the House (45 minutes)
    {
      id: 'book1-unit12-lesson2',
      title: 'Objects in the House',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn vocabulary for common household objects',
        'Practice asking and answering "Where is...?" questions',
        'Use prepositions of place with house objects',
        'Develop descriptive language about houses'
      ],
      materials: [
        'Visual English Book 1 - Unit 12 slides',
        'VIDEO STORY Rooms in the House WATTS ENGLISH video',
        'Pictures of household objects',
        'Wordwall games from resources section',
        'Simple house floor plan template'
      ],
      steps: [
        {
          title: 'Review and Video',
          duration: '7 minutes',
          description: 'Review room names from previous lesson. Play the "VIDEO STORY Rooms in the House WATTS ENGLISH" video, asking students to notice the different rooms and objects shown.'
        },
        {
          title: 'Household Objects Vocabulary',
          duration: '8 minutes',
          description: 'Introduce common household objects: bed, table, chair, sofa, TV, bathtub, toilet, sink, stove, fridge, etc. Students repeat the words and practice the question "What\'s this?" with the answer "It\'s a [object]."'
        },
        {
          title: 'Where Is It? Practice',
          duration: '10 minutes',
          description: 'Using the house floor plan, place pictures of objects in different rooms. Practice asking "Where is the [object]?" with answers "It\'s in the [room]." Add prepositions for advanced students: "It\'s on the table in the kitchen."'
        },
        {
          title: 'Room Quiz Game',
          duration: '10 minutes',
          description: 'Play the "VIDEO QUIZ - Rooms of the House Game" from resources. Students take turns identifying rooms and objects, earning points for correct answers.'
        },
        {
          title: 'Interactive Wordwall Game',
          duration: '10 minutes',
          description: 'Use the "WORDWALL - ROOMS IN THE HOUSE" games from resources. Students practice matching rooms, objects, and activities.'
        }
      ],
      assessmentTips: 'Observe students\' ability to correctly place objects in appropriate rooms. Check comprehension of "Where is...?" questions through the interactive games.',
      homeworkIdeas: [
        'Create a picture dictionary of household objects',
        'Write 3-5 sentences about their favorite room at home'
      ],
      additionalResources: [
        {
          title: 'House and Home Activities',
          url: 'https://en.islcollective.com/'
        }
      ]
    }
  ];
};

export default generateUnit12LessonPlans;
