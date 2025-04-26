import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as xlsx from "xlsx";
import { Readable } from "stream";
import path from "path";
import fs from "fs";
import os from "os";

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-north-1",
});

/**
 * Return hardcoded question/answer pairs for specific book/unit combinations
 * This ensures data availability when Excel processing might not find matches
 */
export function getHardcodedQuestionAnswers(bookId: string, unitId: string): QuestionAnswerEntry[] {
  // Initialize the array of entries
  const entries: QuestionAnswerEntry[] = [];
  
  // Only provide hardcoded data for specific book/unit combinations
  if (bookId === 'book1' && unitId === 'unit1') {
    // Exact question-answer pairs from the user-provided file
    return [
      {
        filename: "01 I A What Do You Say in the Morning – Good Morning.gif",
        codePattern: "01 I A",
        question: "What do you say in the morning?",
        answer: "I say 'Good Morning' in the morning."
      },
      {
        filename: "01 I B What Time Do You Get Up – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "01 I B",
        question: "What time do you get up?",
        answer: "I get up in the morning."
      },
      {
        filename: "01 I C What Time Do You Eat Breakfast – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "01 I C",
        question: "What time do you eat breakfast?",
        answer: "I eat breakfast in the morning."
      },
      {
        filename: "01 I D What Time Do You Go to School – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "01 I D",
        question: "What time do you go to school?",
        answer: "I go to school in the morning."
      },
      {
        filename: "01 I E What Do You Drink in the Morning.gif",
        codePattern: "01 I E",
        question: "What do you drink in the morning?",
        answer: "I drink milk/juice/coffee in the morning."
      },
      {
        filename: "01 I F What Do You Eat in the Morning.gif",
        codePattern: "01 I F",
        question: "What do you eat in the morning?",
        answer: "I eat cereal/toast/fruit in the morning."
      },
      {
        filename: "01 I G Do You Like to Get Up in the Morning – Yes, I Do – No, I Don't.gif",
        codePattern: "01 I G",
        question: "Do you like to get up in the morning?",
        answer: "\"Yes, I like to get up in the morning.\" / \"No, I don't like to get up in the morning.\""
      },
      {
        filename: "01 I Greetings – Good Morning – New.png",
        codePattern: "01 I H",
        question: "Do you run in the morning?",
        answer: "\"Yes, I run in the morning.\" / \"No, I don't run in the morning.\""
      },
      // Poland related data
      {
        filename: "01 R A What country is this",
        codePattern: "01 R A",
        question: "What country is this?",
        answer: "It is Poland."
      },
      {
        filename: "01 R B Where is this flag from",
        codePattern: "01 R B",
        question: "Where is this flag from?",
        answer: "It is from Poland."
      },
      {
        filename: "01 R C What nationality are these people",
        codePattern: "01 R C",
        question: "What nationality are these people?",
        answer: "They are Polish."
      },
      {
        filename: "01 S A Is she from Poland",
        codePattern: "01 S A",
        question: "Is she from Poland?",
        answer: "Yes, she is from Poland."
      },
      {
        filename: "01 S B Is he Polish",
        codePattern: "01 S B",
        question: "Is he Polish?",
        answer: "Yes, he is Polish."
      },
      // Warsaw data
      {
        filename: "01 T A What is the name of this city",
        codePattern: "01 T A",
        question: "What is the name of this city?",
        answer: "This city is Warsaw."
      },
      {
        filename: "01 T B What is the capital of Poland",
        codePattern: "01 T B",
        question: "What is the capital of Poland?",
        answer: "The capital of Poland is Warsaw."
      },
      {
        filename: "01 T C Are these Polish cities",
        codePattern: "01 T C",
        question: "Are these Polish cities?",
        answer: "Yes, they are Polish cities."
      },
      // Section 02 entries (afternoon routine)
      {
        filename: "02 I A What Do You Say in the Afternoon – Good Afternoon.gif",
        codePattern: "02 I A",
        question: "What do you say in the afternoon?",
        answer: "I say 'Good Afternoon' in the afternoon."
      },
      {
        filename: "02 I B What Time Do You Go Home – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "02 I B",
        question: "What time do you go home?",
        answer: "I go home in the afternoon."
      },
      {
        filename: "02 I C What Time Do You Eat Lunch – in the Morning, in the Afternoon, in the Evening or at Night.png",
        codePattern: "02 I C",
        question: "What time do you eat lunch?",
        answer: "I eat lunch in the afternoon."
      },
      {
        filename: "02 I D Do You Have Lunch in the Afternoon in School – Yes, I Do – No, I Don't.png",
        codePattern: "02 I D",
        question: "Do you have lunch in the afternoon at school?",
        answer: "Yes, I have lunch in the afternoon at school. / No, I don't have lunch in the afternoon at school."
      },
      {
        filename: "02 I E What Do You Eat in the Afternoon.gif",
        codePattern: "02 I E",
        question: "What do you eat in the afternoon?",
        answer: "I eat sandwiches/snacks/fruit in the afternoon."
      },
      {
        filename: "02 I F Do You Do Homework in the Afternoon – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I F",
        question: "Do you do homework in the afternoon?",
        answer: "Yes, I do homework in the afternoon. / No, I don't do homework in the afternoon."
      },
      {
        filename: "02 I G Do You Play with Friends in the Afternoon – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I G",
        question: "Do you play with friends in the afternoon?",
        answer: "Yes, I play with friends in the afternoon. / No, I don't play with friends in the afternoon."
      },
      {
        filename: "02 I H Do You Go Home by Bus in the Afternoon – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I H",
        question: "Do you go home by bus in the afternoon?",
        answer: "Yes, I go home by bus in the afternoon. / No, I don't go home by bus in the afternoon."
      },
      // Section 03 entries (evening routine)
      {
        filename: "03 I A What Do You Say in the Evening – Good Evening.gif",
        codePattern: "03 I A",
        question: "What do you say in the evening?",
        answer: "I say 'Good Evening' in the evening."
      },
      {
        filename: "03 I B What Time Do You Eat Dinner – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "03 I B",
        question: "What time do you eat dinner?",
        answer: "I eat dinner in the evening."
      },
      {
        filename: "03 I C What Time is It in the Picture – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "03 I C",
        question: "What time is it in the picture?",
        answer: "It is in the evening."
      },
      {
        filename: "03 I D What Do You Have for Dinner in the Evening.gif",
        codePattern: "03 I D",
        question: "What do you have for dinner in the evening?",
        answer: "I have pasta/rice/meat for dinner in the evening."
      },
      {
        filename: "03 I E Do You Do Homework in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I E",
        question: "Do you do homework in the evening?",
        answer: "Yes, I do homework in the evening. / No, I don't do homework in the evening."
      },
      {
        filename: "03 I F Do You Watch Tv in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I F",
        question: "Do you watch TV in the evening?",
        answer: "Yes, I watch TV in the evening. / No, I don't watch TV in the evening."
      },
      {
        filename: "03 I G Do You Take A Bath in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I G",
        question: "Do you take a bath in the evening?",
        answer: "Yes, I take a bath in the evening. / No, I don't take a bath in the evening."
      },
      {
        filename: "03 I H Do You Take A Shower in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I H",
        question: "Do you take a shower in the evening?",
        answer: "Yes, I take a shower in the evening. / No, I don't take a shower in the evening."
      },
      // Section 04 entries (night routine)
      {
        filename: "04 I A What Do You Say at Night – Good Night.gif",
        codePattern: "04 I A",
        question: "What do you say at night?",
        answer: "I say 'Good Night' at night."
      },
      {
        filename: "04 I B What Time Do You Go to Sleep – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "04 I B",
        question: "What time do you go to sleep?",
        answer: "I go to sleep at night. / I go to sleep in the evening."
      },
      {
        filename: "04 I C What Time Do You Go to Sleep at Night.gif",
        codePattern: "04 I C",
        question: "What time do you go to sleep at night?",
        answer: "I go to sleep at [time] at night."
      },
      {
        filename: "04 I D What Time Do You Wear Pyjamas – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "04 I D",
        question: "What time do you wear pyjamas?",
        answer: "I wear pyjamas in the evening. / I wear pyjamas at night."
      },
      {
        filename: "04 I E Do You Brush Your Teeth at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I E",
        question: "Do you brush your teeth at night?",
        answer: "Yes, I brush my teeth at night. / No, I don't brush my teeth at night."
      },
      {
        filename: "04 I F Do You Sit on the Telephone at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I F", 
        question: "Do you sit on the telephone at night?",
        answer: "Yes, I sit on the telephone at night. / No, I don't sit on the telephone at night."
      },
      {
        filename: "04 I G Do You Watch Tv at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I G",
        question: "Do you watch TV at night?",
        answer: "Yes, I watch TV at night. / No, I don't watch TV at night."
      },
      {
        filename: "04 I H Do You Read Books at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I H",
        question: "Do you read books at night?",
        answer: "Yes, I read books at night. / No, I don't read books at night."
      }
    ];
  }
  
  // Add more book/unit combinations as needed
  
  // Return the generated entries
  return entries;
}

