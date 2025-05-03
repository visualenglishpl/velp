/**
 * Implementation file for Book 1 Unit 13: Do You Have a Pet?
 *
 * This unit focuses on teaching pet vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit13Resources } from './book1-unit13-resources';

// Export a function to get resources for this unit
export const getBook1Unit13Resources = (): TeacherResource[] => {
  return book1Unit13Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit13LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Pets (45 minutes)
    {
      id: 'book1-unit13-lesson1',
      title: 'Introduction to Pets - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn pet vocabulary (dog, cat, bird, fish, etc.)',
        'Ask and answer "Do you have a pet?"',
        'Describe pets using simple adjectives'
      ],
      materials: [
        'Visual English Book 1 - Unit 13 slides',
        'Pet flashcards or pictures',
        'Pet videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and show pet pictures. Ask: "What is this?" Teach pet vocabulary using visual aids. Have students repeat after you.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the "I Have A Pet Animal Song" video. Pause at different animals to practice vocabulary. Teach the question "Do you have a pet?" and responses "Yes, I do" / "No, I don\'t".'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Students ask and answer "Do you have a pet?" in pairs or small groups. If they answer yes, they should describe their pet (color, size, name).'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students draw their pet or a pet they would like to have. Then they present it to the class using "This is my pet [animal]. Its name is [name]."'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review pet vocabulary learned today. Play a quick game: teacher says an animal and students must make that animal sound or movement.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of "Do you have a pet?" question and appropriate responses. Check drawings for understanding of vocabulary.',
      homeworkIdeas: [
        'Complete a worksheet identifying different pets',
        'Draw their favorite pet and write 3 sentences about it'
      ],
      additionalResources: [
        {
          title: 'Pet Vocabulary Resources',
          url: 'https://supersimple.com/super-simple-songs/i-have-a-pet/'
        }
      ]
    },
    
    // Lesson Plan 2 - Pet Care and Descriptions (45 minutes)
    {
      id: 'book1-unit13-lesson2',
      title: 'Pet Care and Descriptions - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Expand pet vocabulary with care-related words',
        'Describe pets in more detail (size, color, behavior)',
        'Learn about pet habitats and needs'
      ],
      materials: [
        'Visual English Book 1 - Unit 13 slides',
        'Interactive pet games from resources section',
        'Pet care items or pictures (food bowl, leash, pet bed, etc.)',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review pet vocabulary from previous lesson. Show images of pets and ask: "What pet is this?" and "Do you have this pet?"'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the "Pet Store" video from resources. Discuss what pets need: food, water, shelter, love. Introduce vocabulary for pet care items.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students discuss what different pets need. Give each group a pet to focus on (dog, cat, fish, bird) and have them create a list of items needed for that pet.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall pet games from resources. After playing, have students design a pet house using the PBS Kids game, explaining what their pet needs.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary related to pets and pet care. Each student shares one important thing their pet (real or imaginary) needs.'
        }
      ],
      assessmentTips: 'Check student understanding of pet care concepts through the group activity. Listen for correct use of descriptive vocabulary during presentations.',
      homeworkIdeas: [
        'Create a pet care poster for their favorite pet',
        'Write 5 sentences about what their pet needs'
      ],
      additionalResources: [
        {
          title: 'Pet Care Teaching Resources',
          url: 'https://www.education.com/resources/pets/'
        }
      ]
    }
  ];
};
