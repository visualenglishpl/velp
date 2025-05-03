/**
 * Run Unit Generator for Book 1
 * 
 * This script runs the generator to create implementation files for Book 1 units 10-18.
 * Run this script from the project root with: node client/src/data/run-book1-generator.js
 */

const { generateMultipleUnits } = require('./generate-book1-units');

// Generate units 10-18
console.log('Starting to generate Book 1 unit files...');
generateMultipleUnits(10, 18, './client/src/data');
console.log('Unit generation complete!');
