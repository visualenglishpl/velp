/**
 * Script to fix Excel processing to match the actual structure of the Excel files
 * 
 * This script reads the Excel files that have:
 * - First column: Filename of the image/content
 * - Second column: Question
 * - Third column: Answer
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define the path to the Python script
const pythonScriptPath = path.join(__dirname, 'excel_to_json_converter.py');

// Create the Python script to process Excel files
function createPythonScript() {
  const pythonScript = `
import pandas as pd
import json
import sys
import os
import re

def extract_unit_id(sheet_name):
    """Extract unit ID from sheet name."""
    match = re.search(r'UNIT\s+(\d+)', sheet_name, re.IGNORECASE)
    if match:
        return f"unit{match.group(1)}"
    return None

def process_excel(excel_file, book_id):
    """Process Excel file and generate JSON mapping with proper structure."""
    print(f"Processing Excel file: {excel_file}")
    
    # Load Excel file
    excel = pd.ExcelFile(excel_file, engine='openpyxl')
    
    # Dictionary to store all Q&A mappings
    mapping = {}
    
    # Iterate through each sheet (unit)
    for sheet_name in excel.sheet_names:
        unit_id = extract_unit_id(sheet_name)
        if not unit_id:
            print(f"Warning: Could not extract unit ID from sheet {sheet_name}")
            continue
            
        print(f"Processing sheet: {sheet_name} (Unit ID: {unit_id})")
        
        # Read the sheet data
        df = pd.read_excel(excel, sheet_name=sheet_name)
        
        # Skip processing if DataFrame is empty
        if df.empty:
            print(f"Warning: Empty sheet {sheet_name}")
            continue
        
        # Get column names - the first column contains filenames
        filename_col = df.columns[0]
        
        # The second column may be unnamed but contains questions
        question_col = 'Unnamed: 1' if 'Unnamed: 1' in df.columns else None
        
        # The third column may be unnamed but contains answers
        answer_col = 'Unnamed: 2' if 'Unnamed: 2' in df.columns else None
        
        if not question_col or not answer_col:
            print(f"Warning: Missing question or answer column in sheet {sheet_name}")
            # Try to find columns with non-null values that could be questions/answers
            for col in df.columns[1:]:
                non_null = df[col].count()
                if non_null > 0:
                    if not question_col:
                        question_col = col
                    elif not answer_col:
                        answer_col = col
                    else:
                        break
        
        # Log the column structure for debugging
        print(f"Using columns: Filename={filename_col}, Question={question_col}, Answer={answer_col}")
        
        # Filter out rows where both question and answer are missing
        valid_rows = df.loc[
            df[question_col].notna() & df[answer_col].notna()
        ]
        
        # Count non-null entries
        non_null_count = len(valid_rows)
        print(f"Found {non_null_count} valid Q&A entries in {sheet_name}")
        
        # Process each row with valid Q&A data
        for _, row in valid_rows.iterrows():
            filename = str(row[filename_col]).strip()
            question = str(row[question_col]).strip()
            answer = str(row[answer_col]).strip()
            
            # Extract code pattern from filename
            code_pattern = extract_code_pattern(filename)
            
            # Generate a unique key for the mapping
            # Use the filename as the key for the most direct matching
            mapping[filename] = {
                'filename': filename,
                'codePattern': code_pattern,
                'question': question,
                'answer': answer,
                'unitId': unit_id,
                'bookId': book_id
            }
            
            # Also add mapping with filename without extension for easier matching
            filename_no_ext = re.sub(r'\\.(png|jpg|jpeg|gif|webp|mp4)$', '', filename, flags=re.IGNORECASE)
            if filename_no_ext != filename:
                mapping[filename_no_ext] = mapping[filename].copy()
                
            # For flexibility, also add entries with normalized code patterns
            if code_pattern:
                # Add variations of the code pattern for better matching
                pattern_variations = generate_pattern_variations(code_pattern)
                for variation in pattern_variations:
                    if variation not in mapping:
                        # Create a copy of the mapping entry with the variation as the key
                        mapping[variation] = mapping[filename].copy()
                        mapping[variation]['codePattern'] = variation
    
    return mapping

def extract_code_pattern(filename):
    """Extract code pattern from filename (like '01 I A')."""
    # Look for patterns like "01 I A", "01-I-A", "01IA", etc.
    patterns = [
        r'(\d{2})\s*([A-Za-z])\s*([A-Za-z])',  # 01 I A
        r'(\d{2})-([A-Za-z])-([A-Za-z])',      # 01-I-A
        r'(\d{2})([A-Za-z])([A-Za-z])'         # 01IA
    ]
    
    for pattern in patterns:
        match = re.search(pattern, filename)
        if match:
            return f"{match.group(1)} {match.group(2).upper()} {match.group(3).upper()}"
    
    # Try a more general pattern for section numbers like "01 I" or "02 A"
    section_match = re.search(r'(\d{2})\s*([A-Za-z])', filename)
    if section_match:
        return f"{section_match.group(1)} {section_match.group(2).upper()}"
    
    return None

def generate_pattern_variations(pattern):
    """Generate variations of a code pattern for better matching."""
    variations = set()
    
    # Add the original pattern
    variations.add(pattern)
    
    # Handle patterns like "01 I A"
    parts = pattern.split()
    if len(parts) == 3:
        num, letter1, letter2 = parts
        
        # Add format "01IA"
        variations.add(f"{num}{letter1}{letter2}")
        
        # Add format "01-I-A"
        variations.add(f"{num}-{letter1}-{letter2}")
        
        # Add lowercase variations
        variations.add(f"{num} {letter1.lower()} {letter2.lower()}")
        variations.add(f"{num}{letter1.lower()}{letter2.lower()}")
        variations.add(f"{num}-{letter1.lower()}-{letter2.lower()}")
    
    # Handle patterns like "01 I"
    elif len(parts) == 2:
        num, letter = parts
        
        # Add format "01I"
        variations.add(f"{num}{letter}")
        
        # Add format "01-I"
        variations.add(f"{num}-{letter}")
        
        # Add lowercase variations
        variations.add(f"{num} {letter.lower()}")
        variations.add(f"{num}{letter.lower()}")
        variations.add(f"{num}-{letter.lower()}")
    
    return list(variations)

def main():
    if len(sys.argv) < 3:
        print("Usage: python excel_to_json_converter.py <excel_file> <book_id> [output_file]")
        sys.exit(1)
    
    excel_file = sys.argv[1]
    book_id = sys.argv[2]
    output_file = sys.argv[3] if len(sys.argv) > 3 else f"qa-mapping-{book_id}.json"
    
    if not os.path.exists(excel_file):
        print(f"Error: Excel file {excel_file} not found")
        sys.exit(1)
    
    try:
        mapping = process_excel(excel_file, book_id)
        
        # Save to JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(mapping, f, ensure_ascii=False, indent=2)
        
        print(f"Successfully processed {len(mapping)} Q&A entries")
        print(f"Output saved to {output_file}")
        
    except Exception as e:
        print(f"Error processing Excel file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
`;

  fs.writeFileSync(pythonScriptPath, pythonScript);
  console.log('Created Python script for processing Excel files.');
}

// Function to process a single Excel file
function processExcelFile(excelFile, bookId, outputPath) {
  return new Promise((resolve, reject) => {
    const command = `python3 ${pythonScriptPath} "${excelFile}" "${bookId}" "${outputPath}"`;
    
    console.log(`Executing: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error processing ${excelFile}:`, error);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.error(`STDERR: ${stderr}`);
      }
      
      console.log(stdout);
      resolve();
    });
  });
}

// Main function to process all Excel files
async function main() {
  try {
    // Create the Python script
    createPythonScript();
    
    // Define path to Excel files and output directory
    const attachedAssetsDir = path.join(__dirname, 'attached_assets');
    const outputDir = path.join(__dirname, 'client', 'src', 'data');
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Process Visual English 1 Excel file
    const excel1Path = path.join(attachedAssetsDir, 'VISUAL 1 QUESTIONS.xlsx');
    const output1Path = path.join(outputDir, 'qa-mapping-book1.json');
    
    await processExcelFile(excel1Path, 'book1', output1Path);
    console.log(`Processed VISUAL 1 QUESTIONS.xlsx to ${output1Path}`);
    
    // Process Visual English 2 Excel file
    const excel2Path = path.join(attachedAssetsDir, 'VISUAL 2  QUESTIONS.xlsx');
    const output2Path = path.join(outputDir, 'qa-mapping-book2.json');
    
    await processExcelFile(excel2Path, 'book2', output2Path);
    console.log(`Processed VISUAL 2  QUESTIONS.xlsx to ${output2Path}`);
    
    console.log('All Excel files processed successfully!');
  } catch (error) {
    console.error('Error processing Excel files:', error);
  }
}

// Run the main function
main().catch(console.error);