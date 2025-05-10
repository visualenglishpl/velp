/**
 * Simple test script to verify admin interface functionality
 */

import { get } from 'http';

// Test accessing the admin page
const options = {
  hostname: '0.0.0.0',
  port: 5000,
  path: '/admin',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('RESPONSE RECEIVED');
    // Log first 500 characters to check the response
    console.log(data.substring(0, 500));
    
    // Check if the response contains the Books Management component
    const hasBooksManagement = data.includes('Books Management');
    console.log(`Response contains 'Books Management': ${hasBooksManagement}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();