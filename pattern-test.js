// Simple test to verify Book 1 Unit 2 pattern regex
// Run with: node pattern-test.js

// Sample test patterns similar to those we added
const patterns = [
  {
    name: "lego-pen",
    regex: /lego.+pen|pen.*lego|do\s*you\s*have\s*a\s*lego\s*pen/i,
    expected: "Do you have a Lego pen?"
  },
  {
    name: "girl-boy-pen",
    regex: /girl.+pen|girl.*pen|pen.*girl|is\s*it\s*a\s*girl\s*or\s*a?\s*boy\s*pen/i,
    expected: "Is it a girl or boy pen?"
  },
  {
    name: "hotdog-hamburger-pen",
    regex: /hotdog.+pen|hot.?dog.*pen|pen.*hotdog|is\s*it\s*a\s*hot.?dog\s*or\s*a?\s*hamburger\s*pen/i,
    expected: "Is it a hotdog or hamburger pen?"
  },
  {
    name: "boy-girl-pen",
    regex: /boy.+pen|boy.*pen|pen.*boy|is\s*it\s*a\s*boy\s*or\s*a?\s*girl\s*pen/i,
    expected: "Is it a girl or boy pen?"
  },
  {
    name: "dog-cat-pen",
    regex: /dog.+cat.+pen|pen.*dog|is\s*it\s*a\s*dog\s*or\s*a?\s*cat\s*pen/i,
    expected: "Is it a dog or cat pen?"
  },
  {
    name: "cat-dog-pen",
    regex: /cat.+dog.+pen|pen.*cat|is\s*it\s*a\s*cat\s*or\s*a?\s*dog\s*pen/i,
    expected: "Is it a cat or dog pen?"
  },
  {
    name: "cat-dog-eraser",
    regex: /cat.+dog.+eraser|eraser.*cat|is\s*it\s*a\s*cat\s*or\s*a?\s*dog\s*eraser/i,
    expected: "Is it a cat or dog eraser?"
  },
  {
    name: "metal-plastic-sharpener",
    regex: /metal.+plastic.+sharpener|sharpener.*metal|is\s*it\s*a\s*metal\s*or\s*a?\s*plastic\s*sharpener/i,
    expected: "Is it a metal or plastic sharpener?"
  },
  {
    name: "fish-snake-pencil-case",
    regex: /fish.+snake.+pencil.?case|pencil.?case.*fish|is\s*it\s*a\s*fish\s*or\s*a?\s*snake\s*pencil\s*case/i,
    expected: "Is it a fish or snake pencil case?"
  },
  {
    name: "happy-sad-eraser",
    regex: /happy.+sad.+eraser|eraser.*happy|is\s*it\s*a\s*happy\s*or\s*a?\s*sad\s*eraser/i,
    expected: "Is it a happy or sad eraser?"
  },
  {
    name: "what-is-it-sharpener",
    regex: /what\s*is\s*it.+it\s*is\s*a\s*sharpener|what\s*is\s*it.+sharpener/i,
    expected: "What is it? It is a sharpener."
  },
  {
    name: "banana-apple-book",
    regex: /banana.+apple.+book|book.*banana|is\s*it\s*a\s*banana\s*or\s*a?\s*apple\s*book/i,
    expected: "Is it a banana or apple book?"
  },
  {
    name: "girl-boy-notebook",
    regex: /girl.+boy.+notebook|notebook.*girl|girl['']?s\s*notebook|is\s*it\s*a\s*girl['']?s\s*or\s*boy['']?s\s*notebook/i,
    expected: "Is it a girl's or boy's notebook?"
  }
];

// Test filenames
const testFilenames = [
  "01 N A Is it a Girl or Boy Pen.jpg",
  "01 N B Is it a Boy or Girl Pen.gif",
  "02 M C Is it a Hot Dog or Hamburger Pen.png",
  "02 Q A Is it a Dog or Cat Pen.gif",
  "03 N A Is it a Banana or Apple Book.jpg",
  "04 N B Is it a Girl's or Boy's Notebook.png",
  "05 N C Is it a Fish or Snake Pencil Case.jpg",
  "06 N D Is it a Metal or Plastic Sharpener.png",
  "07 N E Is it a Happy or Sad Eraser.gif",
  "01 E J Do You Have A Lego Pen.gif",
  "08 M A What is It It is A Sharpener.gif"
];

// Run tests
console.log("Testing Book 1 Unit 2 Comparison Patterns\n");

testFilenames.forEach(filename => {
  console.log(`Testing filename: "${filename}"`);
  let foundMatch = false;
  
  for (const pattern of patterns) {
    if (pattern.regex.test(filename)) {
      console.log(`✅ MATCH FOUND for pattern: ${pattern.name}`);
      console.log(`   Expected Question: ${pattern.expected}`);
      foundMatch = true;
      break;
    }
  }
  
  if (!foundMatch) {
    console.log("❌ NO MATCH FOUND");
  }
  
  console.log("------------------------");
});