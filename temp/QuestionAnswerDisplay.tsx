import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Flag, Check, X, RefreshCw } from "lucide-react";
import { findMatchingQA } from "@/data/qa-mapping";
import { useQuery } from "@tanstack/react-query";

interface QAData {
  country: string;
  question: string;
  answer: string;
  hasData: boolean;
  category?: string;
}

interface QADatabaseEntry {
  code: string;
  question: string;
  answer: string;
  country?: string;
  category?: string;
}

interface FlaggedQuestion {
  materialId: number;
  questionText: string;
  answerText: string;
  suggestedQuestion?: string;
  suggestedAnswer?: string;
  reason?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
}

interface ExcelQAEntry {
  filename: string;
  codePattern: string;
  question: string;
  answer: string;
}

interface QuestionAnswerDisplayProps {
  material: {
    id: number;
    description: string;
    content: string;
    title: string;
  };
  isEditMode?: boolean;
  showQuestions?: boolean;
  bookId?: string;
  unitId?: string;
}

// Utility functions
const formatText = {
  // Remove file extensions and code patterns, properly capitalize text
  cleanFileName: (filename: string): string => {
    if (!filename) return '';
    // Remove file extensions
    let cleaned = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
    // Remove technical codes like "01 RA" or "05 LC"
    cleaned = cleaned.replace(/\d+\s+[a-z]\s+[a-z]/i, '');
    // Properly capitalize first letter of each word
    cleaned = cleaned.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
    return cleaned;
  },
  
  // Determine country from content
  determineCountry: (content: string): string => {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('poland') || contentLower.includes('01 r')) {
      return 'POLAND';
    } else if (contentLower.includes('britain') || contentLower.includes('uk') || contentLower.includes('02 n')) {
      return 'BRITAIN / UK';
    } else if (contentLower.includes('ireland') || contentLower.includes('03 g')) {
      return 'NORTHERN IRELAND';
    } else if (contentLower.includes('scotland') || contentLower.includes('04 l')) {
      return 'SCOTLAND';
    } else if (contentLower.includes('england') || contentLower.includes('05 l')) {
      return 'ENGLAND';
    } else if (contentLower.includes('wales') || contentLower.includes('06 h')) {
      return 'WALES';
    } else if (contentLower.includes('australia') || contentLower.includes('07 l')) {
      return 'AUSTRALIA';
    } else if (contentLower.includes('usa') || contentLower.includes('america') || contentLower.includes('08 m')) {
      return 'USA';
    }
    
    return '';
  },
  
  // Extract question and answer directly from filename
  extractQuestionsFromFilename: (filename: string): { question: string, answer: string } | null => {
    if (!filename) return null;
    
    const lowerFilename = filename.toLowerCase();
    // Try to extract format like "What is it - it is a pencil"
    const dashMatch = filename.match(/([^-]+)\s*[\–\-]\s*(.+?)(\.jpg|\.png|\.gif|$)/i);
    
    if (dashMatch) {
      const beforeDash = dashMatch[1].trim();
      const afterDash = dashMatch[2].trim();
      
      // Check if it looks like a question and answer
      if (
        beforeDash.match(/^(what|where|how|why|when|who|which|is|are|do|does|can|could|has|have)/i) && 
        afterDash.length > 0
      ) {
        // Format as proper question
        let question = beforeDash;
        if (!question.endsWith('?')) {
          question += '?';
        }
        
        // Capitalize first letter
        question = question.charAt(0).toUpperCase() + question.slice(1);
        
        // Format answer with proper capitalization
        let answer = afterDash.charAt(0).toUpperCase() + afterDash.slice(1);
        if (!answer.endsWith('.')) {
          answer += '.';
        }
        
        return {
          question,
          answer
        };
      }
    }
    
    // For files with common question patterns without dashes
    // Examples: "Do You Have A Pen in Your Pencil Case.gif"
    
    const questionPatterns = [
      { regex: /^do you have (.+?)(\.|\?|$)/i, answerPositive: "Yes, I have $1.", answerNegative: "No, I don't have $1." },
      { regex: /^does (he|she) have (.+?)(\.|\?|$)/i, answerPositive: "Yes, $1 has $2.", answerNegative: "No, $1 doesn't have $2." },
      { regex: /^is (it|he|she|this) (.+?)(\.|\?|$)/i, answerPositive: "Yes, $1 is $2.", answerNegative: "No, $1 isn't $2." },
      { regex: /^are (you|they|these) (.+?)(\.|\?|$)/i, answerPositive: "Yes, $1 are $2.", answerNegative: "No, $1 aren't $2." },
      { regex: /^what is (.+?)(\.|\?|$)/i, answer: "It is $1." },
      { regex: /^what are (.+?)(\.|\?|$)/i, answer: "They are $1." },
      { regex: /^where is (.+?)(\.|\?|$)/i, answer: "It is in $1." },
      { regex: /^which (.+?) is (.+?)(\.|\?|$)/i, answer: "It is $2." }
    ];
    
    for (const pattern of questionPatterns) {
      const match = lowerFilename.match(pattern.regex);
      if (match) {
        // Format as proper question
        let question = match[0];
        if (!question.endsWith('?')) {
          question = question.replace(/\..*$/, '?');
        }
        question = question.charAt(0).toUpperCase() + question.slice(1);
        
        let answer;
        if ('answer' in pattern && pattern.answer) {
          // For single-answer patterns like "what is"
          answer = pattern.answer.replace(/\$(\d+)/g, (_, n) => match[parseInt(n)]);
        } else if ('answerPositive' in pattern && pattern.answerPositive) {
          // For yes/no questions
          answer = pattern.answerPositive.replace(/\$(\d+)/g, (_, n) => match[parseInt(n)]);
        } else {
          // Fallback
          answer = "It is " + match[0] + ".";
        }
        
        return {
          question,
          answer
        };
      }
    }
    
    return null;
  }
};

