import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

/**
 * This file contains common resources (games, videos) for Book 6 that will be shared
 * across multiple units. It provides functions to generate standardized resources
 * for any unit in Book 6.
 */

// Unit titles for reference in lesson plans and resources
export const BOOK6_UNIT_TITLES: Record<string, string> = {
  '1': 'Jobs And Occupations',
  '2': 'Health And Illnesses',
  '3': 'Eating Out',
  '4': 'Who Lives Where',
  '5': 'Shopping',
  '6': 'What Your Body Can Do',
  '7': 'Theme Park Stalls',
  '8': 'At The Gym',
  '9': 'Present Perfect: What Has Just Happened',
  '10': 'Are You Tech Savvy?',
  '11': 'Transportation And Travel',
  '12': 'Are You Eco? Environment',
  '13': 'City Life',
  '14': 'At The Airport',
  '15': 'Are You A Survivor',
  '16': 'Fashion Accessories'
};

// Wordwall games mapped by unit with their embed codes
/**
 * Collection of games for each Book 6 unit
 * These are organized by unit number and will be added to the resources list
 */
const BOOK6_UNIT_GAMES: Record<string, { title: string, sourceUrl: string, embedCode: string, provider?: string }[]> = {
  '1': [
    {
      title: "Jobs Game 1", 
      sourceUrl: "https://wordwall.net/resource/52d2810af010454d9363eec201d2f23f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Jobs Game 2", 
      sourceUrl: "https://wordwall.net/resource/7f0da57d5aea4ea1b9786ec62492b5bf",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7f0da57d5aea4ea1b9786ec62492b5bf?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Jobs Game 3", 
      sourceUrl: "https://wordwall.net/resource/e202e8707b1b46eda206429e021b78cf",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e202e8707b1b46eda206429e021b78cf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '2': [
    {
      title: "Appliances Game 1", 
      sourceUrl: "https://wordwall.net/resource/618c61ec94e44892a33f2e4db491b222",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/618c61ec94e44892a33f2e4db491b222?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Appliances Game 2",
      sourceUrl: "https://wordwall.net/resource/52d2810af010454d9363eec201d2f23f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Appliances Game 3",
      sourceUrl: "https://wordwall.net/resource/618c61ec94e44892a33f2e4db491b222",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/618c61ec94e44892a33f2e4db491b222?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '3': [
    {
      title: "Future - What Will You Do Game 1",
      sourceUrl: "https://wordwall.net/resource/5aa489c7d8c24523a73d5ddc958bb415",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5aa489c7d8c24523a73d5ddc958bb415?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Future - What Will You Do Game 2",
      sourceUrl: "https://wordwall.net/resource/53399cf8c14a468abc6ab84a193110f1",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/53399cf8c14a468abc6ab84a193110f1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Life in the Future Game",
      sourceUrl: "https://wordwall.net/resource/1920f9692e4c4619880faf22a4d1446c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1920f9692e4c4619880faf22a4d1446c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '4': [
    {
      title: "Animal Classification Game 1",
      sourceUrl: "https://wordwall.net/resource/b8fdaeeaebd94b3a967f74bb089c4fb1",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b8fdaeeaebd94b3a967f74bb089c4fb1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Animal Classification Game 2",
      sourceUrl: "https://wordwall.net/resource/cbb7f7c79a734d7486a4305d4a7b4522",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/cbb7f7c79a734d7486a4305d4a7b4522?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Animal Classification Game 3",
      sourceUrl: "https://wordwall.net/resource/d32038b5e08a423db5e45bea20e3f991",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d32038b5e08a423db5e45bea20e3f991?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Animal Classification Game 4",
      sourceUrl: "https://wordwall.net/resource/ba7c9ec7e68d499898a42c537c62cc7c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ba7c9ec7e68d499898a42c537c62cc7c?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Animal Classification Game 5",
      sourceUrl: "https://wordwall.net/resource/dfc836366f9643b58ac49ead018e7512",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dfc836366f9643b58ac49ead018e7512?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Animal Group Classification Game",
      sourceUrl: "https://www.sheppardsoftware.com/science/animals/games/animal-characteristics/",
      embedCode: `<iframe src="https://www.sheppardsoftware.com/science/animals/games/animal-characteristics/" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`,
      provider: "Shepard Software"
    }
  ],
  '5': [
    {
      title: "Theme Park Stalls Game",
      sourceUrl: "https://wordwall.net/resource/6b7661ae6d51420397ca4b290370c0a5",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6b7661ae6d51420397ca4b290370c0a5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Theme Park Rides Game",
      sourceUrl: "https://wordwall.net/resource/8080784ba2f2495287e30b926bf38bcb",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8080784ba2f2495287e30b926bf38bcb?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Theme Park Food Game",
      sourceUrl: "https://wordwall.net/resource/64d32b0e4bcb44df9a8ca4b84dce6ac4",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/64d32b0e4bcb44df9a8ca4b84dce6ac4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '6': [
    {
      title: "In the Kitchen Kahoot",
      sourceUrl: "https://create.kahoot.it/share/in-the-kitchen/b683184e-f723-4784-a02a-d51e3678c3af",
      embedCode: `<iframe src="https://create.kahoot.it/share/in-the-kitchen/b683184e-f723-4784-a02a-d51e3678c3af" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`,
      provider: "Kahoot"
    },
    {
      title: "Kitchen Utensils Game 1",
      sourceUrl: "https://wordwall.net/resource/5eedd77a9110462a9111a38f2f52fda5",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5eedd77a9110462a9111a38f2f52fda5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Kitchen Utensils Game 2",
      sourceUrl: "https://wordwall.net/resource/8080784ba2f2495287e30b926bf38bcb",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8080784ba2f2495287e30b926bf38bcb?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Cooking Methods Game 1",
      sourceUrl: "https://wordwall.net/resource/ecb2dd96232d4c4e9f9103f738de561c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ecb2dd96232d4c4e9f9103f738de561c?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Cooking Methods Game 2",
      sourceUrl: "https://wordwall.net/resource/c12666ce8e1640e299be713f24762d8c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c12666ce8e1640e299be713f24762d8c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '7': [
    {
      title: "Illness Game",
      sourceUrl: "https://wordwall.net/resource/34904fd94f30404192d2bdab3f028260",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/34904fd94f30404192d2bdab3f028260?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Internal Body Parts Game",
      sourceUrl: "https://wordwall.net/resource/4fbc8cd964f04a51aebc1e96f382140e",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4fbc8cd964f04a51aebc1e96f382140e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "What Your Body Can Do Game",
      sourceUrl: "https://wordwall.net/resource/5cec72b501b54381b2f536e9c82a1c5c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5cec72b501b54381b2f536e9c82a1c5c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '8': [
    {
      title: "Past Tense Verbs Game 1",
      sourceUrl: "https://wordwall.net/resource/a95c4a46b32447f0916d3b6f2093cac3",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a95c4a46b32447f0916d3b6f2093cac3?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Past Tense Verbs Game 2",
      sourceUrl: "https://wordwall.net/resource/b5a88799031c431e971373a669bfb5c7",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b5a88799031c431e971373a669bfb5c7?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Past Tense Verbs Game 3",
      sourceUrl: "https://wordwall.net/resource/6c4f1e98c0f24f5fbf63d959bba397ce",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6c4f1e98c0f24f5fbf63d959bba397ce?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '9': [
    {
      title: "Present Perfect Tense Verbs Game 1",
      sourceUrl: "https://wordwall.net/resource/885efcf090f04b169ba976a1db08187d",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/885efcf090f04b169ba976a1db08187d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Present Perfect Tense Verbs Game 2",
      sourceUrl: "https://wordwall.net/resource/971dcc6b738b4ee6b50d2f0d3108fb9e",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/971dcc6b738b4ee6b50d2f0d3108fb9e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Present Perfect Tense Verbs Game 3",
      sourceUrl: "https://wordwall.net/resource/8caa6d3e98844ee9ad346e2127b3caf6",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8caa6d3e98844ee9ad346e2127b3caf6?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '10': [
    {
      title: "Google Technology Quiz",
      sourceUrl: "https://wordwall.net/resource/3a895f34745a45009993054359e15e3f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3a895f34745a45009993054359e15e3f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Computer Verbs Practice",
      sourceUrl: "https://wordwall.net/resource/124ba44470124539ac4168b97714f02a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/124ba44470124539ac4168b97714f02a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Technology Gadgets Game 1",
      sourceUrl: "https://wordwall.net/resource/023ea996683742539d4e330a7ec8f9ed",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/023ea996683742539d4e330a7ec8f9ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Technology Gadgets Game 2",
      sourceUrl: "https://wordwall.net/resource/589446a1c2674dcc964dc2115c3c119f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/589446a1c2674dcc964dc2115c3c119f?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Find the Gadgets Game",
      sourceUrl: "https://www.abcya.com/games/find_the_tech",
      embedCode: `<iframe src="https://www.abcya.com/games/find_the_tech" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`,
      provider: 'ABCya'
    }
  ],
  '11': [
    {
      title: "Traditional Food Vocabulary",
      sourceUrl: "https://wordwall.net/resource/9b4c3e1d5a6f47829c0d8e7b1f2a3e5d",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9b4c3e1d5a6f47829c0d8e7b1f2a3e5d?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '12': [
    {
      title: "Environmental Problems Game",
      sourceUrl: "https://wordwall.net/resource/e8aeb81eecf44bab9de731f4edf8ea31",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e8aeb81eecf44bab9de731f4edf8ea31?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Environmental Protection Vocabulary",
      sourceUrl: "https://wordwall.net/resource/82f30a9fa3804bc1ad7b4db75f59a8da",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/82f30a9fa3804bc1ad7b4db75f59a8da?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '13': [
    {
      title: "World Locations Game",
      sourceUrl: "https://wordwall.net/resource/7bd4e92c1a3f48d9b0c5e6a8f1d2c3b4",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7bd4e92c1a3f48d9b0c5e6a8f1d2c3b4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '14': [
    {
      title: "Seasons Vocabulary",
      sourceUrl: "https://wordwall.net/resource/6c5d4e3b2a1f48d7c9b0a8e6f5d4c3b2",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6c5d4e3b2a1f48d7c9b0a8e6f5d4c3b2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '15': [
    {
      title: "Simple vs Continuous Tenses",
      sourceUrl: "https://wordwall.net/resource/5a4b3c2d1e6f7g8h9i0j1k2l3m4n5o6p",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5a4b3c2d1e6f7g8h9i0j1k2l3m4n5o6p?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '16': [
    {
      title: "Passive Voice Practice",
      sourceUrl: "https://wordwall.net/resource/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ]
};

// YouTube videos mapped by unit with their embed codes
const BOOK6_UNIT_VIDEOS: Record<string, { title: string, sourceUrl: string, embedCode: string, provider?: string }[]> = {
  '1': [
    {
      title: "Jobs ESL Guessing Game 1",
      sourceUrl: "https://www.youtube.com/watch?v=wipXsbFTX-U",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/wipXsbFTX-U?si=u5G9MH5UdS7srqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Jobs ESL Guessing Game 2",
      sourceUrl: "https://www.youtube.com/watch?v=nfzYoNTcAn8",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=Ocr5dth1nB5wUbxe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '2': [
    {
      title: "Guess the Appliance",
      sourceUrl: "https://www.youtube.com/watch?v=1ZPStTtE7JI",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/1ZPStTtE7JI?si=VBo8KA4cD2fUAbyT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }
  ],
  '3': [
    {
      title: "What Will Happen",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/678492",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/678492" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`,
      provider: 'ISL Collective'
    }
  ],
  '4': [
    {
      title: "Animal Classification Song",
      sourceUrl: "https://www.youtube.com/watch?v=4VixROiu8Qg",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/4VixROiu8Qg?si=IGYwf2OAfcTSrmK5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '5': [
    {
      title: "Guess the Rides",
      sourceUrl: "https://www.youtube.com/watch?v=AYqEc3mKJek",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AYqEc3mKJek?si=b29JX3KdOmEHLs92" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }
  ],
  '6': [
    {
      title: "Kitchen and Cooking Video",
      sourceUrl: "https://www.youtube.com/watch?v=6BIFnvjpquk",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6BIFnvjpquk?si=31dsztCC97dUIu18" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }
  ],
  '7': [
    {
      title: "Human Body Systems",
      sourceUrl: "https://www.youtube.com/watch?v=2q9Jb-f7cAE",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2q9Jb-f7cAE?si=8EK5FiTjeWF9kXHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }
  ],
  '8': [
    {
      title: "Past Simple Video Lesson",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/772028",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/772028" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`,
      provider: 'ISL Collective'
    }
  ],
  '9': [
    {
      title: "Present Perfect Video Lesson",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/3360",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/3360" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`,
      provider: 'ISL Collective'
    }
  ],
  '10': [
    {
      title: "Technology Devices Vocabulary",
      sourceUrl: "https://www.youtube.com/watch?v=AVKzuuZRdKA",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AVKzuuZRdKA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Technology and Gadgets Video Lesson",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/1015142",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/1015142" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`,
      provider: 'ISL Collective'
    }
  ],
  '11': [
    {
      title: "Extreme Sports Introduction",
      sourceUrl: "https://www.youtube.com/watch?v=cM2vxZWGmes",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/cM2vxZWGmes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Mountain Climbing Safety",
      sourceUrl: "https://www.youtube.com/watch?v=3xHnBDY-EPs",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3xHnBDY-EPs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Extreme Sports Vocabulary Game 1", 
      sourceUrl: "https://wordwall.net/resource/2b1bfd6c1f8847efa2fb3e88c0c38b38",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2b1bfd6c1f8847efa2fb3e88c0c38b38?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Extreme Sports Vocabulary Game 2", 
      sourceUrl: "https://wordwall.net/resource/cf7b2f4cf1514a12bfce2d5f5cb72301",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/cf7b2f4cf1514a12bfce2d5f5cb72301?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Extreme Sports Matching Game", 
      sourceUrl: "https://wordwall.net/resource/a3b98acfc83c42899a0e43d23c47b77b",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a3b98acfc83c42899a0e43d23c47b77b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '12': [
    {
      title: "Environmental Conservation Explained",
      sourceUrl: "https://www.youtube.com/watch?v=Jwr1Dzx0ycs",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Jwr1Dzx0ycs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Earth Song",
      sourceUrl: "https://www.youtube.com/watch?v=S2SMvfGe72U",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/S2SMvfGe72U?si=lNL1zDC02ILXCMju" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      title: "Solar System Game",
      sourceUrl: "https://wordwall.net/resource/2753bac717214441a38d76fda2cc33b8",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Types of Pollution Game",
      sourceUrl: "https://wordwall.net/resource/f07c8c0eebfb48d9a771d2c7cad81f3d",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Can You Recycle? Game",
      sourceUrl: "https://wordwall.net/resource/98fd4453f46240f0ac6bb612b5945960",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Endangered or Extinct Game",
      sourceUrl: "https://wordwall.net/resource/f04d2f477ff8484db0456922be236071",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f04d2f477ff8484db0456922be236071?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Endangered Animals Game",
      sourceUrl: "https://wordwall.net/resource/db58fd0165464c08a4c385c035325f3b",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '13': [
    {
      title: "Clothes and Fashion Vocabulary",
      sourceUrl: "https://www.youtube.com/watch?v=Jhd1XbZdLHo",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Jhd1XbZdLHo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Fashion Vocabulary",
      sourceUrl: "https://wordwall.net/resource/4bb6a92e13534b3fb9c2347f9be6d88b",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4bb6a92e13534b3fb9c2347f9be6d88b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Clothing Items Game",
      sourceUrl: "https://wordwall.net/resource/7d42d91a84614f899af2a1a04bda80ef",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7d42d91a84614f899af2a1a04bda80ef?themeId=1&templateId=11&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Shoe Types Game",
      sourceUrl: "https://wordwall.net/resource/b4d81df242e343618ac2e5fbabb5a68b",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b4d81df242e343618ac2e5fbabb5a68b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Fashion Accessories Game",
      sourceUrl: "https://wordwall.net/resource/c9ec2fc34fd9417f94ce6b73ee7a63bd",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c9ec2fc34fd9417f94ce6b73ee7a63bd?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '14': [
    {
      title: "Cinema and Movies Vocabulary",
      sourceUrl: "https://www.youtube.com/watch?v=YWbYeTp35_o",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YWbYeTp35_o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Film Genres Quiz Game",
      sourceUrl: "https://wordwall.net/resource/5ac95a3ca17a44f5bc3a42d7ea48d293",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5ac95a3ca17a44f5bc3a42d7ea48d293?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Movie Vocabulary Game",
      sourceUrl: "https://wordwall.net/resource/eb56e7fe3a1c4fb68aa48be15f86c0df",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/eb56e7fe3a1c4fb68aa48be15f86c0df?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Cinema Jobs Game",
      sourceUrl: "https://wordwall.net/resource/a6fa7b04df3b4e61a5ff1d37a6e56ed2",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a6fa7b04df3b4e61a5ff1d37a6e56ed2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '15': [
    {
      title: "Rules and Regulations - Modal Verbs",
      sourceUrl: "https://www.youtube.com/watch?v=BhPqiGfqo0M",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/BhPqiGfqo0M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Modal Verbs Game",
      sourceUrl: "https://wordwall.net/resource/af4e3f292ad04cc181e9b73b34f16bc0",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/af4e3f292ad04cc181e9b73b34f16bc0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "School Rules Game",
      sourceUrl: "https://wordwall.net/resource/99aa3cc7af424cc09ea0fa3d1af9e4ff",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/99aa3cc7af424cc09ea0fa3d1af9e4ff?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Road Signs Game",
      sourceUrl: "https://wordwall.net/resource/5c4ba0e1fe0f4cc5812b3b7f6b29be3f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5c4ba0e1fe0f4cc5812b3b7f6b29be3f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Must vs. Should Game",
      sourceUrl: "https://wordwall.net/resource/5f38bdace8c9490eb62cd53a6cce4e64",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5f38bdace8c9490eb62cd53a6cce4e64?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '16': [
    {
      title: "Heroes and Inspirational People",
      sourceUrl: "https://www.youtube.com/watch?v=DA1ZV6NOpGw",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DA1ZV6NOpGw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      title: "Famous People Quiz Game",
      sourceUrl: "https://wordwall.net/resource/cd4d92e1b9de4b9d84e9edcdf7a4d49c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/cd4d92e1b9de4b9d84e9edcdf7a4d49c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Inspiring Qualities Game",
      sourceUrl: "https://wordwall.net/resource/63e2359e16684889a10fdfd4fa67b57f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/63e2359e16684889a10fdfd4fa67b57f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Inspirational Leaders Game",
      sourceUrl: "https://wordwall.net/resource/1a34a89e1b024e19a4e33a0fb2e79abd",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1a34a89e1b024e19a4e33a0fb2e79abd?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Heroes and Achievements Game",
      sourceUrl: "https://wordwall.net/resource/d9c4f03e5ff94cdebcde74a9e5c0e863",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d9c4f03e5ff94cdebcde74a9e5c0e863?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ]
};

// Default resources for units that don't have specific resources defined
const DEFAULT_UNIT_GAMES = [
  {
    title: "English Vocabulary Practice",
    sourceUrl: "https://wordwall.net/resource/96a45bc01cd649659c90e9546f8a8972",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/96a45bc01cd649659c90e9546f8a8972?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "ESL Vocabulary Builder",
    sourceUrl: "https://wordwall.net/resource/29a8c3d88ae24188b99f621e0dd1cefd",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29a8c3d88ae24188b99f621e0dd1cefd?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

const DEFAULT_UNIT_VIDEOS = [
  {
    title: "English Learning Tips",
    sourceUrl: "https://www.youtube.com/watch?v=9wT_ehMR0NU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/9wT_ehMR0NU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }
];

/**
 * Generate standard resources for any Book 6 unit
 * @param unitId The unit ID as a string (1-16)
 * @returns Array of TeacherResource objects
 */
export function generateBook6UnitResources(bookId: string, unitId: string): TeacherResource[] {
  const resources: TeacherResource[] = [];
  const unitGames = BOOK6_UNIT_GAMES[unitId] || DEFAULT_UNIT_GAMES;
  const unitVideos = BOOK6_UNIT_VIDEOS[unitId] || DEFAULT_UNIT_VIDEOS;
  
  // Add games
  unitGames.forEach((game, index) => {
    resources.push({
      id: `book6-unit${unitId}-game${index + 1}`,
      bookId,
      unitId,
      title: game.title,
      resourceType: 'game',
      provider: game.provider || 'Wordwall',
      sourceUrl: game.sourceUrl,
      embedCode: game.embedCode
    });
  });
  
  // Add videos
  unitVideos.forEach((video, index) => {
    resources.push({
      id: `book6-unit${unitId}-video${index + 1}`,
      bookId,
      unitId,
      title: video.title,
      resourceType: 'video',
      provider: video.provider || 'YouTube',
      sourceUrl: video.sourceUrl,
      embedCode: video.embedCode
    });
  });
  
  // Add default lesson plans
  const unitTitle = BOOK6_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  const lessonPlans = generateDefaultBook6UnitLessonPlans(unitId, unitTitle);
  
  lessonPlans.forEach(lessonPlan => {
    resources.push({
      id: lessonPlan.id,
      bookId,
      unitId,
      title: lessonPlan.title,
      resourceType: 'lesson',
      provider: 'Visual English',
      lessonPlan: lessonPlan
    });
  });
  
  return resources;
}

/**
 * Create a generic lesson plan generator for Book 6 units
 * This serves as a template - individual unit files can override this with specific lesson plans
 */
export function generateDefaultBook6UnitLessonPlans(unitId: string, unitTitle: string): LessonPlan[] {
  return [
    {
      id: `book6-unit${unitId}-vocab-lesson`,
      title: `${unitTitle} - Vocabulary Development`,
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn key vocabulary related to the unit theme",
        "Practice using new terms in context",
        "Develop listening and speaking skills"
      ],
      materials: [
        `Visual English Book 6 Unit ${unitId} slides`,
        "Wordwall vocabulary games",
        "Flashcards and handouts"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Introduce theme with visual aids",
          instructions: ["Show unit theme visuals", "Ask eliciting questions", "Build interest in the topic"]
        },
        {
          title: "Vocabulary Presentation",
          duration: "15 minutes",
          description: "Use slides to present new words",
          materials: ["Visual English slides", "Vocabulary list handout"],
          instructions: ["Present 10-12 new vocabulary items", "Model pronunciation", "Have students repeat", "Explain meanings with visuals"]
        },
        {
          title: "Practice Activities",
          duration: "15 minutes",
          description: "Interactive Wordwall games",
          materials: ["Wordwall game access", "Devices for access"],
          instructions: ["Demonstrate game access", "Have students play in pairs or small groups", "Monitor and assist as needed"]
        },
        {
          title: "Production",
          duration: "10-15 minutes",
          description: "Role-play or conversation activity",
          instructions: ["Assign conversation scenarios", "Have students practice in pairs", "Ask volunteers to present"]
        }
      ],
      assessmentTips: "Observe student participation in activities. Check vocabulary recognition through Wordwall game scores. Evaluate pronunciation and usage during production activities.",
      homeworkIdeas: [
        "Create a mini-project related to the unit theme",
        "Research and present additional vocabulary in the topic area",
        "Practice using the vocabulary in writing activities"
      ]
    },
    {
      id: `book6-unit${unitId}-grammar-lesson`,
      title: `${unitTitle} - Language Functions`,
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Understand and use key grammar structures",
        "Apply language functions in real-life situations",
        "Build confidence in English communication"
      ],
      materials: [
        `Visual English Book 6 Unit ${unitId} slides`,
        "Grammar practice worksheets",
        "Video materials and audio resources"
      ],
      steps: [
        {
          title: "Review",
          duration: "5-10 minutes",
          description: "Quick recap of previous vocabulary",
          instructions: ["Use quick activities to review key vocabulary", "Connect vocabulary to new grammar focus"]
        },
        {
          title: "Grammar Presentation",
          duration: "15 minutes",
          description: "Introduce grammar point with examples",
          materials: ["Structure examples on board/slides", "Grammar reference handout"],
          instructions: ["Present target structure", "Show examples in context", "Highlight form and usage"]
        },
        {
          title: "Guided Practice",
          duration: "15 minutes",
          description: "Complete structured exercises",
          materials: ["Grammar worksheets", "Pair activity cards"],
          instructions: ["Demonstrate example exercises", "Have students complete practice activities", "Check answers as a class"]
        },
        {
          title: "Free Practice",
          duration: "10-15 minutes",
          description: "Open-ended application activities",
          instructions: ["Set up communicative activities", "Have students create their own examples", "Provide feedback on usage"]
        }
      ],
      assessmentTips: "Check accuracy in worksheet completion. Listen for correct grammar usage during speaking activities. Have students self-assess confidence level with new structures.",
      homeworkIdeas: [
        "Create your own examples using the target structure",
        "Extend the dialogue using additional vocabulary",
        "Record yourself practicing the language functions"
      ]
    }
  ];
}
