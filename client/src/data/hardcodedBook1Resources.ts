/**
 * Hardcoded Book 1 Resources
 * 
 * This file contains hardcoded resources for Book 1 units
 * to provide more stability than reading from CSV files
 */

import { TeacherResource, ResourceType } from '@/types/resources';

export const hardcodedBook1Resources: Record<string, TeacherResource[]> = {
  "1": [
    // Unit 1 Resources
    {
      id: "b1u1v1",
      bookId: "1",
      unitId: "1",
      resourceType: "video",
      title: "Hello Song",
      description: "A fun song teaching children how to greet each other in English.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/tVlcKp3bWH8",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/tVlcKp3bWH8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u1v2",
      bookId: "1",
      unitId: "1",
      resourceType: "video",
      title: "Good Morning Song",
      description: "Morning greeting song to practice saying good morning.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/CuI_p7a9VGs",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/CuI_p7a9VGs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u1g1",
      bookId: "1",
      unitId: "1",
      resourceType: "game",
      title: "Greetings Matching",
      description: "Match different greetings with appropriate responses.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/11837368/greetings",
      embedCode: `<iframe style="width: 100%; height: 500px;" src="https://wordwall.net/embed/11837368" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "b1u1p1",
      bookId: "1",
      unitId: "1",
      resourceType: "pdf",
      title: "Unit 1: Hello - PDF",
      description: "Visual English Book 1, Unit 1 PDF materials",
      provider: "Visual English",
      pdfUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf"
    },
    {
      id: "b1u1l1",
      bookId: "1",
      unitId: "1",
      resourceType: "lesson",
      title: "Greetings - 45 Minute Lesson Plan",
      description: "Complete lesson plan for teaching greetings to beginners.",
      provider: "Visual English",
      lessonType: "main",
      lessonPlan: {
        id: 'book1-unit1-lesson-1',
        title: 'Greetings Lesson Plan',
        duration: "45 minutes",
        level: "Beginner",
        objectives: ["Learn basic greetings in English"],
        materials: ["Visual English Book 1 digital or printed materials", "Interactive whiteboard or projector", "Optional: flashcards, props"],
        warmUp: "Use greetings with each student. Practice saying hello and goodbye.",
        mainActivities: ["Introduce greetings vocabulary", "Practice dialogues with partners", "Role-play different greeting scenarios"],
        assessment: "Monitor student participation and correct pronunciation.",
        extension: "Create greeting cards or role-play additional scenarios.",
        type: 'main'
      }
    }
  ],
  "2": [
    // Unit 2 Resources
    {
      id: "b1u2v1",
      bookId: "1",
      unitId: "2",
      resourceType: "video",
      title: "School Objects Song",
      description: "A song about common objects found in the classroom.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/g7kK989HiRQ",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/g7kK989HiRQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u2g1",
      bookId: "1",
      unitId: "2",
      resourceType: "game",
      title: "School Objects Matching",
      description: "Match school objects with their names.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/37342291/classroom-objects",
      embedCode: `<iframe style="width: 100%; height: 500px;" src="https://wordwall.net/embed/37342291" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "b1u2l1",
      bookId: "1",
      unitId: "2",
      resourceType: "lesson",
      title: "Classroom Objects Lesson",
      description: "Complete lesson plan for teaching classroom vocabulary.",
      provider: "Visual English",
      lessonType: "main"
    }
  ],
  "3": [
    // Unit 3 Resources
    {
      id: "b1u3v1",
      bookId: "1",
      unitId: "3",
      resourceType: "video",
      title: "Food Song for Kids",
      description: "A fun song about different types of food.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/RE5tvaveVak",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RE5tvaveVak" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u3v2",
      bookId: "1",
      unitId: "3",
      resourceType: "video",
      title: "Fruit Song",
      description: "A song about different fruits.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/mfReSbQ7jzE",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mfReSbQ7jzE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u3g1",
      bookId: "1",
      unitId: "3",
      resourceType: "game",
      title: "Food Vocabulary Game",
      description: "Practice food vocabulary with this interactive game.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/29897132/food",
      embedCode: `<iframe style="width: 100%; height: 500px;" src="https://wordwall.net/embed/29897132" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "b1u3l1",
      bookId: "1",
      unitId: "3",
      resourceType: "lesson",
      title: "Food Vocabulary Lesson",
      description: "Lesson plan for teaching food vocabulary.",
      provider: "Visual English",
      lessonType: "main"
    }
  ],
  "4": [
    // Unit 4 Resources
    {
      id: "b1u4v1",
      bookId: "1",
      unitId: "4",
      resourceType: "video",
      title: "House Tour Song",
      description: "A song about different rooms in a house.",
      provider: "YouTube", 
      sourceUrl: "https://www.youtube.com/embed/qZyJPZxsmZk",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qZyJPZxsmZk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u4g1",
      bookId: "1",
      unitId: "4",
      resourceType: "game",
      title: "Rooms in the House Game",
      description: "Learn about different rooms in a house.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/14083613/rooms-house",
      embedCode: `<iframe style="width: 100%; height: 500px;" src="https://wordwall.net/embed/14083613" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "b1u4l1",
      bookId: "1",
      unitId: "4",
      resourceType: "lesson",
      title: "House Vocabulary Lesson",
      description: "Lesson plan for teaching parts of the house.",
      provider: "Visual English",
      lessonType: "main"
    }
  ],
  "5": [
    // Unit 5 Resources
    {
      id: "b1u5v1",
      bookId: "1",
      unitId: "5",
      resourceType: "video",
      title: "Animal Song",
      description: "A song about different animals.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/OwRmivbNgQk",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OwRmivbNgQk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u5g1",
      bookId: "1",
      unitId: "5",
      resourceType: "game",
      title: "Pet Animals Game",
      description: "Learn about different pet animals.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/10965215/pets",
      embedCode: `<iframe style="width: 100%; height: 500px;" src="https://wordwall.net/embed/10965215" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "b1u5l1",
      bookId: "1",
      unitId: "5",
      resourceType: "lesson",
      title: "Pets Vocabulary Lesson",
      description: "Lesson plan for teaching pet vocabulary.",
      provider: "Visual English",
      lessonType: "main"
    }
  ]
};

/**
 * Get resources for a specific book and unit
 */
export function getBook1ResourcesByUnit(unitId: string): TeacherResource[] {
  return hardcodedBook1Resources[unitId] || [];
}