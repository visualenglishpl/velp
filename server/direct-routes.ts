/**
 * Special direct routes for adding resources to the system
 */
import express from 'express';
import { saveResourcesForUnit } from './content-management';

// Temporary authentication middleware for direct testing
function createTemporaryUser(req: express.Request, res: express.Response, next: express.NextFunction) {
  // This creates a temporary authenticated user for testing purposes
  if (!req.isAuthenticated()) {
    // Only if not already authenticated
    req.user = {
      id: 999,
      username: 'tempUser',
      password: 'encrypted',
      email: 'temp@example.com',
      role: 'teacher',
      fullName: 'Temporary Teacher',
      createdAt: new Date(),
      plan: 'premium'
    } as any;
    
    // Override the isAuthenticated method temporarily
    const originalIsAuthenticated = req.isAuthenticated;
    req.isAuthenticated = () => true;
    
    // Restore after the request is complete
    res.on('finish', () => {
      req.isAuthenticated = originalIsAuthenticated;
      req.user = undefined;
    });
  }
  
  next();
}

export function registerDirectRoutes(app: express.Express) {
  // Create a new endpoint for temporary login from the teacher resources page
  app.post('/api/direct/temp-login', createTemporaryUser, (req, res) => {
    res.status(200).json({ 
      message: 'Logged in as teacher', 
      user: { 
        id: 999,
        username: 'temp_teacher',
        role: 'teacher'
      } 
    });
  });
  
  // Add a direct login endpoint for testing
  app.get('/api/testing/login', createTemporaryUser, (req, res) => {
    res.status(200).json({ 
      success: true, 
      message: "Temporarily logged in for testing", 
      user: req.user 
    });
  });
  // Route to directly add resources for a specific book and unit
  app.get('/api/admin/add-resources/:bookId/:unitId', (req, res) => {
    const { bookId, unitId } = req.params;
    
    try {
      let resources = [];
      
      // Book 7 Unit 6 - Money
      if (bookId === '7' && unitId === '6') {
        resources = [
          {
            id: "book7-unit6-video1",
            bookId: "7",
            unitId: "6",
            title: "Learn English Money from 1p to 50 Pounds - British Council",
            resourceType: "video",
            provider: "YouTube",
            sourceUrl: "https://www.youtube.com/embed/Vcoi6l0D6ak",
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Vcoi6l0D6ak?si=cYTh99UmUthwy1yO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit6-lesson1",
            bookId: "7",
            unitId: "6",
            title: "British Currency Worksheet to Print",
            resourceType: "lesson",
            provider: "ISL Collective",
            sourceUrl: "https://en.islcollective.com/english-esl-worksheets/general-topic/countries/british-currency/18577",
            embedCode: ""
          },
          {
            id: "book7-unit6-game1",
            bookId: "7",
            unitId: "6",
            title: "Money Kahoot Game",
            resourceType: "game",
            provider: "Kahoot",
            sourceUrl: "https://create.kahoot.it/share/currency/f87e8719-291e-440a-a340-22344175fedb",
            embedCode: ""
          },
          {
            id: "book7-unit6-game2",
            bookId: "7",
            unitId: "6",
            title: "Money Wordwall Game 1",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/463ad4520fbb4edd9ea903446f182971",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/463ad4520fbb4edd9ea903446f182971?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit6-game3",
            bookId: "7",
            unitId: "6",
            title: "Money Wordwall Game 2",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/2108e23e264b487b9f5c8022145d22d8",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2108e23e264b487b9f5c8022145d22d8?themeId=41&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          }
        ];
      } 
      // Book 7 Unit 9 - Jobs
      else if (bookId === '7' && unitId === '9') {
        resources = [
          {
            id: "book7-unit9-pdf1",
            bookId: "7",
            unitId: "9",
            title: "Book 7 - Unit 9 Overview",
            resourceType: "pdf",
            provider: "Visual English",
            sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit9/00%20A%20Book%207%20%E2%80%93%20Unit%209.pdf",
            embedCode: ""
          },
          {
            id: "book7-unit9-game1",
            bookId: "7",
            unitId: "9",
            title: "Types of Jobs Game 1",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/51d5ddacedd84b80a1a641af60f9abb3",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/51d5ddacedd84b80a1a641af60f9abb3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit9-game2",
            bookId: "7",
            unitId: "9",
            title: "Types of Jobs Game 2",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/0100b9837b4f46c0b56a01caab8e459a",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0100b9837b4f46c0b56a01caab8e459a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit9-game3",
            bookId: "7",
            unitId: "9",
            title: "Jobs Kahoot",
            resourceType: "game",
            provider: "Kahoot",
            sourceUrl: "https://create.kahoot.it/share/visual-7-unit-9-jobs/07fa5381-b0a3-4da8-996f-e34a9232145b",
            embedCode: ""
          },
          {
            id: "book7-unit9-video1",
            bookId: "7",
            unitId: "9",
            title: "What Do You Want To Be?",
            resourceType: "video",
            provider: "YouTube",
            sourceUrl: "https://www.youtube.com/embed/nfzYoNTcAn8",
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=ePvFy6TfZVtNh1gZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit9-game4",
            bookId: "7",
            unitId: "9",
            title: "Types of Jobs - Wordwall Game",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/c19107c08fe04affb6610d874284df4a",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c19107c08fe04affb6610d874284df4a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          }
        ];
      }
      // Book 7 Unit 11 - Natural Disasters
      else if (bookId === '7' && unitId === '11') {
        resources = [
          {
            id: "book7-unit11-pdf1",
            bookId: "7",
            unitId: "11",
            title: "Book 7 - Unit 11 Overview",
            resourceType: "pdf",
            provider: "Visual English",
            sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit11/00%20A%20Book%207%20%E2%80%93%20Unit%2011.pdf",
            embedCode: ""
          },
          {
            id: "book7-unit11-game1",
            bookId: "7",
            unitId: "11",
            title: "Natural Disaster Game",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/e2fdc9e3360e49aaa27816818a1179d6",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e2fdc9e3360e49aaa27816818a1179d6?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit11-game2",
            bookId: "7",
            unitId: "11",
            title: "Natural Disasters Kahoot",
            resourceType: "game",
            provider: "Kahoot",
            sourceUrl: "https://create.kahoot.it/share/visual-english-7-unit-11-natural-disasters/49b6cfd8-e8b3-479c-bda3-e2192412a301",
            embedCode: ""
          },
          {
            id: "book7-unit11-game3",
            bookId: "7",
            unitId: "11",
            title: "Natural Disaster Wordwall Game",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/28a-ONLINE-GAME-WORDWALL-NATURAL-DISASTER",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/28a-ONLINE-GAME-WORDWALL-NATURAL-DISASTER?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          }
        ];
      }
      // Book 7 Unit 14 - Social Problems
      else if (bookId === '7' && unitId === '14') {
        resources = [
          {
            id: "book7-unit14-pdf1",
            bookId: "7",
            unitId: "14",
            title: "Book 7 - Unit 14 Overview",
            resourceType: "pdf",
            provider: "Visual English",
            sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit14/00%20A%20Book%207.pdf",
            embedCode: ""
          },
          {
            id: "book7-unit14-video1",
            bookId: "7",
            unitId: "14",
            title: "Migrants - Award-Winning CG Animated Short Film about Climate change",
            resourceType: "video",
            provider: "YouTube",
            sourceUrl: "https://www.youtube.com/watch?v=ugPJi8kMK8Q",
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ugPJi8kMK8Q?si=aj_dlhbAyjFFNf0G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
          },
          {
            id: "book7-unit14-game1",
            bookId: "7",
            unitId: "14",
            title: "Social Problems Game",
            resourceType: "game",
            provider: "Wordwall",
            sourceUrl: "https://wordwall.net/resource/693f7afb993242929b59236c929717a5",
            embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/693f7afb993242929b59236c929717a5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
          }
        ];
      }
      
      if (resources.length > 0) {
        const success = saveResourcesForUnit(bookId, unitId, resources);
        if (success) {
          res.status(200).json({ 
            success: true, 
            message: `Successfully added ${resources.length} resources for Book ${bookId}, Unit ${unitId}`
          });
        } else {
          res.status(500).json({ 
            success: false, 
            error: `Failed to save resources for Book ${bookId}, Unit ${unitId}`
          });
        }
      } else {
        res.status(404).json({ 
          success: false, 
          error: `No resources defined for Book ${bookId}, Unit ${unitId}`
        });
      }
    } catch (error) {
      console.error(`Error adding resources for Book ${bookId}, Unit ${unitId}:`, error);
      res.status(500).json({ 
        success: false, 
        error: `Server error: ${error.message}`
      });
    }
  });
  
  console.log('Direct routes registered successfully');
}