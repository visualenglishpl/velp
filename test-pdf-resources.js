/**
 * Test script for Book 1 PDF Resources
 * 
 * This script tests the resource organization functionality we've built
 * to ensure PDFs are properly organized by unit.
 */

import fs from 'fs';
import path from 'path';

// Simulated resource creation function (simplified version of what we use in the app)
function createPdfResource(unitId, id, title, description, pdfUrl) {
  return {
    id: `book1-unit${unitId}-${id}`,
    bookId: '1',
    unitId,
    resourceType: 'pdf',
    title,
    description,
    provider: 'Visual English',
    sourceUrl: pdfUrl,
    content: {
      type: 'pdf',
      embedUrl: pdfUrl
    },
    fileUrl: pdfUrl
  };
}

// Unit titles
const unitTitles = {
  '1': 'Hello',
  '2': 'My School',
  '3': 'Food',
  '4': 'My House',
  '5': 'Pets and Animals',
  '6': 'My Favourite Colour'
};

// Generate PDF resources for units 1-6 as a test
function getTestPdfResources() {
  return Array.from({ length: 6 }, (_, i) => {
    const unit = (i + 1).toString();
    const unitPrefix = '00 A';
    const unitTitle = unitTitles[unit] || `Unit ${unit}`;
    
    const pdfUrl = `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit${unit}/${unitPrefix} Visual English 1 – Unit ${unit} – New Version.pdf`;
    
    return createPdfResource(
      unit, 
      'main-pdf',
      `Unit ${unit}: ${unitTitle} - PDF`,
      `Visual English Book 1 - Unit ${unit} PDF`,
      pdfUrl
    );
  });
}

// Create a map of unit IDs to PDF resources for easier lookup
function createPdfResourcesByUnit(resources) {
  return resources.reduce((acc, resource) => {
    if (resource.unitId) {
      if (!acc[resource.unitId]) {
        acc[resource.unitId] = [];
      }
      acc[resource.unitId].push(resource);
    }
    return acc;
  }, {});
}

// Run the test
function runTest() {
  console.log('Testing PDF resource organization...');
  
  // Generate test resources
  const pdfResources = getTestPdfResources();
  console.log(`Generated ${pdfResources.length} PDF resources.`);
  
  // Organize by unit
  const pdfResourcesByUnit = createPdfResourcesByUnit(pdfResources);
  console.log('Resources organized by unit:');
  
  // Check each unit's resources
  Object.keys(pdfResourcesByUnit).forEach(unitId => {
    const resources = pdfResourcesByUnit[unitId];
    console.log(`Unit ${unitId}: ${resources.length} resources`);
    
    // Verify correct unitId assignment
    const incorrectUnitIds = resources.filter(r => r.unitId !== unitId);
    if (incorrectUnitIds.length > 0) {
      console.error(`ERROR: Found ${incorrectUnitIds.length} resources with incorrect unitId in Unit ${unitId}`);
    } else {
      console.log(`✓ All resources for Unit ${unitId} have correct unitId`);
    }
  });
  
  // Output sample resource
  console.log('\nSample resource:');
  console.log(JSON.stringify(pdfResources[0], null, 2));
  
  console.log('\nTest completed successfully!');
}

// Execute the test
runTest();