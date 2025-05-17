/**
 * Hardcoded Resources
 * 
 * This file provides hardcoded resources for Book 1 to ensure stability
 * and no reliance on CSV files or registry loading.
 */

import { TeacherResource } from "@/types/resources";

/**
 * Get hardcoded resources for Book 1 Unit 1
 */
export function getHardcodedBook1Unit1Resources(): TeacherResource[] {
  return [
    // VIDEO RESOURCES
    {
      id: "b1u1v1",
      bookId: "1",
      unitId: "1",
      resourceType: "video",
      title: "Good Morning - PINKFONG",
      description: "Engaging morning greeting song for young learners.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/7CuZr1Dz3sk",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u1v2",
      bookId: "1",
      unitId: "1",
      resourceType: "video",
      title: "Good Morning, Good Night - LITTLE FOX",
      description: "Song teaching morning and night greetings vocabulary.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/mebfKDQ4dLo",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mebfKDQ4dLo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    {
      id: "b1u1v3",
      bookId: "1",
      unitId: "1",
      resourceType: "video",
      title: "The Greetings Song - MAPLE LEAF",
      description: "Interactive song to practice different greetings.",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/gVIFEVLzP4o",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      isYoutubeVideo: true
    },
    
    // GAME RESOURCES
    {
      id: "b1u1g1",
      bookId: "1",
      unitId: "1",
      resourceType: "game",
      title: "Wordwall - GREETINGS",
      description: "Interactive game to practice greetings vocabulary.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/7a5f9c9d02764745b1b471a56483ddf2",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "b1u1g2",
      bookId: "1",
      unitId: "1",
      resourceType: "game",
      title: "Wordwall - TIMES OF THE DAY",
      description: "Interactive game to practice time-of-day vocabulary.",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/aa9083a0802940d7abd8dfbb0ea2113d",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    
    // PDF RESOURCE
    {
      id: "b1u1p1",
      bookId: "1",
      unitId: "1",
      resourceType: "pdf",
      title: "Unit 1: Hello - PDF",
      description: "Visual English Book 1, Unit 1 PDF materials",
      provider: "Visual English",
      sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf"
    },
    
    // LESSON RESOURCE
    {
      id: "b1u1l1",
      bookId: "1",
      unitId: "1",
      resourceType: "lesson",
      title: "Greetings - 45 Minute Lesson Plan",
      description: "Complete lesson plan for teaching greetings to beginners.",
      provider: "Visual English",
      lessonPlan: {
        id: 'book1-unit1-lesson-1',
        title: 'Greetings Lesson Plan',
        duration: "45 minutes",
        level: "Beginner",
        objectives: ["Learn basic greetings in English", "Practice morning and evening vocabulary", "Engage in interactive greeting activities"],
        materials: ["Visual English Book 1 digital or printed materials", "Interactive whiteboard or projector", "Optional: flashcards, props"],
        warmUp: "Use greetings with each student. Practice saying hello and goodbye.",
        mainActivities: ["Introduce greetings vocabulary", "Practice dialogues with partners", "Role-play different greeting scenarios"],
        assessment: "Monitor student participation and correct pronunciation.",
        extension: "Create greeting cards or role-play additional scenarios.",
        type: 'main'
      }
    }
  ];
}

/**
 * Get hardcoded resources for Book 1 Unit 2
 */
export function getHardcodedBook1Unit2Resources(): TeacherResource[] {
  return [
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
      title: "Classroom Objects - 45 Minute Lesson Plan",
      description: "Complete lesson plan for teaching classroom objects to beginners.",
      provider: "Visual English",
      lessonPlan: {
        id: 'book1-unit2-lesson-1',
        title: 'Classroom Objects Lesson Plan',
        duration: "45 minutes",
        level: "Beginner",
        objectives: ["Learn classroom object vocabulary", "Practice asking and answering questions about objects"],
        materials: ["Visual English Book 1 digital or printed materials", "Interactive whiteboard or projector", "Real classroom objects for demonstration"],
        warmUp: "Point to different objects in the classroom and ask 'What is this?'",
        mainActivities: ["Introduce classroom objects vocabulary", "Practice identifying objects in pairs", "Play 'I spy' game with classroom objects"],
        assessment: "Students can correctly identify and name common classroom objects.",
        extension: "Students create a labeled drawing of their ideal classroom with at least 10 objects.",
        type: 'main'
      }
    }
  ];
}

/**
 * Get hardcoded resources for Book 1 Unit 3
 */
export function getHardcodedBook1Unit3Resources(): TeacherResource[] {
  return [
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
    }
  ];
}

/**
 * Get hardcoded resources for Book 1 Unit 4
 */
export function getHardcodedBook1Unit4Resources(): TeacherResource[] {
  return [
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
    }
  ];
}

/**
 * Get hardcoded resources for Book 1 Unit 5
 */
export function getHardcodedBook1Unit5Resources(): TeacherResource[] {
  return [
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
    }
  ];
}

/**
 * Get hardcoded resources for Book 1 based on unit number
 * 
 * @param unitId - The unit ID (as a string)
 * @returns An array of TeacherResource objects for the specified unit
 */
export function getHardcodedBook1Resources(unitId: string): TeacherResource[] {
  switch (unitId) {
    case "1":
      return getHardcodedBook1Unit1Resources();
    case "2":
      return getHardcodedBook1Unit2Resources();
    case "3":
      return getHardcodedBook1Unit3Resources();
    case "4":
      return getHardcodedBook1Unit4Resources();
    case "5":
      return getHardcodedBook1Unit5Resources();
    default:
      // Return empty array for other units
      return [];
  }
}