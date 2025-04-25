#!/usr/bin/env node

/**
 * Script to update question-answer mappings from Excel file
 * This script:
 * 1. Makes an API call to the /api/direct/process-excel endpoint
 * 2. Processes the Excel file and updates the question-answer mappings
 */

const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

// Configuration
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const EXCEL_FILE = process.argv[2] || path.join(__dirname, '..', 'attached_assets', 'VISUAL 1 QUESTIONS.xlsx');

async function main() {
  console.log('Starting question-answer mapping update from Excel file...');
  console.log(`Using Excel file: ${EXCEL_FILE}`);

  if (!fs.existsSync(EXCEL_FILE)) {
    console.error(`Error: Excel file does not exist at ${EXCEL_FILE}`);
    process.exit(1);
  }

  try {
    // First login as admin
    console.log('Logging in as admin...');
    const loginRes = await fetch(`${SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: '12345',
        role: 'admin'
      })
    });

    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
    }

    const user = await loginRes.json();
    console.log(`Logged in as ${user.username} with role ${user.role}`);

    // Call the process-excel endpoint
    console.log('Calling process-excel endpoint...');
    const response = await fetch(`${SERVER_URL}/api/direct/process-excel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // We can pass the file path here, although the server already knows the path
        excelFilePath: EXCEL_FILE
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to process Excel file: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Process Excel response:', result);

    if (result.success) {
      console.log('Successfully updated question-answer mappings!');
      console.log(`Total mappings: ${result.totalMappings}`);
      console.log(`Output file: ${result.outputFile}`);
    } else {
      console.error('Failed to update question-answer mappings:', result.error);
    }
  } catch (error) {
    console.error('Error updating question-answer mappings:', error);
    process.exit(1);
  }
}

// Run the script
main();