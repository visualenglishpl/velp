import fs from 'fs';
import path from 'path';

// Files to fix
const filesToFix = [
  'client/src/secure/admin/AuthenticationManagementPage.tsx',
  'client/src/secure/admin/AnalyticsPanel.tsx',
  'client/src/secure/admin/FeedbackViewerPage.tsx',
  'client/src/secure/admin/BroadcastMessagesPage.tsx',
  'client/src/secure/admin/FlaggedQuestionsPage.tsx',
  'client/src/secure/admin/DigitalInventoryPage.tsx'
];

// Apply fixes
filesToFix.forEach(filePath => {
  console.log(`Fixing types in ${filePath}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix 1: Replace 'null' assignments to passwordLastChanged with undefined
  content = content.replace(/passwordLastChanged: null,/g, 'passwordLastChanged: undefined,');
  
  // Fix 2: Make sure user IDs are strings
  content = content.replace(/id: user\?\.id \|\| /g, 'id: user?.id?.toString() || ');
  
  // Fix 3: Fix Select component className issue
  content = content.replace(/<Select([^>]*) className="([^"]+)"/g, 
    (match, p1, p2) => `<Select${p1}>\n                      <SelectTrigger className="${p2}"`)
  
  // Write changes back to the file
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
});

console.log('Types fixed successfully!');