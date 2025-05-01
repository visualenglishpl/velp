// This file contains resources for Book 7, Unit 7 (DIY themed content)

export const unit7Resources = [
  {
    title: "DIY Tools and Projects",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/l15FoVIHsmU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/l15FoVIHsmU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Tools and DIY Vocabulary Wordwall Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/diy-tools-vocabulary",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/fc7da6d5ba1a4f098b53f4bfdc62e62c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
];

// Lesson plan data for DIY Tools and Home Repairs
export const diyToolsLessonPlan = {
  id: "diy-tools-lesson",
  title: "DIY Tools and Home Repairs",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Identify common DIY tools and their uses",
    "Learn vocabulary related to home repairs",
    "Practice describing problems and solutions in a home context",
    "Use imperative forms for giving instructions"
  ],
  materials: [
    "Visual English Book 7, Unit 7 slides",
    "DIY tool flashcards or images",
    "Worksheets with home repair scenarios",
    "Home repair vocabulary handouts"
  ],
  steps: [
    {
      title: "Warm-up: Tool Recognition",
      duration: "5 minutes",
      description: "Show images of common DIY tools and elicit their names and uses",
      instructions: ["Display images of tools one by one", "Ask: 'What is this tool called? What do we use it for?'"]
    },
    {
      title: "Vocabulary Building: DIY Tools",
      duration: "10 minutes",
      description: "Teach key vocabulary for DIY tools and their functions",
      materials: ["DIY tool flashcards", "Book 7, Unit 7 slides"],
      teacherNotes: "Focus on pronunciation and practical examples of each tool's use"
    },
    {
      title: "Home Repair Scenarios",
      duration: "15 minutes",
      description: "Present common home repair scenarios and discuss solutions",
      materials: ["Worksheets with repair scenarios"],
      instructions: [
        "Distribute worksheets with repair problems",
        "Students work in pairs to match problems with appropriate tools and solutions",
        "Review answers as a class"
      ]
    },
    {
      title: "Giving Instructions Practice",
      duration: "10 minutes",
      description: "Practice using imperative forms to give DIY instructions",
      materials: ["Simple DIY instruction cards"],
      instructions: [
        "Model giving instructions using imperatives: 'First, take the hammer. Then, hold the nail...'" ,
        "Students practice giving instructions for simple repairs in pairs"
      ]
    },
    {
      title: "Wrap-up: DIY Experience Sharing",
      duration: "5 minutes",
      description: "Students share any DIY experiences they have had",
      teacherNotes: "If time permits, discuss cultural differences in home repair approaches"
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly identify tools and their ability to give clear instructions for simple repairs.",
  homeworkIdeas: ["Create a simple instruction manual for a basic DIY task", "Research DIY vocabulary for a specific project (painting, woodworking, etc.)"],
  additionalResources: [
    {
      title: "DIY Tool Vocabulary List",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/tools/diy-tools/92023"
    }
  ]
};

// Lesson plan data for DIY Projects and Crafts
export const diyProjectsLessonPlan = {
  id: "diy-projects-lesson",
  title: "DIY Projects and Crafts",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to DIY projects and crafts",
    "Practice sequential language (first, then, next, finally)",
    "Develop comprehensive skills through following instructions",
    "Discuss sustainable and upcycling DIY projects"
  ],
  materials: [
    "Visual English Book 7, Unit 7 slides",
    "Simple craft materials for demonstration",
    "Step-by-step instruction cards",
    "Images of finished DIY projects"
  ],
  steps: [
    {
      title: "Introduction to DIY Projects",
      duration: "5 minutes",
      description: "Show examples of DIY projects and discuss their benefits",
      instructions: ["Display images of various DIY projects", "Ask students if they have created any DIY projects themselves"]
    },
    {
      title: "Sequential Language Practice",
      duration: "10 minutes",
      description: "Teach and practice sequence words for giving instructions",
      materials: ["Sequential language handouts"],
      instructions: [
        "Introduce sequence words: first, then, next, after that, finally",
        "Practice using these words to describe simple processes"
      ]
    },
    {
      title: "Following Instructions Activity",
      duration: "15 minutes",
      description: "Students follow instructions to complete a simple paper craft",
      materials: ["Paper craft materials", "Step-by-step instruction cards"],
      instructions: [
        "Distribute materials and instruction cards",
        "Students work individually or in pairs to complete the craft",
        "Monitor and assist as needed"
      ],
      teacherNotes: "This activity practices both comprehension and sequential language"
    },
    {
      title: "Sustainable DIY Discussion",
      duration: "10 minutes",
      description: "Discuss eco-friendly DIY projects and upcycling",
      instructions: [
        "Show examples of upcycled items",
        "Discuss environmental benefits of DIY and reusing materials",
        "Elicit ideas from students for sustainable projects"
      ]
    },
    {
      title: "Wrap-up: Project Planning",
      duration: "5 minutes",
      description: "Students outline a simple DIY project they would like to try",
      instructions: ["Students note down materials needed and basic steps for a project of their choice"]
    }
  ],
  assessmentTips: "Assess students on their use of sequential language and their ability to follow and give instructions accurately.",
  homeworkIdeas: ["Complete a simple DIY project at home and prepare to describe the process", "Find a DIY tutorial online and summarize the steps in English"],
  additionalResources: [
    {
      title: "ESL DIY Project Ideas",
      url: "https://busyteacher.org/classroom_activities-vocabulary/crafts-worksheets/"
    }
  ]
};