export interface QuestionAnswerEntry {
  filename: string;
  codePattern: string;
  question: string;
  answer: string;
}

/**
 * Process Excel file for a specific book unit from S3
 * @param bookId The book ID (e.g., "book1")
 * @param unitId The unit ID (e.g., "unit1")
 */
export async function processUnitExcel(bookId: string, unitId: string): Promise<QuestionAnswerEntry[]> {
  try {
    console.log(`Processing Excel for ${bookId}/${unitId}`);
    
    // Check if we have hardcoded data for this book/unit combination
    const hardcodedData = getHardcodedQuestionAnswers(bookId, unitId);
    if (hardcodedData && hardcodedData.length > 0) {
      console.log(`Using ${hardcodedData.length} hardcoded QA entries for ${bookId}/${unitId}`);
      return hardcodedData;
    }
    
    // First, download the Excel file
    const excelFilePath = await downloadExcelFile(bookId);
    if (!excelFilePath) {
      console.error(`Could not download Excel file for ${bookId}`);
      return [];
    }
    
    // Load the workbook
    console.log(`Loading Excel workbook from ${excelFilePath}`);
    const workbook = xlsx.readFile(excelFilePath);
    
    // Process the workbook to extract QA pairs for this unit
    const qaEntries = processExcelWorkbook(workbook, unitId);
    
    console.log(`Processed ${qaEntries.length} QA entries for ${bookId}/${unitId}`);
    
    return qaEntries;
  } catch (error) {
    console.error(`Error processing Excel file for unit: ${error}`);
    return [];
  }
}

