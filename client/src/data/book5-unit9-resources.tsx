// This file contains resources for Book 5, Unit 9 (Emotions themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit9Resources = [
  {
    title: "Emotions Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/634707da2b274fe5b687a0eb0498317a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/634707da2b274fe5b687a0eb0498317a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Emotions Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4f267a1441db4c939aefed479d23ffac",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4f267a1441db4c939aefed479d23ffac?themeId=21&templateId=69&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Emotions Video Worksheet",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/8881",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/8881" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for Emotions Vocabulary
export const emotionsVocabularyLessonPlan = {
  id: "emotions-vocabulary-lesson",
  title: "Emotions Vocabulary and Expression",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to emotions and feelings",
    "Practice expressing and recognizing different emotions",
    "Develop language for describing emotional states",
    "Build empathy through discussing emotions"
  ],
  materials: [
    "Visual English Book 5, Unit 9 slides",
    "Emotions Vocabulary Games",
    "Emotions Video Worksheet",
    "Emotion flashcards",
    "Mirror (optional)"
  ],
  steps: [
    {
      title: "Warm-up: How Do You Feel?",
      duration: "5 minutes",
      description: "Activate knowledge about emotions and feelings",
      instructions: [
        "Ask students: 'How do you feel today?' and encourage responses beyond 'good' or 'fine'",
        "Create a list of emotion words on the board",
        "Group emotions into positive, negative, and neutral categories",
        "Briefly discuss why people might feel different emotions"
      ]
    },
    {
      title: "Emotions Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary for various emotions and their intensity",
      materials: ["Visual English Book 5, Unit 9 slides", "Emotion flashcards"],
      instructions: [
        "Present basic emotion vocabulary: happy, sad, angry, scared, surprised, etc.",
        "Introduce emotional intensity: content → happy → ecstatic; upset → angry → furious",
        "Teach expressions for showing emotions: 'I feel...', 'I'm...', 'I've been feeling...'",
        "Use emotion flashcards to practice recognition and vocabulary"
      ]
    },
    {
      title: "Emotions Expression Activity",
      duration: "10 minutes",
      description: "Practice expressing emotions through facial expressions and body language",
      materials: ["Emotion flashcards", "Mirror (optional)"],
      instructions: [
        "Demonstrate how emotions show through facial expressions and body language",
        "Have students practice showing different emotions (use mirror if available)",
        "Play a charades-style game where students act out emotions for others to guess",
        "Discuss cultural differences in expressing emotions"
      ]
    },
    {
      title: "Video: Emotions Exploration",
      duration: "10 minutes",
      description: "Watch a video about emotions and their expression",
      materials: ["Emotions Video Worksheet"],
      instructions: [
        "Introduce the Emotions Video Worksheet",
        "Play the video and have students complete the worksheet",
        "Pause at key points to discuss the emotions being shown",
        "After watching, review the emotions presented and how they were expressed"
      ]
    },
    {
      title: "Interactive Practice: Emotions Games",
      duration: "10 minutes",
      description: "Practice emotions vocabulary through digital games and discussion",
      materials: ["Emotions Vocabulary Games"],
      instructions: [
        "Have students play the Emotions Vocabulary Games",
        "For each emotion identified, ask students to share:",
        "- A situation that might cause this emotion",
        "- How they personally respond to this emotion",
        "- Words or phrases associated with this emotion",
        "Discuss strategies for managing difficult emotions",
        "Review any challenging vocabulary or concepts"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of emotions vocabulary, ability to express and recognize different emotions, and participation in discussions about emotional responses.",
  homeworkIdeas: [
    "Create an emotions diary for one day, noting different feelings experienced and their causes", 
    "Write a short story that includes characters experiencing at least five different emotions",
    "Find song lyrics that express different emotions and explain how the emotions are conveyed"
  ],
  additionalResources: [
    {
      title: "ESL Emotions Vocabulary",
      url: "https://www.eslflow.com/feelingslessonplans.html"
    },
    {
      title: "Emotional Intelligence Activities",
      url: "https://www.teach-this.com/esl-resources/feelings-and-emotions"
    }
  ]
};

// Second lesson plan for Unit 9: Responding to Emotions
export const respondingEmotionsLessonPlan = {
  id: "responding-emotions-lesson",
  title: "Responding to Emotions in Conversation",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for responding to others' emotions",
    "Practice appropriate responses to different emotional situations",
    "Develop language for showing empathy and support",
    "Build communication skills for emotional contexts"
  ],
  materials: [
    "Visual English Book 5, Unit 9 slides",
    "Response phrase cards",
    "Emotional situation cards",
    "Role-play scenarios"
  ],
  steps: [
    {
      title: "Warm-up: When Someone is...",
      duration: "5 minutes",
      description: "Activate knowledge about responding to emotions",
      instructions: [
        "Ask students: 'What do you say when someone is sad?'",
        "Repeat with different emotions: happy, angry, worried, excited, etc.",
        "Create a list of response phrases on the board",
        "Discuss the importance of responding appropriately to others' emotions"
      ]
    },
    {
      title: "Responding Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary and phrases for responding to emotions",
      materials: ["Visual English Book 5, Unit 9 slides", "Response phrase cards"],
      instructions: [
        "Present response phrases for different emotions:",
        "- Happy: 'That's great!', 'I'm so happy for you!', 'Congratulations!'",
        "- Sad: 'I'm sorry to hear that', 'That must be difficult', 'Is there anything I can do?'",
        "- Angry: 'I understand why you're upset', 'That's frustrating', 'Let's talk about it'",
        "- Worried: 'Try not to worry', 'It will be okay', 'Let's think about solutions'",
        "Distribute response phrase cards and have students match them to appropriate emotions"
      ]
    },
    {
      title: "Showing Empathy",
      duration: "10 minutes",
      description: "Learn and practice language for showing empathy",
      materials: ["Visual English Book 5, Unit 9 slides"],
      instructions: [
        "Explain the concept of empathy: understanding and sharing others' feelings",
        "Present empathetic language: 'I understand how you feel', 'That sounds difficult', 'I've been there too'",
        "Discuss active listening techniques: nodding, maintaining eye contact, asking follow-up questions",
        "Model empathetic responses to different scenarios",
        "Have students practice responding empathetically to simple situations"
      ]
    },
    {
      title: "Emotional Situations Activity",
      duration: "10 minutes",
      description: "Practice responding to different emotional situations",
      materials: ["Emotional situation cards"],
      instructions: [
        "Divide students into pairs",
        "Distribute emotional situation cards with scenarios like:",
        "- 'Your friend failed an important test'",
        "- 'Your cousin just got accepted to university'",
        "- 'Your neighbor lost their pet'",
        "- 'Your sibling is angry about a misunderstanding'",
        "One student describes the situation, the other responds appropriately",
        "Partners switch roles and try different scenarios",
        "Discuss which responses felt most supportive and why"
      ]
    },
    {
      title: "Emotional Conversation Role-play",
      duration: "10 minutes",
      description: "Practice extended conversations involving emotions",
      materials: ["Role-play scenarios"],
      instructions: [
        "Divide students into small groups",
        "Distribute role-play scenarios with extended emotional situations like:",
        "- 'A friend is excited about a new job but worried about the challenges'",
        "- 'A classmate is upset about a conflict with another student'",
        "- 'A family member is both happy and sad about moving to a new city'",
        "Groups prepare and practice their role-plays, focusing on emotional vocabulary and appropriate responses",
        "Select groups to perform their role-plays for the class",
        "Class provides feedback on the emotional language and responses used"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to respond appropriately to different emotions, use of empathetic language, and participation in the role-play activities.",
  homeworkIdeas: [
    "Write a dialogue between two people where one expresses an emotion and the other responds supportively", 
    "Create a list of do's and don'ts for responding to different emotions",
    "Watch a TV show or movie scene and analyze how characters respond to each other's emotions"
  ],
  additionalResources: [
    {
      title: "ESL Empathy Resources",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/feelings-and-emotions"
    },
    {
      title: "Communication Skills Activities",
      url: "https://www.eslflow.com/communicationlessonplans.html"
    }
  ]
};
