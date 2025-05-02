// This file contains resources for Book 5, Unit 14 (Movie Time themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit14Resources = [
  {
    title: "Movie Film Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/16860eaee1aa469aa6996f948b209bc0",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/16860eaee1aa469aa6996f948b209bc0?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Movie Film Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/a543f23f1b5e415089b2a6f65e480564",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a543f23f1b5e415089b2a6f65e480564?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Movie Film Vocabulary Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/cc0eec5bcefa4ee39f100a30f8cc9695",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/cc0eec5bcefa4ee39f100a30f8cc9695?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Food at the Cinema Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/6c83347ffec441628a9cc5da15ad4861",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6c83347ffec441628a9cc5da15ad4861?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Movie Genres Vocabulary Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/FTuQIwl7j3k",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FTuQIwl7j3k?si=wh3So_Qj8Hqk6TL3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Guess the Film Soundtrack",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/p57KyLojoHU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/p57KyLojoHU?si=g_6AyW2jlsRI9DgC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Guess the Film Genre Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/Bp07u0YrH4Y",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Bp07u0YrH4Y?si=ufzMpcalPer6eRCn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Movie Vocabulary and Genres
export const movieVocabularyLessonPlan = {
  id: "movie-vocabulary-lesson",
  title: "Movie Vocabulary and Genres",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to films, movies, and cinema",
    "Recognize and describe different movie genres",
    "Develop language for discussing films and preferences",
    "Build speaking skills through movie-themed conversations"
  ],
  materials: [
    "Visual English Book 5, Unit 14 slides",
    "Movie Film Vocabulary Games",
    "Movie Genres Vocabulary Video",
    "Guess the Film Genre Video",
    "Film genre flashcards",
    "Movie poster examples"
  ],
  steps: [
    {
      title: "Warm-up: Movie Preferences",
      duration: "5 minutes",
      description: "Activate knowledge about movies and personal preferences",
      instructions: [
        "Ask students: 'What was the last movie you watched? Did you enjoy it?'",
        "Create a list of movie types mentioned by students",
        "Take a quick poll of students' favorite types of movies",
        "Introduce the topic of movie vocabulary and genres"
      ]
    },
    {
      title: "Movie Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to films and cinema",
      materials: ["Visual English Book 5, Unit 14 slides"],
      instructions: [
        "Present film industry vocabulary: actor, director, producer, screenplay, etc.",
        "Introduce movie elements: plot, character, setting, special effects, etc.",
        "Teach cinema vocabulary: screen, ticket, seat, popcorn, etc.",
        "Review film-related verbs: act, direct, produce, release, etc.",
        "Have students practice using the vocabulary in simple sentences"
      ]
    },
    {
      title: "Video: Movie Genres",
      duration: "10 minutes",
      description: "Watch videos about movie genres and characteristics",
      materials: ["Movie Genres Vocabulary Video", "Guess the Film Genre Video"],
      instructions: [
        "Play the Movie Genres Vocabulary Video",
        "Ask students to note different genres mentioned",
        "After watching, list the genres on the board (action, comedy, horror, etc.)",
        "Follow with the Guess the Film Genre Video as a quick game",
        "Pause before answers are revealed to allow students to guess",
        "Discuss the characteristics that define each genre"
      ]
    },
    {
      title: "Interactive Games: Movie Vocabulary",
      duration: "10 minutes",
      description: "Practice movie vocabulary through digital games",
      materials: ["Movie Film Vocabulary Games"],
      instructions: [
        "Have students play the Movie Film Vocabulary Games",
        "For each vocabulary word, ask students to relate it to a movie they know",
        "Example: 'Special effects? Avatar has amazing special effects.'",
        "Review any challenging vocabulary",
        "Discuss how different genres emphasize different film elements"
      ]
    },
    {
      title: "Genre Classification Activity",
      duration: "10 minutes",
      description: "Practice identifying and describing movie genres",
      materials: ["Film genre flashcards", "Movie poster examples"],
      instructions: [
        "Divide students into small groups",
        "Distribute movie poster examples from different genres",
        "Groups classify the movies by genre and explain their reasoning",
        "Introduce language for describing genres:",
        "- 'Action movies often have...'",
        "- 'In romantic comedies, the characters usually...'",
        "- 'Horror films make viewers feel...'",
        "Groups create a short description of what defines a particular genre",
        "Each group presents their genre description to the class",
        "Class tries to guess which genre is being described"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of movie vocabulary, ability to identify and describe different genres, and participation in the genre classification activity.",
  homeworkIdeas: [
    "Write a paragraph recommending a favorite movie, using at least 10 movie vocabulary words", 
    "Create a mini movie poster for an imaginary film, including genre, title, and brief description",
    "Research an international film and prepare a short presentation about it"
  ],
  additionalResources: [
    {
      title: "ESL Movie Vocabulary",
      url: "https://www.eslflow.com/movies.html"
    },
    {
      title: "Film Genre Guide",
      url: "https://www.filmsite.org/genres.html"
    }
  ]
};

// Second lesson plan for Unit 14: Movie Reviews and Opinions
export const movieReviewsLessonPlan = {
  id: "movie-reviews-lesson",
  title: "Movie Reviews and Opinions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn language for expressing opinions about films",
    "Practice writing and delivering short movie reviews",
    "Develop critical thinking skills through film analysis",
    "Build confidence in discussing media in English"
  ],
  materials: [
    "Visual English Book 5, Unit 14 slides",
    "Food at the Cinema Game",
    "Guess the Film Soundtrack",
    "Sample movie reviews",
    "Movie review worksheet",
    "Star rating cards (1-5 stars)"
  ],
  steps: [
    {
      title: "Warm-up: Cinema Experience",
      duration: "5 minutes",
      description: "Activate knowledge about visiting the cinema",
      instructions: [
        "Ask students: 'Do you prefer watching movies at home or at the cinema? Why?'",
        "Discuss what makes the cinema experience special",
        "Talk about cinema snacks and preferences",
        "Introduce vocabulary for the cinema-going experience"
      ]
    },
    {
      title: "Cinema Vocabulary and Game",
      duration: "10 minutes",
      description: "Learn vocabulary related to the cinema experience",
      materials: ["Visual English Book 5, Unit 14 slides", "Food at the Cinema Game"],
      instructions: [
        "Present cinema vocabulary: ticket counter, concession stand, aisle, row, etc.",
        "Discuss cinema food vocabulary: popcorn, nachos, soft drink, candy, etc.",
        "Have students play the Food at the Cinema Game",
        "Discuss cinema etiquette and phrases: 'Please be quiet', 'Turn off your phone', etc.",
        "Role-play brief cinema scenarios (buying tickets, ordering food)"
      ]
    },
    {
      title: "Movie Review Language",
      duration: "10 minutes",
      description: "Learn expressions for giving opinions about films",
      materials: ["Visual English Book 5, Unit 14 slides", "Sample movie reviews"],
      instructions: [
        "Present opinion vocabulary: brilliant, disappointing, hilarious, terrifying, etc.",
        "Introduce review phrases: 'The best part was...', 'I was impressed by...', 'It wasn't as good as...'",
        "Show examples of short movie reviews using this language",
        "Discuss rating systems (stars, thumbs up/down, scores out of 10)",
        "Have students match opinion words to appropriate genres",
        "Example: 'suspenseful' for thriller, 'heartwarming' for family film"
      ]
    },
    {
      title: "Interactive Activity: Film Soundtracks",
      duration: "10 minutes",
      description: "Recognize famous film music and discuss its impact",
      materials: ["Guess the Film Soundtrack"],
      instructions: [
        "Play the Guess the Film Soundtrack video",
        "Students try to identify the films from their music",
        "Discuss how music contributes to a film's atmosphere",
        "Introduce vocabulary related to film music: soundtrack, score, theme song, etc.",
        "Have students describe the emotions different soundtracks evoke"
      ]
    },
    {
      title: "Movie Review Writing and Presentation",
      duration: "10 minutes",
      description: "Create and share short film reviews",
      materials: ["Movie review worksheet", "Star rating cards"],
      instructions: [
        "Distribute movie review worksheets with prompts:",
        "- Title and genre of a film you've seen",
        "- Brief plot summary (without spoilers)",
        "- What you liked/disliked about it",
        "- Star rating (1-5)",
        "- Recommendation: who would enjoy this film?",
        "Students complete the worksheet for a film of their choice",
        "Pairs exchange reviews and ask follow-up questions",
        "Volunteers present their reviews to the class",
        "Class votes on which reviews make them want to see the films"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their use of movie opinion vocabulary, ability to structure a coherent review, and confidence in presenting their opinions to the class.",
  homeworkIdeas: [
    "Write a full movie review (150-200 words) for a film you've recently watched", 
    "Compare two films from the same genre, explaining which is better and why",
    "Create a 'Top 5 Movies' list with brief explanations for each choice"
  ],
  additionalResources: [
    {
      title: "ESL Movie Review Activities",
      url: "https://www.teach-this.com/esl-resources/movies"
    },
    {
      title: "Film Review Writing Guide",
      url: "https://www.filmclub.org/resources/11-writing-a-film-review"
    }
  ]
};
