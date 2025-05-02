import { TeacherResource } from '@/components/TeacherResources';

// What Your Body Can Do - Unit 7 Resources
export const book6Unit7Resources: TeacherResource[] = [
  {
    title: "Illness Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/34904fd94f30404192d2bdab3f028260",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/34904fd94f30404192d2bdab3f028260?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Internal Body Parts Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/4fbc8cd964f04a51aebc1e96f382140e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4fbc8cd964f04a51aebc1e96f382140e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "What Your Body Can Do Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/5cec72b501b54381b2f536e9c82a1c5c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5cec72b501b54381b2f536e9c82a1c5c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Human Body Systems",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=2q9Jb-f7cAE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2q9Jb-f7cAE?si=8EK5FiTjeWF9kXHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Create the implementation function to expose the resources
export function getBook6Unit7Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit7Resources.map(resource => ({
    ...resource,
    bookId,
    unitId
  }));
}

// Sample lesson plans for Unit 7
export const bodySystemsLessonPlan = {
  title: "Human Body Systems and Functions",
  objectives: [
    "Identify major body systems and organs",
    "Learn vocabulary related to body functions",
    "Understand basic anatomical terms"
  ],
  materials: [
    "Visual English Book 6 Unit 7 slides",
    "Body systems diagrams",
    "Wordwall games on body parts"
  ],
  procedure: [
    "Introduction: Show video about human body systems",
    "Vocabulary: Present internal organs with illustrations",
    "Practice: Use Wordwall games to reinforce vocabulary",
    "Activity: Label body parts on worksheets",
    "Group work: Create posters about different body systems"
  ],
  assessment: [
    "Body parts and systems vocabulary quiz",
    "System functions matching exercise",
    "Body system poster presentation"
  ],
  extensions: [
    "Research a specific body system in depth",
    "Create a model of an organ or system",
    "Compare human systems with those of other animals"
  ]
};

export const healthAndIllnessLessonPlan = {
  title: "Health Problems and Illnesses",
  objectives: [
    "Learn vocabulary related to common health problems",
    "Practice describing symptoms and conditions",
    "Develop language for doctor-patient interactions"
  ],
  materials: [
    "Visual English Book 6 Unit 7 slides",
    "Illness flashcards",
    "Doctor-patient dialog cards"
  ],
  procedure: [
    "Warm-up: Discuss common health issues",
    "Vocabulary: Present illness and symptom vocabulary",
    "Practice: Illness vocabulary Wordwall game",
    "Role-play: Doctor-patient consultations",
    "Writing: Create health advice brochures"
  ],
  assessment: [
    "Health vocabulary matching test",
    "Role-play performance assessment",
    "Health advice brochure evaluation"
  ],
  extensions: [
    "Research traditional remedies from different cultures",
    "Create a first aid guide using learned vocabulary",
    "Interview a health professional (in L1 if necessary) and report back in English"
  ]
};

export const book6Unit7LessonPlans = [
  bodySystemsLessonPlan,
  healthAndIllnessLessonPlan
];

export function getBook6Unit7LessonPlans() {
  return book6Unit7LessonPlans;
}
