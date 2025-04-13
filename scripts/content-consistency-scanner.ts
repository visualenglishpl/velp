import { S3Client, ListBucketsCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// S3 configuration
const S3_BUCKET = process.env.S3_BUCKET || "visualenglishmaterial";
const s3Client = new S3Client({
  region: 'eu-north-1', // Stockholm region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

// Question patterns to normalize
const QUESTION_TYPES = [
  { 
    pattern: /what\s+is/i, 
    responsePrompt: "It is..." 
  },
  { 
    pattern: /what\s+are/i, 
    responsePrompt: "They are..." 
  },
  { 
    pattern: /where\s+is/i, 
    responsePrompt: "It is..." 
  },
  { 
    pattern: /where\s+are/i, 
    responsePrompt: "They are..." 
  },
  { 
    pattern: /who\s+is/i, 
    responsePrompt: "It is..." 
  },
  { 
    pattern: /who\s+are/i, 
    responsePrompt: "They are..." 
  },
  { 
    pattern: /whose\s+is/i, 
    responsePrompt: "It's..." 
  },
  { 
    pattern: /whose\s+are/i, 
    responsePrompt: "They're..." 
  },
  { 
    pattern: /how\s+many/i, 
    responsePrompt: "There are..." 
  },
  { 
    pattern: /when\s+is/i, 
    responsePrompt: "It is..." 
  },
  { 
    pattern: /when\s+are/i, 
    responsePrompt: "They are..." 
  },
  { 
    pattern: /why\s+is/i, 
    responsePrompt: "Because..." 
  },
  { 
    pattern: /why\s+are/i, 
    responsePrompt: "Because..." 
  },
  { 
    pattern: /which\s+is/i, 
    responsePrompt: "It is..." 
  },
  { 
    pattern: /which\s+are/i, 
    responsePrompt: "They are..." 
  },
  { 
    pattern: /can\s+you/i, 
    responsePrompt: "Yes, I can... / No, I can't..." 
  },
  { 
    pattern: /do\s+you/i, 
    responsePrompt: "Yes, I do... / No, I don't..." 
  },
  { 
    pattern: /does\s+he|does\s+she/i, 
    responsePrompt: "Yes, he/she does... / No, he/she doesn't..." 
  },
  { 
    pattern: /is\s+it|is\s+he|is\s+she/i, 
    responsePrompt: "Yes, it/he/she is... / No, it/he/she isn't..." 
  },
  { 
    pattern: /are\s+they|are\s+you/i, 
    responsePrompt: "Yes, they/we are... / No, they/we aren't..." 
  },
  { 
    pattern: /has\s+he|has\s+she|has\s+it/i, 
    responsePrompt: "Yes, he/she/it has... / No, he/she/it hasn't..." 
  },
  { 
    pattern: /have\s+you|have\s+they/i, 
    responsePrompt: "Yes, I/they have... / No, I/they haven't..." 
  }
];

// Common misspellings and fixes
const COMMON_FIXES = [
  { find: /\bWhta\b/gi, replace: "What" },
  { find: /\bWher\b/gi, replace: "Where" },
  { find: /\bWhos\b/gi, replace: "Whose" },
  { find: /\bHwo\b/gi, replace: "How" },
  { find: /\bWy\b/gi, replace: "Why" },
  { find: /\bWich\b/gi, replace: "Which" },
  { find: /\bIs\s+It\s+a\b/gi, replace: "Is It A" },
  { find: /\bdon t\b/gi, replace: "don't" },
  { find: /\bisn t\b/gi, replace: "isn't" },
  { find: /\baren t\b/gi, replace: "aren't" },
  { find: /\bhasn t\b/gi, replace: "hasn't" },
  { find: /\bhaven t\b/gi, replace: "haven't" },
  { find: /\bcouldn t\b/gi, replace: "couldn't" },
  { find: /\bwouldn t\b/gi, replace: "wouldn't" },
  { find: /\bpeek\b/gi, replace: "Peek" }, // For "Peek-a-boo" in Book 0A/0C
  { find: /\bideo\b/gi, replace: "Video" }, // For Video files
  { find: /\bpdf\b/gi, replace: "PDF" },
  { find: /\bswf\b/gi, replace: "SWF" }
];

// Special file prefixes to prioritize
const PRIORITY_PREFIXES = [
  "00 E",
  "00 C",
  "00 A",
  "00 B",
  "00 D"
];

// Function to fix common misspellings and formatting issues
function normalizeText(text: string): string {
  let normalized = text;

  // Apply all common fixes
  COMMON_FIXES.forEach(({ find, replace }) => {
    normalized = normalized.replace(find, replace);
  });

  // Ensure proper capitalization for first letter
  if (normalized.length > 0) {
    normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }

  // Ensure questions end with question mark
  if (QUESTION_TYPES.some(q => q.pattern.test(normalized)) && !normalized.endsWith('?')) {
    normalized += '?';
  }

  return normalized;
}

// Function to get appropriate response prompt based on question type
function getResponsePrompt(question: string): string | null {
  for (const { pattern, responsePrompt } of QUESTION_TYPES) {
    if (pattern.test(question)) {
      return responsePrompt;
    }
  }
  return null;
}

// Function to scan S3 bucket for books
async function scanBooks() {
  console.log(`Scanning bucket: ${S3_BUCKET}`);
  
  try {
    // List all objects to find book prefixes
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Delimiter: '/',
      Prefix: ''
    });
    
    const response = await s3Client.send(listCommand);
    
    if (!response.CommonPrefixes || response.CommonPrefixes.length === 0) {
      console.log('No book prefixes found in bucket.');
      return;
    }
    
    // Process each book
    for (const prefix of response.CommonPrefixes) {
      if (prefix.Prefix) {
        await scanBook(prefix.Prefix);
      }
    }
    
  } catch (error) {
    console.error('Error scanning books:', error);
  }
}

// Function to scan a specific book
async function scanBook(bookPrefix: string) {
  const bookId = bookPrefix.replace(/\//g, '');
  console.log(`\nScanning book: ${bookId}`);
  
  try {
    // List all objects to find unit prefixes within the book
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Delimiter: '/',
      Prefix: bookPrefix
    });
    
    const response = await s3Client.send(listCommand);
    
    if (!response.CommonPrefixes || response.CommonPrefixes.length === 0) {
      console.log(`No unit prefixes found in book ${bookId}.`);
      return;
    }
    
    // Process each unit
    for (const prefix of response.CommonPrefixes) {
      if (prefix.Prefix) {
        await scanUnit(bookId, prefix.Prefix);
      }
    }
    
  } catch (error) {
    console.error(`Error scanning book ${bookId}:`, error);
  }
}

