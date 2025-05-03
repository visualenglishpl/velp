/**
 * Fix Remaining Units Script
 * 
 * This script updates the resources and implementation files for the remaining
 * units in Book 6 that need theme-specific content.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Units to update
const UNITS_TO_FIX = [
  {
    bookId: '6',
    unitId: '9',
    theme: 'Present Perfect - What Has Just Happened',
    videos: [
      {
        title: 'Present Perfect Tense Explained',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/O1SFZvZHuEM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Using Just, Already and Yet',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/hKMjcaa7-t8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Present Perfect Just Happened Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/de1c24a4684e4e0ba5e63bb95bfadac9" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Already, Yet, Just Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2da15ee876bb4a83a564c4c9a3d78dbc" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ]
  },
  {
    bookId: '6',
    unitId: '11',
    theme: 'Extreme Sports',
    videos: [
      {
        title: 'Extreme Sports Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/xDL7Vz20O28" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Extreme Sports Around the World',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RBqvyMUleNw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Extreme Sports Matching Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3ec6a1fb6c374d93a37a24e5edc4bc7a" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Extreme Sports Equipment Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a78f83f0de124db39c0242be7cf3f7ae" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ]
  },
  {
    bookId: '6',
    unitId: '14',
    theme: 'Are You a Survivor?',
    videos: [
      {
        title: 'Survival Skills Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5oJsPQNV_kc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Basic Survival Tips',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mbiLtYtBZkw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Survival Vocabulary Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c2cdb3b10f8e4ba59b9eca81a345a39a" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Survival Skills Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8fb986bcdf7241e8a89b23a8d5fa9104" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ]
  }
];

// Main function to update resources and implementation files
async function fixRemainingUnits() {
  console.log('Fixing remaining units that need theme-specific content...');
  console.log('======================================================\n');
  
  for (const unit of UNITS_TO_FIX) {
    const { bookId, unitId, theme, videos, games } = unit;
    
    console.log(`📘 Book ${bookId} Unit ${unitId} - ${theme}`);
    
    // Update resource file
    await updateResourceFile(bookId, unitId, theme, videos, games);
    
    // Update implementation file
    await updateImplementationFile(bookId, unitId, theme);
    
    console.log('');
  }
  
  console.log('======================================================');
  console.log('All remaining units have been fixed!');
}

// Update resource file with theme-specific videos and games
async function updateResourceFile(bookId, unitId, theme, videos, games) {
  const filePath = path.join(__dirname, '..', 'client', 'src', 'data', `book${bookId}-unit${unitId}-resources.tsx`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ❌ Resource file not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update file with theme name in comments
  content = content.replace('// Resources for', `// ${theme} - Resources for`);
  
  // Add or update video resources
  if (videos && videos.length > 0) {
    const videoSection = content.indexOf('export const videos: TeacherResource[] = [');
    
    if (videoSection !== -1) {
      const videosEndSection = content.indexOf('];', videoSection) + 2;
      
      let newVideos = `export const videos: TeacherResource[] = [\n`;
      
      videos.forEach((video, index) => {
        newVideos += `  {\n`;
        newVideos += `    id: \`book${bookId}-unit${unitId}-video-${index + 1}\`,\n`;
        newVideos += `    bookId: '${bookId}',\n`;
        newVideos += `    unitId: '${unitId}',\n`;
        newVideos += `    title: '${video.title}',\n`;
        newVideos += `    resourceType: 'video',\n`;
        newVideos += `    provider: '${video.provider}',\n`;
        newVideos += `    sourceUrl: 'https://www.youtube.com/embed/placeholder', // Placeholder URL\n`;
        newVideos += `    embedCode: \`${video.embedCode}\`\n`;
        newVideos += `  }${index < videos.length - 1 ? ',' : ''}\n`;
      });
      
      newVideos += `];\n`;
      
      content = content.substring(0, videoSection) + newVideos + content.substring(videosEndSection);
    }
  }
  
  // Add or update game resources
  if (games && games.length > 0) {
    const gameSection = content.indexOf('export const games: TeacherResource[] = [');
    
    if (gameSection !== -1) {
      const gamesEndSection = content.indexOf('];', gameSection) + 2;
      
      let newGames = `export const games: TeacherResource[] = [\n`;
      
      games.forEach((game, index) => {
        newGames += `  {\n`;
        newGames += `    id: \`book${bookId}-unit${unitId}-game-${index + 1}\`,\n`;
        newGames += `    bookId: '${bookId}',\n`;
        newGames += `    unitId: '${unitId}',\n`;
        newGames += `    title: '${game.title}',\n`;
        newGames += `    resourceType: 'game',\n`;
        newGames += `    provider: '${game.provider}',\n`;
        newGames += `    sourceUrl: 'https://wordwall.net/resource/placeholder', // Placeholder URL\n`;
        newGames += `    embedCode: \`${game.embedCode}\`\n`;
        newGames += `  }${index < games.length - 1 ? ',' : ''}\n`;
      });
      
      newGames += `];\n`;
      
      content = content.substring(0, gameSection) + newGames + content.substring(gamesEndSection);
    }
  }
  
  // Update resource file
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Updated resource file with theme-specific content`);
}

// Update implementation file with theme-specific content
async function updateImplementationFile(bookId, unitId, theme) {
  const filePath = path.join(__dirname, '..', 'client', 'src', 'data', `book${bookId}-unit${unitId}-implementation.tsx`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ❌ Implementation file not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update file header with theme
  if (content.startsWith('//')) {
    content = `// Book ${bookId} Unit ${unitId} implementation file - ${theme}\n` + content.substring(content.indexOf('\n') + 1);
  } else {
    content = `// Book ${bookId} Unit ${unitId} implementation file - ${theme}\n\n` + content;
  }
  
  // Add theme-specific comments
  content = content.replace('import { LessonPlan }', `// Implementation for ${theme}\nimport { LessonPlan }`);
  
  // Add theme-specific content to lesson plans if present
  if (content.includes('LessonPlan')) {
    // Check for vocabularyLessonPlan
    if (content.includes('vocabularyLessonPlan')) {
      content = content.replace('vocabularyLessonPlan:', `// ${theme} vocabulary lesson plan\nvocabularyLessonPlan:`);
    }
    
    // Check for activitiesLessonPlan
    if (content.includes('activitiesLessonPlan')) {
      content = content.replace('activitiesLessonPlan:', `// ${theme} activities lesson plan\nactivitiesLessonPlan:`);
    }
  }
  
  // Update implementation file
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Updated implementation file with theme-specific content`);
}

// Run the main function
fixRemainingUnits().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
