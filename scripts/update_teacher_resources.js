// Script to update teacher resources from PDF links
import fs from 'fs';
import { pool } from '../server/db.js';

// Resources extracted from the "Linki Do Filmy I Gry.pdf" files
const resources = {
  "2": [
    {
      "resourceType": "video",
      "title": "Unit 2 - School Objects Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/41cJ0mqWses?si=JlxMgV_GADKfiUFf\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/41cJ0mqWses?si=JlxMgV_GADKfiUFf",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - School Objects Lesson",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Ix4dSjKqwvc?si=eK9P-OvHUpAP2T49\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/Ix4dSjKqwvc?si=eK9P-OvHUpAP2T49",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - What Is It?",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Ct6BUPvE2sM?si=-OWJf3xPmmeHVw_b\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/Ct6BUPvE2sM?si=-OWJf3xPmmeHVw_b",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - School Supplies Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/t24dt39WNG0?si=DkWmQWqsVIBtV_sQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/t24dt39WNG0?si=DkWmQWqsVIBtV_sQ",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - Classroom Objects",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/F9OdB53UGmA?si=dli3ESO3Q-28sZ3q\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/F9OdB53UGmA?si=dli3ESO3Q-28sZ3q",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - School Supplies Vocabulary",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JLMsm-D7kjk?si=hbbam_l55tiPpX5F\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/JLMsm-D7kjk?si=hbbam_l55tiPpX5F",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 2 - School Objects Game",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 2 - School Items Matching",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0",
      "order": 8
    },
    {
      "resourceType": "game",
      "title": "Unit 2 - Vocabulary Practice",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/8fc8c7bbdc504ca0bb4eac9cdaa9c21f?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/8fc8c7bbdc504ca0bb4eac9cdaa9c21f?themeId=1&templateId=3&fontStackId=0",
      "order": 9
    }
  ],
  "3": [
    {
      "resourceType": "video",
      "title": "Unit 3 - Stand Up Sit Down",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 3 - Classroom Rules",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 3 - Classroom Instructions",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 3 - Classroom Language",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf",
      "order": 4
    },
    {
      "resourceType": "game",
      "title": "Unit 3 - Classroom Commands",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 3 - Classroom Rules",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/0ed4ebc039d54a74b1f5d0e7d4b61e2c?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/0ed4ebc039d54a74b1f5d0e7d4b61e2c?themeId=1&templateId=5&fontStackId=0",
      "order": 6
    }
  ],
  "4": [
    {
      "resourceType": "video",
      "title": "Unit 4 - How Are You Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - Happy, Sad, Hot, Cold",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/USEUjsQgTNc?si=BVtqA0mNZLtmmLUh\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/USEUjsQgTNc?si=BVtqA0mNZLtmmLUh",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - Feelings and Emotions",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pXHfyD9CvHw?si=vihXIGWGTxQ8vxZv\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/pXHfyD9CvHw?si=vihXIGWGTxQ8vxZv",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - Emotions Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dR9p73LpVnM?si=S4HN1xgCiDw_zcnO\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/dR9p73LpVnM?si=S4HN1xgCiDw_zcnO",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - If You're Happy",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 4 - Feelings Game",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/33c70a4f2c9c4a1cbe7da60de7c58ea1?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/33c70a4f2c9c4a1cbe7da60de7c58ea1?themeId=1&templateId=3&fontStackId=0",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 4 - Emotions Matching",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/b9fbf8c22482493cb2ba02e36c14b81c?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/b9fbf8c22482493cb2ba02e36c14b81c?themeId=1&templateId=5&fontStackId=0",
      "order": 7
    }
  ],
  "5": [
    {
      "resourceType": "video",
      "title": "Unit 5 - Family Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FHaObkHEkHQ?si=mIo-8T6MUOe7aJCK\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/FHaObkHEkHQ?si=mIo-8T6MUOe7aJCK",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - The Finger Family",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - Baby Shark Family",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - Family Vocabulary",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - Meet My Family",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 5 - Family Members",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 5 - Family Matching",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 5 - Family Quiz",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0",
      "order": 8
    }
  ]
};

async function updateTeacherResources() {
  // Function to add a resource to the database
  async function addResource(bookId, unitId, resource) {
    try {
      // Check if resource already exists to avoid duplicates
      const checkQuery = `
        SELECT id FROM teacher_resources 
        WHERE book_id = $1 AND unit_id = $2 AND resource_type = $3 AND embed_code = $4
      `;
      const checkResult = await pool.query(checkQuery, [bookId, unitId, resource.resourceType, resource.embedCode]);
      
      if (checkResult.rows.length === 0) {
        // Resource doesn't exist, insert it
        const insertQuery = `
          INSERT INTO teacher_resources 
          (book_id, unit_id, title, resource_type, embed_code, provider, source_url, "order") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `;
        const values = [
          bookId, 
          unitId, 
          resource.title, 
          resource.resourceType,
          resource.embedCode,
          resource.provider,
          resource.sourceUrl,
          resource.order
        ];
        
        const result = await pool.query(insertQuery, values);
        console.log(`Added resource: ${resource.title} to Book ${bookId}, Unit ${unitId}`);
        return result.rows[0].id;
      } else {
        console.log(`Resource already exists: ${resource.title} in Book ${bookId}, Unit ${unitId}`);
        return checkResult.rows[0].id;
      }
    } catch (error) {
      console.error(`Error adding resource ${resource.title}:`, error);
      return null;
    }
  }

  // Process each unit's resources
  const bookId = "1"; // All resources are for Book 1
  
  for (const [unitId, unitResources] of Object.entries(resources)) {
    console.log(`Processing resources for Book ${bookId}, Unit ${unitId}...`);
    
    for (const resource of unitResources) {
      await addResource(bookId, unitId, resource);
    }
  }
  
  console.log("Finished updating teacher resources");
}

// Run the update function
updateTeacherResources()
  .then(() => console.log("Teacher resources updated successfully"))
  .catch(err => console.error("Error updating teacher resources:", err))
  .finally(() => {
    // Close the database connection when done
    pool.end();
  });