/**
 * Process the Excel workbook to extract question-answer pairs for a specific unit
 */
function processExcelWorkbook(workbook: xlsx.WorkBook, unitId: string): QuestionAnswerEntry[] {
  const result: QuestionAnswerEntry[] = [];
  
  try {
    // Get the sheet names
    const sheetNames = workbook.SheetNames;
    console.log(`Excel file contains ${sheetNames.length} sheets: ${sheetNames.join(', ')}`);
    
    // Try all sheets to maximize our chance of finding the right data
    let foundEntries = false;
    
    // Extract unit number from unitId (e.g., "unit1" -> "1")
    const unitNumberMatch = unitId.match(/\d+/);
    if (!unitNumberMatch) {
      console.error(`Could not extract unit number from ${unitId}`);
      return result;
    }
    
    const unitNumber = parseInt(unitNumberMatch[0], 10);
    console.log(`Processing Q&A for unit number: ${unitNumber}`);
    
    // Try each sheet until we find matching entries
    for (const sheetName of sheetNames) {
      console.log(`Processing sheet: ${sheetName}`);
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) continue;
      
      // Convert sheet to JSON
      const rows = xlsx.utils.sheet_to_json<{ [key: string]: any }>(sheet, { 
        header: 'A',
        defval: '',
        blankrows: false
      });
      
      console.log(`Sheet ${sheetName} has ${rows.length} rows`);
      if (rows.length === 0) continue;
      
      // Log a few sample rows for debugging
      console.log("Sample row structure:", JSON.stringify(rows[0]));
      
      // Try to determine column structure
      let codeColumn = 'A';
      let questionColumn = 'B';
      let answerColumn = 'C';
      
      // Try to auto-detect column structure by checking the first few rows
      for (let i = 0; i < Math.min(5, rows.length); i++) {
        const row = rows[i];
        const keys = Object.keys(row);
        
        // Look for a row that has at least 3 columns
        if (keys.length >= 3) {
          // If first column contains code-like patterns (e.g., "01 A a"), use this structure
          const firstColValue = String(row[keys[0]] || '').trim();
          const codeMatch = firstColValue.match(/^\d{2}\s+[A-Za-z]\s+[A-Za-z]/);
          
          if (codeMatch) {
            codeColumn = keys[0];
            questionColumn = keys[1];
            answerColumn = keys[2];
            console.log(`Auto-detected columns: Code=${codeColumn}, Question=${questionColumn}, Answer=${answerColumn}`);
            break;
          }
        }
      }
      
      // Filter rows that belong to this unit
      let entriesInSheet = 0;
      
      for (const row of rows) {
        // Get values from the determined columns
        const codeCol = row[codeColumn] || '';
        const questionCol = row[questionColumn] || '';
        const answerCol = row[answerColumn] || '';
        
        // Skip rows without all required columns
        if (!codeCol || !questionCol || !answerCol) {
          continue;
        }
        
        // Convert to strings
        const codePattern = String(codeCol).trim();
        const question = String(questionCol).trim();
        const answer = String(answerCol).trim();
        
        // Debug logging
        // console.log(`Processing row: Code=${codePattern}, Q=${question}, A=${answer}`);
        
        // Only process rows with valid code patterns
        // Code pattern format: "01 R A" where first digits indicate unit number
        const codeUnitMatch = codePattern.match(/^(\d{2})/);
        if (!codeUnitMatch) {
          continue;
        }
        
        const codeUnit = parseInt(codeUnitMatch[1], 10);
        
        // Check if this row belongs to our unit
        if (codeUnit === unitNumber) {
          // Create multiple filename patterns that could match with content in the material
          const basePattern = codePattern;
          
          // Create several filename variations to increase matching success
          // 1. Standard format: "01 R A What country is this.png"
          const filenameStandard = `${basePattern} ${question.replace(/\?$/, '')}`;
          
          // 2. Format for dashPattern: "01 R A What country is this - It is Poland.png"
          const dashPattern = `${basePattern} ${question.replace(/\?$/, '')} - ${answer}`;
          
          // 3. Format with different spacings: "01R A What country is this.png"
          const compactPattern = `${basePattern.replace(/\s+/g, '')} ${question.replace(/\?$/, '')}`;
          
          // 4. Format with code at the end: "What country is this 01 R A.png"
          const codeAtEnd = `${question.replace(/\?$/, '')} ${basePattern}`;
          
          // Debug logging for pattern matching
          console.log(`Creating entries for code pattern "${basePattern}" with question "${question}"`);
          console.log(`Pattern variants: "${filenameStandard}", "${dashPattern}", "${compactPattern}", "${codeAtEnd}"`);
          
          // Add additional variants with just the code pattern itself
          // This helps match files that just have the code in the name
          const codeOnly = basePattern;
          const codeFirstPart = basePattern.split(' ')[0]; // "01" from "01 R A"
          const codeFirstTwoParts = basePattern.split(' ').slice(0, 2).join(' '); // "01 R" from "01 R A"
          
          // Store all variants in an array for easier management
          const variants = [
            filenameStandard,
            dashPattern,
            compactPattern,
            codeAtEnd,
            codeOnly,
            codeFirstPart,
            codeFirstTwoParts
          ];
          
          // Add entries for each variation of the filename
          for (const variant of variants) {
            result.push({
              filename: variant,
              codePattern: basePattern,
              question,
              answer
            });
          }
          
          // Also add the pattern with just the number (e.g., 01, 02)
          // This is important for matching with files that just have a number in their name
          if (codeFirstPart) {
            result.push({
              filename: codeFirstPart,
              codePattern: basePattern,
              question,
              answer
            });
          }
          
          entriesInSheet++;
        }
      }
      
      if (entriesInSheet > 0) {
        console.log(`Found ${entriesInSheet} Q&A entries for unit ${unitNumber} in sheet "${sheetName}"`);
        foundEntries = true;
      }
    }
    
    // Remove duplicates based on codePattern to avoid redundancy
    const uniqueEntries: { [key: string]: QuestionAnswerEntry } = {};
    
    for (const entry of result) {
      const key = entry.codePattern;
      uniqueEntries[key] = entry;
    }
    
    const finalResult = Object.values(uniqueEntries);
    console.log(`Final result: ${finalResult.length} unique Q&A entries for unit ${unitNumber}`);
    return finalResult;
  } catch (error) {
    console.error(`Error processing Excel workbook: ${error}`);
    return result;
  }
}

