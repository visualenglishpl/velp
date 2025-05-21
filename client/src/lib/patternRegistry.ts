/**
 * Pattern Registry
 * 
 * This file centralizes all pattern definitions for the Visual English platform.
 * Patterns are organized by category and book/unit for easier maintenance.
 */
import { PatternCollection } from './patternSystem';

// Book 1 Unit 2 - School Objects
const book1Unit2SchoolObjects: PatternCollection = {
  id: 'book1-unit2-school-objects',
  description: 'Patterns for Book 1 Unit 2 school objects',
  patterns: [
    // Pen comparisons - improved patterns with more specific matching
    {
      id: 'girl-boy-pen',
      regex: /girl.+pen|girl.*pen|pen.*girl/i,
      question: 'Is it a girl or boy pen?',
      answer: 'It is a girl pen.',
      category: 'school-objects'
    },
    {
      id: 'boy-pen',
      regex: /boy.+pen|boy.*pen|pen.*boy/i,
      question: 'Is it a girl or boy pen?',
      answer: 'It is a boy pen.',
      category: 'school-objects'
    },
    {
      id: 'hotdog-pen',
      regex: /hotdog.+pen|hotdog.*pen|pen.*hotdog/i,
      question: 'Is it a hotdog or hamburger pen?',
      answer: 'It is a hotdog pen.',
      category: 'school-objects'
    },
    {
      id: 'hamburger-pen',
      regex: /hamburger.+pen|hamburger.*pen|pen.*hamburger/i,
      question: 'Is it a hamburger or hotdog pen?',
      answer: 'It is a hamburger pen.',
      category: 'school-objects'
    },
    {
      id: 'lion-pen',
      regex: /lion.+pen|lion.*pen|pen.*lion/i,
      question: 'Is it a lion or tiger pen?',
      answer: 'It is a lion pen.',
      category: 'school-objects'
    },
    {
      id: 'tiger-pen',
      regex: /tiger.+pen|tiger.*pen|pen.*tiger/i,
      question: 'Is it a tiger or lion pen?',
      answer: 'It is a tiger pen.',
      category: 'school-objects'
    },
    {
      id: 'dog-pen',
      regex: /dog.+pen|dog.*pen|pen.*dog/i,
      question: 'Is it a dog or cat pen?',
      answer: 'It is a dog pen.',
      category: 'school-objects'
    },
    {
      id: 'cat-pen',
      regex: /cat.+pen|cat.*pen|pen.*cat/i,
      question: 'Is it a cat or dog pen?',
      answer: 'It is a cat pen.',
      category: 'school-objects'
    },
    
    // Pencil case comparisons
    {
      id: 'fish-snake-pencil-case',
      regex: /fish.+snake.+pencil.?case|snake.+fish.+pencil.?case/i,
      question: 'Is it a fish or snake pencil case?',
      answer: 'It is a fish pencil case.',
      category: 'school-objects'
    },
    {
      id: 'snake-fish-pencil-case',
      regex: /snake.+fish.+pencil.?case/i,
      question: 'Is it a snake or fish pencil case?',
      answer: 'It is a snake pencil case.',
      category: 'school-objects'
    },
    {
      id: 'panda-koala-pencil-case',
      regex: /panda.+koala.+pencil.?case|koala.+panda.+pencil.?case/i,
      question: 'Is it a panda or koala pencil case?',
      answer: 'It is a panda pencil case.',
      category: 'school-objects'
    },
    {
      id: 'koala-panda-pencil-case',
      regex: /koala.+panda.+pencil.?case/i,
      question: 'Is it a koala or panda pencil case?',
      answer: 'It is a koala pencil case.',
      category: 'school-objects'
    },
    
    // Generic school objects
    {
      id: 'pencil-pattern',
      regex: /pencil(?!\s*case)/i,
      question: 'What is it?',
      answer: 'It is a pencil.',
      category: 'school-objects'
    },
    {
      id: 'pencil-case-pattern',
      regex: /pencil\s*case/i,
      question: 'What is it?',
      answer: 'It is a pencil case.',
      category: 'school-objects'
    },
    {
      id: 'pen-pattern',
      regex: /\bpen\b/i,
      question: 'What is it?',
      answer: 'It is a pen.',
      category: 'school-objects'
    },
    {
      id: 'book-pattern',
      regex: /\bbook\b/i,
      question: 'What is it?',
      answer: 'It is a book.',
      category: 'school-objects'
    },
    {
      id: 'notebook-pattern',
      regex: /\bnotebook\b/i,
      question: 'What is it?',
      answer: 'It is a notebook.',
      category: 'school-objects'
    },
    {
      id: 'eraser-pattern',
      regex: /\beraser\b/i,
      question: 'What is it?',
      answer: 'It is an eraser.',
      category: 'school-objects'
    },
    {
      id: 'ruler-pattern',
      regex: /\bruler\b/i,
      question: 'What is it?',
      answer: 'It is a ruler.',
      category: 'school-objects'
    },
    {
      id: 'scissors-pattern',
      regex: /\bscissors\b/i,
      question: 'What is it?',
      answer: 'It is a pair of scissors.',
      category: 'school-objects'
    },
    {
      id: 'sharpener-pattern',
      regex: /\bsharpener\b/i,
      question: 'What is it?',
      answer: 'It is a sharpener.',
      category: 'school-objects'
    }
  ]
};

