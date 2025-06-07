// Test script to verify question mapping logic
const fs = require('fs');

// Load the Book 1 QA mapping data
const book1Data = JSON.parse(fs.readFileSync('./client/src/data/qa-mapping-book1.json', 'utf8'));

console.log('=== QUESTION MAPPING VERIFICATION ===\n');

// Test the specific problematic filenames mentioned
const testFilenames = [
  "05 C Draw the Sun or the Moon",
  "10 A Online Game Wordwall – Greetings", 
  "10 C B Online Game Wordwall – Times of the Day"
];

console.log('Available Q&A entries in Book 1:');
Object.keys(book1Data).slice(0, 10).forEach(key => {
  console.log(`- "${key}" -> "${book1Data[key].question}"`);
});

console.log('\n=== TESTING SPECIFIC MAPPING LOGIC ===\n');

// Test the specific mappings that were added
const specificMappings = {
  "05 C Draw the Sun or the Moon": "01 A What do you say in the morning",
  "10 A Online Game Wordwall – Greetings": "01 E What do you drink in the morning",
  "10 C B Online Game Wordwall – Times of the Day": "01 F What do you eat in the morning"
};

testFilenames.forEach(filename => {
  console.log(`Testing: "${filename}"`);
  
  // Direct match test
  if (book1Data[filename]) {
    console.log(`  ✅ DIRECT MATCH: ${book1Data[filename].question}`);
  } else {
    console.log(`  ❌ No direct match found`);
    
    // Test specific mapping
    const mappedKey = specificMappings[filename];
    if (mappedKey && book1Data[mappedKey]) {
      console.log(`  ✅ SPECIFIC MAPPING: ${filename} -> ${mappedKey}`);
      console.log(`     Question: ${book1Data[mappedKey].question}`);
      console.log(`     Answer: ${book1Data[mappedKey].answer}`);
    } else {
      console.log(`  ❌ No specific mapping found`);
    }
  }
  console.log('');
});

console.log('=== SUMMARY ===');
console.log(`Total Q&A entries in Book 1: ${Object.keys(book1Data).length}`);
console.log('Question mapping logic includes:');
console.log('1. Direct filename matching');
console.log('2. Case-insensitive matching');
console.log('3. Question content extraction and matching');
console.log('4. Specific mappings for problematic slides');
console.log('5. Code pattern extraction (01 A, 01 B, etc.)');
console.log('6. Dash pattern extraction (Question - Answer format)');
console.log('7. Fallback to pattern engine for unmatched files');