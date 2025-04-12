import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from "../server/db";
import { units, materials } from "../shared/schema";
import { eq } from "drizzle-orm";

// Map unitIds to their URLs
const unitUrls = [
  { id: 135, url: 'https://visualenglish.pl/product/visualenglish5unit1/' },
  { id: 136, url: 'https://visualenglish.pl/product/visualenglish5unit2/' },
  { id: 137, url: 'https://visualenglish.pl/product/visualenglish5unit3/' },
  { id: 138, url: 'https://visualenglish.pl/product/visualenglish5unit4/' },
  { id: 139, url: 'https://visualenglish.pl/product/visualenglish5unit5/' },
  { id: 140, url: 'https://visualenglish.pl/product/visualenglish5unit6/' },
  { id: 141, url: 'https://visualenglish.pl/product/visualenglish5unit7/' },
  { id: 142, url: 'https://visualenglish.pl/product/visualenglish5unit8/' },
  { id: 143, url: 'https://visualenglish.pl/product/visualenglish5unit9/' },
  { id: 144, url: 'https://visualenglish.pl/product/visualenglish5unit10/' },
  { id: 145, url: 'https://visualenglish.pl/product/visualenglish5unit11/' },
  { id: 146, url: 'https://visualenglish.pl/product/visualenglish5unit12/' },
  { id: 147, url: 'https://visualenglish.pl/product/visualenglish5unit13/' },
  { id: 148, url: 'https://visualenglish.pl/product/visualenglish5unit14/' },
  { id: 149, url: 'https://visualenglish.pl/product/visualenglish5unit15/' },
  { id: 150, url: 'https://visualenglish.pl/product/visualenglish5unit16/' }
];

