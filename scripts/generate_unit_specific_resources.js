/**
 * Generate Unit-Specific Resources Script
 * 
 * This script adds more context-aware lesson plans and resources based on the actual
 * unit topics and content for Visual English Books 5, 6, and 7.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Unit-specific data for Book 5
const BOOK5_UNIT_DATA = {
  '1': {
    theme: 'Schools in the UK and USA',
    keywords: ['school', 'education', 'student', 'teacher', 'classroom', 'subject', 'learn'],
    videos: [
      {
        title: 'Schools in the UK and USA Comparison',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/f2X-BZF456A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'School Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2i4CbCINjWA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'School Vocabulary Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0f0082168ca04f23a0c9cfca4c4f91ef" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'School Subjects Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/5cb8d9c9f9234a8eb1357afe3da9d69d" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ],
    lessonPlans: {
      vocabulary: {
        title: 'School Vocabulary',
        objectives: [
          'Learn key vocabulary related to schools and education systems',
          'Compare schools in the UK and USA',
          'Develop vocabulary for describing educational experiences'
        ],
        materials: [
          'School vocabulary flashcards',
          'UK and USA school system comparison chart',
          'School subject word cards'
        ]
      },
      activities: {
        title: 'School Life Activities',
        objectives: [
          'Practice discussing school subjects and preferences',
          'Role-play school situations and conversations',
          'Compare educational systems from different countries'
        ],
        materials: [
          'School timetable templates',
          'Role-play cards for school scenarios',
          'World map for comparing school systems internationally'
        ]
      }
    }
  },
  '5': {
    theme: 'Winter Fun',
    keywords: ['winter', 'snow', 'cold', 'ski', 'snowboard', 'ice', 'jacket', 'gloves'],
    videos: [
      {
        title: 'Winter Activities Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/XN-A6Zu75c4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Winter Clothes Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qBwHK_wbgu8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Winter Activities Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1f40d165ea964036a6c0ea471f2265a8" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Winter Clothes Matching',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8a76c96bce2c4b44b7593c3b4398d884" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ],
    lessonPlans: {
      vocabulary: {
        title: 'Winter Vocabulary',
        objectives: [
          'Learn vocabulary related to winter weather',
          'Master winter clothing and accessories terms',
          'Develop vocabulary for winter activities and sports'
        ],
        materials: [
          'Winter scene flashcards',
          'Winter clothing picture cards',
          'Winter sports equipment images'
        ]
      },
      activities: {
        title: 'Winter Fun Activities',
        objectives: [
          'Practice discussing winter preferences and experiences',
          'Role-play winter sports and activities',
          'Compare winter traditions from different countries'
        ],
        materials: [
          'Winter sports video clips',
          'Winter activity planning worksheet',
          'Winter celebration images from around the world'
        ]
      }
    }
  },
  '9': {
    theme: 'Emotions',
    keywords: ['happy', 'sad', 'angry', 'scared', 'surprised', 'bored', 'excited', 'feelings'],
    videos: [
      {
        title: 'Emotions Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7uY2HrQ9qQ8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Expressing Feelings in English',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/xNpXae3w2Jc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Emotions Matching Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b1bfae5a4ea5442ca4954639862e6caf" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Emotions Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/43e998e1f60a46e99eecc6b50e99cb50" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ],
    lessonPlans: {
      vocabulary: {
        title: 'Emotions Vocabulary',
        objectives: [
          'Learn vocabulary for basic and complex emotions',
          'Practice expressing feelings appropriately',
          'Develop vocabulary for describing emotional responses'
        ],
        materials: [
          'Emotion flashcards with facial expressions',
          'Emotion scenario cards',
          'Emotion intensity scale visual aid'
        ]
      },
      activities: {
        title: 'Expressing Emotions Activities',
        objectives: [
          'Practice recognizing emotions from facial expressions',
          'Role-play emotional scenarios and appropriate responses',
          'Develop emotional intelligence through language activities'
        ],
        materials: [
          'Emotion charades cards',
          'Situation cards for role-play',
          'Emotional response worksheet'
        ]
      }
    }
  },
  '13': {
    theme: 'Irregular Verbs - Past Tense',
    keywords: ['past', 'irregular', 'verb', 'went', 'saw', 'ate', 'bought', 'spoke', 'grammar'],
    videos: [
      {
        title: 'Irregular Verbs in English',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MA3NFtK0SrY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Common Irregular Verbs',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kVl8RnmaBGo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Irregular Verbs Past Tense Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/27d9aab59fb24eebbcfc3d0d3a8cf26f" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Irregular Verbs Matching Activity',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1a9c4e0b30cb4c48b42e40f0a2e89996" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ],
    lessonPlans: {
      vocabulary: {
        title: 'Irregular Verbs Vocabulary',
        objectives: [
          'Learn common irregular verbs in English',
          'Practice using past tense forms correctly',
          'Develop ability to identify irregular verb patterns'
        ],
        materials: [
          'Irregular verb flashcards with present and past forms',
          'Irregular verb classification chart',
          'Common irregular verb list'
        ]
      },
      activities: {
        title: 'Past Tense Practice Activities',
        objectives: [
          'Practice using irregular verbs in context',
          'Tell stories using past tense verbs',
          'Develop confidence with irregular verb forms'
        ],
        materials: [
          'Past tense story templates',
          'Sentence completion worksheets',
          'Irregular verb bingo cards'
        ]
      }
    }
  }
};

// Unit-specific data for Book 6
const BOOK6_UNIT_DATA = {
  '5': {
    theme: 'Theme Park',
    keywords: ['theme park', 'roller coaster', 'ferris wheel', 'ride', 'attraction', 'ticket', 'queue'],
    videos: [
      {
        title: 'Theme Park Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/j9N1JSx8_r4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Theme Park Rides and Attractions',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/NScbkmvBBrE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Theme Park Stalls Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3c6e8fb493f84a3886df26ecc6f0c2e8" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Theme Park Attractions Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0e09cbbcd9ce4b4c84aecbebb313bca3" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ],
    lessonPlans: {
      attractions: {
        id: 'themeParkAttractions',
        title: 'Theme Park Attractions',
        objectives: [
          'Learn vocabulary for different theme park attractions',
          'Practice describing theme park experiences',
          'Develop language for expressing preferences about rides'
        ],
        materials: [
          'Theme park attraction flashcards',
          'Theme park map templates',
          'Ride description cards'
        ]
      },
      stalls: {
        id: 'themeParkStalls',
        title: 'Theme Park Stalls and Activities',
        objectives: [
          'Learn vocabulary for theme park stalls and facilities',
          'Practice ordering food and buying souvenirs',
          'Develop language for planning a theme park visit'
        ],
        materials: [
          'Theme park stalls flashcards',
          'Menu and price list cards',
          'Theme park planning worksheet'
        ]
      }
    }
  },
  '7': {
    theme: 'What Your Body Can Do',
    keywords: ['body', 'health', 'illness', 'symptom', 'medicine', 'doctor', 'hospital'],
    videos: [
      {
        title: 'Body Parts and Functions',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/SUt8q0EKbms" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      },
      {
        title: 'Health and Illness Vocabulary',
        provider: 'YouTube',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ke9hLcSuUzA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      }
    ],
    games: [
      {
        title: 'Health and Illness Game',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1c80e4ebf8694a24892fd01f58bac8cf" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      },
      {
        title: 'Body Parts and Functions Quiz',
        provider: 'Wordwall',
        embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b5c38c5b86674a1c9e4fa6a8d6b37ef5" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
      }
    ],
    lessonPlans: {
      bodyFunctions: {
        id: 'bodyFunctions',
        title: 'Body Functions and Capabilities',
        objectives: [
          'Learn vocabulary related to body parts and their functions',
          'Practice describing physical abilities and limitations',
          'Develop language for explaining how the body works'
        ],
        materials: [
          'Human body diagram',
          'Body function cards',
          'Physical abilities checklist'
        ]
      },
      healthIllness: {
        id: 'healthIllness',
        title: 'Health and Illness',
        objectives: [
          'Learn vocabulary for common illnesses and symptoms',
          'Practice explaining health problems to a doctor',
          'Develop language for maintaining good health'
        ],
        materials: [
          'Common illness flashcards',
          'Doctor-patient dialogue cards',
          'Healthy habits poster template'
        ]
      }
    }
  },
  '9': {
    theme: 'Present Perfect - What Has Just Happened',
    keywords: ['present perfect', 'just', 'already', 'yet', 'grammar', 'tense', 'have', 'has'],
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
    ],
    lessonPlans: {
      presentPerfect: {
        id: 'presentPerfect',
        title: 'Present Perfect Formation',
        objectives: [
          'Learn how to form the present perfect tense',
          'Practice using have/has with past participles',
          'Develop ability to distinguish between regular and irregular verbs in present perfect'
        ],
        materials: [
          'Present perfect structure charts',
          'Regular and irregular past participle cards',
          'Sentence formation activity sheets'
        ]
      },
      justAlreadyYet: {
        id: 'justAlreadyYet',
        title: 'Just, Already and Yet Usage',
        objectives: [
          'Learn how to use just, already and yet correctly',
          'Practice talking about recent events with present perfect',
          'Develop confidence in describing completed and incomplete actions'
        ],
        materials: [
          'Time expressions flashcards',
          'Present perfect situation cards',
          'Dialogue completion worksheets'
        ]
      }
    }
  },
  '11': {
    theme: 'Extreme Sports',
    keywords: ['extreme sports', 'adventure', 'bungee jumping', 'skydiving', 'surfing', 'risk', 'adrenaline'],
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
    ],
    lessonPlans: {
      extremeSports: {
        id: 'extremeSports',
        title: 'Extreme Sports Vocabulary',
        objectives: [
          'Learn vocabulary for different extreme sports',
          'Practice describing extreme sports experiences',
          'Develop language to express opinions about risks and adventure'
        ],
        materials: [
          'Extreme sports flashcards',
          'Adventure sports equipment pictures',
          'Risk level rating cards'
        ]
      },
      adventureActivities: {
        id: 'adventureActivities',
        title: 'Adventure Activities and Safety',
        objectives: [
          'Learn vocabulary for safety equipment and precautions',
          'Practice giving advice about extreme sports safety',
          'Develop language for describing adventures and experiences'
        ],
        materials: [
          'Safety equipment flashcards',
          'Adventure sports scenario cards',
          'Safety instruction leaflet templates'
        ]
      }
    }
  },
  '14': {
    theme: 'Are You a Survivor?',
    keywords: ['survival', 'wilderness', 'emergency', 'skills', 'danger', 'preparation', 'nature'],
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
    ],
    lessonPlans: {
      survivalSkills: {
        id: 'survivalSkills',
        title: 'Survival Skills and Equipment',
        objectives: [
          'Learn vocabulary related to survival equipment and tools',
          'Practice giving instructions for survival situations',
          'Develop language for explaining survival priorities'
        ],
        materials: [
          'Survival equipment flashcards',
          'Wilderness survival scenario cards',
          'Survival priority ranking worksheet'
        ]
      },
      emergencySituations: {
        id: 'emergencySituations',
        title: 'Emergency Situations and Responses',
        objectives: [
          'Learn vocabulary for different emergency situations',
          'Practice giving advice for emergency responses',
          'Develop confidence in describing emergency procedures'
        ],
        materials: [
          'Emergency situation cards',
          'First aid action flashcards',
          'Emergency response flow charts'
        ]
      }
    }
  }
};

// Main function to update resources
async function main() {
  console.log('Updating unit-specific resources for Books 5 and 6...');
  
  // Update Book 5 resources
  for (const [unitId, unitData] of Object.entries(BOOK5_UNIT_DATA)) {
    await updateUnitResources('5', unitId, unitData);
  }
  
  // Update Book 6 resources
  for (const [unitId, unitData] of Object.entries(BOOK6_UNIT_DATA)) {
    await updateUnitResources('6', unitId, unitData);
  }
  
  console.log('\n✅ All unit-specific resources have been updated successfully!');
  console.log('\nNext steps:');
  console.log('1. Test the updated resources in the application');
  console.log('2. Make any final adjustments to specific lesson plans or resources');
}

// Update resources for a specific unit
async function updateUnitResources(bookId, unitId, unitData) {
  console.log(`\n📘 Updating Book ${bookId} Unit ${unitId} resources for theme: ${unitData.theme}`);
  
  // Update resource file
  await updateResourceFile(bookId, unitId, unitData);
  
  // Update implementation file
  await updateImplementationFile(bookId, unitId, unitData);
}

// Update the resource file with unit-specific videos and games
async function updateResourceFile(bookId, unitId, unitData) {
  const resourceFile = path.join(__dirname, '..', 'client', 'src', 'data', `book${bookId}-unit${unitId}-resources.tsx`);
  
  if (!fs.existsSync(resourceFile)) {
    console.log(`⚠️ Resource file for Book ${bookId} Unit ${unitId} not found, skipping...`);
    return;
  }
  
  // Read current content
  let content = fs.readFileSync(resourceFile, 'utf8');
  
  // Replace videos section
  if (unitData.videos && unitData.videos.length > 0) {
    const videosStart = content.indexOf('export const videos: TeacherResource[] = [');
    if (videosStart !== -1) {
      const videosEnd = content.indexOf('];', videosStart) + 2;
      
      let newVideos = 'export const videos: TeacherResource[] = [\n';
      
      unitData.videos.forEach((video, index) => {
        newVideos += `  {\n`;
        newVideos += `    id: \`book${bookId}-unit${unitId}-video-${index + 1}\`,\n`;
        newVideos += `    bookId: '${bookId}',\n`;
        newVideos += `    unitId: '${unitId}',\n`;
        newVideos += `    title: '${video.title}',\n`;
        newVideos += `    resourceType: 'video',\n`;
        newVideos += `    provider: '${video.provider}',\n`;
        newVideos += `    embedCode: \`${video.embedCode}\`\n`;
        newVideos += `  }${index < unitData.videos.length - 1 ? ',' : ''}\n`;
      });
      
      newVideos += '];\n';
      
      content = content.substring(0, videosStart) + newVideos + content.substring(videosEnd);
    }
  }
  
  // Replace games section
  if (unitData.games && unitData.games.length > 0) {
    const gamesStart = content.indexOf('export const games: TeacherResource[] = [');
    if (gamesStart !== -1) {
      const gamesEnd = content.indexOf('];', gamesStart) + 2;
      
      let newGames = 'export const games: TeacherResource[] = [\n';
      
      unitData.games.forEach((game, index) => {
        newGames += `  {\n`;
        newGames += `    id: \`book${bookId}-unit${unitId}-game-${index + 1}\`,\n`;
        newGames += `    bookId: '${bookId}',\n`;
        newGames += `    unitId: '${unitId}',\n`;
        newGames += `    title: '${game.title}',\n`;
        newGames += `    resourceType: 'game',\n`;
        newGames += `    provider: '${game.provider}',\n`;
        newGames += `    embedCode: \`${game.embedCode}\`\n`;
        newGames += `  }${index < unitData.games.length - 1 ? ',' : ''}\n`;
      });
      
      newGames += '];\n';
      
      content = content.substring(0, gamesStart) + newGames + content.substring(gamesEnd);
    }
  }
  
  // Write updated content
  fs.writeFileSync(resourceFile, content);
  console.log(`✅ Updated resource file for Book ${bookId} Unit ${unitId}`);
}

// Update the implementation file with unit-specific lesson plans
async function updateImplementationFile(bookId, unitId, unitData) {
  const implementationFile = path.join(__dirname, '..', 'client', 'src', 'data', `book${bookId}-unit${unitId}-implementation.tsx`);
  
  if (!fs.existsSync(implementationFile)) {
    console.log(`⚠️ Implementation file for Book ${bookId} Unit ${unitId} not found, skipping...`);
    return;
  }
  
  // Read current content
  let content = fs.readFileSync(implementationFile, 'utf8');
  
  // Check if this file already has lesson plans
  const hasLessonPlans = content.includes('LessonPlan');
  
  if (hasLessonPlans && unitData.lessonPlans) {
    // Get the lesson plan keys from unitData
    const lessonPlanKeys = Object.keys(unitData.lessonPlans);
    
    if (lessonPlanKeys.length >= 2) {
      // Get the first two lesson plans
      const lessonPlan1 = unitData.lessonPlans[lessonPlanKeys[0]];
      const lessonPlan2 = unitData.lessonPlans[lessonPlanKeys[1]];
      
      // Look for existing lesson plan implementations
      const plan1Start = content.indexOf('const vocabularyLessonPlan: LessonPlan = {');
      const plan2Start = content.indexOf('const activitiesLessonPlan: LessonPlan = {');
      
      if (plan1Start !== -1 && plan2Start !== -1) {
        // Get the ID for the first lesson plan
        const id1 = lessonPlan1.id || lessonPlanKeys[0];
        
        // Replace first lesson plan
        const plan1End = content.indexOf('};', plan1Start) + 2;
        let newPlan1 = `const ${id1}LessonPlan: LessonPlan = {\n`;
        newPlan1 += `  id: \`book${bookId}-unit${unitId}-${id1}-lesson\`,\n`;
        newPlan1 += `  title: \`VISUAL ${bookId.toUpperCase()} Unit ${unitId} - ${lessonPlan1.title}\`,\n`;
        newPlan1 += `  duration: '45 minutes',\n`;
        newPlan1 += `  level: 'Intermediate',\n`;
        newPlan1 += `  objectives: [\n`;
        
        lessonPlan1.objectives.forEach(objective => {
          newPlan1 += `    '${objective}',\n`;
        });
        
        newPlan1 += `  ],\n`;
        newPlan1 += `  materials: [\n`;
        newPlan1 += `    \`VISUAL ${bookId.toUpperCase()} Unit ${unitId} slides\`,\n`;
        
        if (lessonPlan1.materials) {
          lessonPlan1.materials.forEach(material => {
            newPlan1 += `    '${material}',\n`;
          });
        }
        
        newPlan1 += `  ],\n`;
        newPlan1 += `  steps: [\n`;
        newPlan1 += `    {\n`;
        newPlan1 += `      title: 'Warm-up',\n`;
        newPlan1 += `      duration: '5-10 minutes',\n`;
        newPlan1 += `      description: 'Introduce theme with visual aids',\n`;
        newPlan1 += `      instructions: ['Show unit theme visuals', 'Ask eliciting questions about ${unitData.theme}', 'Build interest in the topic']\n`;
        newPlan1 += `    },\n`;
        newPlan1 += `    {\n`;
        newPlan1 += `      title: 'Vocabulary Presentation',\n`;
        newPlan1 += `      duration: '15 minutes',\n`;
        newPlan1 += `      description: 'Present ${unitData.theme} vocabulary',\n`;
        newPlan1 += `      materials: ['Visual English slides', '${unitData.theme} vocabulary list'],\n`;
        newPlan1 += `      instructions: ['Present key vocabulary items', 'Model pronunciation', 'Have students repeat', 'Explain meanings with visuals']\n`;
        newPlan1 += `    },\n`;
        newPlan1 += `    {\n`;
        newPlan1 += `      title: 'Practice Activities',\n`;
        newPlan1 += `      duration: '15 minutes',\n`;
        newPlan1 += `      description: 'Interactive games with ${unitData.theme} vocabulary',\n`;
        newPlan1 += `      materials: ['${unitData.theme} Wordwall games', 'Devices for access'],\n`;
        newPlan1 += `      instructions: ['Demonstrate game access', 'Have students play in pairs or small groups', 'Monitor and assist as needed']\n`;
        newPlan1 += `    },\n`;
        newPlan1 += `    {\n`;
        newPlan1 += `      title: 'Production',\n`;
        newPlan1 += `      duration: '10 minutes',\n`;
        newPlan1 += `      description: 'Role-play or conversation activity about ${unitData.theme}',\n`;
        newPlan1 += `      instructions: ['Assign conversation scenarios related to ${unitData.theme}', 'Have students practice in pairs', 'Ask volunteers to present']\n`;
        newPlan1 += `    }\n`;
        newPlan1 += `  ],\n`;
        newPlan1 += `  assessmentTips: 'Observe student participation in activities. Check ${unitData.theme} vocabulary recognition through game scores. Evaluate pronunciation and usage during production activities.',\n`;
        newPlan1 += `  homeworkIdeas: [\n`;
        newPlan1 += `    'Create a mini-project related to ${unitData.theme}',\n`;
        newPlan1 += `    'Research more about ${unitData.theme}',\n`;
        newPlan1 += `    'Complete online practice activities'\n`;
        newPlan1 += `  ]\n`;
        newPlan1 += `};\n`;
        
        content = content.substring(0, plan1Start) + newPlan1 + content.substring(plan1End);
        
        // Get the ID for the second lesson plan
        const id2 = lessonPlan2.id || lessonPlanKeys[1];
        
        // Replace second lesson plan
        const plan2End = content.indexOf('};', content.indexOf('const activitiesLessonPlan: LessonPlan = {')) + 2;
        let newPlan2 = `const ${id2}LessonPlan: LessonPlan = {\n`;
        newPlan2 += `  id: \`book${bookId}-unit${unitId}-${id2}-lesson\`,\n`;
        newPlan2 += `  title: \`VISUAL ${bookId.toUpperCase()} Unit ${unitId} - ${lessonPlan2.title}\`,\n`;
        newPlan2 += `  duration: '45 minutes',\n`;
        newPlan2 += `  level: 'Intermediate',\n`;
        newPlan2 += `  objectives: [\n`;
        
        lessonPlan2.objectives.forEach(objective => {
          newPlan2 += `    '${objective}',\n`;
        });
        
        newPlan2 += `  ],\n`;
        newPlan2 += `  materials: [\n`;
        newPlan2 += `    \`VISUAL ${bookId.toUpperCase()} Unit ${unitId} slides\`,\n`;
        
        if (lessonPlan2.materials) {
          lessonPlan2.materials.forEach(material => {
            newPlan2 += `    '${material}',\n`;
          });
        }
        
        newPlan2 += `  ],\n`;
        newPlan2 += `  steps: [\n`;
        newPlan2 += `    {\n`;
        newPlan2 += `      title: 'Review',\n`;
        newPlan2 += `      duration: '5 minutes',\n`;
        newPlan2 += `      description: 'Quick review of ${unitData.theme} vocabulary',\n`;
        newPlan2 += `      instructions: ['Review key vocabulary from previous lesson', 'Ask questions about ${unitData.theme}', 'Elicit responses from students']\n`;
        newPlan2 += `    },\n`;
        newPlan2 += `    {\n`;
        newPlan2 += `      title: 'Video Activity',\n`;
        newPlan2 += `      duration: '15 minutes',\n`;
        newPlan2 += `      description: 'Watch ${unitData.theme} video and complete tasks',\n`;
        newPlan2 += `      materials: ['${unitData.theme} video', 'Activity worksheet'],\n`;
        newPlan2 += `      instructions: ['Play the video about ${unitData.theme}', 'Students complete worksheet activities', 'Review answers as a class']\n`;
        newPlan2 += `    },\n`;
        newPlan2 += `    {\n`;
        newPlan2 += `      title: 'Interactive Games',\n`;
        newPlan2 += `      duration: '15 minutes',\n`;
        newPlan2 += `      description: 'Play ${unitData.theme} reinforcement games',\n`;
        newPlan2 += `      materials: ['${unitData.theme} Wordwall games', 'Game materials'],\n`;
        newPlan2 += `      instructions: ['Explain game rules', 'Organize students into teams', 'Conduct games with supervision']\n`;
        newPlan2 += `    },\n`;
        newPlan2 += `    {\n`;
        newPlan2 += `      title: 'Wrap-up Activity',\n`;
        newPlan2 += `      duration: '10 minutes',\n`;
        newPlan2 += `      description: '${unitData.theme} consolidation activity',\n`;
        newPlan2 += `      instructions: ['Students create a mind map of ${unitData.theme} vocabulary', 'Share with partners', 'Class discussion of key concepts']\n`;
        newPlan2 += `    }\n`;
        newPlan2 += `  ],\n`;
        newPlan2 += `  assessmentTips: 'Monitor participation in games. Check understanding of ${unitData.theme} through worksheet answers. Assess vocabulary usage in mind maps.',\n`;
        newPlan2 += `  homeworkIdeas: [\n`;
        newPlan2 += `    'Complete related online games about ${unitData.theme}',\n`;
        newPlan2 += `    'Watch additional ${unitData.theme} videos',\n`;
        newPlan2 += `    'Create personal vocabulary flashcards for ${unitData.theme}'\n`;
        newPlan2 += `  ]\n`;
        newPlan2 += `};\n`;
        
        content = content.substring(0, content.indexOf('const activitiesLessonPlan: LessonPlan = {')) + 
                  newPlan2 + 
                  content.substring(plan2End);
        
        // Update the export for lesson plans
        const exportStart = content.indexOf('export const lessonPlans = [');
        if (exportStart !== -1) {
          const exportEnd = content.indexOf('];', exportStart) + 2;
          const newExport = `export const lessonPlans = [${id1}LessonPlan, ${id2}LessonPlan];\n`;
          
          content = content.substring(0, exportStart) + newExport + content.substring(exportEnd);
        }
      }
    }
  }
  
  // Write updated content
  fs.writeFileSync(implementationFile, content);
  console.log(`✅ Updated implementation file for Book ${bookId} Unit ${unitId}`);
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
