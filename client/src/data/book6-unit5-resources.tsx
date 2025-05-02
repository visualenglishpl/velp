import { TeacherResource } from '@/components/TeacherResources';

// Theme Park Stalls - Unit 5 Resources
export const book6Unit5Resources: TeacherResource[] = [
  {
    title: "Theme Park Stalls Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/6b7661ae6d51420397ca4b290370c0a5",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6b7661ae6d51420397ca4b290370c0a5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Theme Park Rides Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/8080784ba2f2495287e30b926bf38bcb",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8080784ba2f2495287e30b926bf38bcb?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Theme Park Food Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/64d32b0e4bcb44df9a8ca4b84dce6ac4",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/64d32b0e4bcb44df9a8ca4b84dce6ac4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Guess the Rides",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=AYqEc3mKJek",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AYqEc3mKJek?si=b29JX3KdOmEHLs92" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Create the implementation function to expose the resources
export function getBook6Unit5Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit5Resources.map(resource => ({
    ...resource,
    bookId,
    unitId
  }));
}

// Sample lesson plans for Unit 5
export const themeParkLessonPlan = {
  title: "Theme Park Features and Attractions",
  objectives: [
    "Identify and name different types of theme park stalls",
    "Describe theme park rides using appropriate vocabulary",
    "Practice using prepositions to locate attractions in a park"
  ],
  materials: [
    "Visual English Book 6 Unit 5 slides",
    "Wordwall games on theme parks",
    "Theme park map handouts"
  ],
  procedure: [
    "Introduction: Show pictures of famous theme parks and elicit prior knowledge",
    "Vocabulary: Present theme park stall vocabulary with matching images",
    "Practice: Use Wordwall games to reinforce vocabulary",
    "Activity: Park map orientation with prepositions",
    "Speaking: Role-play conversations between visitors and staff"
  ],
  assessment: [
    "Vocabulary quiz on theme park attractions",
    "Role-play evaluation using assessment rubric",
    "Digital map creation assessment"
  ],
  extensions: [
    "Design your own theme park layout",
    "Create a brochure for a new theme park attraction",
    "Research theme parks around the world"
  ]
};

export const foodStallsLessonPlan = {
  title: "Theme Park Food Stalls",
  objectives: [
    "Learn vocabulary related to food stalls in theme parks",
    "Practice ordering food and drinks using appropriate phrases",
    "Compare food prices and nutritional value"
  ],
  materials: [
    "Visual English Book 6 Unit 5 slides",
    "Food stall menu handouts",
    "Role-play cards"
  ],
  procedure: [
    "Warm-up: Discuss favorite theme park foods",
    "Vocabulary: Present food stall types and common menu items",
    "Practice: Price comparison and dialog practice",
    "Activity: Create a menu for a theme park food stall",
    "Role-play: Customer and vendor interactions"
  ],
  assessment: [
    "Menu creation with appropriate pricing",
    "Dialog performance assessment",
    "Vocabulary quiz on food stall items"
  ],
  extensions: [
    "Design a healthy food stall concept",
    "Compare theme park food across different countries",
    "Marketing campaign for a new food stall"
  ]
};

export const book6Unit5LessonPlans = [
  themeParkLessonPlan,
  foodStallsLessonPlan
];

export function getBook6Unit5LessonPlans() {
  return book6Unit5LessonPlans;
}