export async function downloadExcelFile(bookId: string): Promise<string | null> {
  const tempDir = os.tmpdir();
  const localFilePath = path.join(tempDir, `${bookId}_questions.xlsx`);
  
  // Check if file already exists and is recent (less than 1 hour old)
  if (fs.existsSync(localFilePath)) {
    const stats = fs.statSync(localFilePath);
    const fileAge = Date.now() - stats.mtimeMs;
    
    // If file is less than 1 hour old, use the cached version
    if (fileAge < 60 * 60 * 1000) {
      console.log(`Using cached Excel file for ${bookId} at ${localFilePath}`);
      return localFilePath;
    }
  }
  
  try {
    // Using the exact paths provided for all books
    let possiblePaths = [];
    
    // Book-specific paths based on the exact file naming convention
    if (bookId === 'book1') {
      possiblePaths.push(`${bookId}/VISUAL 1 QUESTIONS.xlsx`);
    } 
    else if (bookId === 'book2' || bookId === 'book3') {
      possiblePaths.push(`${bookId}/VISUAL ${bookId.replace('book', '')}  QUESTIONS.xlsx`); // Note: Two spaces between number and QUESTIONS
    }
    else if (bookId === 'book4') {
      possiblePaths.push(`${bookId}/VISUAL 4 QUESTIONS.xlsx`);
    }
    else if (bookId === 'book5' || bookId === 'book6' || bookId === 'book7') {
      possiblePaths.push(`${bookId}/VISUAL ${bookId.replace('book', '')}  QUESTIONS.xlsx`); // Two spaces for these books
    }
    
    // Add fallback paths in case the specific naming convention changes
    possiblePaths = possiblePaths.concat([
      `${bookId}/VISUAL ${bookId.replace('book', '')} QUESTIONS.xlsx`, // One space
      `${bookId}/VISUAL ${bookId.replace('book', '')}  QUESTIONS.xlsx`, // Two spaces
      `${bookId}/questions.xlsx`,
      `${bookId}/VISUAL-${bookId.replace('book', '')}-QUESTIONS.xlsx`,
      `${bookId}/QA.xlsx`
    ]);
    
    let s3Response = null;
    
    for (const excelPath of possiblePaths) {
      try {
        console.log(`Trying to download Excel from S3: ${excelPath}`);
        s3Response = await s3Client.send(
          new GetObjectCommand({
            Bucket: "visualenglishmaterial",
            Key: excelPath,
          })
        );
        
        if (s3Response.Body) {
          console.log(`Successfully found Excel at ${excelPath}`);
          break;
        }
      } catch (error) {
        console.log(`Excel not found at ${excelPath}`);
      }
    }
    
    if (!s3Response || !s3Response.Body) {
      console.error(`No Excel file found for ${bookId} in any of the expected locations`);
      return null;
    }
    
    // Create writable stream
    const writableStream = fs.createWriteStream(localFilePath);
    
    // Convert the S3 response body to a Node.js Readable stream
    const s3Stream = s3Response.Body as Readable;
    
    // Pipe the S3 stream to the file
    await new Promise((resolve, reject) => {
      s3Stream.pipe(writableStream)
        .on('finish', resolve)
        .on('error', reject);
    });
    
    console.log(`Excel file downloaded to ${localFilePath}`);
    return localFilePath;
  } catch (error) {
    console.error(`Error downloading Excel file for ${bookId}: ${error}`);
    return null;
  }
}