/**
 * Book 1 Excel QA Synchronization Script
 * 
 * This script reads the authentic Excel data from All_Book_1_Unique_Question_Patterns.csv
 * and rebuilds the qa-mapping-book1.json file with complete curriculum content.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Handle CSV with quoted content containing commas
    const values = [];
    let currentValue = '';
    let inQuotes = false;
    let quoteCount = 0;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        quoteCount++;
        inQuotes = !inQuotes;
        continue;
      }
      
      if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Add the last value
    
    if (values.length >= 3) {
      const unitMatch = values[0].match(/VISUAL 1 - UNIT (\d+)/);
      if (unitMatch) {
        data.push({
          unit: parseInt(unitMatch[1]),
          question: values[1],
          answer: values[2]
        });
      }
    }
  }
  
  return data;
}

function generateCodePattern(unit, index) {
  // Generate code patterns similar to existing format
  const unitStr = unit.toString().padStart(2, '0');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letterIndex = Math.floor(index / 26);
  const subIndex = index % 26;
  
  if (letterIndex === 0) {
    return `${unitStr} ${letters[subIndex]}`;
  } else {
    return `${unitStr} ${letters[letterIndex - 1]} ${letters[subIndex]}`;
  }
}

function cleanText(text) {
  // Remove extra quotes and clean up text
  return text.replace(/^["']+|["']+$/g, '').trim();
}

function convertToQAMapping(excelData) {
  const qaMapping = {};
  const unitCounts = {};
  
  excelData.forEach((item, globalIndex) => {
    const unit = item.unit;
    
    // Initialize unit counter
    if (!unitCounts[unit]) {
      unitCounts[unit] = 0;
    }
    
    const codePattern = generateCodePattern(unit, unitCounts[unit]);
    unitCounts[unit]++;
    
    const question = cleanText(item.question);
    const answer = cleanText(item.answer);
    
    qaMapping[codePattern] = {
      filename: `${codePattern} - ${question.substring(0, 50)}...`.replace(/[?]/g, ''),
      codePattern: codePattern,
      question: question,
      answer: answer,
      unitId: `unit${unit}`,
      bookId: "book1",
      source: "excel-sync",
      generatedBy: "excel-synchronization"
    };
  });
  
  return qaMapping;
}

async function main() {
  try {
    console.log('📊 Starting Book 1 Excel QA Synchronization...');
    
    // Read the Excel CSV file
    const csvPath = path.join(__dirname, 'attached_assets', 'All_Book_1_Unique_Question_Patterns.csv');
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`Excel CSV file not found: ${csvPath}`);
    }
    
    console.log('📖 Reading Excel data...');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const excelData = parseCSV(csvContent);
    
    console.log(`✅ Parsed ${excelData.length} Q&A entries from Excel`);
    console.log(`📚 Units found: ${[...new Set(excelData.map(item => item.unit))].sort((a, b) => a - b).join(', ')}`);
    
    // Convert to QA mapping format
    console.log('🔄 Converting to QA mapping format...');
    const qaMapping = convertToQAMapping(excelData);
    
    // Backup existing file
    const mappingPath = path.join(__dirname, 'client', 'src', 'data', 'qa-mapping-book1.json');
    const backupPath = path.join(__dirname, 'client', 'src', 'data', 'qa-mapping-book1-backup.json');
    
    if (fs.existsSync(mappingPath)) {
      console.log('💾 Creating backup of existing QA mapping...');
      fs.copyFileSync(mappingPath, backupPath);
    }
    
    // Write new QA mapping file
    console.log('✍️ Writing synchronized QA mapping file...');
    fs.writeFileSync(mappingPath, JSON.stringify(qaMapping, null, 2));
    
    console.log('🎉 Book 1 Excel QA Synchronization completed successfully!');
    console.log(`📈 Total entries: ${Object.keys(qaMapping).length}`);
    console.log(`📂 File saved: ${mappingPath}`);
    console.log(`🔙 Backup saved: ${backupPath}`);
    
    // Generate summary by unit
    const unitSummary = {};
    Object.values(qaMapping).forEach(qa => {
      const unit = qa.unitId;
      unitSummary[unit] = (unitSummary[unit] || 0) + 1;
    });
    
    console.log('\n📋 Unit Summary:');
    Object.keys(unitSummary).sort().forEach(unit => {
      console.log(`   ${unit}: ${unitSummary[unit]} Q&A pairs`);
    });
    
  } catch (error) {
    console.error('❌ Error during synchronization:', error.message);
    process.exit(1);
  }
}

main();