// Book 1 Unit 3 - Fruits and Vegetables
const book1Unit3FruitsVegetables: PatternCollection = {
  id: 'book1-unit3-fruits-vegetables',
  description: 'Patterns for Book 1 Unit 3 fruits and vegetables',
  patterns: [
    // Fruits
    {
      id: 'apple-pattern',
      regex: /\bapple\b/i,
      question: 'What is it?',
      answer: 'It is an apple.',
      category: 'fruits'
    },
    {
      id: 'banana-pattern',
      regex: /\bbanana\b/i,
      question: 'What is it?',
      answer: 'It is a banana.',
      category: 'fruits'
    },
    {
      id: 'orange-pattern',
      regex: /\borange\b/i,
      question: 'What is it?',
      answer: 'It is an orange.',
      category: 'fruits'
    },
    {
      id: 'pear-pattern',
      regex: /\bpear\b/i,
      question: 'What is it?',
      answer: 'It is a pear.',
      category: 'fruits'
    },
    
    // Vegetables
    {
      id: 'carrot-pattern',
      regex: /\bcarrot\b/i,
      question: 'What is it?',
      answer: 'It is a carrot.',
      category: 'vegetables'
    },
    {
      id: 'potato-pattern',
      regex: /\bpotato\b/i,
      question: 'What is it?',
      answer: 'It is a potato.',
      category: 'vegetables'
    },
    {
      id: 'tomato-pattern',
      regex: /\btomato\b/i,
      question: 'What is it?',
      answer: 'It is a tomato.',
      category: 'vegetables'
    }
  ]
};

// Book 1 Unit 1 - Good Morning, Good Afternoon, Good Evening, Good Night
const book1Unit1TimeOfDay: PatternCollection = {
  id: 'book1-unit1-time-of-day',
  description: 'Patterns for Book 1 Unit 1 time of day greetings and activities',
  patterns: [
    {
      id: 'good-morning-greeting',
      regex: /good\s*morning|morning\s*greeting/i,
      question: 'What do you say in the morning?',
      answer: 'I say "Good Morning" in the morning.',
      category: 'greetings'
    },
    {
      id: 'morning-activities',
      regex: /breakfast|get\s*up|morning\s*activities/i,
      question: 'What time do you eat breakfast?',
      answer: 'I eat breakfast in the morning.',
      category: 'daily-routine'
    },
    {
      id: 'good-afternoon-greeting',
      regex: /good\s*afternoon|afternoon\s*greeting/i,
      question: 'What do you say in the afternoon?',
      answer: 'I say "Good Afternoon" in the afternoon.',
      category: 'greetings'
    },
    {
      id: 'afternoon-activities',
      regex: /lunch|afternoon\s*activities/i,
      question: 'What time do you eat lunch?',
      answer: 'I eat lunch in the afternoon.',
      category: 'daily-routine'
    },
    {
      id: 'good-evening-greeting',
      regex: /good\s*evening|evening\s*greeting/i,
      question: 'What do you say in the evening?',
      answer: 'I say "Good Evening" in the evening.',
      category: 'greetings'
    },
    {
      id: 'evening-activities',
      regex: /dinner|evening\s*activities/i,
      question: 'What time do you eat dinner?',
      answer: 'I eat dinner in the evening.',
      category: 'daily-routine'
    },
    {
      id: 'good-night-greeting',
      regex: /good\s*night|night\s*greeting/i,
      question: 'What do you say at night?',
      answer: 'I say "Good Night" at night.',
      category: 'greetings'
    },
    {
      id: 'night-activities',
      regex: /sleep|night\s*activities/i,
      question: 'What time do you go to sleep?',
      answer: 'I go to sleep at night.',
      category: 'daily-routine'
    }
  ]
};

