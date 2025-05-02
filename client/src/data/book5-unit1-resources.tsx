// This file contains resources for Book 5, Unit 1 (Schools in the UK/USA themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit1Resources = [
  {
    title: "Schools in the UK and USA - Overview",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/fAAFO44pJlU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fAAFO44pJlU?si=SOgbD4Upe_Tj_SQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Education Systems Comparison",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/-_nbbEahq8k",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-_nbbEahq8k?si=u_MW45TfECHX7tyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "After-school Clubs Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4d43ce661a25430eb84b3fe4e94a20ab",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4d43ce661a25430eb84b3fe4e94a20ab?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Places in School Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f72c3b6631a649f0b68952153fbc6441",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f72c3b6631a649f0b68952153fbc6441?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "School Subjects Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/c19107c08fe04affb6610d874284df4a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c19107c08fe04affb6610d874284df4a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "After-school Clubs Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/l1xgc0aTnLU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/l1xgc0aTnLU?si=yVTDuxfnuhbh_heW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Schools in the UK/USA
export const schoolSystemsLessonPlan = {
  id: "school-systems-lesson",
  title: "School Systems in the UK and USA",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to school systems and educational structures",
    "Compare and contrast UK and USA school systems",
    "Develop language for discussing educational experiences",
    "Build cultural awareness of different educational approaches"
  ],
  materials: [
    "Visual English Book 5, Unit 1 slides",
    "Schools in the UK and USA videos",
    "Wordwall vocabulary games",
    "School system comparison chart",
    "Pictures of different school environments"
  ],
  steps: [
    {
      title: "Warm-up: School Experience",
      duration: "5 minutes",
      description: "Activate prior knowledge about school systems",
      instructions: [
        "Ask students about their school experiences",
        "Discuss what they know about schools in other countries",
        "Create a list of school-related vocabulary on the board",
        "Ask if students know any differences between their school system and those abroad"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to school systems",
      materials: ["Visual English Book 5, Unit 1 slides", "Pictures of different school environments"],
      instructions: [
        "Introduce vocabulary: primary school, secondary school, high school, college, university, etc.",
        "Present educational stages vocabulary: kindergarten, elementary, middle school, etc.",
        "Teach grade level terminology differences (Year 1 vs. 1st Grade)",
        "Discuss qualification terms: GCSE, A-levels, SAT, diploma, degree, etc."
      ]
    },
    {
      title: "Video: School Systems Comparison",
      duration: "10 minutes",
      description: "Watch and analyze the UK and USA school systems",
      materials: ["Schools in the UK and USA videos"],
      instructions: [
        "Play the Schools in the UK and USA overview video",
        "Ask students to note three similarities and three differences",
        "Discuss student observations as a class",
        "Create a comparison chart on the board highlighting key differences"
      ]
    },
    {
      title: "Interactive Games: School Vocabulary",
      duration: "10 minutes",
      description: "Reinforce school vocabulary through games",
      materials: ["Places in School Vocabulary game", "School Subjects Vocabulary game"],
      instructions: [
        "Have students play the Places in School vocabulary game",
        "Continue with the School Subjects vocabulary game",
        "Encourage students to use complete sentences when discussing answers",
        "Review any challenging vocabulary as a class"
      ]
    },
    {
      title: "School System Discussion",
      duration: "10 minutes",
      description: "Compare school systems and express opinions",
      materials: ["School system comparison chart"],
      instructions: [
        "Divide students into small groups",
        "Groups discuss: 'What are the advantages and disadvantages of each system?'",
        "Each group presents their ideas to the class",
        "Conduct a class vote on which aspects of each system they prefer",
        "Discuss what they would include in an 'ideal' school system"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their understanding of school system vocabulary, ability to make comparisons between educational systems, and participation in the discussion activity.",
  homeworkIdeas: [
    "Write a paragraph comparing your school with schools in the UK or USA", 
    "Create a poster showing the educational path in your country and in the UK or USA",
    "Research and note five interesting facts about schools in a different country"
  ],
  additionalResources: [
    {
      title: "UK vs US Education Systems",
      url: "https://www.studying-in-uk.org/uk-vs-usa-education-system/"
    },
    {
      title: "School Vocabulary Resources",
      url: "https://www.teach-this.com/resources/school"
    }
  ]
};

// Second lesson plan for Unit 1: School Subjects and After-school Activities
export const schoolSubjectsActivitiesLessonPlan = {
  id: "school-subjects-activities-lesson",
  title: "School Subjects and After-school Activities",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to school subjects and after-school activities",
    "Practice expressing preferences and opinions about different subjects",
    "Develop language for discussing extracurricular activities",
    "Build speaking skills through structured conversations about school life"
  ],
  materials: [
    "Visual English Book 5, Unit 1 slides",
    "After-school Clubs Video",
    "School Subjects Vocabulary game",
    "After-school Clubs Vocabulary game",
    "Subject preference survey handouts"
  ],
  steps: [
    {
      title: "Warm-up: Favorite Subjects",
      duration: "5 minutes",
      description: "Activate knowledge about school subjects and preferences",
      instructions: [
        "Ask students: 'What's your favorite school subject and why?'",
        "Create a mind map of school subjects on the board",
        "Take a quick class poll of favorite subjects",
        "Introduce phrases for expressing preferences: 'I enjoy...', 'I'm interested in...', etc."
      ]
    },
    {
      title: "School Subjects Vocabulary",
      duration: "10 minutes",
      description: "Expand vocabulary related to school subjects and academic areas",
      materials: ["Visual English Book 5, Unit 1 slides", "School Subjects Vocabulary game"],
      instructions: [
        "Present vocabulary for traditional subjects: math, science, languages, history, etc.",
        "Introduce specialized subjects: economics, psychology, computer science, etc.",
        "Teach related verbs: study, learn, practice, experiment, calculate, analyze, etc.",
        "Have students play the School Subjects vocabulary game"
      ]
    },
    {
      title: "Video: After-school Activities",
      duration: "10 minutes",
      description: "Learn about extracurricular activities in schools",
      materials: ["After-school Clubs Video"],
      instructions: [
        "Play the After-school Clubs Video",
        "Ask students to identify different types of clubs and activities",
        "Discuss which activities are available at their school",
        "Introduce vocabulary: club, team, society, competition, performance, etc."
      ]
    },
    {
      title: "After-school Activities Vocabulary",
      duration: "10 minutes",
      description: "Expand vocabulary related to extracurricular activities",
      materials: ["After-school Clubs Vocabulary game"],
      instructions: [
        "Present categories of after-school activities: sports, arts, academic, community service",
        "Discuss benefits of participating in extracurricular activities",
        "Have students play the After-school Clubs vocabulary game",
        "Review expressions for talking about participation: 'I belong to...', 'I take part in...', etc."
      ]
    },
    {
      title: "School Life Interview Activity",
      duration: "10 minutes",
      description: "Practice conversations about school subjects and activities",
      materials: ["Subject preference survey handouts"],
      instructions: [
        "Distribute subject preference survey handouts",
        "Divide students into pairs",
        "Students interview each other about subjects and activities using the survey",
        "Questions include: favorite/least favorite subjects, challenging subjects, preferred activities",
        "Pairs report back to the class about their partner's preferences",
        "Discuss common themes in subject and activity preferences"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their use of subject and activity vocabulary, ability to express preferences with appropriate language, and participation in the interview activity.",
  homeworkIdeas: [
    "Create a weekly schedule showing your school subjects and after-school activities", 
    "Write about your ideal school day, including your favorite subjects and activities",
    "Design a poster or brochure for a new after-school club you would like to start"
  ],
  additionalResources: [
    {
      title: "ESL School Subjects Activities",
      url: "https://www.fluentu.com/blog/educator-english/esl-school-subjects/"
    },
    {
      title: "After-school Activities Resources",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/extracurricular-activities"
    }
  ]
};
