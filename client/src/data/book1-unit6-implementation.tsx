/**
 * Implementation file for Book 1 Unit 6: My Favourite Colour
 *
 * This unit focuses on teaching colors and expressing preferences using
 * "My favourite colour is..."
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit6Resources } from './book1-unit6-resources';

// Export a function to get resources for this unit
export const getBook1Unit6Resources = (): TeacherResource[] => {
  return book1Unit6Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit6LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Colours and Preferences (45 minutes)
    {
      id: 'book1-unit6-lesson1',
      title: 'Colours and Preferences - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify basic colours (red, blue, green, yellow, orange, purple, pink, black, white, brown)',
        'Use the structure "My favourite colour is..."',
        'Ask and answer "What is your favourite colour?"'
      ],
      materials: [
        'Coloured flashcards',
        '"I See Something Blue" video',
        'Coloured objects or pictures',
        'Drawing paper and coloured pencils/crayons'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of colours. Show coloured flashcards one by one and ask "What colour is this?". Students respond with the colour name.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the video "I See Something Blue" from Super Simple Songs. Pause at different points to reinforce colour vocabulary. Introduce the question "What colour is it?" and model responses. Show various classroom objects and ask "What colour is the [object]?"'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students take turns asking "What colour is this?" about classroom objects. Introduce the question "What is your favourite colour?" Model the answer: "My favourite colour is [colour]." Students practice asking and answering about favourite colours in pairs. Play the video "What\'s Your Favorite Color" to reinforce the language pattern.'
        },
        {
          title: 'Production',
          duration: '10 minutes',
          description: 'Students draw a picture using their favourite colour. Students present their drawings to the class saying "My favourite colour is [colour]." Teacher asks additional questions: "What colour is this part?"'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the colours learned today. Play a quick game: "Touch something [colour]" where students must quickly touch something of that colour in the classroom. Assign homework: Find 5 objects at home with different colours.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of colour vocabulary. Check drawings for correct colour identification.',
      homeworkIdeas: [
        'Find 5 objects of different colours at home and be ready to talk about them.',
        'Draw a picture using your favourite colour for the next class.'
      ],
      additionalResources: [
        {
          title: 'I See Something Blue - Super Simple Songs',
          url: 'https://www.youtube.com/watch?v=jYAWf8Y91hA'
        },
        {
          title: 'What\'s Your Favorite Color - Super Simple Song',
          url: 'https://www.youtube.com/watch?v=zxIpA5nF_LY'
        }
      ]
    },
    
    // Lesson Plan 2 - Colours in Our World (45 minutes)
    {
      id: 'book1-unit6-lesson2',
      title: 'Colours in Our World - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and reinforce colour vocabulary',
        'Use "It\'s [colour]" to describe objects',
        'Learn colour adjectives (bright, dark, light)',
        'Practice spelling colour words'
      ],
      materials: [
        '"I See Something Pink" video',
        '"Colour Spelling" video',
        'Wordwall colour games',
        'Pictures of objects in different colours',
        'Coloured paper strips'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review colours by showing coloured cards or objects. Ask students to say the colour and one object of that colour ("Blue like the sky"). Quick review of favourite colours: "My favourite colour is..."'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the video "I See Something Pink". Introduce the concept of light and dark colours using visual examples. Model phrases like: "This is light blue" and "This is dark blue". Play the "Colour Spelling" video to practice spelling colour words.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Divide the class into small groups. Give each group a set of coloured paper strips. Students arrange them from lightest to darkest. Students practice: "This is light green. This is dark green." Game: "I spy with my little eye something that is [colour]"'
        },
        {
          title: 'Digital Activity',
          duration: '10 minutes',
          description: 'Use one of the Wordwall colour games for interactive practice. Students take turns playing the game to identify colours and vocabulary. Class cheers and helps with correct answers.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play the video "What colour is it?" as a review. Conduct a quick colour quiz with pictures shown on screen. Review the favourite colour question and have a few students answer.'
        }
      ],
      assessmentTips: 'Check student understanding through the digital game scores. Monitor use of light/dark color vocabulary during the paper strip activity.',
      homeworkIdeas: [
        'Create a colour collage with magazine cutouts of their favourite colour.',
        'Find objects with different shades of the same colour (light blue, dark blue, etc.)'
      ],
      additionalResources: [
        {
          title: 'I See Something Pink - Super Simple Songs',
          url: 'https://www.youtube.com/watch?v=Asb8N0nz9OI'
        },
        {
          title: 'Colour Spelling',
          url: 'https://www.youtube.com/watch?v=0LNuoKsAtN8'
        }
      ]
    }
  ];
};
