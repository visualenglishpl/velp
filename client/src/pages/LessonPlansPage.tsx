import React from 'react';
import LessonPlanTemplate, { LessonPlan } from '@/components/LessonPlanTemplate';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LessonPlansPage: React.FC = () => {
  const { toast } = useToast();

  // Movie Genres Vocabulary Lesson Plan
  const movieGenresLessonPlan: LessonPlan = {
    id: 'film-genres-1',
    title: 'Movie Genres Vocabulary - Part 1',
    duration: '45 minutes',
    level: 'Elementary to Pre-Intermediate (A1-A2)',
    objectives: [
      'Identify and name common film genres in English',
      'Match film genres with their characteristics',
      'Express preferences about different movie genres using simple structures',
      'Practice listening comprehension with authentic examples of film genre vocabulary'
    ],
    materials: [
      'Visual English Book 7, Unit 1 slides (01 A - 05 D)',
      'Wordwall interactive game - Film Genres matching',
      'YouTube video: "Movie Genres Vocabulary Epic ESL Guessing Game"',
      'Film genre flashcards',
      'Handout with movie posters from different genres'
    ],
    steps: [
      {
        title: 'Warm-up: Film Preferences',
        duration: '5 mins',
        description: 'Start by asking students about their favorite films and what types of movies they enjoy watching.',
        instructions: [
          "Ask students: 'What was the last film you watched?'",
          "Follow up with: 'Did you enjoy it? Why or why not?'",
          "Use the opportunity to pre-teach some basic vocabulary that might come up in their responses."
        ],
        teacherNotes: 'This activity helps assess prior knowledge and creates context for the lesson.'
      },
      {
        title: 'Presentation: Film Genres Introduction',
        duration: '10 mins',
        description: 'Introduce key film genres using Visual English Book 7 slides and flashcards.',
        materials: [
          'Book 7, Unit 1 slides (01 A - 03 C)',
          'Film genre flashcards'
        ],
        instructions: [
          'Display Book 7, Unit 1 slides showing different film genres',
          'For each genre, ask: "What kind of film is this?"',
          'Drill pronunciation of each genre name',
          'Briefly explain the characteristics of each genre using simple language'
        ]
      },
      {
        title: 'Vocabulary Development: Movie Genres Video',
        duration: '10 mins',
        description: 'Watch the "Movie Genres Vocabulary Epic ESL Guessing Game" video to reinforce genre vocabulary.',
        materials: [
          'YouTube video from Teacher Resources',
          'Simple worksheet with movie genres listed'
        ],
        instructions: [
          'Play the video once all the way through',
          'Play again, pausing after each section to discuss the genres shown',
          'Have students mark on their worksheets which genres they recognize'
        ],
        teacherNotes: 'This video provides authentic examples and pronunciation of genre vocabulary.'
      },
      {
        title: 'Guided Practice: Genre Matching Activity',
        duration: '15 mins',
        description: 'Students match movie descriptions or images to the correct genre.',
        materials: [
          'Handout with movie posters and descriptions',
          'Book 7, Unit 1 slides (04 A - 05 D)'
        ],
        instructions: [
          'Distribute handouts with movie posters from different genres',
          'Students work in pairs to match each poster to the correct genre',
          'Review the answers as a class using the Book 7 slides',
          'For each answer, ask students to explain how they knew the genre'
        ]
      },
      {
        title: 'Wrap-up: Personal Preferences',
        duration: '5 mins',
        description: 'Students share their favorite film genres and explain why they like them.',
        instructions: [
          'Have students complete the sentence: "I like ___ films because..."',
          'Allow 3-4 students to share their preferences with the class',
          'Summarize the key genre vocabulary learned in the lesson'
        ]
      }
    ],
    assessmentTips: 'Assess students through their participation in the matching activity and their ability to identify genres correctly during the video activity.',
    homeworkIdeas: [
      'Write 3-5 sentences about your favorite movie, including its genre and why you like it.',
      'Find and bring a movie poster to the next class (can be digital or printed).'
    ],
    additionalResources: [
      {
        title: 'Wordwall Film Genres Game 1',
        url: 'https://wordwall.net/resource/dcc6034981ea455d9bfa88f6740c720f'
      },
      {
        title: 'Movie Genres Vocabulary Video',
        url: 'https://www.youtube.com/watch?v=FTuQIwl7j3k'
      }
    ]
  };

  // Film Production Roles Lesson Plan
  const filmProductionLessonPlan: LessonPlan = {
    id: 'film-production-1',
    title: 'Film Production Roles - Part 1',
    duration: '45 minutes',
    level: 'Elementary to Pre-Intermediate (A1-A2)',
    objectives: [
      'Identify key roles in film production (director, actor, stuntman, etc.)',
      'Describe job responsibilities using simple present tense',
      'Use question forms to ask about film production jobs',
      'Develop vocabulary related to filmmaking process'
    ],
    materials: [
      'Visual English Book 7, Unit 1 slides (15 A - 17 E)',
      'Wordwall interactive game - Film Production Roles',
      'YouTube video: "Guess the Film Genre"',
      'Role cards with job descriptions',
      'Simple scripts for role-playing'
    ],
    steps: [
      {
        title: 'Warm-up: Behind the Scenes',
        duration: '5 mins',
        description: 'Show images from behind the scenes of popular movies and ask students what they know about making films.',
        instructions: [
          "Ask students: 'What happens behind the camera when making a film?'",
          "Follow up with: 'What jobs do people have in making movies?'",
          "Note down student responses on the board to reference later"
        ]
      },
      {
        title: 'Presentation: Film Production Roles',
        duration: '12 mins',
        description: 'Introduce key film production roles using Visual English Book 7 slides.',
        materials: [
          'Book 7, Unit 1 slides (15 A - 16 F)',
          'Role cards'
        ],
        instructions: [
          'Display slides showing different film production roles',
          'For each role, ask: "Who is this? What do they do?"',
          'Teach key vocabulary for each role (director, actor, costume designer, etc.)',
          'Practice job responsibility phrases: "A director directs the film"'
        ],
        teacherNotes: 'Use simple language to explain each role. Focus on the action each person performs.'
      },
      {
        title: 'Guided Practice: Job Description Matching',
        duration: '10 mins',
        description: 'Students match job titles with their responsibilities in film production.',
        materials: [
          'Handout with job titles and descriptions',
          'Book 7, Unit 1 slides (16 A - 17 B)'
        ],
        instructions: [
          'Distribute handouts with film roles and descriptions',
          'Students work individually to match jobs with responsibilities',
          'Check answers as a class using the slides',
          'Practice the question form: "What does a [role] do?" and answer "A [role] [action]"'
        ]
      },
      {
        title: 'Interactive Activity: Wordwall Game',
        duration: '13 mins',
        description: 'Use the Wordwall game to reinforce vocabulary and job responsibilities in a fun, interactive format.',
        materials: [
          'Wordwall game from Teacher Resources',
          'Projector or interactive whiteboard'
        ],
        instructions: [
          'Play the Wordwall game as a whole class activity',
          'Have students take turns coming to the board to match items',
          'After each correct match, have students create a sentence about that role',
          'Keep track of points for additional motivation'
        ],
        teacherNotes: 'If technology is not available, you can recreate this activity using printed cards for a physical matching game.'
      },
      {
        title: 'Wrap-up: Dream Film Job',
        duration: '5 mins',
        description: 'Students share which film production role they would most like to have and explain why.',
        instructions: [
          'Have students complete the sentence: "I would like to be a ___ because..."',
          'Allow 3-4 students to share their choices with the class',
          'Summarize the key film production vocabulary learned in the lesson'
        ]
      }
    ],
    assessmentTips: 'Evaluate students based on their participation in the matching activities and their ability to correctly use job titles and describe responsibilities.',
    homeworkIdeas: [
      'Research one film production role and write 5 sentences about what they do.',
      'Watch a short film clip and identify at least 3 different production roles you learned about.'
    ],
    additionalResources: [
      {
        title: 'Wordwall Film Genres Game 2',
        url: 'https://wordwall.net/resource/1e211e293d514f56b1786cfbf6ed146b'
      },
      {
        title: 'Guess the Film Genre Video',
        url: 'https://www.youtube.com/watch?v=Bp07u0YrH4Y'
      }
    ]
  };

  const handlePrint = () => {
    toast({
      title: "Preparing print view",
      description: "The print dialog should open automatically.",
    });
    window.print();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Visual English Book 7, Unit 1 Lesson Plans</h1>
        <p className="text-muted-foreground">These 45-minute lesson plans are designed for teaching movie genres and film production vocabulary to elementary to pre-intermediate ESL students.</p>
      </div>

      <Tabs defaultValue="side-by-side" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="side-by-side">Side by Side View</TabsTrigger>
          <TabsTrigger value="movie-genres">Movie Genres Lesson</TabsTrigger>
          <TabsTrigger value="film-production">Film Production Lesson</TabsTrigger>
        </TabsList>

        <TabsContent value="side-by-side">
          <LessonPlanTemplate 
            plan={movieGenresLessonPlan} 
            secondaryPlan={filmProductionLessonPlan}
            onPrint={handlePrint}
          />
        </TabsContent>

        <TabsContent value="movie-genres">
          <LessonPlanTemplate 
            plan={movieGenresLessonPlan}
            onPrint={handlePrint}
          />
        </TabsContent>

        <TabsContent value="film-production">
          <LessonPlanTemplate 
            plan={filmProductionLessonPlan}
            onPrint={handlePrint}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonPlansPage;