// Additional Book 1 Unit 2 patterns for school supplies
const book1Unit2AdditionalSupplies: PatternCollection = {
  id: 'book1-unit2-additional-supplies',
  description: 'Additional patterns for Book 1 Unit 2 school supplies',
  patterns: [
    // Notebooks
    {
      id: 'notebook-pattern',
      regex: /notebook/i,
      question: 'What is it?',
      answer: 'It is a notebook.',
      category: 'school-objects'
    },
    {
      id: 'banana-apple-book',
      regex: /banana.+apple.+book|apple.+banana.+book/i,
      question: 'Is it a banana or apple book?',
      answer: 'It is a banana book.',
      category: 'school-objects'
    },
    {
      id: 'apple-banana-book',
      regex: /apple.+banana.+book/i,
      question: 'Is it an apple or banana book?',
      answer: 'It is an apple book.',
      category: 'school-objects'
    },
    {
      id: 'lion-crocodile-notebook',
      regex: /lion.+crocodile.+notebook|crocodile.+lion.+notebook/i,
      question: 'Is it a lion or crocodile notebook?',
      answer: 'It is a lion notebook.',
      category: 'school-objects'
    },
    {
      id: 'crocodile-lion-notebook',
      regex: /crocodile.+lion.+notebook/i,
      question: 'Is it a crocodile or lion notebook?',
      answer: 'It is a crocodile notebook.',
      category: 'school-objects'
    },
    {
      id: 'pizza-hamburger-notebook',
      regex: /pizza.+hamburger.+notebook|hamburger.+pizza.+notebook/i,
      question: 'Is it a pizza or hamburger notebook?',
      answer: 'It is a pizza notebook.',
      category: 'school-objects'
    },
    {
      id: 'hamburger-pizza-notebook',
      regex: /hamburger.+pizza.+notebook/i,
      question: 'Is it a hamburger or pizza notebook?',
      answer: 'It is a hamburger notebook.',
      category: 'school-objects'
    },
    
    // Erasers
    {
      id: 'eraser-pattern',
      regex: /eraser/i,
      question: 'What is it?',
      answer: 'It is an eraser.',
      category: 'school-objects'
    },
    {
      id: 'cat-dog-eraser',
      regex: /cat.+dog.+eraser|dog.+cat.+eraser/i,
      question: 'Is it a cat or dog eraser?',
      answer: 'It is a cat eraser.',
      category: 'school-objects'
    },
    {
      id: 'dog-cat-eraser',
      regex: /dog.+cat.+eraser/i,
      question: 'Is it a dog or cat eraser?',
      answer: 'It is a dog eraser.',
      category: 'school-objects'
    },
    {
      id: 'happy-sad-eraser',
      regex: /happy.+sad.+eraser|sad.+happy.+eraser/i,
      question: 'Is it a happy or sad eraser?',
      answer: 'It is a happy eraser.',
      category: 'school-objects'
    },
    {
      id: 'sad-happy-eraser',
      regex: /sad.+happy.+eraser/i,
      question: 'Is it a sad or happy eraser?',
      answer: 'It is a sad eraser.',
      category: 'school-objects'
    },
    {
      id: 'icecream-cake-eraser',
      regex: /ice\s*cream.+cake.+eraser|cake.+ice\s*cream.+eraser/i,
      question: 'Is it an ice cream or cake eraser?',
      answer: 'It is an ice cream eraser.',
      category: 'school-objects'
    },
    {
      id: 'cake-icecream-eraser',
      regex: /cake.+ice\s*cream.+eraser/i,
      question: 'Is it a cake or ice cream eraser?',
      answer: 'It is a cake eraser.',
      category: 'school-objects'
    },
    
    // Glue
    {
      id: 'glue-pattern',
      regex: /\bglue\b/i,
      question: 'What is it?',
      answer: 'It is glue.',
      category: 'school-objects'
    },
    {
      id: 'glue-stick-pattern',
      regex: /glue\s*stick/i,
      question: 'What is it?',
      answer: 'It is a glue stick.',
      category: 'school-objects'
    },
    {
      id: 'normal-slime-glue',
      regex: /normal.+slime.+glue|slime.+normal.+glue/i,
      question: 'Is it normal or slime glue?',
      answer: 'It is normal glue.',
      category: 'school-objects'
    },
    {
      id: 'slime-normal-glue',
      regex: /slime.+normal.+glue/i,
      question: 'Is it slime or normal glue?',
      answer: 'It is slime glue.',
      category: 'school-objects'
    }
  ]
};

