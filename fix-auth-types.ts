import * as fs from 'fs';

// Get the AuthenticationManagementPage file content
const filePath = 'client/src/secure/admin/AuthenticationManagementPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace null values with empty strings
content = content.replace(/passwordLastChanged: null,/g, 'passwordLastChanged: "",');

// Write the changes back to the file
fs.writeFileSync(filePath, content);

console.log('Fixed type issues in AuthenticationManagementPage.tsx');