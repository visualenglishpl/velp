import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as xlsx from 'xlsx';
import fs from 'fs';
import { storage } from './storage';

const S3_BUCKET = process.env.S3_BUCKET || "visualenglishmaterial";

// Create the S3 client with the correct region
const s3Client = new S3Client({
  region: 'eu-north-1', // Stockholm region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

// Interface for the question-answer data
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
    
    // Construct the S3 key for the Excel file
    const excelKey = `${bookId}/VISUAL 1 QUESTIONS.xlsx`;
    
    // Download the Excel file from S3
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: excelKey
    });
    
    // Try to fetch from S3
    try {
      console.log(`Fetching Excel file from S3: ${excelKey}`);
      const response = await s3Client.send(command);
      
      if (!response.Body) {
        throw new Error("Empty response body from S3");
      }
      
      // Read the Excel data
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as any) {
        chunks.push(chunk);
      }
      
      const buffer = Buffer.concat(chunks);
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      
      // Process workbook to get QA mappings for this unit
      return processExcelWorkbook(workbook, unitId);
    } catch (s3Error) {
      console.error("Error fetching Excel from S3:", s3Error);
      
      // If we already have cached data, return it
      const cachedData = await storage.getUnitQuestionAnswers(bookId, unitId);
      if (cachedData && cachedData.length > 0) {
        console.log(`Using cached QA data for ${bookId}/${unitId}`);
        return cachedData;
      }
      
      // If all else fails, return empty array
      return [];
    }
  } catch (error) {
    console.error(`Error processing Excel for ${bookId}/${unitId}:`, error);
    return [];
  }
}

/**
 * Process the Excel workbook to extract question-answer pairs for a specific unit
 */
function processExcelWorkbook(workbook: xlsx.WorkBook, unitId: string): QuestionAnswerEntry[] {
  try {
    // Extract the unit number from unitId (e.g., "unit1" -> 1)
    const unitNumber = parseInt(unitId.replace(/\D/g, ''), 10);
    if (isNaN(unitNumber)) {
      throw new Error(`Invalid unit ID: ${unitId}`);
    }
    
    // Find the worksheet for this unit
    const sheetName = workbook.SheetNames.find(name => 
      name.toLowerCase().includes(`unit ${unitNumber}`) || 
      name.toLowerCase() === `u${unitNumber}` ||
      name.toLowerCase() === `unit${unitNumber}`
    );
    
    if (!sheetName) {
      console.warn(`No worksheet found for unit ${unitNumber}`);
      return [];
    }
    
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
    // Process the data - assuming format is:
    // Column A: Code Pattern or Filename
    // Column B: Question
    // Column C: Answer
    const qaEntries: QuestionAnswerEntry[] = [];
    
    for (const row of jsonData) {
      const rowObj = row as any;
      
      // Check if any of these column combinations exist
      const filenameField = Object.keys(rowObj).find(key => 
        key.includes('file') || 
        key.toLowerCase() === 'a' || 
        key.toLowerCase().includes('code')
      );
      
      const questionField = Object.keys(rowObj).find(key => 
        key.includes('question') || 
        key.toLowerCase() === 'b' || 
        key.toLowerCase().includes('q')
      );
      
      const answerField = Object.keys(rowObj).find(key => 
        key.includes('answer') || 
        key.toLowerCase() === 'c' || 
        key.toLowerCase().includes('a')
      );
      
      if (filenameField && questionField && answerField) {
        const filename = String(rowObj[filenameField] || '').trim();
        const question = String(rowObj[questionField] || '').trim();
        const answer = String(rowObj[answerField] || '').trim();
        
        if (filename && question) {
          // Extract code pattern from filename (e.g., "01 I A")
          const codeMatch = filename.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])/i);
          const codePattern = codeMatch 
            ? `${codeMatch[1]} ${codeMatch[2].toUpperCase()} ${codeMatch[3].toUpperCase()}`
            : "";
          
          qaEntries.push({
            filename,
            codePattern,
            question,
            answer
          });
        }
      }
    }
    
    console.log(`Processed ${qaEntries.length} QA entries for unit ${unitNumber}`);
    return qaEntries;
  } catch (error) {
    console.error("Error processing Excel workbook:", error);
    return [];
  }
}

// Function to download and save the Excel file to disk
export async function downloadExcelFile(bookId: string): Promise<string | null> {
  try {
    const excelKey = `${bookId}/VISUAL 1 QUESTIONS.xlsx`;
    const localPath = `./temp-${bookId}-questions.xlsx`;
    
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: excelKey
    });
    
    const response = await s3Client.send(command);
    
    if (!response.Body) {
      throw new Error("Empty response body from S3");
    }
    
    // Read the Excel data
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }
    
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync(localPath, buffer);
    
    console.log(`Downloaded ${excelKey} to ${localPath}`);
    return localPath;
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    return null;
  }
}