// Book 1 Unit 4 - Colors
const book1Unit4Colors: PatternCollection = {
  id: 'book1-unit4-colors',
  description: 'Patterns for Book 1 Unit 4 colors',
  patterns: [
    {
      id: 'what-color-is-it',
      regex: /what\s*color/i,
      question: 'What color is it?',
      answer: 'It is red.',
      category: 'colors'
    },
    {
      id: 'is-it-red',
      regex: /\bred\b/i,
      question: 'Is it red?',
      answer: 'Yes, it is red.',
      category: 'colors'
    },
    {
      id: 'is-it-blue',
      regex: /\bblue\b/i,
      question: 'Is it blue?',
      answer: 'Yes, it is blue.',
      category: 'colors'
    },
    {
      id: 'is-it-green',
      regex: /\bgreen\b/i,
      question: 'Is it green?',
      answer: 'Yes, it is green.',
      category: 'colors'
    },
    {
      id: 'is-it-yellow',
      regex: /\byellow\b/i,
      question: 'Is it yellow?',
      answer: 'Yes, it is yellow.',
      category: 'colors'
    },
    {
      id: 'is-it-orange',
      regex: /\borange\b/i,
      question: 'Is it orange?',
      answer: 'Yes, it is orange.',
      category: 'colors'
    },
    {
      id: 'is-it-purple',
      regex: /\bpurple\b/i,
      question: 'Is it purple?',
      answer: 'Yes, it is purple.',
      category: 'colors'
    },
    {
      id: 'is-it-pink',
      regex: /\bpink\b/i,
      question: 'Is it pink?',
      answer: 'Yes, it is pink.',
      category: 'colors'
    },
    {
      id: 'is-it-black',
      regex: /\bblack\b/i,
      question: 'Is it black?',
      answer: 'Yes, it is black.',
      category: 'colors'
    },
    {
      id: 'is-it-white',
      regex: /\bwhite\b/i,
      question: 'Is it white?',
      answer: 'Yes, it is white.',
      category: 'colors'
    },
    {
      id: 'is-it-brown',
      regex: /\bbrown\b/i,
      question: 'Is it brown?',
      answer: 'Yes, it is brown.',
      category: 'colors'
    },
    {
      id: 'is-it-grey',
      regex: /\bgr[ae]y\b/i,
      question: 'Is it grey?',
      answer: 'Yes, it is grey.',
      category: 'colors'
    }
  ]
};

