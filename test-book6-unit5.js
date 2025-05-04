import { book6Unit5Resources } from './client/src/data/book6-unit5-resources.js';

try {
  // Test resource module
  console.log('Resources found in module:', book6Unit5Resources.length);
  console.log('First resource title:', book6Unit5Resources[0]?.title);
} catch (error) {
  console.error('Error testing module import:', error);
}