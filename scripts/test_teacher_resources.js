/**
 * Test Teacher Resources Script
 * 
 * This script demonstrates how to access and work with the generated lesson plans
 * and teacher resources for Visual English books.
 */

import { book5Unit1LessonPlans } from '../client/src/data/book5-unit1-implementation.js';
import { book5Unit5LessonPlans } from '../client/src/data/book5-unit5-implementation.js';
import { book5Unit9LessonPlans } from '../client/src/data/book5-unit9-implementation.js';
import { book5Unit13LessonPlans } from '../client/src/data/book5-unit13-implementation.js';

import { book6Unit5LessonPlans } from '../client/src/data/book6-unit5-implementation.js';
import { book6Unit7LessonPlans } from '../client/src/data/book6-unit7-implementation.js';
import { book6Unit9LessonPlans } from '../client/src/data/book6-unit9-resources.js';
import { book6Unit11LessonPlans } from '../client/src/data/book6-unit11-resources.js';
import { book6Unit14LessonPlans } from '../client/src/data/book6-unit14-resources.js';

// Test resources
async function testResources() {
  console.log('Testing teacher resources and lesson plans...');
  console.log('================================================');
  
  // Book 5 resources
  console.log('\n📘 Book 5 Resources:\n');
  
  // Book 5 Unit 1 - Schools in the UK and USA
  console.log('Unit 1 - Schools in the UK and USA');
  console.log(`Lesson Plans: ${book5Unit1LessonPlans.length}`);
  book5Unit1LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 5 Unit 5 - Winter Fun
  console.log('\nUnit 5 - Winter Fun');
  console.log(`Lesson Plans: ${book5Unit5LessonPlans.length}`);
  book5Unit5LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 5 Unit 9 - Emotions
  console.log('\nUnit 9 - Emotions');
  console.log(`Lesson Plans: ${book5Unit9LessonPlans.length}`);
  book5Unit9LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 5 Unit 13 - Irregular Verbs - Past Tense
  console.log('\nUnit 13 - Irregular Verbs - Past Tense');
  console.log(`Lesson Plans: ${book5Unit13LessonPlans.length}`);
  book5Unit13LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 6 resources
  console.log('\n\n📘 Book 6 Resources:\n');
  
  // Book 6 Unit 5 - Theme Park
  console.log('Unit 5 - Theme Park');
  console.log(`Lesson Plans: ${book6Unit5LessonPlans.length}`);
  book6Unit5LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 6 Unit 7 - What Your Body Can Do
  console.log('\nUnit 7 - What Your Body Can Do');
  console.log(`Lesson Plans: ${book6Unit7LessonPlans.length}`);
  book6Unit7LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 6 Unit 9 - Present Perfect - What Has Just Happened
  console.log('\nUnit 9 - Present Perfect - What Has Just Happened');
  console.log(`Lesson Plans: ${book6Unit9LessonPlans.length}`);
  book6Unit9LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 6 Unit 11 - Extreme Sports
  console.log('\nUnit 11 - Extreme Sports');
  console.log(`Lesson Plans: ${book6Unit11LessonPlans.length}`);
  book6Unit11LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  // Book 6 Unit 14 - Are You a Survivor?
  console.log('\nUnit 14 - Are You a Survivor?');
  console.log(`Lesson Plans: ${book6Unit14LessonPlans.length}`);
  book6Unit14LessonPlans.forEach((plan, index) => {
    console.log(`  - ${index + 1}: ${plan.title} (${plan.duration})`);
  });
  
  console.log('\n================================================');
  console.log('Teacher resources and lesson plans test complete!');
}

// Run the test function
testResources().catch(error => {
  console.error('Error during resource testing:', error);
});