// Function to scan a specific unit
async function scanUnit(bookId: string, unitPrefix: string) {
  // Extract unit id from prefix
  const unitId = unitPrefix.split('/').filter(Boolean)[1] || 'unknown';
  console.log(`\n  Scanning unit: ${unitId} in ${bookId}`);
  
  try {
    // List all objects in the unit
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: unitPrefix
    });
    
    const response = await s3Client.send(listCommand);
    
    if (!response.Contents || response.Contents.length === 0) {
      console.log(`  No content found in unit ${unitId}.`);
      return;
    }
    
    // Count various file types
    let fileTypes = {
      images: 0,
      pdfs: 0,
      swfs: 0,
      others: 0
    };
    
    // Count priority "00 X" files
    let priorityFiles = new Map<string, number>();
    PRIORITY_PREFIXES.forEach(prefix => priorityFiles.set(prefix, 0));
    
    // Track questions for consistency
    let questions: { original: string, normalized: string, prompt: string | null }[] = [];
    
    // Process each file in the unit
    for (const obj of response.Contents) {
      if (!obj.Key) continue;
      
      const filename = obj.Key.split('/').pop() || '';
      
      // Skip directories
      if (filename === '') continue;
      
      // Count file types
      if (filename.toLowerCase().endsWith('.pdf')) {
        fileTypes.pdfs++;
      } else if (filename.toLowerCase().endsWith('.swf')) {
        fileTypes.swfs++;
      } else if (['.png', '.jpg', '.jpeg', '.gif'].some(ext => filename.toLowerCase().endsWith(ext))) {
        fileTypes.images++;
        
        // Check if it's a priority "00 X" file
        for (const prefix of PRIORITY_PREFIXES) {
          if (filename.startsWith(prefix)) {
            priorityFiles.set(prefix, (priorityFiles.get(prefix) || 0) + 1);
            break;
          }
        }
        
        // Extract potential question from filename
        const questionMatch = extractQuestion(filename);
        if (questionMatch) {
          const normalized = normalizeText(questionMatch);
          const prompt = getResponsePrompt(normalized);
          
          questions.push({
            original: questionMatch,
            normalized,
            prompt
          });
        }
      } else {
        fileTypes.others++;
      }
    }
    
    // Log file type summary
    console.log(`  File types in ${unitId}:`);
    console.log(`    Images: ${fileTypes.images}`);
    console.log(`    PDFs: ${fileTypes.pdfs}`);
    console.log(`    SWFs: ${fileTypes.swfs}`);
    console.log(`    Others: ${fileTypes.others}`);
    
    // Log priority files
    console.log(`  Priority "00 X" files in ${unitId}:`);
    PRIORITY_PREFIXES.forEach(prefix => {
      console.log(`    ${prefix}: ${priorityFiles.get(prefix) || 0}`);
    });
    
    // Log question summary
    if (questions.length > 0) {
      console.log(`  Found ${questions.length} potential questions in ${unitId}`);
      
      // Log some sample questions with their normalized form and prompts
      const sampleSize = Math.min(5, questions.length);
      console.log(`  Sample questions (${sampleSize} of ${questions.length}):`);
      
      for (let i = 0; i < sampleSize; i++) {
        const q = questions[i];
        console.log(`    Original: "${q.original}"`);
        console.log(`    Normalized: "${q.normalized}"`);
        console.log(`    Prompt: ${q.prompt || "None"}`);
        console.log('');
      }
    } else {
      console.log(`  No questions found in ${unitId}`);
    }
    
  } catch (error) {
    console.error(`Error scanning unit ${unitId}:`, error);
  }
}