// Book 1 Unit 5 - My Family
const book1Unit5Family: PatternCollection = {
  id: 'book1-unit5-family',
  description: 'Patterns for Book 1 Unit 5 family members',
  patterns: [
    {
      id: 'who-is-this-mother',
      regex: /mother|mum|mom/i,
      question: 'Who is this?',
      answer: 'This is my mother.',
      category: 'family'
    },
    {
      id: 'who-is-this-father',
      regex: /father|dad/i,
      question: 'Who is this?',
      answer: 'This is my father.',
      category: 'family'
    },
    {
      id: 'who-is-this-sister',
      regex: /\bsister\b/i,
      question: 'Who is this?',
      answer: 'This is my sister.',
      category: 'family'
    },
    {
      id: 'who-is-this-brother',
      regex: /\bbrother\b/i,
      question: 'Who is this?',
      answer: 'This is my brother.',
      category: 'family'
    },
    {
      id: 'who-is-this-grandmother',
      regex: /grandmother|grandma/i,
      question: 'Who is this?',
      answer: 'This is my grandmother.',
      category: 'family'
    },
    {
      id: 'who-is-this-grandfather',
      regex: /grandfather|grandpa/i,
      question: 'Who is this?',
      answer: 'This is my grandfather.',
      category: 'family'
    },
    {
      id: 'who-is-this-aunt',
      regex: /\baunt\b/i,
      question: 'Who is this?',
      answer: 'This is my aunt.',
      category: 'family'
    },
    {
      id: 'who-is-this-uncle',
      regex: /\buncle\b/i,
      question: 'Who is this?',
      answer: 'This is my uncle.',
      category: 'family'
    },
    {
      id: 'who-is-this-cousin',
      regex: /\bcousin\b/i,
      question: 'Who is this?',
      answer: 'This is my cousin.',
      category: 'family'
    },
    {
      id: 'this-is-my-pattern',
      regex: /this\s*is\s*my/i,
      question: 'Who is this?',
      answer: 'This is my family.',
      category: 'family'
    }
  ]
};

// Book 1 Unit 6 - My Favorite Color
const book1Unit6FavoriteColor: PatternCollection = {
  id: 'book1-unit6-favorite-color',
  description: 'Patterns for Book 1 Unit 6 favorite colors',
  patterns: [
    {
      id: 'favorite-color-general',
      regex: /favorite\s*colou?r/i,
      question: 'What is your favorite color?',
      answer: 'My favorite color is blue.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-red',
      regex: /favorite\s*colou?r\s*red/i,
      question: 'Is your favorite color red?',
      answer: 'Yes, my favorite color is red.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-blue',
      regex: /favorite\s*colou?r\s*blue/i,
      question: 'Is your favorite color blue?',
      answer: 'Yes, my favorite color is blue.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-green',
      regex: /favorite\s*colou?r\s*green/i,
      question: 'Is your favorite color green?',
      answer: 'Yes, my favorite color is green.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-yellow',
      regex: /favorite\s*colou?r\s*yellow/i,
      question: 'Is your favorite color yellow?',
      answer: 'Yes, my favorite color is yellow.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-orange',
      regex: /favorite\s*colou?r\s*orange/i,
      question: 'Is your favorite color orange?',
      answer: 'Yes, my favorite color is orange.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-purple',
      regex: /favorite\s*colou?r\s*purple/i,
      question: 'Is your favorite color purple?',
      answer: 'Yes, my favorite color is purple.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-pink',
      regex: /favorite\s*colou?r\s*pink/i,
      question: 'Is your favorite color pink?',
      answer: 'Yes, my favorite color is pink.',
      category: 'favorite-color'
    },
    {
      id: 'is-your-favorite-color-black',
      regex: /favorite\s*colou?r\s*black/i,
      question: 'Is your favorite color black?',
      answer: 'Yes, my favorite color is black.',
      category: 'favorite-color'
    }
  ]
};

