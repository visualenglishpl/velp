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

// Export all pattern collections
export const patternCollections = [
  book1Unit2SchoolObjects,
  book1Unit3FruitsVegetables
];

// Export individual pattern collections for direct access
export {
  book1Unit2SchoolObjects,
  book1Unit3FruitsVegetables
};