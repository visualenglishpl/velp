// Test script for Book 1 Unit 2 comparison patterns
import { findPatternMatch } from './client/src/lib/patternSystem.ts';
import { patternCollections } from './client/src/lib/patternRegistry.ts';

// Test filenames
const testFilenames = [
  "01 N A Is it a Girl or Boy Pen.jpg",
  "01 N B Is it a Boy or Girl Pen.gif",
  "01 N C Is it a Hotdog or Hamburger Pen.png",
  "01 N D Is it a Lion or Tiger Pen.jpg",
  "01 N E Is it a Dog or Cat Pen.gif",
  "02 N A Is it a Banana or Apple Book.jpg",
  "02 N B Is it a Girl's or Boy's Notebook.png",
  "03 N A Is it a Fish or Snake Pencil Case.jpg",
  "03 N B Is it a Big or Small Eraser.png",
  "03 N C Is it a Happy or Sad Eraser.gif",
  "03 N D Is it an Ice Cream or Cake Eraser.jpg",
  "04 N A Is it a Metal or Plastic Sharpener.png"
];

// Run tests
console.log("Testing Book 1 Unit 2 Comparison Patterns\n");

testFilenames.forEach(filename => {
  console.log(`Testing filename: "${filename}"`);
  
  const match = findPatternMatch(filename, patternCollections);
  
  if (match) {
    console.log("✅ MATCH FOUND:");
    console.log(`   Question: ${match.question}`);
    console.log(`   Answer: ${match.answer}`);
    console.log(`   Pattern ID: ${match.id}`);
  } else {
    console.log("❌ NO MATCH FOUND");
  }
  
  console.log("------------------------");
});