// Book 1 Unit 7 - Animals
const book1Unit7Animals: PatternCollection = {
  id: 'book1-unit7-animals',
  description: 'Patterns for Book 1 Unit 7 animals',
  patterns: [
    {
      id: 'what-is-it-dog',
      regex: /\bdog\b/i,
      question: 'What is it?',
      answer: 'It is a dog.',
      category: 'animals'
    },
    {
      id: 'what-is-it-cat',
      regex: /\bcat\b/i,
      question: 'What is it?',
      answer: 'It is a cat.',
      category: 'animals'
    },
    {
      id: 'what-is-it-bird',
      regex: /\bbird\b/i,
      question: 'What is it?',
      answer: 'It is a bird.',
      category: 'animals'
    },
    {
      id: 'what-is-it-fish',
      regex: /\bfish\b/i,
      question: 'What is it?',
      answer: 'It is a fish.',
      category: 'animals'
    },
    {
      id: 'what-is-it-hamster',
      regex: /\bhamster\b/i,
      question: 'What is it?',
      answer: 'It is a hamster.',
      category: 'animals'
    },
    {
      id: 'what-is-it-rabbit',
      regex: /\brabbit\b/i,
      question: 'What is it?',
      answer: 'It is a rabbit.',
      category: 'animals'
    },
    {
      id: 'what-is-it-turtle',
      regex: /\bturtle\b/i,
      question: 'What is it?',
      answer: 'It is a turtle.',
      category: 'animals'
    },
    {
      id: 'what-is-it-guinea-pig',
      regex: /guinea\s*pig/i,
      question: 'What is it?',
      answer: 'It is a guinea pig.',
      category: 'animals'
    },
    {
      id: 'do-you-have-a-pet',
      regex: /do\s*you\s*have\s*a\s*pet/i,
      question: 'Do you have a pet?',
      answer: 'Yes, I have a dog.',
      category: 'animals'
    },
    {
      id: 'what-pet-do-you-have',
      regex: /what\s*pet/i,
      question: 'What pet do you have?',
      answer: 'I have a cat.',
      category: 'animals'
    },
    {
      id: 'is-it-big-or-small',
      regex: /big\s*or\s*small/i,
      question: 'Is it big or small?',
      answer: 'It is small.',
      category: 'animals'
    },
    {
      id: 'what-color-is-your-pet',
      regex: /what\s*colou?r\s*is\s*your\s*pet/i,
      question: 'What color is your pet?',
      answer: 'My pet is brown.',
      category: 'animals'
    }
  ]
};

// Book 4 Unit 1 - Nationalities
const book4Unit1Nationalities: PatternCollection = {
  id: 'book4-unit1-nationalities',
  description: 'Patterns for Book 4 Unit 1 nationalities and countries',
  patterns: [
    {
      id: 'what-is-the-name-of-this-country',
      regex: /country|poland|britain|australia|usa|scotland|england|wales|northern ireland/i,
      question: 'What is the name of this country?',
      answer: 'This country is Poland.',
      category: 'nationalities'
    },
    {
      id: 'where-is-this-flag-from',
      regex: /flag|poland|britain|australia|usa|scotland|england|wales|northern ireland/i,
      question: 'Where is this flag from?',
      answer: 'This flag is from Poland.',
      category: 'nationalities'
    },
    {
      id: 'what-is-his-nationality',
      regex: /nationality|polish|british|american|scottish|english|welsh|northern irish|australian/i,
      question: 'What is his nationality?',
      answer: 'His nationality is Polish.',
      category: 'nationalities'
    },
    {
      id: 'where-are-they-from',
      regex: /they.*from|people.*from/i,
      question: 'Where are they from?',
      answer: 'They are from Poland.',
      category: 'nationalities'
    },
    {
      id: 'where-is-he-from',
      regex: /he.*from|man.*from/i,
      question: 'Where is he from?',
      answer: 'He is from Britain.',
      category: 'nationalities'
    },
    {
      id: 'what-language-does-she-speak',
      regex: /language|speak|polish|english|welsh/i,
      question: 'What language does she speak?',
      answer: 'She speaks Polish.',
      category: 'nationalities'
    },
    {
      id: 'where-is-this-passport-from',
      regex: /passport/i,
      question: 'Where is this passport from?',
      answer: 'This passport is from Poland.',
      category: 'nationalities'
    },
    {
      id: 'where-is-this-food-from',
      regex: /food.*from|meal.*from/i,
      question: 'Where is this food from?',
      answer: 'This food is from Britain.',
      category: 'nationalities'
    },
    {
      id: 'what-is-the-capital',
      regex: /capital|warsaw|london|canberra|washington|belfast|cardiff/i,
      question: 'What is the capital of England?',
      answer: 'The capital of England is London.',
      category: 'nationalities'
    },
    {
      id: 'where-is-this-building-from',
      regex: /building.*from|structure.*from/i,
      question: 'Where is this building from?',
      answer: 'This building is from England.',
      category: 'nationalities'
    },
    {
      id: 'where-is-this-money-from',
      regex: /money|currency|pound|dollar|zloty/i,
      question: 'Where is this money from?',
      answer: 'This money is from the UK.',
      category: 'nationalities'
    }
  ]
};

