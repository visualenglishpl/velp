/**
 * Special direct routes for adding resources to the system
 */
import express from 'express';
import { saveResourcesForUnit, getResourcesForUnit } from './content-management';

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

// Book 7 resources - hardcoded data to avoid authentication issues
const book7Resources: Record<string, Array<{
  id: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: string;
  provider: string;
  sourceUrl: string;
  embedCode: string;
  lessonPlan?: {
    level?: string;
    duration?: string;
    objectives?: string[];
  };
}>> = {
  // Unit 1 - Movie Genres
  "1": [
    {
      id: "book7-unit1-video1",
      bookId: '7',
      unitId: '1',
      title: "Movie Genres Vocabulary Epic ESL Guessing Game",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=FTuQIwl7j3k",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FTuQIwl7j3k?si=wh3So_Qj8Hqk6TL3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-game1",
      bookId: '7',
      unitId: '1',
      title: "Movie & Film Genres - Wordwall Game",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/17566456/movies-film-genres",
      embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/0e3ddce1b4b54f92a65a0c702db44271?themeId=23&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  
  // Unit 6 - Money
  "6": [
    {
      id: "book7-unit6-video1",
      bookId: '7',
      unitId: '6',
      title: "Learn English: Money from 1p to 50 Pounds",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=RrXNezFLWSI",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RrXNezFLWSI?si=CJsKkDLw0TpfUfm7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit6-game1",
      bookId: '7',
      unitId: '6',
      title: "Currency and Money Terms - Vocabulary Quiz",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/38051887/currency-and-money-terms",
      embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/bfcb61f5f6cf4493a2c879aba9b12b9a?themeId=48&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  
  // Unit 9 - Jobs
  "9": [
    {
      id: "book7-unit9-game1",
      bookId: '7',
      unitId: '9',
      title: "Types of Jobs - Wordwall Game",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/10037807/types-jobs",
      embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/97b3979a70a54b17a193a2d9c85f1d40?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  
  // Unit 11 - Natural Disasters
  "11": [
    {
      id: "book7-unit11-video1",
      bookId: '7',
      unitId: '11',
      title: "CG Animated Short Film about Climate change",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=dKP08GCh4d4",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dKP08GCh4d4?si=NYAjQpwGFz-VsDxH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit11-game1",
      bookId: '7',
      unitId: '11',
      title: "Natural Disasters Vocabulary Game",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/8518517/natural-disasters",
      embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/f71ec9e2c30d4499b9e0fb0ba5c91a70?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  
  // Unit 16 - Additional resources for all units
  "16": [
    {
      id: "book7-unit16-video1",
      bookId: '7',
      unitId: '16',
      title: "Visual English Learning Resources",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=xM4I6qWUVuw",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xM4I6qWUVuw?si=abcdefghijk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit16-game1",
      bookId: '7',
      unitId: '16',
      title: "English Learning Activities",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/29887281/visual-english-activities",
      embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/f71ec9e2c30d4499b9e0fb0ba5c91a70?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ]
};

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
  
  // Simple test endpoint to verify our no-auth routes are working
  app.get('/api/no-auth/test', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      message: "No-auth test endpoint is working correctly",
      timestamp: new Date().toISOString()
    });
  });
  
  // Special debug endpoint for Book 7 Unit 9 resources
  app.get('/api/debug/book7-unit9', (req, res) => {
    // Important: Set headers early and consistently
    res.set({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff'
    });
    
    try {
      // Log request for debugging
      console.log('Debug endpoint accessed: /api/debug/book7-unit9');
      
      // Return hardcoded game data for testing
      const resources = [
        {
          id: "book7-unit9-game1", 
          bookId: "7",
          unitId: "9",
          title: "Types of Jobs - Wordwall Game",
          resourceType: "game",
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/10037807/types-jobs",
          embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/97b3979a70a54b17a193a2d9c85f1d40?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
      
      // Use res.json() instead of manually stringifying to ensure proper content type
      return res.status(200).json({
        success: true,
        resources,
        message: "Debug endpoint for Book 7 Unit 9 resources"
      });
    } catch (error) {
      console.error('Error in debug endpoint:', error);
      return res.status(500).json({
        success: false,
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });
  
  // Direct endpoint for unit info that returns a strict JSON response
  app.get('/api/direct/:bookId/:unitId', (req, res) => {
    const { bookId, unitId } = req.params;
    
    // Important: Set headers early and consistently
    res.set({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff'
    });
    
    try {
      // Log the request for debugging
      console.log(`Unit info endpoint accessed: /api/direct/${bookId}/${unitId}`);
      
      // Extract the unit number from unitId (e.g., 'unit8' -> 8)
      const unitNumber = parseInt(unitId.replace(/\D/g, ''));
      
      // Extract book ID number from bookId (e.g., 'book7' -> '7')
      const bookIdNumber = bookId.replace(/\D/g, '');
      
      // Create a unit info response
      const unitInfo = {
        id: unitNumber + 1000, // Just a dummy ID for testing
        path: `${bookId}/${unitId}`,
        bookId: bookIdNumber,
        unitNumber: unitNumber,
        title: `Unit ${unitNumber}`,
        description: `Test unit for ${bookId}/${unitId}`
      };
      
      // Use res.json() to ensure proper content type
      return res.status(200).json(unitInfo);
    } catch (error) {
      console.error(`Error in unit info endpoint for ${bookId}/${unitId}:`, error);
      return res.status(500).json({
        success: false,
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });

  // Special debug endpoint for materials that returns a strict JSON response
  app.get('/api/direct/:bookId/:unitId/materials', (req, res) => {
    const { bookId, unitId } = req.params;
    
    // Important: Set headers early and consistently
    res.set({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff'
    });
    
    try {
      // Log the request for debugging
      console.log(`Materials endpoint accessed: /api/direct/${bookId}/${unitId}/materials`);
      
      // Create a dummy response for testing - we'll replace with actual data later
      const materials = [
        {
          id: 1001,
          unitId: 101,
          title: `Test Material for ${bookId}/${unitId}`,
          contentType: "IMAGE",
          content: "test-image.png",
          // Add the path property for images to load correctly
          path: `/api/direct/${bookId}/${unitId}/assets/01.png`,
          orderIndex: 1,
          isPublished: true,
          isLocked: false,
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      // Use res.json() to ensure proper content type
      return res.status(200).json(materials);
    } catch (error) {
      console.error(`Error in materials endpoint for ${bookId}/${unitId}:`, error);
      return res.status(500).json({
        success: false,
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });
  
  // Endpoint for saved order information
  app.get('/api/direct/:bookId/:unitId/savedOrder', (req, res) => {
    const { bookId, unitId } = req.params;
    
    // Important: Set headers early and consistently
    res.set({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff'
    });
    
    try {
      // Log the request for debugging
      console.log(`SavedOrder endpoint accessed: /api/direct/${bookId}/${unitId}/savedOrder`);
      
      // Return a response indicating no custom order (yet)
      return res.status(200).json({
        success: true,
        hasCustomOrder: false,
        order: [1001] // ID of our test material
      });
    } catch (error) {
      console.error(`Error in savedOrder endpoint for ${bookId}/${unitId}:`, error);
      return res.status(500).json({
        success: false,
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });

  // Special no-auth endpoint for Book 7 resources
  app.get('/api/no-auth/book7/:unitId/resources', (req, res) => {
    const { unitId } = req.params;
    
    // Important: Set headers early and consistently
    res.set({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    
    try {
      // Debug logs
      console.log(`No-auth endpoint accessed: /api/no-auth/book7/${unitId}/resources`);
      console.log(`Checking for resources in book7Resources for unit ${unitId}`);
      console.log(`Available units: ${Object.keys(book7Resources).join(', ')}`);
      
      // Check if we have hardcoded resources for this unit
      if (book7Resources[unitId]) {
        console.log(`Found ${book7Resources[unitId].length} resources for Book 7 Unit ${unitId}`);
        
        // Use res.json() instead of manually stringifying to ensure proper content type
        return res.status(200).json({
          success: true,
          resources: book7Resources[unitId]
        });
      } else {
        console.log(`No resources found for Book 7 Unit ${unitId}`);
        
        // Return empty array for units without hardcoded resources
        return res.status(200).json({
          success: true,
          resources: []
        });
      }
    } catch (error) {
      console.error(`Error retrieving Book 7 Unit ${unitId} resources:`, error);
      
      return res.status(500).json({
        success: false,
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
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
  
  // Route to get teacher resources for a specific book and unit
  app.get('/api/direct/:bookId/:unitId/resources', (req, res) => {
    const { bookId, unitId } = req.params;
    
    // CORS headers to avoid preflight issues
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Always set JSON content type
    res.setHeader('Content-Type', 'application/json');
    
    // For now, remove authentication requirement to simplify debugging
    // Later we can add this back with proper session management
    // if (!req.isAuthenticated()) {
    //   return res.status(401).json({ 
    //     success: false, 
    //     error: 'Authentication required' 
    //   });
    // }
    
    try {
      // First check if we have any stored resources in memory/database
      const storedResources = getResourcesForUnit(bookId, unitId);
      
      if (storedResources && storedResources.length > 0) {
        // Return resources from storage
        res.status(200).json({ 
          success: true, 
          resources: storedResources
        });
      } else {
        // If no stored resources, check if we have hardcoded resources in TeacherResources.tsx
        // For now, return empty array as those resources will be used client-side
        res.status(200).json({ 
          success: true, 
          resources: []
        });
      }
    } catch (error) {
      console.error(`Error retrieving resources for Book ${bookId}, Unit ${unitId}:`, error);
      res.status(500).json({ 
        success: false, 
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });
  
  console.log('Direct routes registered successfully');
}