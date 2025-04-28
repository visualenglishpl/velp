// Simple script to run the teacher resources update
import { runTeacherResourcesUpdate } from './scripts/update_teacher_resources.js';

console.log('Starting teacher resources update...');
runTeacherResourcesUpdate()
  .then(() => {
    console.log('Update completed successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Update failed:', err);
    process.exit(1);
  });