// Book 4 Unit 2 - Technology
const book4Unit2Technology: PatternCollection = {
  id: 'book4-unit2-technology',
  description: 'Patterns for Book 4 Unit 2 gadgets and technology',
  patterns: [
    {
      id: 'what-is-this-phone',
      regex: /phone|mobile|smartphone/i,
      question: 'What is this?',
      answer: 'This is a phone.',
      category: 'technology'
    },
    {
      id: 'do-you-have-a-phone',
      regex: /do.*have.*phone|have.*phone/i,
      question: 'Do you have a phone?',
      answer: 'Yes, I do.',
      category: 'technology'
    },
    {
      id: 'what-is-this-gadget',
      regex: /gadget|device/i,
      question: 'What is this gadget?',
      answer: 'This is a mobile phone.',
      category: 'technology'
    },
    {
      id: 'are-phones-cheap-or-expensive',
      regex: /cheap.*expensive|cost|price/i,
      question: 'Are mobile phones cheap or expensive?',
      answer: 'Mobile phones are expensive.',
      category: 'technology'
    },
    {
      id: 'what-is-this-charger',
      regex: /charger|charging/i,
      question: 'What is this?',
      answer: 'This is a charger.',
      category: 'technology'
    },
    {
      id: 'what-are-these-headphones',
      regex: /headphones|earphones|earbuds/i,
      question: 'What are these?',
      answer: 'These are headphones.',
      category: 'technology'
    },
    {
      id: 'do-you-have-speakers',
      regex: /speakers|sound|jbl/i,
      question: 'Do you have speakers?',
      answer: 'Yes, I do.',
      category: 'technology'
    },
    {
      id: 'what-is-the-person-doing',
      regex: /messaging|texting|typing/i,
      question: 'What is the person doing?',
      answer: 'The person is messaging or texting.',
      category: 'technology'
    }
  ]
};

// Book 4 Unit 3 - Home Sweet Home
const book4Unit3Home: PatternCollection = {
  id: 'book4-unit3-home',
  description: 'Patterns for Book 4 Unit 3 home types and rooms',
  patterns: [
    {
      id: 'what-type-of-house-is-this',
      regex: /house|flat|apartment|bungalow|cottage|mansion/i,
      question: 'What type of house is this?',
      answer: 'This is a detached house.',
      category: 'home'
    },
    {
      id: 'is-this-a-house-or-flat',
      regex: /house.*flat|flat.*house|apartment.*house|house.*apartment/i,
      question: 'Is this a house or a flat?',
      answer: 'This is a house.',
      category: 'home'
    },
    {
      id: 'do-you-live-in-a-house-or-flat',
      regex: /do.*live|where.*live|live.*house|live.*flat/i,
      question: 'Do you live in a house or a flat?',
      answer: 'I live in a house.',
      category: 'home'
    },
    {
      id: 'what-room-is-this',
      regex: /room|bedroom|bathroom|kitchen|living room|dining room/i,
      question: 'What room is this?',
      answer: 'This is a bedroom.',
      category: 'home'
    },
    {
      id: 'how-many-bedrooms-are-there',
      regex: /how many|bedrooms|rooms/i,
      question: 'How many bedrooms are there?',
      answer: 'There are three bedrooms.',
      category: 'home'
    },
    {
      id: 'is-this-room-big-or-small',
      regex: /big.*small|small.*big|size.*room/i,
      question: 'Is this room big or small?',
      answer: 'This room is big.',
      category: 'home'
    },
    {
      id: 'what-can-you-see-in-the-room',
      regex: /what.*see|can.*see|objects.*room/i,
      question: 'What can you see in the room?',
      answer: 'I can see a bed, a wardrobe, and a desk.',
      category: 'home'
    },
    {
      id: 'what-furniture-is-in-the-room',
      regex: /furniture|sofa|table|chair|bed|wardrobe/i,
      question: 'What furniture is in the room?',
      answer: 'There is a sofa, a coffee table, and a TV in the room.',
      category: 'home'
    },
    {
      id: 'where-is-the-object',
      regex: /where.*is|location|position|preposition/i,
      question: 'Where is the lamp?',
      answer: 'The lamp is on the table.',
      category: 'home'
    }
  ]
};

