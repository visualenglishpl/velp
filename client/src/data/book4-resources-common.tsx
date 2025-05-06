import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

/**
 * Common resource definitions for Book 4
 */

// Book title
export const BOOK4_TITLE = 'VISUAL ENGLISH 4';

// Unit titles - used by TeacherResources.tsx
export const BOOK4_UNIT_TITLES: Record<string, string> = {
  '1': 'NATIONALITIES',
  '2': 'DAILY ROUTINE',
  '3': 'NATURE',
  '4': 'HEALTH PROBLEMS',
  '5': 'APPEARANCE',
  '6': 'MOVIES',
  '7': 'JOBS AND WORK',
  '8': 'ENJOY YOUR MEAL',
  '9': 'CAMPING',
  '10': 'DIGITAL TECHNOLOGY',
  '11': 'SHOPPING',
  '12': 'HOLIDAYS',
  '13': 'SPORTS',
  '14': 'TOURISM',
  '15': 'FUTURE',
  '16': 'ENTERTAINMENT'
};

// Book metadata
export const book4Metadata = {
  id: '4',
  title: BOOK4_TITLE,
  unitCount: 16,
  ageGroup: 'teens',
  level: 'intermediate',
};

// Book-wide resources that apply to all units
export const commonResources: TeacherResource[] = [
  // Add any book-level resources here
];

/**
 * Generate resources for a Book 4 unit
 * This function is used by TeacherResources.tsx
 */
export function generateBook4UnitResources(unitId: string): TeacherResource[] {
  return [];
}

/**
 * Generate default lesson plans for a Book 4 unit
 * This function is used by TeacherResources.tsx
 */