// Helper function to get question and answer for a material
function getQuestionAnswerFromData(material: any): QAData {
  const content = material.content || '';
  const description = material.description || '';
  
  // Clean the title
  const title = material.title ? formatText.cleanFileName(material.title) : '';
  
  // First, try to find a matching Q&A from the Excel-processed mapping
  // This will ensure the correct question/answer pair is displayed based on the filename
  const filename = material.content || '';
  const mappedQA = findMatchingQA(filename);
  
  if (mappedQA) {
    console.log("Found matching Q&A from Excel mapping for:", filename);
    return {
      question: mappedQA.question,
      answer: mappedQA.answer,
      country: formatText.determineCountry(content),
      hasData: true
    };
  }
  
  // If no mapping found, fall back to the existing pattern matching logic
  console.log("No Excel mapping found for:", filename, "- using pattern matching");
  
  // Function to extract code pattern from filename (like "01 R A", "01 A b", "02 B c", etc.)
  const extractCodePattern = (text: string): string => {
    // Try to match patterns like "(01 A a)" from the pasted document format 
    const parenMatch = text.match(/\((\d{2})\s*([a-z])\s*([a-z])\)/i);
    if (parenMatch) {
      const result = `${parenMatch[1]} ${parenMatch[2].toLowerCase()} ${parenMatch[3].toLowerCase()}`;
      console.log("Extracted parenthesized code pattern:", result, "from text:", text);
      return result;
    }
    
    // Try to extract from more specific patterns first (look for code pattern at the beginning)
    const specificMatch = text.match(/^(\d{2})\s+([a-z])\s+([a-z](?:a)?)\s/i);
    if (specificMatch) {
      const result = `${specificMatch[1]} ${specificMatch[2].toLowerCase()} ${specificMatch[3].toLowerCase()}`;
      console.log("Extracted specific code pattern:", result, "from text:", text);
      return result;
    }

    // Match patterns like "01 R A" or "05 L C" anywhere in the text
    // Be more restrictive - require it to be followed by specific keywords or be at the start
    const codeMatch = text.match(/(\d{2})\s+([a-z])\s+([a-z](?:a)?)(\s|$|\s+what|\s+do|\s+is|\s+are|\s+how|\s+where|\s+who)/i);
    if (codeMatch) {
      // Return standardized format for matching: "01 r a"
      const result = `${codeMatch[1]} ${codeMatch[2].toLowerCase()} ${codeMatch[3].toLowerCase()}`;
      console.log("Extracted code pattern:", result, "from text:", text);
      return result;
    }
    
    return '';
  };
  
  // Extract code pattern from content and description
  const contentCode = extractCodePattern(content);
  const descriptionCode = extractCodePattern(description);
  
  // Use the first code pattern found
  const codePattern = contentCode || descriptionCode;
  
  // For debugging - log the source of the code pattern
  if (contentCode) console.log("Using code pattern from content:", contentCode);
  if (descriptionCode) console.log("Using code pattern from description:", descriptionCode);
  
  // If in filename, we may need to check if there's an actual country or subject match
  if (contentCode && (content.includes("Gadgets") || content.toLowerCase().includes("phone") || 
      content.toLowerCase().includes("charger") || content.toLowerCase().includes("gadget"))) {
    console.log("Found gadgets in content, prioritizing mobile phone category");
    
    // Clear any country detection from the material content to avoid showing Poland question
    if (formatText.determineCountry(content)) {
      console.log("Overriding country detection because this is a gadget slide");
    }
  }
  

  
  // Map of code patterns to exact questions and answers
  const qaDatabase: QADatabaseEntry[] = [
    // POLAND
    { code: "01 r a", country: "POLAND", question: "What country is this?", answer: "It is Poland." },
    { code: "01 r b", country: "POLAND", question: "Where is this flag from?", answer: "It is from Poland." },
    { code: "01 r c", country: "POLAND", question: "What colors are the Polish flag?", answer: "They are red and white." },
    { code: "01 r d", country: "POLAND", question: "Where are these people from?", answer: "They are from Poland." },
    { code: "01 r f", country: "POLAND", question: "What nationality are they?", answer: "They are Polish." },
    { code: "01 r i", country: "POLAND", question: "What is the capital of Poland?", answer: "It is Warsaw." },
    { code: "01 r k", country: "POLAND", question: "What language does she speak?", answer: "She speaks Polish." },
    
    // BRITAIN / UK
    { code: "02 n a", country: "BRITAIN / UK", question: "Which countries are in Britain?", answer: "They are England, Scotland, and Wales." },
    { code: "02 n c", country: "BRITAIN / UK", question: "Where is this flag from?", answer: "It is from Britain." },
    { code: "02 n d", country: "BRITAIN / UK", question: "What nationality is he?", answer: "He is British." },
    { code: "02 n g", country: "BRITAIN / UK", question: "Who is Britain's leader?", answer: "He is King Charles." },
    { code: "02 n l", country: "BRITAIN / UK", question: "Where is this money from?", answer: "It is from the UK." },
    
    // NORTHERN IRELAND
    { code: "03 g a", country: "NORTHERN IRELAND", question: "Which country is colored pink?", answer: "It is Northern Ireland." },
    { code: "03 g c", country: "NORTHERN IRELAND", question: "What is the capital of Northern Ireland?", answer: "It is Belfast." },
    { code: "03 g d", country: "NORTHERN IRELAND", question: "What nationality is he?", answer: "He is Northern Irish." },
    
    // SCOTLAND
    { code: "04 l a", country: "SCOTLAND", question: "What country is this?", answer: "It is Scotland." },
    { code: "04 l b", country: "SCOTLAND", question: "Where is this flag from?", answer: "It is from Scotland." },
    { code: "04 l c", country: "SCOTLAND", question: "What is Scotland's capital?", answer: "It is Edinburgh." },
    { code: "04 l d", country: "SCOTLAND", question: "What nationality is he?", answer: "He is Scottish." },
    { code: "04 l i", country: "SCOTLAND", question: "Where is the Loch Ness Monster from?", answer: "It is from Scotland." },
    
    // ENGLAND
    { code: "05 l a", country: "ENGLAND", question: "What country is this?", answer: "It is England." },
    { code: "05 l b", country: "ENGLAND", question: "Where is this flag from?", answer: "It is from England." },
    { code: "05 l c", country: "ENGLAND", question: "What is England's capital?", answer: "It is London." },
    { code: "05 l d", country: "ENGLAND", question: "What nationality is he?", answer: "He is English." },
    { code: "05 l e", country: "ENGLAND", question: "Where is he from?", answer: "He is from England." },
    { code: "05 l f", country: "ENGLAND", question: "Where are they from?", answer: "They are from England." },
    { code: "05 l g", country: "ENGLAND", question: "Is an English breakfast big?", answer: "Yes, it is big." },
    { code: "05 l h", country: "ENGLAND", question: "What type of food is it?", answer: "It is English food." },
    
    // WALES
    { code: "06 h a", country: "WALES", question: "What country is this?", answer: "It is Wales." },
    { code: "06 h b", country: "WALES", question: "Where is this flag from?", answer: "It is from Wales." },
    { code: "06 h c", country: "WALES", question: "Describe the Welsh flag.", answer: "It is white, green, and has a dragon." },
    { code: "06 h d", country: "WALES", question: "What is Wales's capital?", answer: "It is Cardiff." },
    { code: "06 h f", country: "WALES", question: "What nationality is he?", answer: "He is Welsh." },
    { code: "06 h", country: "WALES", question: "What language is this?", answer: "It is Welsh." },
    
    // AUSTRALIA
    { code: "07 l a", country: "AUSTRALIA", question: "What country is this?", answer: "It is Australia." },
    { code: "07 l b", country: "AUSTRALIA", question: "Where is this flag from?", answer: "It is from Australia." },
    { code: "07 l d", country: "AUSTRALIA", question: "What nationality is he?", answer: "He is Australian." },
    { code: "07 l h", country: "AUSTRALIA", question: "Name three Australian animals.", answer: "They are kangaroos, koalas, and wombats." },
    
    // USA
    { code: "08 m a", country: "USA", question: "What country is this?", answer: "It is the USA." },
    { code: "08 m b", country: "USA", question: "Where is this flag from?", answer: "It is from the USA." },
    { code: "08 m c", country: "USA", question: "How many stars are on the American flag?", answer: "There are 50 stars." },
    { code: "08 m e", country: "USA", question: "What nationality is he?", answer: "He is American." },
    { code: "08 m k", country: "USA", question: "What type of food is this?", answer: "It is American food." },
    
    // UK/British Isles Review
    { code: "09 a b", country: "BRITAIN / UK", question: "Which countries are on the British flag?", answer: "They are England, Scotland, and Northern Ireland." },
    { code: "10 a b", country: "BRITAIN / UK", question: "What countries are in the British Isles?", answer: "They are the UK and Ireland." },
    
    // MOBILE PHONES
    { code: "01 a a", category: "MOBILE PHONES", question: "What is this?", answer: "It is a phone." },
    { code: "01 a b", category: "MOBILE PHONES", question: "Do you have a phone?", answer: "Yes, I have a phone / No, I do not have a phone." },
    { code: "01 a c", category: "MOBILE PHONES", question: "What phone do you have?", answer: "I have a [iPhone/Samsung/Android]." },
    { code: "01 a d", category: "MOBILE PHONES", question: "Who has a phone in your house?", answer: "My [mother/father/sister] has a phone." },
    { code: "01 a e", category: "MOBILE PHONES", question: "Are these old or new phones?", answer: "They are old/new phones." },
    { code: "01 a f", category: "MOBILE PHONES", question: "Do you shop using your phone?", answer: "Yes, I shop using my phone / No, I do not." },
    { code: "01 a g", category: "MOBILE PHONES", question: "Do you play games on your phone?", answer: "Yes, I play games / No, I do not." },
    { code: "01 a h", category: "MOBILE PHONES", question: "Are mobile phones cheap or expensive?", answer: "They are cheap/expensive." },
    { code: "01 a i", category: "MOBILE PHONES", question: "Do you take selfies with your phone?", answer: "Yes, I take selfies / No, I do not." },
    { code: "01 a j", category: "MOBILE PHONES", question: "Do you listen to music with your phone?", answer: "Yes, I listen to music / No, I do not." },
    { code: "01 a k", category: "MOBILE PHONES", question: "Do you take photos with your phone?", answer: "Yes, I take photos / No, I do not." },
    
    // CHARGERS & BATTERIES
    { code: "02 a a", category: "CHARGERS & BATTERIES", question: "What is this?", answer: "It is a charger." },
    { code: "02 a b", category: "CHARGERS & BATTERIES", question: "Do you have a charger?", answer: "Yes, I have a charger / No, I do not." },
    { code: "02 a c", category: "CHARGERS & BATTERIES", question: "Do you have a wireless charger?", answer: "Yes, I do / No, I do not." },
    { code: "02 a d", category: "CHARGERS & BATTERIES", question: "How long does your battery last?", answer: "It lasts [1 hour/5 hours]." },
    { code: "02 a e", category: "CHARGERS & BATTERIES", question: "What color is your charger?", answer: "It is [red/black/white]." },
    { code: "02 a f", category: "CHARGERS & BATTERIES", question: "Is your phone battery full or empty?", answer: "It is full/empty." },
    { code: "02 a i", category: "CHARGERS & BATTERIES", question: "How long does it take to charge your phone?", answer: "It takes [30 minutes/2 hours]." },
    { code: "02 b b", category: "CHARGERS & BATTERIES", question: "How often do you charge your phone?", answer: "I charge it [once/twice] a day." },
    { code: "02 b c", category: "CHARGERS & BATTERIES", question: "Is your charger fast or slow?", answer: "It is fast/slow." },
    
    // HEADPHONES & EARPHONES
    { code: "03 a a", category: "HEADPHONES & EARPHONES", question: "What are these?", answer: "They are headphones." },
    { code: "03 a c", category: "HEADPHONES & EARPHONES", question: "What are these?", answer: "They are earphones." },
    { code: "03 a e", category: "HEADPHONES & EARPHONES", question: "Do you prefer headphones, earbuds, or earphones?", answer: "I prefer [headphones/earbuds/earphones]." },
    { code: "03 a f", category: "HEADPHONES & EARPHONES", question: "Do you prefer wireless or wired earphones?", answer: "I prefer wireless/wired earphones." },
    { code: "03 a h", category: "HEADPHONES & EARPHONES", question: "What color headphones do you like?", answer: "I like [blue/red/black] headphones." },
    { code: "03 a i", category: "HEADPHONES & EARPHONES", question: "Are these headphones big or small?", answer: "They are big/small." },
    { code: "03 c a", category: "HEADPHONES & EARPHONES", question: "What is he doing?", answer: "He is listening to music with headphones." },
    { code: "03 c d", category: "HEADPHONES & EARPHONES", question: "Do you listen to music with headphones every day?", answer: "Yes, I do / No, I do not." },
    { code: "03 c e", category: "HEADPHONES & EARPHONES", question: "Do you listen to music while studying?", answer: "Yes, I do / No, I do not." },
    { code: "03 c h", category: "HEADPHONES & EARPHONES", question: "What music do you listen to?", answer: "I listen to [pop/rock/classical] music." },

    // SPEAKERS
    { code: "04 a a", category: "SPEAKERS", question: "What are these?", answer: "They are speakers." },
    { code: "04 a c", category: "SPEAKERS", question: "Do you have a mini speaker at home?", answer: "Yes, I do / No, I do not." },
    { code: "04 a h", category: "SPEAKERS", question: "Do you prefer speakers or headphones?", answer: "I prefer speakers/headphones." },
    { code: "04 a j", category: "SPEAKERS", question: "Does your phone have speakers?", answer: "Yes, it does / No, it does not." },
    { code: "04 a m", category: "SPEAKERS", question: "Where are the speakers in a car?", answer: "They are [in the doors/on the dashboard]." },

    // COMPUTERS & LAPTOPS
    { code: "05 a a", category: "COMPUTERS & LAPTOPS", question: "What is this?", answer: "It is a laptop." },
    { code: "05 a c", category: "COMPUTERS & LAPTOPS", question: "Do you have a laptop in your bedroom?", answer: "Yes, I do / No, I do not." },
    { code: "05 a e", category: "COMPUTERS & LAPTOPS", question: "Do you have a gaming laptop?", answer: "Yes, I do / No, I do not." },
    { code: "05 a f", category: "COMPUTERS & LAPTOPS", question: "Do you prefer a laptop or a computer?", answer: "I prefer a laptop/computer." },
    { code: "05 a l", category: "COMPUTERS & LAPTOPS", question: "Do you watch films on your laptop?", answer: "Yes, I do / No, I do not." },
    { code: "05 b b", category: "COMPUTERS & LAPTOPS", question: "Do you surf the internet every day?", answer: "Yes, I do / No, I do not." },
    { code: "05 b g", category: "COMPUTERS & LAPTOPS", question: "Do you surf the internet with your phone?", answer: "Yes, I do / No, I do not." },

    // GAME CONSOLES
    { code: "06 a b", category: "GAME CONSOLES", question: "What is this?", answer: "It is a game console." },
    { code: "06 a e", category: "GAME CONSOLES", question: "Do you have a game console at home?", answer: "Yes, I do / No, I do not." },
    { code: "06 b b", category: "GAME CONSOLES", question: "What games do you play?", answer: "I play [Fortnite/Minecraft/Roblox]." },
    { code: "06 b d", category: "GAME CONSOLES", question: "Do you prefer gaming on a console or laptop?", answer: "I prefer a console/laptop." },

    // CAMERAS
    { code: "07 a b", category: "CAMERAS", question: "What type of camera is this?", answer: "It is a digital camera." },
    { code: "07 a g", category: "CAMERAS", question: "Do you prefer a digital or phone camera?", answer: "I prefer a digital/phone camera." },
    { code: "07 b a", category: "CAMERAS", question: "What is he doing?", answer: "He is taking photos." },
    { code: "07 b d", category: "CAMERAS", question: "Are you good at taking photos?", answer: "Yes, I am / No, I am not." },

    // OTHER GADGETS
    { code: "08 a a", category: "OTHER GADGETS", question: "What is this?", answer: "It is a USB drive." },
    { code: "08 a c", category: "OTHER GADGETS", question: "How big is your USB drive?", answer: "It is [32GB/64GB]." },
    { code: "09 a a", category: "OTHER GADGETS", question: "What is this?", answer: "It is an e-book reader." },
    { code: "09 a c", category: "OTHER GADGETS", question: "Do you prefer e-books or paper books?", answer: "I prefer e-books/paper books." },
    { code: "10 c aa", category: "OTHER GADGETS", question: "What is this?", answer: "It is a printer." },
    
    // TV & REMOTE CONTROL
    { code: "11 c aa", category: "TV & REMOTE CONTROL", question: "What is it?", answer: "It is a TV." },
    { code: "11 c ac", category: "TV & REMOTE CONTROL", question: "Is it an old or new TV?", answer: "It is an old/new TV." },
    { code: "11 c bb", category: "TV & REMOTE CONTROL", question: "How many hours do you watch TV on your phone?", answer: "I watch TV for [1/2/3] hours." },
    { code: "11 c bd", category: "TV & REMOTE CONTROL", question: "Do you watch sports on TV?", answer: "Yes, I do / No, I do not." },
    { code: "12 a", category: "TV & REMOTE CONTROL", question: "What is this?", answer: "It is a remote control." },
    { code: "12 c aa", category: "TV & REMOTE CONTROL", question: "What is this?", answer: "It is a remote control." },
    { code: "12 c ba", category: "TV & REMOTE CONTROL", question: "What is he doing?", answer: "He is changing the channels with the remote control." },
    
    // GAME CONSOLES
    { code: "06 a b", category: "GAME CONSOLES", question: "What is this?", answer: "It is a game console." },
    { code: "06 a e", category: "GAME CONSOLES", question: "Do you have a game console at home?", answer: "Yes, I do / No, I do not." },
    { code: "06 b b", category: "GAME CONSOLES", question: "What games do you play?", answer: "I play [Fortnite/Minecraft/Roblox]." },
    { code: "06 b d", category: "GAME CONSOLES", question: "Do you prefer gaming on a console or laptop?", answer: "I prefer a console/laptop." },
    
    // CAMERAS
    { code: "07 a b", category: "CAMERAS", question: "What type of camera is this?", answer: "It is a digital camera." },
    { code: "07 a g", category: "CAMERAS", question: "Do you prefer a digital or phone camera?", answer: "I prefer a digital/phone camera." },
    { code: "07 b a", category: "CAMERAS", question: "What is he doing?", answer: "He is taking photos." },
    { code: "07 b d", category: "CAMERAS", question: "Are you good at taking photos?", answer: "Yes, I am / No, I am not." },
    
    // OTHER GADGETS
    { code: "08 a a", category: "OTHER GADGETS", question: "What is this?", answer: "It is a USB drive." },
    { code: "08 a c", category: "OTHER GADGETS", question: "How big is your USB drive?", answer: "It is [32GB/64GB]." },
    { code: "09 a a", category: "OTHER GADGETS", question: "What is this?", answer: "It is an e-book reader." },
    { code: "09 a c", category: "OTHER GADGETS", question: "Do you prefer e-books or paper books?", answer: "I prefer e-books/paper books." },
    { code: "10 c aa", category: "OTHER GADGETS", question: "What is this?", answer: "It is a printer." },
    { code: "12 c aa", category: "OTHER GADGETS", question: "What is this?", answer: "It is a remote control." }
  ];
  
  // Check for an exact match in our database using the code pattern
  if (codePattern) {
    console.log("Found code pattern: ", codePattern);
    const matchedQA = qaDatabase.find(qa => qa.code === codePattern);
    if (matchedQA) {
      return { 
        country: matchedQA.country || matchedQA.category || "",
        question: matchedQA.question, 
        answer: matchedQA.answer, 
        hasData: true 
      };
    }
  }
  
  // Try to extract question and answer directly from the filename using dash patterns
  // Examples: "What is it – It is a pencil.gif", "Where is this flag from – It is from Poland.jpg"
  const extractedFromFilename = formatText.extractQuestionsFromFilename(content);
  if (extractedFromFilename) {
    console.log("Extracted question/answer from filename:", extractedFromFilename);
    return {
      country: formatText.determineCountry(content),
      question: extractedFromFilename.question,
      answer: extractedFromFilename.answer,
      hasData: true
    };
  }
  
  // Try to extract question directly from content/description
  const contentLower = content.toLowerCase();
  
  // Check if content contains phone-related keywords 
  if (contentLower.includes('phone') || 
      contentLower.includes('charger') || 
      contentLower.includes('gadget') || 
      content.includes('Gadgets')) {
    console.log("Detected phone-related content, using phone questions");
    
    // Prioritize gadget questions over country detection
    if (contentLower.includes('what is it') || contentLower.includes('what is this')) {
      if (contentLower.includes('charger')) {
        return { 
          country: "CHARGERS & BATTERIES",
          question: "What is this?", 
          answer: "It is a charger.", 
          hasData: true 
        };
      } else {
        return { 
          country: "MOBILE PHONES",
          question: "What is this?", 
          answer: "It is a phone.", 
          hasData: true 
        };
      }
    }
    
    if (contentLower.includes('do you have a phone') || contentLower.includes('have a phone')) {
      return { 
        country: "MOBILE PHONES",
        question: "Do you have a phone?", 
        answer: "Yes, I have a phone / No, I do not have a phone.", 
        hasData: true 
      };
    }

    if (contentLower.includes('do you have a charger') || contentLower.includes('have a charger')) {
      return { 
        country: "CHARGERS & BATTERIES",
        question: "Do you have a charger?", 
        answer: "Yes, I have a charger / No, I do not.", 
        hasData: true 
      };
    }
  }
  
  const country = formatText.determineCountry(content);
  
  // Try to match by the first part of the code (e.g., "01 r")
  if (codePattern) {
    const mainCode = codePattern.substring(0, 4); // Like "01 r" 
    const countryQAs = qaDatabase.filter(qa => qa.code.startsWith(mainCode));
    if (countryQAs.length > 0) {
      // Use the first question for this country
      return { 
        country: countryQAs[0].country || countryQAs[0].category || "",
        question: countryQAs[0].question, 
        answer: countryQAs[0].answer, 
        hasData: true 
      };
    }
  }
  
  // Try to match by filename content
  if (contentLower.includes('flag')) {
    if (country) {
      return { 
        country,
        question: "Where is this flag from?", 
        answer: `It is from ${country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()}.`, 
        hasData: true 
      };
    }
  } else if (contentLower.includes('capital')) {
    if (country === 'POLAND') {
      return { country, question: "What is the capital of Poland?", answer: "It is Warsaw.", hasData: true };
    } else if (country === 'ENGLAND') {
      return { country, question: "What is England's capital?", answer: "It is London.", hasData: true };
    } else if (country === 'SCOTLAND') {
      return { country, question: "What is Scotland's capital?", answer: "It is Edinburgh.", hasData: true };
    }
  } else if (contentLower.includes('nationality')) {
    if (country) {
      let nationality = '';
      if (country === 'POLAND') nationality = 'Polish';
      else if (country === 'ENGLAND') nationality = 'English';
      else if (country === 'SCOTLAND') nationality = 'Scottish';
      else if (country === 'USA') nationality = 'American';
      else if (country === 'WALES') nationality = 'Welsh';
      else if (country === 'AUSTRALIA') nationality = 'Australian';
      
      if (nationality) {
        return { 
          country,
          question: "What nationality is he?", 
          answer: `He is ${nationality}.`, 
          hasData: true 
        };
      }
    }
  }
  
  // Default country question if nothing specific was found
  if (country) {
    return {
      country,
      question: "What can you see in this image?",
      answer: `Something from ${country}.`,
      hasData: true
    };
  }
  
  // Fallback to title parsing if available
  if (title) {
    if (title.includes('→')) {
      const parts = title.split('→');
      return {
        country: '',
        question: parts[0].trim(),
        answer: parts[1].trim(),
        hasData: true
      };
    } else if (title.includes('?')) {
      return {
        country: '',
        question: title.split('?')[0].trim() + '?',
        answer: description,
        hasData: true
      };
    } else if (title.match(/^[A-Z\s]+\s\(Files/)) {
      return {
        country: title.split('(')[0].trim(),
        question: "What country is this?",
        answer: `It is ${title.split('(')[0].trim()}.`,
        hasData: true
      };
    }
  }
  
  // Default fallback
  return { 
    country: "",
    question: "", 
    answer: "",
    hasData: false
  };
}

// Helper function to format Callan-style answers at the component level
function formatFullAnswer(question: string, answer: string): string {
  // Standardize question for matching
  const q = question.trim().toLowerCase();
  
  // Handle Yes/No questions with Callan-style full answers
  if (q.startsWith('do you')) {
    // Special case for dog question
    if (q.includes('dog')) {
      if (answer.startsWith('Yes')) return "Yes, I do. I have a dog.";
      if (answer.startsWith('No')) return "No, I don't. I don't have a dog.";
    }
    
    if (answer.startsWith('Yes')) return `Yes, I do${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, I don't${answer.slice(3)}`;
  }
  
  if (q.startsWith('does he')) {
    if (answer.startsWith('Yes')) return `Yes, he does${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, he doesn't${answer.slice(3)}`;
  }
  
  if (q.startsWith('does she')) {
    if (answer.startsWith('Yes')) return `Yes, she does${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, she doesn't${answer.slice(3)}`;
  }
  
  if (q.startsWith('can you')) {
    if (answer.startsWith('Yes')) return `Yes, I can${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, I can't${answer.slice(3)}`;
  }
  
  if (q.startsWith('is it')) {
    if (answer.startsWith('Yes')) return `Yes, it is${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, it isn't${answer.slice(3)}`;
  }
  
  if (q.startsWith('are you')) {
    if (answer.startsWith('Yes')) return `Yes, I am${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, I'm not${answer.slice(3)}`;
  }
  
  if (q.startsWith('have you')) {
    if (answer.startsWith('Yes')) return `Yes, I have${answer.slice(4)}`;
    if (answer.startsWith('No')) return `No, I haven't${answer.slice(3)}`;
  }
  
  if (q.startsWith('did you')) {
    if (answer.startsWith('Yes')) return `Yes, I did. I did it yesterday.`;
    if (answer.startsWith('No')) return `No, I didn't. I didn't do it.`;
  }
  
  // Handle "what do you like" question
  if (q.startsWith('what do you like')) {
    return `I like ${answer || 'books, sports, and music'}. I especially enjoy reading.`;
  }
  
  // What/Where/Why/How questions with proper sentence structure
  if (q.startsWith('what') && !answer.includes("It is") && !answer.includes("They are")) {
    if (!answer.includes(" is ") && !answer.includes(" are ")) {
      return answer.charAt(0).toUpperCase() + answer.slice(1);
    }
  }
  
  if (q.startsWith('where') && !answer.includes("It is")) {
    if (!answer.includes(" is ")) {
      return `It is in ${answer}`;
    }
  }
  
  // Return the original answer if no special formatting applies
  return answer;
}

function QuestionAnswerDisplay({ 
  material, 
  isEditMode, 
  showQuestions = true, 
  bookId, 
  unitId 
}: QuestionAnswerDisplayProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Query Excel data from the API
  const {
    data: excelData,
    isLoading: isExcelLoading,
    error: excelError
  } = useQuery({
    queryKey: [`/api/direct/${bookId}/${unitId}/excel-qa`],
    queryFn: async () => {
      // Only fetch if we have bookId and unitId
      if (!bookId || !unitId) return null;
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/direct/${bookId}/${unitId}/excel-qa`);
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || "Failed to load Excel data");
        }
        console.log(`Loaded ${data.count} QA entries from Excel for ${bookId}/${unitId}`);
        return data;
      } catch (error) {
        console.error("Error loading Excel QA data:", error);
        toast({
          title: "Error loading questions",
          description: "Could not load questions from Excel. Falling back to pattern matching.",
          variant: "destructive"
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    enabled: !!bookId && !!unitId, // Only fetch if we have a bookId and unitId
  });
  
  // Get question and answer data
  const qaData = React.useMemo(() => {
    // Clean the filename to prevent code extraction issues
    const filename = material.content || '';
    
    // First check if we have Excel data from the API
    if (excelData && excelData.entries && excelData.entries.length > 0) {
      // Extract code pattern (like "01 I A") from filename if it exists
      const codePatternMatch = filename.match(/(\d{2}\s*[A-Za-z]\s*[A-Za-z])/);
      let extractedCodePattern = '';
      if (codePatternMatch) {
        extractedCodePattern = codePatternMatch[1];
        console.log("Extracted code pattern:", extractedCodePattern, "from filename:", filename);
      }
      
      // Functions to help with matching
      const normalizeString = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
      const normalizedFilename = normalizeString(filename);
      
      // Try several matching strategies in order of precision
      let matchingEntry = null;
      
      // 1. Exact filename match (very unlikely, but most precise)
      matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
        normalizeString(entry.filename) === normalizedFilename
      );
      
      if (matchingEntry) {
        console.log("Found exact match for:", filename);
      }
      
      // 2. If no exact match, try matching by code pattern
      if (!matchingEntry && extractedCodePattern) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizeString(entry.codePattern) === normalizeString(extractedCodePattern)
        );
        
        if (matchingEntry) {
          console.log("Found exact code pattern match:", extractedCodePattern);
        }
      }
      
      // 3. If still no match, check if code pattern is contained in the filename
      if (!matchingEntry) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizedFilename.includes(normalizeString(entry.codePattern))
        );
        
        if (matchingEntry) {
          console.log("Found code pattern contained in filename:", matchingEntry.codePattern);
        }
      }
      
      // 4. If still no match, check if filename contains the question (without ? mark)
      if (!matchingEntry) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
          const questionWithoutQuestionMark = entry.question.replace(/\?$/, '');
          return normalizedFilename.includes(normalizeString(questionWithoutQuestionMark));
        });
        
        if (matchingEntry) {
          console.log("Found question match in filename for:", matchingEntry.question);
        }
      }
      
      // 5. If still no match, check if material description contains code pattern
      if (!matchingEntry && material.description) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizeString(material.description).includes(normalizeString(entry.codePattern))
        );
        
        if (matchingEntry) {
          console.log("Found code pattern in description:", matchingEntry.codePattern);
        }
      }
      
      if (matchingEntry) {
        console.log("Found Excel API mapping for:", filename);
        const data = {
          question: matchingEntry.question,
          answer: matchingEntry.answer,
          country: formatText.determineCountry(material.content),
          hasData: true,
          category: "" // No category needed from Excel mapping
        };
        // Apply Callan-style formatting to all answers
        data.answer = formatFullAnswer(data.question, data.answer);
        return data;
      }
    }
    
    // Fall back to local Excel mapping
    const mapping = findMatchingQA(material.content);
    if (mapping) {
      console.log("Found local Excel mapping for:", material.content);
      const data = {
        question: mapping.question,
        answer: mapping.answer,
        country: formatText.determineCountry(material.content),
        hasData: true,
        category: "" // No category needed from Excel mapping
      };
      // Apply Callan-style formatting to all answers
      data.answer = formatFullAnswer(data.question, data.answer);
      return data;
    } else {
      console.log("Falling back to pattern matching for:", material.content);
      const data = getQuestionAnswerFromData(material);
      // Apply Callan-style formatting to all answers
      data.answer = formatFullAnswer(data.question, data.answer);
      return data;
    }
  }, [material, excelData]);
  
  const [editedQuestion, setEditedQuestion] = React.useState<string>(qaData.question);
  const [editedAnswer, setEditedAnswer] = React.useState<string>(qaData.answer);
  const [editedCountry, setEditedCountry] = React.useState<string>(qaData.country);
  const [isFlagging, setIsFlagging] = useState(false);
  const [suggestedQuestion, setSuggestedQuestion] = useState("");
  const [suggestedAnswer, setSuggestedAnswer] = useState("");
  const [flagReason, setFlagReason] = useState("");
  const [isFlagged, setIsFlagged] = useState(false);
  
  // Update state when material changes
  React.useEffect(() => {
    setEditedQuestion(qaData.question);
    setEditedAnswer(qaData.answer);
    setEditedCountry(qaData.country);
    
    // Reset flagging state when material changes
    setIsFlagging(false);
  }, [material.id, qaData.question, qaData.answer, qaData.country]);
  
  // Check if this material's question has been flagged before
  React.useEffect(() => {
    // For a real app, we would check the database
    // For now, we'll use localStorage to remember flagged questions
    const flaggedItems = localStorage.getItem('flaggedQuestions');
    if (flaggedItems) {
      try {
        const parsedItems = JSON.parse(flaggedItems);
        const isAlreadyFlagged = parsedItems.some((item: number) => item === material.id);
        setIsFlagged(isAlreadyFlagged);
      } catch (error) {
        console.error('Error parsing flagged questions from localStorage', error);
      }
    }
  }, [material.id]);
  
  // Save custom questions locally
  React.useEffect(() => {
    if (!isEditMode) return;
    
    // Save to localStorage
    const customQA = JSON.parse(localStorage.getItem('customQA') || '{}');
    customQA[material.id] = {
      question: editedQuestion,
      answer: editedAnswer,
      country: editedCountry
    };
    localStorage.setItem('customQA', JSON.stringify(customQA));
  }, [isEditMode, material.id, editedQuestion, editedAnswer, editedCountry]);
  
  // Load custom questions if available
  React.useEffect(() => {
    const customQA = JSON.parse(localStorage.getItem('customQA') || '{}');
    if (customQA[material.id]) {
      setEditedQuestion(customQA[material.id].question);
      setEditedAnswer(customQA[material.id].answer);
      setEditedCountry(customQA[material.id].country);
    }
  }, [material.id]);

  // Function to handle flagging a question
  const handleFlagQuestion = async () => {
    if (!suggestedQuestion && !suggestedAnswer && !flagReason) {
      toast({
        title: "Missing information",
        description: "Please provide at least one suggestion or reason for flagging this question.",
        variant: "destructive"
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/direct/flag-question", {
        materialId: material.id,
        questionText: editedQuestion || qaData.question,
        answerText: editedAnswer || qaData.answer,
        suggestedQuestion,
        suggestedAnswer,
        reason: flagReason,
        status: 'pending',
        bookId,
        unitId,
        createdAt: new Date()
      });

      toast({
        title: "Question flagged",
        description: "Thank you for your feedback. An administrator will review this question.",
        variant: "default"
      });

      // Save to localStorage to remember this item was flagged
      try {
        const flaggedItems = JSON.parse(localStorage.getItem('flaggedQuestions') || '[]');
        if (!flaggedItems.includes(material.id)) {
          flaggedItems.push(material.id);
          localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedItems));
        }
      } catch (error) {
        console.error('Error saving flagged questions to localStorage', error);
      }
      
      setIsFlagged(true);
      setIsFlagging(false);
      setSuggestedQuestion("");
      setSuggestedAnswer("");
      setFlagReason("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Show loading indicator while fetching Excel data
  if (isLoading || isExcelLoading) {
    return (
      <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100 flex items-center justify-center">
        <RefreshCw className="w-5 h-5 animate-spin text-blue-500 mr-2" />
        <span className="text-blue-700">Loading questions...</span>
      </div>
    );
  }

  if (qaData.hasData || editedQuestion || editedAnswer) {
    return (
      <>
        {showQuestions && (
          <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100 relative">
            {/* Flag button - only for non-edit mode and when questions are shown */}
            {!isEditMode && !isFlagged && (
              <button 
                onClick={() => setIsFlagging(true)}
                className="absolute top-2 right-2 text-gray-400 hover:text-amber-500 transition-colors"
                title="Flag this question as incorrect"
              >
                <Flag className="h-4 w-4" />
              </button>
            )}
            
            {/* Already flagged indicator */}
            {!isEditMode && isFlagged && (
              <div className="absolute top-2 right-2 text-amber-500" title="This question has been flagged">
                <Check className="h-4 w-4" />
              </div>
            )}
            
            {/* Show country name if available */}
            {(qaData.country || editedCountry) && (
              <div className="mb-1 flex items-center justify-center">
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedCountry}
                    onChange={(e) => setEditedCountry(e.target.value)}
                    className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200 text-center focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                ) : (
                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                    {editedCountry || qaData.country}
                  </h3>
                )}
              </div>
            )}
            
            <div className="flex flex-col gap-1">
              {/* Show question */}
              <div className="text-center">
                {isEditMode ? (
                  <textarea
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    className="text-gray-800 text-base bg-white p-1 rounded w-full border-blue-200 border focus:ring-2 focus:ring-blue-300 outline-none text-center"
                    rows={2}
                    placeholder="Question"
                  />
                ) : (
                  <span className="text-gray-800 text-base font-medium block">{editedQuestion || qaData.question}</span>
                )}
              </div>
              
              {/* Show answer */}
              <div className="mt-2 text-center">
                {isEditMode ? (
                  <textarea
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    className="font-medium text-indigo-900 text-base bg-white p-1 rounded w-full border-indigo-200 border focus:ring-2 focus:ring-indigo-300 outline-none text-center"
                    rows={2}
                    placeholder="Answer"
                  />
                ) : (
                  <span className="font-medium text-indigo-900 text-base block">{editedAnswer || qaData.answer}</span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Flag question dialog */}
        {isFlagging && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Flag Incorrect Question</h3>
                <button 
                  onClick={() => setIsFlagging(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Question:</p>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm">
                  {editedQuestion || qaData.question}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Answer:</p>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm">
                  {editedAnswer || qaData.answer}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Suggest Correct Question (optional)
                </label>
                <textarea
                  value={suggestedQuestion}
                  onChange={(e) => setSuggestedQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  rows={2}
                  placeholder="Enter the correct question"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Suggest Correct Answer (optional)
                </label>
                <textarea
                  value={suggestedAnswer}
                  onChange={(e) => setSuggestedAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  rows={2}
                  placeholder="Enter the correct answer"
                />
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Flagging
                </label>
                <textarea
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  rows={3}
                  placeholder="Describe why this question or answer is incorrect"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsFlagging(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFlagQuestion}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Flag
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  
  // For materials with no data but with title
  if (material.title) {
    const cleanedTitle = formatText.cleanFileName(material.title);
    
    return (
      <div className="mb-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
        {isEditMode ? (
          <textarea
            value={cleanedTitle}
            readOnly
            className="font-medium text-gray-700 bg-white p-1 rounded w-full border-gray-200 border"
          />
        ) : (
          <div className="font-medium text-gray-700">
            {cleanedTitle}
          </div>
        )}
      </div>
    );
  }
  
  return null;
}

export default QuestionAnswerDisplay;