// Book 4 Unit 4 - Parts of the Body
const book4Unit4Body: PatternCollection = {
  id: 'book4-unit4-body',
  description: 'Patterns for Book 4 Unit 4 parts of the body',
  patterns: [
    {
      id: 'what-part-of-the-body-is-this',
      regex: /head|arm|leg|foot|hand|finger|toe|nose|eye|ear|mouth|shoulder|knee|elbow/i,
      question: 'What part of the body is this?',
      answer: 'This is the head.',
      category: 'body'
    },
    {
      id: 'how-many-body-parts',
      regex: /how many|count|number/i,
      question: 'How many fingers do we have?',
      answer: 'We have ten fingers.',
      category: 'body'
    },
    {
      id: 'where-is-body-part',
      regex: /where.*is|location|position/i,
      question: 'Where is the nose?',
      answer: 'The nose is in the middle of the face.',
      category: 'body'
    },
    {
      id: 'what-do-we-do-with-body-part',
      regex: /what.*do|function|use/i,
      question: 'What do we do with our eyes?',
      answer: 'We use our eyes to see.',
      category: 'body'
    },
    {
      id: 'which-sense-is-associated',
      regex: /sense|smell|taste|touch|hear|see/i,
      question: 'Which sense is associated with the nose?',
      answer: 'The sense of smell is associated with the nose.',
      category: 'body'
    },
    {
      id: 'is-this-part-big-or-small',
      regex: /big.*small|size|large|tiny/i,
      question: 'Is this part of the body big or small?',
      answer: 'This part of the body is small.',
      category: 'body'
    },
    {
      id: 'how-many-parts-on-face',
      regex: /face|facial features/i,
      question: 'How many eyes do we have on our face?',
      answer: 'We have two eyes on our face.',
      category: 'body'
    },
    {
      id: 'what-color-are-the-eyes',
      regex: /color.*eyes|eyes.*color/i,
      question: 'What color are your eyes?',
      answer: 'My eyes are brown.',
      category: 'body'
    }
  ]
};

// Export all pattern collections
export const patternCollections = [
  book1Unit1TimeOfDay,
  book1Unit2SchoolObjects,
  book1Unit2AdditionalSupplies,
  book1Unit3FruitsVegetables,
  book1Unit4Colors,
  book1Unit5Family,
  book1Unit6FavoriteColor,
  book1Unit7Animals,
  book4Unit1Nationalities,
  book4Unit2Technology,
  book4Unit3Home,
  book4Unit4Body
];

// Export individual pattern collections for direct access
export {
  book1Unit1TimeOfDay,
  book1Unit2SchoolObjects,
  book1Unit2AdditionalSupplies,
  book1Unit3FruitsVegetables,
  book1Unit4Colors,
  book1Unit5Family,
  book1Unit6FavoriteColor,
  book1Unit7Animals,
  book4Unit1Nationalities,
  book4Unit2Technology,
  book4Unit3Home,
  book4Unit4Body
};