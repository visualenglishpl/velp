import { TeacherResource } from '@/components/TeacherResources';

// Book 6 Unit 12 - Are You Eco - Environment Resources
export const book6Unit12Resources: TeacherResource[] = [
  {
    title: "Solar System Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/2753bac717214441a38d76fda2cc33b8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Types of Pollution Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/f07c8c0eebfb48d9a771d2c7cad81f3d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Can You Recycle? Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/98fd4453f46240f0ac6bb612b5945960",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Endangered or Extinct Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/f04d2f477ff8484db0456922be236071",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f04d2f477ff8484db0456922be236071?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Endangered Animals Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/db58fd0165464c08a4c385c035325f3b",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Earth Song",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=S2SMvfGe72U",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/S2SMvfGe72U?si=lNL1zDC02ILXCMju" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Environmental Pollution Vocabulary",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/vocabulary-practice/general-vocabulary-practice/word-classes/environmental-pollution-vocabulary/79022",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/79022" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Environmental Animation",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/grammar-practice/general-grammar-practice/future-tenses/environmental-animation/262369",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/262369" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Planets & Stars Size Comparison",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=HEheh1BH34Q",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HEheh1BH34Q?si=-L7XXOZqHjFsV3TT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Environmental Protection",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=MK5E_7hOi-k",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/MK5E_7hOi-k?si=bGioPGye_NH29Xty" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Create the implementation function to expose the resources
export function getBook6Unit12Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit12Resources.map(resource => ({
    ...resource,
    bookId,
    unitId
  }));
}

// Sample lesson plans for Unit 12
export const environmentalAwarenessLessonPlan = {
  title: "Environmental Awareness",
  objectives: [
    "Learn vocabulary related to environmental issues",
    "Understand different types of pollution and their effects",
    "Develop language to discuss environmental problems and solutions"
  ],
  materials: [
    "Visual English Book 6 Unit 12 slides",
    "Environmental issue flashcards",
    "Pollution types handouts",
    "Wordwall games on environmental topics"
  ],
  procedure: [
    "Introduction: Show Earth Song video and discuss reactions",
    "Vocabulary: Present environmental vocabulary with images",
    "Practice: Use wordwall games to reinforce pollution vocabulary",
    "Activity: Categorize environmental problems by type",
    "Discussion: Generate solutions to environmental issues"
  ],
  assessment: [
    "Environmental vocabulary quiz",
    "Problem-solution matching exercise",
    "Group presentation on an environmental issue"
  ],
  extensions: [
    "Create a poster for an environmental awareness campaign",
    "Research and present on endangered species",
    "Design a recycling system for the classroom"
  ]
};

export const solarSystemLessonPlan = {
  title: "The Solar System",
  objectives: [
    "Learn vocabulary related to space and the solar system",
    "Understand basic facts about planets and stars",
    "Compare sizes and distances in space"
  ],
  materials: [
    "Visual English Book 6 Unit 12 slides",
    "Solar system model or diagrams",
    "Planet fact cards",
    "Solar system Wordwall game"
  ],
  procedure: [
    "Warm-up: Solar system quiz to assess prior knowledge",
    "Vocabulary: Present planets and other space vocabulary",
    "Video: Watch planets and stars size comparison",
    "Activity: Create fact files for different planets",
    "Game: Play solar system vocabulary game"
  ],
  assessment: [
    "Solar system vocabulary test",
    "Planet characteristics matching exercise",
    "Planet fact file presentation"
  ],
  extensions: [
    "Research a space mission and present findings",
    "Create a scale model of the solar system",
    "Write a creative story set in space using learned vocabulary"
  ]
};

export const book6Unit12LessonPlans = [
  environmentalAwarenessLessonPlan,
  solarSystemLessonPlan
];

export function getBook6Unit12LessonPlans() {
  return book6Unit12LessonPlans;
}
