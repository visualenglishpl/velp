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
    
    // Excel file should have one sheet that contains all Q&A mappings
    const sheet = workbook.Sheets[sheetNames[0]];
    if (!sheet) {
      console.error("No sheet found in Excel file");
      return result;
    }
    
    // Convert sheet to JSON
    const rows = xlsx.utils.sheet_to_json<{ [key: string]: any }>(sheet);
    
    // Extract unit number from unitId (e.g., "unit1" -> "1")
    const unitNumberMatch = unitId.match(/\d+/);
    if (!unitNumberMatch) {
      console.error(`Could not extract unit number from ${unitId}`);
      return result;
    }
    
    const unitNumber = parseInt(unitNumberMatch[0], 10);
    console.log(`Processing Q&A for unit number: ${unitNumber}`);
    
    // Filter rows that belong to this unit
    for (const row of rows) {
      // The Excel structure has:
      // Column A: Code pattern (e.g., "01 R A")
      // Column B: Question
      // Column C: Answer
      
      // Skip rows without all required columns
      const codeCol = row['__EMPTY'] || row['A'] || row[0];
      const questionCol = row['__EMPTY_1'] || row['B'] || row[1];
      const answerCol = row['__EMPTY_2'] || row['C'] || row[2];
      
      if (!codeCol || !questionCol || !answerCol) {
        continue;
      }
      
      // Convert to strings
      const codePattern = String(codeCol).trim();
      const question = String(questionCol).trim();
      const answer = String(answerCol).trim();
      
      // Only process rows with valid code patterns
      // Code pattern format: "01 R A" where first digits indicate unit number
      const codeUnitMatch = codePattern.match(/^(\d{2})/);
      if (!codeUnitMatch) {
        continue;
      }
      
      const codeUnit = parseInt(codeUnitMatch[1], 10);
      
      // Check if this row belongs to our unit
      if (codeUnit === unitNumber) {
        // Create a filename that could match with the content in the material
        // Format: "01 R A What country is this.png"
        const filename = `${codePattern} ${question.replace(/\?$/, '')}.png`;
        
        result.push({
          filename,
          codePattern,
          question,
          answer
        });
      }
    }
    
    console.log(`Found ${result.length} Q&A entries for unit ${unitNumber}`);
    return result;
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
    // Different books may have differently named Excel files
    // Let's try a few standard patterns
    const possiblePaths = [
      `${bookId}/VISUAL ${bookId.replace('book', '')} QUESTIONS.xlsx`,
      `${bookId}/questions.xlsx`,
      `${bookId}/VISUAL-${bookId.replace('book', '')}-QUESTIONS.xlsx`,
      `${bookId}/QA.xlsx`
    ];
    
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