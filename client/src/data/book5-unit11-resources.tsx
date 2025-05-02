// This file contains resources for Book 5, Unit 11 (Prepositions of Movement themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit11Resources = [
  {
    title: "Prepositions of Place Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/66093f4aac274c1cb1fc6a9c4d7d2ebb",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/66093f4aac274c1cb1fc6a9c4d7d2ebb?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Prepositions of Movement Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4e4e6a338bbf4abd9b560bf28f182c81",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4e4e6a338bbf4abd9b560bf28f182c81?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Preposition Song 1 - Scratch Garden",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/xyMrLQ4ZI-4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xyMrLQ4ZI-4?si=a2n7dUcKnekPT0KY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Preposition Song 2 - Scratch Garden",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/4PZS5g4pSjY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/4PZS5g4pSjY?si=IbGlspqq6L-NTZOL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Preposition Song 3 - Scratch Garden",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/KoYeCxv1AOs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/KoYeCxv1AOs?si=zO4IwARuuiqHi4m8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Prepositions of Place
export const prepositionsOfPlaceLessonPlan = {
  id: "prepositions-of-place-lesson",
  title: "Prepositions of Place",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn and practice prepositions of place (in, on, under, between, etc.)",
    "Develop ability to describe locations of objects",
    "Build speaking skills through positional language",
    "Improve listening comprehension with preposition-focused activities"
  ],
  materials: [
    "Visual English Book 5, Unit 11 slides",
    "Prepositions of Place Game",
    "Preposition Song 1 - Scratch Garden",
    "Small objects for positioning (or pictures)",
    "Classroom objects",
    "Preposition picture cards"
  ],
  steps: [
    {
      title: "Warm-up: Object Positioning",
      duration: "5 minutes",
      description: "Activate knowledge about position words",
      instructions: [
        "Place an object (e.g., a pen) in different positions relative to another object (e.g., a book)",
        "Ask students: 'Where is the pen?' eliciting answers with prepositions",
        "Create a list of position words on the board as students mention them",
        "Briefly explain that these words are called 'prepositions of place'"
      ]
    },
    {
      title: "Prepositions of Place Introduction",
      duration: "10 minutes",
      description: "Learn common prepositions of place and their usage",
      materials: ["Visual English Book 5, Unit 11 slides", "Preposition picture cards"],
      instructions: [
        "Present common prepositions of place: in, on, under, above, below, etc.",
        "Demonstrate each preposition with objects or pictures",
        "Teach compound prepositions: in front of, next to, between, etc.",
        "Have students repeat example sentences: 'The book is on the table', 'The cat is under the chair'",
        "Show preposition picture cards and have students identify the correct preposition"
      ]
    },
    {
      title: "Video: Preposition Song",
      duration: "10 minutes",
      description: "Watch a song about prepositions of place",
      materials: ["Preposition Song 1 - Scratch Garden"],
      instructions: [
        "Play the Preposition Song 1 video",
        "Ask students to listen for prepositions they recognize",
        "Play the video again, encouraging students to sing along",
        "Discuss any new prepositions introduced in the song",
        "Review the prepositions from the song with examples"
      ]
    },
    {
      title: "Interactive Game: Prepositions of Place",
      duration: "10 minutes",
      description: "Practice prepositions through a digital game",
      materials: ["Prepositions of Place Game"],
      instructions: [
        "Have students play the Prepositions of Place Game",
        "Encourage them to form complete sentences when answering",
        "Review any challenging prepositions as a class",
        "Discuss nuances between similar prepositions (on vs. above, under vs. below)"
      ]
    },
    {
      title: "Classroom Treasure Hunt",
      duration: "10 minutes",
      description: "Practice prepositions by describing and finding object locations",
      materials: ["Small objects for positioning", "Classroom objects"],
      instructions: [
        "Divide students into pairs",
        "One student places an object somewhere in the classroom",
        "That student must describe where the object is using prepositions of place",
        "The partner listens and tries to find the object based on the description",
        "Examples: 'It's under the blue chair near the window', 'It's between the books on the shelf'",
        "Students switch roles and repeat with different objects",
        "As an extension, have students write down the prepositions they used",
        "Discuss which prepositions were most useful for giving clear directions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their accurate use of prepositions of place, ability to comprehend positional language, and participation in the classroom treasure hunt activity.",
  homeworkIdeas: [
    "Draw your bedroom and write 10 sentences using prepositions of place to describe where things are", 
    "Take a photo of a room and label 10 objects with prepositions describing their positions",
    "Complete a prepositions worksheet with fill-in-the-blank sentences"
  ],
  additionalResources: [
    {
      title: "ESL Prepositions of Place Activities",
      url: "https://www.teach-this.com/parts-of-speech-activities/prepositions-of-place"
    },
    {
      title: "Prepositions of Place Visual Guide",
      url: "https://en.islcollective.com/english-esl-worksheets/grammar/prepositions-place"
    }
  ]
};

// Second lesson plan for Unit 11: Prepositions of Movement
export const prepositionsOfMovementLessonPlan = {
  id: "prepositions-of-movement-lesson",
  title: "Prepositions of Movement",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn and practice prepositions of movement (to, from, across, through, etc.)",
    "Develop ability to describe motion and direction",
    "Build speaking skills through action-based language",
    "Create and follow directions using movement prepositions"
  ],
  materials: [
    "Visual English Book 5, Unit 11 slides",
    "Prepositions of Movement Game",
    "Preposition Songs 2 and 3 - Scratch Garden",
    "Direction cards",
    "Simple map handouts",
    "Action picture sequences"
  ],
  steps: [
    {
      title: "Warm-up: Simon Says with Movement",
      duration: "5 minutes",
      description: "Activate knowledge about movement words through a game",
      instructions: [
        "Play a version of 'Simon Says' using movement prepositions",
        "Example commands: 'Simon says walk across the room', 'Simon says jump over the line'",
        "After each action, ask: 'What did you do?' to elicit sentences with movement prepositions",
        "Introduce the concept of prepositions of movement"
      ]
    },
    {
      title: "Prepositions of Movement Introduction",
      duration: "10 minutes",
      description: "Learn common prepositions of movement and their usage",
      materials: ["Visual English Book 5, Unit 11 slides", "Action picture sequences"],
      instructions: [
        "Present common prepositions of movement: to, from, towards, away from, etc.",
        "Introduce directional prepositions: up, down, along, across, through, etc.",
        "Show action sequences and model sentences: 'The boy is walking into the house', 'The cat jumped over the fence'",
        "Explain the difference between prepositions of place and movement",
        "Have students create sentences based on action pictures"
      ]
    },
    {
      title: "Videos: Movement Preposition Songs",
      duration: "10 minutes",
      description: "Watch songs about prepositions of movement",
      materials: ["Preposition Songs 2 and 3 - Scratch Garden"],
      instructions: [
        "Play Preposition Song 2 focusing on movement prepositions",
        "Ask students to note any movement prepositions they hear",
        "If time permits, play Preposition Song 3 as well",
        "Have students stand up and mime the movements mentioned in the songs",
        "Review the movement prepositions from the songs with examples"
      ]
    },
    {
      title: "Interactive Game: Prepositions of Movement",
      duration: "10 minutes",
      description: "Practice movement prepositions through a digital game",
      materials: ["Prepositions of Movement Game"],
      instructions: [
        "Have students play the Prepositions of Movement Game",
        "Encourage them to form complete sentences when answering",
        "For each correct answer, have students demonstrate the movement if possible",
        "Review any challenging prepositions as a class",
        "Discuss when to use specific movement prepositions"
      ]
    },
    {
      title: "Map Navigation Activity",
      duration: "10 minutes",
      description: "Practice giving and following directions using movement prepositions",
      materials: ["Simple map handouts", "Direction cards"],
      instructions: [
        "Distribute simple map handouts to pairs or small groups",
        "Explain that they will practice giving directions from one point to another",
        "Model how to give directions: 'Go across the bridge, then walk along the river, etc.'",
        "Distribute direction cards with starting and ending points",
        "Students take turns describing routes using movement prepositions",
        "Partners follow the directions and confirm if they reached the correct destination",
        "As an extension, have students write their own directions for a route on the map",
        "Volunteers share their directions with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their accurate use of prepositions of movement, ability to give clear directions, and participation in the map navigation activity.",
  homeworkIdeas: [
    "Write directions from your home to school using movement prepositions", 
    "Create a comic strip showing a character's journey using at least 5 different movement prepositions",
    "Record a short video of yourself demonstrating 10 movement prepositions"
  ],
  additionalResources: [
    {
      title: "ESL Prepositions of Movement Activities",
      url: "https://www.teach-this.com/parts-of-speech-activities/prepositions-of-movement"
    },
    {
      title: "Prepositions Game Collection",
      url: "https://www.gamestolearnenglish.com/prepositions/"
    }
  ]
};
