// This file contains resources for Book 6, Unit 1 (Jobs and Occupations themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit1Resources = [
  {
    title: "Jobs ESL Guessing Game 1",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/wipXsbFTX-U",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/wipXsbFTX-U?si=u5G9MH5UdS7srqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Jobs ESL Guessing Game 2",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/nfzYoNTcAn8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=Ocr5dth1nB5wUbxe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Jobs Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Jobs Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/7f0da57d5aea4ea1b9786ec62492b5bf",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7f0da57d5aea4ea1b9786ec62492b5bf?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Jobs Matching Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/e202e8707b1b46eda206429e021b78cf",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e202e8707b1b46eda206429e021b78cf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Jobs and Occupations
export const jobsOccupationsLessonPlan = {
  id: "jobs-occupations-lesson",
  title: "Jobs and Occupations",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to common jobs and occupations",
    "Practice describing job responsibilities and workplaces",
    "Develop language for discussing career aspirations",
    "Build speaking skills through job-related conversations"
  ],
  materials: [
    "Visual English Book 6, Unit 1 slides",
    "Jobs ESL Guessing Game videos",
    "Wordwall Jobs vocabulary games",
    "Job flashcards",
    "Workplace pictures"
  ],
  steps: [
    {
      title: "Warm-up: Job Brainstorming",
      duration: "5 minutes",
      description: "Activate prior knowledge about jobs and occupations",
      instructions: [
        "Ask students to name as many jobs as they can think of",
        "Write their suggestions on the board",
        "Group similar jobs together (healthcare, education, technology, etc.)",
        "Ask students which jobs they find interesting and why"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to jobs and workplaces",
      materials: ["Visual English Book 6, Unit 1 slides", "Job flashcards"],
      instructions: [
        "Introduce vocabulary: occupation, profession, career, workplace, etc.",
        "Show job flashcards and have students repeat the job names",
        "Discuss what people do in each job (responsibilities)",
        "Match jobs to their typical workplaces"
      ]
    },
    {
      title: "Video: Jobs Guessing Game",
      duration: "10 minutes",
      description: "Watch and participate in job guessing activities",
      materials: ["Jobs ESL Guessing Game videos"],
      instructions: [
        "Play the Jobs ESL Guessing Game videos",
        "Pause after each clue and have students guess the job",
        "Discuss the clues that helped identify each job",
        "Add any new vocabulary to the class word bank"
      ]
    },
    {
      title: "Interactive Games: Job Vocabulary",
      duration: "10 minutes",
      description: "Reinforce job vocabulary through games",
      materials: ["Wordwall Jobs vocabulary games", "Wordwall Jobs Matching Game"],
      instructions: [
        "Have students play the Wordwall Jobs vocabulary games",
        "Continue with the Jobs Matching Game to test comprehension",
        "Award points for correct answers and discuss any challenging questions"
      ]
    },
    {
      title: "Career Interview Activity",
      duration: "10 minutes",
      description: "Practice job-related conversations through role-play",
      instructions: [
        "Divide students into pairs",
        "One student chooses a job (can be from the lesson or their dream job)",
        "The other student interviews them about their job",
        "Provide question prompts: What do you do? Where do you work? What skills do you need?",
        "Have pairs switch roles after 4-5 minutes",
        "Ask a few volunteers to present their interviews to the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of job vocabulary, ability to describe job responsibilities, and participation in the interview activity.",
  homeworkIdeas: [
    "Write a paragraph about your dream job and why you would like to do it", 
    "Research an unusual or interesting job and prepare 5 facts to share with the class",
    "Create a job advertisement for a position of your choice"
  ],
  additionalResources: [
    {
      title: "ESL Jobs Vocabulary Resources",
      url: "https://www.eslkidstuff.com/esl-kids-lessons/jobs/"
    }
  ]
};

// Second lesson plan for Unit 1: Job Skills and Qualifications
export const jobSkillsLessonPlan = {
  id: "job-skills-lesson",
  title: "Job Skills and Qualifications",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to job skills and qualifications",
    "Understand different types of skills (hard skills vs. soft skills)",
    "Practice describing personal abilities and qualifications",
    "Develop language for job applications and interviews"
  ],
  materials: [
    "Visual English Book 6, Unit 1 slides",
    "Skills categorization cards",
    "Sample resume templates",
    "Job advertisement examples"
  ],
  steps: [
    {
      title: "Warm-up: Important Job Skills",
      duration: "5 minutes",
      description: "Discuss what makes someone good at their job",
      instructions: [
        "Ask students: 'What skills make someone good at their job?'",
        "Create a mind map on the board with different skills mentioned",
        "Discuss which skills are important for many different jobs",
        "Introduce the concept of hard skills vs. soft skills"
      ]
    },
    {
      title: "Skills Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to job skills and qualifications",
      materials: ["Visual English Book 6, Unit 1 slides", "Skills categorization cards"],
      instructions: [
        "Present vocabulary: qualification, experience, skill, ability, etc.",
        "Introduce hard skills: computer programming, accounting, language fluency, etc.",
        "Introduce soft skills: communication, teamwork, problem-solving, etc.",
        "Have students categorize skills cards into 'hard skills' and 'soft skills'"
      ]
    },
    {
      title: "Job Requirements Analysis",
      duration: "10 minutes",
      description: "Analyze requirements in job advertisements",
      materials: ["Job advertisement examples"],
      instructions: [
        "Distribute sample job advertisements to small groups",
        "Have groups identify the required skills and qualifications in each ad",
        "Discuss which requirements are most common across different jobs",
        "Create a list of the most valuable skills in today's job market"
      ]
    },
    {
      title: "Resume Building Basics",
      duration: "10 minutes",
      description: "Learn how to present skills on a resume",
      materials: ["Sample resume templates"],
      instructions: [
        "Show sample resume templates and explain their structure",
        "Focus on the 'Skills' and 'Qualifications' sections",
        "Teach phrases for describing skills: 'Proficient in...', 'Experienced with...', etc.",
        "Demonstrate how to match skills to specific job requirements"
      ]
    },
    {
      title: "Personal Skills Inventory",
      duration: "10 minutes",
      description: "Students identify and present their own skills",
      instructions: [
        "Students create a list of their own skills (5 hard skills, 5 soft skills)",
        "In pairs, students take turns describing their skills using proper vocabulary",
        "Partners provide feedback on which skills sound most impressive",
        "Volunteers share their strongest skills with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to distinguish between different types of skills, use appropriate vocabulary to describe qualifications, and match skills to job requirements.",
  homeworkIdeas: [
    "Create a basic resume highlighting your skills and qualifications", 
    "Choose a dream job and research what skills and qualifications you would need",
    "Write 5-7 sentences describing your skills using the vocabulary learned in class"
  ],
  additionalResources: [
    {
      title: "Skills for Resume - Guide",
      url: "https://www.indeed.com/career-advice/resumes-cover-letters/best-resume-skills"
    },
    {
      title: "Soft Skills: Definition and Examples",
      url: "https://www.thebalancecareers.com/what-are-soft-skills-2060852"
    }
  ]
};
