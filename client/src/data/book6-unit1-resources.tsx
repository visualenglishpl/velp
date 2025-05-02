import { TeacherResource } from '@/components/TeacherResources';

// Book 6 Unit 1 - Jobs and Occupations Resources
export const book6Unit1Resources: TeacherResource[] = [
  {
    title: "Jobs and Occupations Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/52d2810af010454d9363eec201d2f23f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Jobs and Occupations Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/7f0da57d5aea4ea1b9786ec62492b5bf",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7f0da57d5aea4ea1b9786ec62492b5bf?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Jobs and Occupations Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/e202e8707b1b46eda206429e021b78cf",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e202e8707b1b46eda206429e021b78cf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Jobs ESL Guessing Game 1",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=wipXsbFTX-U",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/wipXsbFTX-U?si=u5G9MH5UdS7srqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Jobs ESL Guessing Game 2",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=nfzYoNTcAn8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=Ocr5dth1nB5wUbxe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }
];

// Create the implementation function to expose the resources
export function getBook6Unit1Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit1Resources.map(resource => ({
    ...resource,
    bookId,
    unitId
  }));
}

// Sample lesson plans for Unit 1
export const jobsVocabularyLessonPlan = {
  title: "Jobs and Occupations Vocabulary",
  objectives: [
    "Identify common jobs and occupations",
    "Practice job-related vocabulary and descriptions",
    "Understand job responsibilities and workplaces"
  ],
  materials: [
    "Visual English Book 6 Unit 1 slides",
    "Job flashcards",
    "Wordwall games on occupations"
  ],
  procedure: [
    "Introduction: Discuss different types of jobs students are familiar with",
    "Vocabulary: Present job titles with matching images and descriptions",
    "Practice: Use Wordwall games to reinforce vocabulary",
    "Activity: 'Guess the job' miming game",
    "Speaking: Role-play job interviews using target vocabulary"
  ],
  assessment: [
    "Jobs vocabulary matching test",
    "Job description writing assignment",
    "Mock interview performance assessment"
  ],
  extensions: [
    "Research unique or unusual jobs",
    "Create a poster about dream jobs",
    "Write about jobs that might exist in the future"
  ]
};

export const workplaceLanguageLessonPlan = {
  title: "Workplace Communication",
  objectives: [
    "Learn vocabulary for workplace communication",
    "Practice formal language used in professional settings",
    "Develop skills for job applications and interviews"
  ],
  materials: [
    "Visual English Book 6 Unit 1 slides",
    "Sample job application forms",
    "Interview question cards"
  ],
  procedure: [
    "Warm-up: Discuss important skills for different jobs",
    "Vocabulary: Present workplace communication phrases",
    "Practice: Role-play workplace dialogues",
    "Activity: Complete job application forms",
    "Project: Create a resume and cover letter"
  ],
  assessment: [
    "Workplace vocabulary quiz",
    "Job application form completion",
    "Mock interview performance"
  ],
  extensions: [
    "Research job requirements for different positions",
    "Analyze job advertisements for language patterns",
    "Create a video resume"
  ]
};

export const book6Unit1LessonPlans = [
  jobsVocabularyLessonPlan,
  workplaceLanguageLessonPlan
];

export function getBook6Unit1LessonPlans() {
  return book6Unit1LessonPlans;
}
