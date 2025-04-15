/**
 * This script helps convert the pasted question document format into proper code entries
 * for the QuestionAnswerDisplay component.
 * 
 * Example usage:
 * 1. Paste text file content into the INPUT_TEXT constant
 * 2. Run with node scripts/generate_qa_database.js
 * 3. Copy the output and use it in QuestionAnswerDisplay.tsx
 */

import fs from 'fs';

// Paste the text content here
const INPUT_TEXT = `
MOBILE PHONES
(01 A a) What is this? → It is a phone.

(01 A b) Do you have a phone? → Yes, I have a phone / No, I do not have a phone.

(01 A c) What phone do you have? → I have a [iPhone/Samsung/Android].

(01 A d) Who has a phone in your house? → My [mother/father/sister] has a phone.

(01 A e) Are these old or new phones? → They are old/new phones.

(01 A f) Do you shop using your phone? → Yes, I shop using my phone / No, I do not.

(01 A g) Do you play games on your phone? → Yes, I play games / No, I do not.

(01 A h) Are mobile phones cheap or expensive? → They are cheap/expensive.

(01 A i) Do you take selfies with your phone? → Yes, I take selfies / No, I do not.

(01 A j) Do you listen to music with your phone? → Yes, I listen to music / No, I do not.

(01 A k) Do you take photos with your phone? → Yes, I take photos / No, I do not.

CHARGERS & BATTERIES
(02 A a) What is this? → It is a charger.

(02 A b) Do you have a charger? → Yes, I have a charger / No, I do not.

(02 A c) Do you have a wireless charger? → Yes, I do / No, I do not.

(02 A d) How long does your battery last? → It lasts [1 hour/5 hours].

(02 A e) What color is your charger? → It is [red/black/white].

(02 A f) Is your phone battery full or empty? → It is full/empty.

(02 A i) How long does it take to charge your phone? → It takes [30 minutes/2 hours].

(02 B b) How often do you charge your phone? → I charge it [once/twice] a day.

(02 B c) Is your charger fast or slow? → It is fast/slow.

HEADPHONES & EARPHONES
(03 A a) What are these? → They are headphones.

(03 A c) What are these? → They are earphones.

(03 A e) Do you prefer headphones, earbuds, or earphones? → I prefer [headphones/earbuds/earphones].

(03 A f) Do you prefer wireless or wired earphones? → I prefer wireless/wired earphones.

(03 A h) What color headphones do you like? → I like [blue/red/black] headphones.

(03 A i) Are these headphones big or small? → They are big/small.

(03 C a) What is he doing? → He is listening to music with headphones.

(03 C d) Do you listen to music with headphones every day? → Yes, I do / No, I do not.

(03 C e) Do you listen to music while studying? → Yes, I do / No, I do not.

(03 C h) What music do you listen to? → I listen to [pop/rock/classical] music.
`;

// Process the input text
function processText(text) {
  const lines = text.split('\n');
  let currentCategory = '';
  const entries = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this is a category heading
    if (line && !line.startsWith('(') && !line.includes('→')) {
      currentCategory = line;
      continue;
    }
    
    // Try to match a question-answer pair
    const match = line.match(/\((\d{2})\s*([A-Za-z])\s*([A-Za-z](?:a)?)\)\s*(.*?)\s*→\s*(.*)/);
    if (match) {
      const [_, num, letter1, letter2, question, answer] = match;
      const code = `${num} ${letter1.toLowerCase()} ${letter2.toLowerCase()}`;
      
      entries.push({
        code,
        category: currentCategory,
        question: question.trim(),
        answer: answer.trim()
      });
    }
  }
  
  return entries;
}

// Generate the code
function generateCode(entries) {
  let output = '';
  let currentCategory = '';
  
  for (const entry of entries) {
    if (entry.category !== currentCategory) {
      currentCategory = entry.category;
      output += `\n    // ${currentCategory}\n`;
    }
    
    output += `    { code: "${entry.code}", category: "${currentCategory}", question: "${entry.question}", answer: "${entry.answer}" },\n`;
  }
  
  return output;
}

const entries = processText(INPUT_TEXT);
const code = generateCode(entries);

console.log('Generated database entries:');
console.log(code);

// Write to file for convenience
fs.writeFileSync('qa_database_entries.txt', code);
console.log('\nOutput also saved to qa_database_entries.txt');