import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import { book3Unit16Resources } from './book3-unit16-sports-resources';

/**
 * Book 3 Unit 16 - SPORTS
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '16';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'SPORTS';

// Export resources getter function
export const getBook3Unit16SportsResources = (): TeacherResource[] => {
  return book3Unit16Resources;
};

// Generate specific lesson plans for this unit
export const generateBook3Unit16LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for different sports', 'Ask and answer "What sport do you like?"', 'Express preferences using "I like/I don\'t like"'],
      materials: ['Sports flashcards', 'Ball (small, soft)', 'Visual English 3 textbook', 'Sports equipment pictures'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of different sports and elicit names.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach key sports vocabulary.',
          instructions: [
            'Present flashcards with different sports: soccer, basketball, swimming, etc.',
            'Model pronunciation and have students repeat.',
            'Demonstrate simple actions for each sport (mime) and have students guess.'
          ]
        },
        {
          title: 'Video: What Sport is This',
          duration: '8 minutes',
          description: 'Watch the "What Sport is This" guessing song video.',
          instructions: [
            'Play the video once through.',
            'Play again, pausing to let students guess the sport before the answer is revealed.',
            'Have students mime the actions along with the video.'
          ],
          teacherNotes: 'Encourage participation by turning it into a competition - who can guess the most sports correctly.'
        },
        {
          title: 'Ball Toss Q&A',
          duration: '7 minutes',
          description: 'Practice asking and answering about sports preferences.',
          instructions: [
            'Have students stand in a circle.',
            'Model: "What sport do you like?" (toss ball) "I like soccer."',
            'Student with the ball answers, then asks another student while tossing the ball.',
            'Introduce "I don\'t like" for variety.'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '10 minutes',
          description: 'Play one of the Wordwall Sports games together.',
          teacherNotes: 'Choose the most appropriate game for your class level. Allow students to work in pairs if devices are available.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review sports vocabulary with a quick "Simon Says" style game using sports actions.'
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and name common sports. Observe their use of "I like/I don\'t like" with sports vocabulary.',
      homeworkIdeas: ['Complete the sports matching worksheet.', 'Draw your favorite sport and write 2-3 sentences about why you like it.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn sports equipment vocabulary', 'Match sports with their equipment', 'Conduct a class survey about favorite sports'],
      materials: ['Sports equipment flashcards', 'Visual English 3 textbook', 'Survey handout', 'Video: Sports Vocabulary'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of sports vocabulary with flashcards.'
        },
        {
          title: 'Equipment Vocabulary',
          duration: '10 minutes',
          description: 'Teach sports equipment vocabulary.',
          instructions: [
            'Show pictures of different sports equipment: ball, racket, bat, etc.',
            'Ask students which sport uses each piece of equipment.',
            'Create simple matching activity on the board.'
          ]
        },
        {
          title: 'Video: Sports Vocabulary',
          duration: '7 minutes',
          description: 'Watch the "Sports Vocabulary" video.',
          teacherNotes: 'This video helps reinforce both sports and equipment vocabulary.'
        },
        {
          title: 'Guessing Game',
          duration: '8 minutes',
          description: 'Students guess sports from equipment descriptions.',
          instructions: [
            'Teacher describes equipment without naming the sport.',
            'Example: "You need a racket and a shuttlecock for this sport. What is it?"',
            'Students take turns being the describer.'
          ]
        },
        {
          title: 'Class Survey',
          duration: '10 minutes',
          description: 'Students conduct a class survey about favorite sports.',
          instructions: [
            'Distribute survey handouts with 5-6 common sports listed.',
            'Students circulate and ask classmates: "Do you like [sport]?"',
            'Tally the responses on their sheets.',
            'Create a simple bar graph on the board with the results.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Watch the "What Sports Do You Like" song video as reinforcement and review.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to connect sports with appropriate equipment and their comfort in asking and answering about sports preferences.',
      homeworkIdeas: ['Complete online Wordwall activities about sports.', 'Survey family members about their favorite sports and report findings.'] 
    }
  ];
};