async function extractContentFromUrl(url: string): Promise<{ title: string, content: string, materialContent: string }> {
  try {
    console.log(`Fetching content from ${url}...`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract title
    const title = $('.product_title').text().trim();
    
    // Extract product description content
    const productDescription = $('.woocommerce-product-details__short-description').text().trim();
    
    // Extract material covered content - usually in tabs or product description
    let materialContent = '';
    
    // Try to find material content in tabs
    const tabs = $('.woocommerce-Tabs-panel');
    tabs.each((i, elem) => {
      const tabContent = $(elem).text().trim();
      if (tabContent.includes('Material covered') || 
          tabContent.includes('Content includes') || 
          tabContent.includes('This unit includes')) {
        materialContent += tabContent;
      }
    });
    
    // If no material content found in tabs, extract from main description
    if (!materialContent) {
      // Look for content lists in the product description
      $('.woocommerce-product-details__short-description ul').each((i, elem) => {
        materialContent += `Material Covered:\n`;
        $(elem).find('li').each((j, li) => {
          materialContent += `- ${$(li).text().trim()}\n`;
        });
      });
    }
    
    // If still no content, create a structured content based on product description
    if (!materialContent) {
      // Extract any structured content we can find
      const paragraphs = $('.woocommerce-product-details__short-description p');
      paragraphs.each((i, elem) => {
        const text = $(elem).text().trim();
        if (text) {
          materialContent += text + '\n\n';
        }
      });
      
      // Format the material content in a structured way
      materialContent = `### Material Covered
${materialContent}

### Unit Content
This unit provides practice with vocabulary, grammar, and conversation related to the theme.
`;
    }
    
    return {
      title,
      content: productDescription,
      materialContent
    };
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return {
      title: 'Failed to fetch title',
      content: '',
      materialContent: 'Failed to fetch material content'
    };
  }
}

// Default material content templates in case scraping fails
const defaultMaterialContent = {
  135: `### Material Covered in School Tour
- Vocabulary for school facilities and rooms
- School subjects and teachers
- Classroom objects and equipment
- Conversation practice about school activities
- Grammar: present simple tense, prepositions of place`,
  
  136: `### Material Covered in House Chores
- Vocabulary for cleaning tools and supplies
- Common household chores and responsibilities
- Conversation about who does what at home
- Frequency adverbs (always, sometimes, never)
- Grammar: present simple and "Do you...?" questions`,
  
  137: `### Material Covered in Are You a Gamer?
- Video game vocabulary and gaming devices
- Types of games and gaming activities
- Discussions about favorite games and screen time
- Expressing preferences and opinions
- Grammar: present simple for habits and likes/dislikes`,
  
  138: `### Material Covered in Places in the Town
- Names of public buildings and community places
- Giving and following directions
- Asking where things are located
- Describing places in a town or city
- Grammar: prepositions of place, "Where is/are...?" questions`,
  
  139: `### Material Covered in Winter Fun
- Winter activities and sports vocabulary
- Winter clothing and seasonal items
- Weather expressions and temperature
- Holiday traditions and celebrations
- Grammar: present simple for preferences, can/can't for abilities`,
  
  140: `### Material Covered in Nationalities
- Country names from around the world
- Nationality adjectives (American, French, etc.)
- Languages spoken in different countries
- Cultural differences and traditions
- Grammar: "Where are you from?" questions, "I am from..." statements`,
  
  141: `### Material Covered in Get Well Soon!
- Vocabulary for common illnesses
- Body parts and health problems
- Expressing sympathy and concern
- Medical treatments and advice
- Grammar: should/shouldn't for advice, "What's wrong?" questions`,
  
  142: `### Material Covered in What Did You Do Yesterday?
- Past tense verbs for everyday activities
- Time expressions for the past
- Daily routine in past tense
- Weekend activities discussions
- Grammar: regular and irregular past tense verbs, past simple questions`,
  
  143: `### Material Covered in Emotions
- Basic and complex emotion vocabulary
- Facial expressions and body language
- Expressing feelings in different situations
- Asking about others' emotions
- Grammar: "I feel..." expressions, "Why are you...?" questions`,
  
  144: `### Material Covered in At the Supermarket
- Food and grocery vocabulary
- Shopping conversations and phrases
- Prices and quantity expressions
- Departments in a supermarket
- Grammar: countable/uncountable nouns, polite requests`,
  
  145: `### Material Covered in Where Are You Going?
- Travel and destination vocabulary
- Future plans and intentions
- Holiday activities and preparations
- Transportation options
- Grammar: present continuous for future plans, "going to" future`,
  
  146: `### Material Covered in How Did You Get Here?
- Transportation vocabulary
- Journey experiences and stories
- Travel methods and preferences
- City navigation discussions
- Grammar: past simple, transportation prepositions (by, on, in)`,
  
  147: `### Material Covered in What Did You Do Yesterday?
- Daily activities in past tense
- Sequencing past events
- Describing completed actions
- Weekend and free time activities
- Grammar: regular and irregular past verbs, time sequence expressions`,
  
  148: `### Material Covered in Movie Time
- Film genres and cinema vocabulary
- Movie opinions and ratings
- Cinema experience conversations
- Favorite actors and directors
- Grammar: past tense for experiences, opinion expressions`,
  
  149: `### Material Covered in Let's Go Sightseeing
- Tourist attractions and landmarks
- Sightseeing activities and souvenirs
- City tour planning and experiences
- Travel recommendations
- Grammar: must/should for recommendations, imperatives for directions`,
  
  150: `### Material Covered in Sounds of Music
- Musical instruments and equipment
- Music genres and styles
- Concert and performance vocabulary
- Musical abilities and preferences
- Grammar: can/can't for abilities, present simple for preferences`
};

async function createOrUpdateMaterial(unitId: number, materialContent: string) {
  try {
    // First, check if there's an existing "Material Content" material
    const existingMaterials = await db.select()
      .from(materials)
      .where(eq(materials.unitId, unitId))
      .where(eq(materials.title, "Material Content"));
    
    // If material exists, update it
    if (existingMaterials.length > 0) {
      const updatedMaterial = await db.update(materials)
        .set({
          content: materialContent,
          updatedAt: new Date()
        })
        .where(eq(materials.id, existingMaterials[0].id))
        .returning();
      
      console.log(`Updated existing Material Content for Unit ${unitId}`);
      return updatedMaterial[0];
    } 
    // If material doesn't exist, create it
    else {
      const newMaterial = await db.insert(materials)
        .values({
          unitId: unitId,
          title: "Material Content",
          contentType: "lesson",
          content: materialContent,
          orderIndex: 10, // Place it after other content
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      
      console.log(`Created new Material Content for Unit ${unitId}`);
      return newMaterial[0];
    }
  } catch (error) {
    console.error(`Error creating/updating material for Unit ${unitId}:`, error);
    return null;
  }
}

async function scrapeAndUpdateContent() {
  try {
    console.log("Starting to scrape and update unit content...");
    
    for (const unit of unitUrls) {
      try {
        // Try to scrape content from the URL
        const scrapedContent = await extractContentFromUrl(unit.url);
        
        // If scraping succeeded, use the scraped content
        let materialContent = scrapedContent.materialContent;
        
        // If scraping failed, use the default content
        if (!materialContent || materialContent === 'Failed to fetch material content') {
          console.log(`Using default content for Unit ${unit.id}`);
          materialContent = defaultMaterialContent[unit.id];
        }
        
        // Create or update the material
        await createOrUpdateMaterial(unit.id, materialContent);
        
        // For very short descriptions, update just the unit
        if (scrapedContent.content && scrapedContent.content.length > 5) {
          // Ensure the unit description is short and concise
          const shortDescription = scrapedContent.content
            .split('.')[0]  // Get the first sentence
            .trim() 
            .substring(0, 150) + '...'; // Limit length
          
          await db.update(units)
            .set({ 
              description: shortDescription,
              updatedAt: new Date()
            })
            .where(eq(units.id, unit.id));
          
          console.log(`Updated description for Unit ${unit.id}`);
        }
      } catch (error) {
        console.error(`Error processing Unit ${unit.id}:`, error);
      }
    }
    
    console.log("All units processed!");
    process.exit(0);
  } catch (error) {
    console.error("Error in main scraping function:", error);
    process.exit(1);
  }
}

scrapeAndUpdateContent();