export function generateDefaultBook4UnitLessonPlans(unitId: string, unitTitle?: string): LessonPlan[] {
  // Get unit title if not provided
  if (!unitTitle) {
    unitTitle = BOOK4_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  }
  
  let lessonPlans: LessonPlan[] = [];
  
  // Create specific lesson plans based on unit content
  switch(unitId) {
    case '1': // NATIONALITIES
      lessonPlans = [
        {
          id: `book4-unit${unitId}-lesson-1`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 1`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            'Students will learn vocabulary related to different nationalities',
            'Students will practice asking and answering about nationalities',
            'Students will identify flags and countries of the United Kingdom'
          ],
          materials: ['Flashcards with flags', 'World map', 'Interactive board'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Introduction to countries and nationalities',
              instructions: ['Show students a world map', 'Point to different countries and ask if they know them']
            },
            {
              title: 'Vocabulary Introduction',
              duration: '15 minutes',
              description: 'Teach vocabulary for common nationalities',
              materials: ['Flashcards with national flags'],
              instructions: [
                'Show flag flashcards one by one',
                'Introduce nationality terms for each country',
                'Practice pronunciation of nationality words'
              ]
            },
            {
              title: 'Practice Activity',
              duration: '15 minutes',
              description: 'Q&A practice with nationality questions',
              materials: ['Handouts with conversation examples'],
              instructions: [
                'Model dialogues: "Where are you from?" "I am from..."',
                'Practice questions: "What nationality are you?" "I am..."',
                'Students work in pairs to practice conversations'
              ]
            },
            {
              title: 'UK Countries Focus',
              duration: '5 minutes',
              description: 'Introduction to the countries of the United Kingdom',
              instructions: [
                'Show map of the UK',
                'Identify England, Scotland, Wales, and Northern Ireland',
                'Discuss capitals and flags of each country'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Review of key vocabulary through quick quiz',
              instructions: [
                'Show flags and have students name countries and nationalities',
                'Review any challenging vocabulary'
              ]
            }
          ],
          assessmentTips: 'Students can correctly identify common nationalities and answer questions about where they are from.',
          homeworkIdeas: ['Complete nationality matching worksheet', 'Research and write 5 facts about a chosen country']
        },
        {
          id: `book4-unit${unitId}-lesson-2`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 2`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            'Students will understand the difference between countries and nationalities',
            'Students will learn about UK countries in more detail',
            'Students will create a brief presentation about a chosen nationality'
          ],
          materials: ['UK flags images', 'Handouts with nationality terms', 'Presentation materials'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Review nationalities from previous lesson with quick game.',
              instructions: ['Show flags and have students call out nationalities']
            },
            {
              title: 'UK Focus',
              duration: '15 minutes',
              description: 'Deep dive into UK countries and nationalities',
              materials: ['UK map and flags'],
              instructions: [
                'Review English, Scottish, Welsh and Northern Irish nationalities',
                'Introduce key landmarks and cultural elements of each',
                'Play the UK Countries Wordwall game as a class'
              ]
            },
            {
              title: 'Group Activity',
              duration: '15 minutes',
              description: 'Create nationality profiles',
              materials: ['Paper, markers, reference materials'],
              instructions: [
                'Divide class into small groups',
                'Assign each group a different nationality to research',
                'Groups create a profile with key facts about their assigned nationality',
                'Present findings to the class'
              ]
            },
            {
              title: 'Plenary',
              duration: '10 minutes',
              description: 'Review activity with interactive quiz',
              instructions: [
                'Play the UK Capital Cities game',
                'Discuss what students learned about different nationalities',
                'Address any remaining questions'
              ]
            }
          ],
          assessmentTips: 'Students can differentiate between countries and nationalities and identify UK countries correctly.',
          homeworkIdeas: ['Create a fact sheet about your favorite country', 'Complete nationality vocabulary exercises']
        }
      ];
      
    case '2': // DAILY ROUTINE
      lessonPlans = [
        {
          id: `book4-unit${unitId}-lesson-1`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 1`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            'Students will learn vocabulary related to daily routines',
            'Students will practice telling the time',
            'Students will describe their own daily activities'
          ],
          materials: ['Daily routine flashcards', 'Clock model', 'Daily schedule handout'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Introduction to daily routines',
              instructions: [
                'Ask students what time they woke up today',
                'Elicit other morning routine activities'
              ]
            },
            {
              title: 'Vocabulary Introduction',
              duration: '15 minutes',
              description: 'Teach daily routine vocabulary and time expressions',
              materials: ['Daily routine flashcards', 'Clock model'],
              instructions: [
                'Present flashcards with daily activities (wake up, brush teeth, have breakfast, etc.)',
                'Practice time expressions (in the morning, at noon, in the evening)',
                'Review telling the time using clock model'
              ]
            },
            {
              title: 'Practice Activity',
              duration: '15 minutes',
              description: 'Create personal daily schedules',
              materials: ['Daily schedule handout'],
              instructions: [
                'Distribute daily schedule templates',
                'Students fill in their typical daily routine with times',
                'Practice saying sentences: "I wake up at 7:00 AM", "I have breakfast at 8:00 AM"'
              ]
            },
            {
              title: 'Video Activity',
              duration: '5 minutes',
              description: 'Watch video about daily routines',
              instructions: [
                'Show the Daily Routine video from unit resources',
                'Ask students to identify activities they see'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Review key vocabulary and expressions',
              instructions: [
                'Quick matching activity with times and activities',
                'Review any challenging expressions'
              ]
            }
          ],
          assessmentTips: 'Students can describe their daily routines using appropriate vocabulary and time expressions.',
          homeworkIdeas: ['Complete the daily routine vocabulary worksheet', 'Write 10 sentences about your weekend routine']
        },
        {
          id: `book4-unit${unitId}-lesson-2`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 2`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            'Students will practice using frequency adverbs with daily routines',
            'Students will compare daily routines of different people',
            'Students will create a dialogue about daily activities'
          ],
          materials: ['Frequency adverbs flashcards', 'Partner interview worksheet', 'Dialogue prompts'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Review daily routine vocabulary from previous lesson',
              instructions: [
                'Show daily routine flashcards',
                'Students say the activities and typical times'
              ]
            },
            {
              title: 'Frequency Adverbs',
              duration: '10 minutes',
              description: 'Introduce frequency adverbs: always, usually, often, sometimes, rarely, never',
              materials: ['Frequency adverbs flashcards'],
              instructions: [
                'Present frequency adverbs with visual scale',
                'Model example sentences: "I always brush my teeth in the morning"',
                'Students practice using frequency adverbs with their own routines'
              ]
            },
            {
              title: 'Partner Interview',
              duration: '15 minutes',
              description: 'Students interview each other about daily routines',
              materials: ['Partner interview worksheet'],
              instructions: [
                'Distribute interview sheets with questions',
                'Students work in pairs asking questions about daily routines',
                'Record partner\'s answers using frequency adverbs',
                'Report back to class about partner\'s routine'
              ]
            },
            {
              title: 'Interactive Game',
              duration: '10 minutes',
              description: 'Play Daily Routines game',
              instructions: [
                'Use the Wordwall game from unit resources',
                'Students practice matching daily routines with times',
                'Review answers as a class'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Reflection on learning',
              instructions: [
                'Students share what they learned about their classmates',
                'Discuss cultural differences in daily routines',
                'Review key vocabulary and expressions'
              ]
            }
          ],
          assessmentTips: 'Students can use frequency adverbs correctly and ask/answer questions about daily routines.',
          homeworkIdeas: ['Write a paragraph comparing your routine with a family member\'s routine', 'Create a comic strip showing your daily routine']
        }
      ];
      
    case '3': // NATURE
      lessonPlans = [
        {
          id: `book4-unit${unitId}-lesson-1`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 1`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            'Students will learn vocabulary related to natural environments',
            'Students will describe different landscapes and ecosystems',
            'Students will discuss the importance of nature conservation'
          ],
          materials: ['Nature flashcards', 'Landscape images', 'Nature video'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Introduction to nature vocabulary',
              instructions: [
                'Show pictures of different natural landscapes',
                'Ask students to name what they see',
                'Create a mind map of nature-related words'
              ]
            },
            {
              title: 'Vocabulary Introduction',
              duration: '15 minutes',
              description: 'Teach vocabulary for different natural features and environments',
              materials: ['Nature flashcards', 'Landscape images'],
              instructions: [
                'Present vocabulary for landscapes: mountain, forest, river, lake, ocean, etc.',
                'Introduce ecosystem vocabulary: habitat, wildlife, vegetation, etc.',
                'Students practice pronouncing new vocabulary'
              ]
            },
            {
              title: 'Video Activity',
              duration: '10 minutes',
              description: 'Watch nature video and identify features',
              materials: ['Nature video from unit resources'],
              instructions: [
                'Play nature video',
                'Students list natural features they observe',
                'Discuss the video content using new vocabulary'
              ]
            },
            {
              title: 'Group Discussion',
              duration: '10 minutes',
              description: 'Discuss nature conservation',
              instructions: [
                'Introduce the concept of conservation',
                'Ask why protecting nature is important',
                'Students share ideas in small groups',
                'Each group presents one key idea to the class'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Review of key vocabulary',
              instructions: [
                'Quick vocabulary review game',
                'Students identify three new words they learned'
              ]
            }
          ],
          assessmentTips: 'Students can correctly use vocabulary to describe natural environments and express ideas about conservation.',
          homeworkIdeas: ['Research a natural wonder and prepare 5 facts', 'Create a vocabulary list with 10 nature words and their definitions']
        },
        {
          id: `book4-unit${unitId}-lesson-2`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 2`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            'Students will practice describing animals and plants',
            'Students will learn about different habitats',
            'Students will create a presentation about an ecosystem'
          ],
          materials: ['Wildlife images', 'Habitat information cards', 'Presentation materials'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Review nature vocabulary from previous lesson',
              instructions: [
                'Quick picture identification activity',
                'Students name landscapes and natural features'
              ]
            },
            {
              title: 'Wildlife Vocabulary',
              duration: '10 minutes',
              description: 'Learn vocabulary related to animals and plants',
              materials: ['Wildlife images'],
              instructions: [
                'Present images of different animals and plants',
                'Teach descriptive vocabulary: mammal, reptile, predator, etc.',
                'Students practice describing wildlife using new vocabulary'
              ]
            },
            {
              title: 'Habitat Exploration',
              duration: '10 minutes',
              description: 'Learn about different habitats and ecosystems',
              materials: ['Habitat information cards'],
              instructions: [
                'Divide class into groups',
                'Assign each group a habitat (rainforest, desert, ocean, etc.)',
                'Groups read information cards about their habitat',
                'Students identify key features of their assigned habitat'
              ]
            },
            {
              title: 'Group Project',
              duration: '15 minutes',
              description: 'Create a mini-presentation about an ecosystem',
              materials: ['Presentation materials'],
              instructions: [
                'Groups continue working on their assigned habitat',
                'Create a poster or digital presentation',
                'Include information about landscape, climate, wildlife',
                'Prepare to present to the class'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Interactive nature vocabulary game',
              instructions: [
                'Play Nature Vocabulary game from unit resources',
                'Review key concepts from the lesson'
              ]
            }
          ],
          assessmentTips: 'Students can describe habitats and wildlife using appropriate vocabulary and work collaboratively on presentations.',
          homeworkIdeas: ['Complete the habitat matching worksheet', 'Write a paragraph describing your favorite natural place']
        }
      ];

    // Add more unit-specific lesson plans here...
      
    default:
      // For any unit without specific lesson plans, create these generic plans
      lessonPlans = [
        {
          id: `book4-unit${unitId}-lesson-1`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 1`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            `Students will learn vocabulary related to ${unitTitle.toLowerCase()}`,
            `Students will practice using key phrases about ${unitTitle.toLowerCase()}`,
            'Students will develop speaking skills through guided practice'
          ],
          materials: ['Flashcards', 'Interactive whiteboard', 'Handouts'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: `Introduction to ${unitTitle.toLowerCase()} theme`,
              instructions: [
                'Show images related to the unit topic',
                'Elicit prior knowledge from students',
                'Create a mind map on the board with student contributions'
              ]
            },
            {
              title: 'Vocabulary Introduction',
              duration: '15 minutes',
              description: `Present key vocabulary for ${unitTitle.toLowerCase()}`,
              materials: ['Flashcards', 'Visual aids'],
              instructions: [
                'Show visual aids for each vocabulary item',
                'Model pronunciation and have students repeat',
                'Practice using vocabulary in simple sentences',
                'Check understanding with quick questions'
              ]
            },
            {
              title: 'Guided Practice',
              duration: '15 minutes',
              description: 'Structured practice with new vocabulary and expressions',
              materials: ['Handouts with exercises'],
              instructions: [
                'Distribute practice worksheets',
                'Demonstrate example exercises',
                'Have students complete exercises in pairs',
                'Monitor and provide support as needed'
              ]
            },
            {
              title: 'Interactive Activity',
              duration: '5 minutes',
              description: 'Game or activity to reinforce vocabulary',
              instructions: [
                'Play a quick game using new vocabulary',
                'Use flashcards for review',
                'Have students take turns in the activity'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Review of key vocabulary and concepts',
              instructions: [
                'Review main vocabulary items',
                'Check understanding with questions',
                'Preview next lesson'
              ]
            }
          ],
          assessmentTips: `Observe students' ability to use vocabulary related to ${unitTitle.toLowerCase()} correctly and participate in activities.`,
          homeworkIdeas: ['Complete vocabulary matching worksheet', `Research and write 5 sentences about ${unitTitle.toLowerCase()}`]
        },
        {
          id: `book4-unit${unitId}-lesson-2`,
          title: `${BOOK4_TITLE} - Unit ${unitId} - ${unitTitle} - Lesson 2`,
          duration: '45 minutes',
          level: 'Elementary to Pre-Intermediate',
          objectives: [
            `Students will practice speaking about ${unitTitle.toLowerCase()}`,
            `Students will create dialogues using ${unitTitle.toLowerCase()} vocabulary`,
            'Students will demonstrate comprehension through interactive activities'
          ],
          materials: ['Video resources', 'Game materials', 'Role-play cards'],
          steps: [
            {
              title: 'Warm-up',
              duration: '5 minutes',
              description: 'Review vocabulary from previous lesson',
              instructions: [
                'Quick vocabulary review game',
                'Address any questions from homework'
              ]
            },
            {
              title: 'Video Activity',
              duration: '10 minutes',
              description: `Watch video about ${unitTitle.toLowerCase()}`,
              materials: ['Video resources from unit'],
              instructions: [
                'Play video for the class',
                'Discuss key points from the video',
                'Answer comprehension questions as a group'
              ]
            },
            {
              title: 'Communicative Practice',
              duration: '15 minutes',
              description: 'Role-play or dialogue practice',
              materials: ['Role-play cards'],
              instructions: [
                'Divide students into pairs or small groups',
                'Distribute role-play scenarios',
                'Have students prepare short dialogues',
                'Monitor and provide feedback during preparation'
              ]
            },
            {
              title: 'Interactive Game',
              duration: '10 minutes',
              description: `Game to reinforce ${unitTitle.toLowerCase()} vocabulary`,
              materials: ['Wordwall games from unit resources'],
              instructions: [
                'Play interactive game as a class',
                'Use digital resources or printed materials',
                'Divide into teams if appropriate'
              ]
            },
            {
              title: 'Plenary',
              duration: '5 minutes',
              description: 'Wrap-up and assessment',
              instructions: [
                'Review key learning points',
                'Have students share what they learned',
                'Address any remaining questions'
              ]
            }
          ],
          assessmentTips: `Evaluate students' ability to use vocabulary and expressions related to ${unitTitle.toLowerCase()} in context during role-plays and games.`,
          homeworkIdeas: [`Create a poster about ${unitTitle.toLowerCase()}`, 'Write a dialogue using vocabulary from the unit']
        }
      ];
  }
  
  // Always return lesson plans
  return lessonPlans;
}

export default commonResources;