// Helper function to extract question from filename
function extractQuestion(filename: string): string | null {
  // Remove file extension
  const withoutExtension = filename.replace(/\.[^/.]+$/, "");
  
  // Try to extract question based on common patterns in filenames
  
  // Pattern 1: "## X Y What is this - It is a ball.png"
  // where ## is a number, X and Y are single letters, and the question is after those
  const dashPattern = /^\d+\s+[A-Z]\s+[A-Z]\s+(.*?)(?:\s+[-–]\s+.*)?$/;
  const dashMatch = withoutExtension.match(dashPattern);
  if (dashMatch && dashMatch[1]) {
    return dashMatch[1];
  }
  
  // Pattern 2: "## X Y What is this.png"
  // where ## is a number, X and Y are single letters, and the rest is the question
  const simplePattern = /^\d+\s+[A-Z]\s+[A-Z]\s+(.*)$/;
  const simpleMatch = withoutExtension.match(simplePattern);
  if (simpleMatch && simpleMatch[1]) {
    return simpleMatch[1];
  }
  
  // Pattern 3: Check if file has any question words
  const questionWords = ['what', 'where', 'when', 'why', 'how', 'which', 'who', 'whose', 'can', 'do', 'does', 'is', 'are', 'has', 'have'];
  const lowerFilename = withoutExtension.toLowerCase();
  
  for (const word of questionWords) {
    if (lowerFilename.includes(word)) {
      // Extract everything after the question word
      const parts = lowerFilename.split(word);
      if (parts.length > 1) {
        return word + parts[1];
      }
    }
  }
  
  return null;
}

// Execute the scanner
async function run() {
  console.log('Starting content consistency scanner...');
  await scanBooks();
  console.log('\nScanning complete!');
}

run().catch(console.error);