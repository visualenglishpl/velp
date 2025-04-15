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

SPEAKERS
(04 A a) What are these? → They are speakers.

(04 A c) Do you have a mini speaker at home? → Yes, I do / No, I do not.

(04 A h) Do you prefer speakers or headphones? → I prefer speakers/headphones.

(04 A j) Does your phone have speakers? → Yes, it does / No, it does not.

(04 A m) Where are the speakers in a car? → They are [in the doors/on the dashboard].

COMPUTERS & LAPTOPS
(05 A a) What is this? → It is a laptop.

(05 A c) Do you have a laptop in your bedroom? → Yes, I do / No, I do not.

(05 A e) Do you have a gaming laptop? → Yes, I do / No, I do not.

(05 A f) Do you prefer a laptop or a computer? → I prefer a laptop/computer.

(05 A l) Do you watch films on your laptop? → Yes, I do / No, I do not.

(05 B b) Do you surf the internet every day? → Yes, I do / No, I do not.

(05 B g) Do you surf the internet with your phone? → Yes, I do / No, I do not.

GAME CONSOLES
(06 A b) What is this? → It is a game console.

(06 A e) Do you have a game console at home? → Yes, I do / No, I do not.

(06 B b) What games do you play? → I play [Fortnite/Minecraft/Roblox].

(06 B d) Do you prefer gaming on a console or laptop? → I prefer a console/laptop.

CAMERAS
(07 A b) What type of camera is this? → It is a digital camera.

(07 A g) Do you prefer a digital or phone camera? → I prefer a digital/phone camera.

(07 B a) What is he doing? → He is taking photos.

(07 B d) Are you good at taking photos? → Yes, I am / No, I am not.

OTHER GADGETS
(08 A a) What is this? → It is a USB drive.

(08 A c) How big is your USB drive? → It is [32GB/64GB].

(09 A a) What is this? → It is an e-book reader.

(09 A c) Do you prefer e-books or paper books? → I prefer e-books/paper books.

(10 C Aa) What is this? → It is a printer.

(12 C Aa) What is this? → It is a remote control.

TV & REMOTE CONTROL
(11 C Aa) What is it? → It is a TV.

(11 C Ac) Is it an old or new TV? → It is an old/new TV.

(11 C Bb) How many hours do you watch TV on your phone? → I watch TV for [1/2/3] hours.

(11 C Bd) Do you watch sports on TV? → Yes, I do / No, I do not.

(12 A) What is this? → It is a remote control.

(12 C Ba) What is he doing? → He is changing the channels with the remote control.
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