import { db } from "../server/db";
import { units, materials } from "../shared/schema";
import { eq } from "drizzle-orm";

// Book 5 unit data with both short descriptions and material content
const unitData = [
  {
    id: 135, // Unit 1: School Tour
    shortDescription: `🏫📚 School Tour! Learn vocabulary for school facilities and subjects. Practice talking about classrooms, teachers, and school activities.`,
    materialContent: `### Material Covered
- School facilities vocabulary (classroom, library, gym, cafeteria)
- School subjects (Math, English, Science, P.E.)
- Conversations about school activities
- Grammar: present simple and prepositions of place
- Questions about school locations and favorite subjects`
  },
  {
    id: 136, // Unit 2: House Chores
    shortDescription: `🏠✨ House Chores! Learn vocabulary for household tasks and cleaning tools. Practice discussing who does chores at home and how often.`,
    materialContent: `### Material Covered
- Cleaning tools vocabulary (mop, broom, vacuum, duster, bin)
- Household appliances (dishwasher, washing machine, iron)
- Discussing who does chores at home and how often
- Grammar: "Do you..." questions and frequency expressions
- Questions about household responsibilities`
  },
  {
    id: 137, // Unit 3: Are You a Gamer?
    shortDescription: `🎮🕹️ Are You a Gamer? Learn gaming vocabulary and discuss video games, devices, and gaming habits. Practice expressing preferences about digital entertainment.`,
    materialContent: `### Material Covered
- Gaming vocabulary and devices (console, controller, games)
- Types of video games and gaming activities
- Discussing favorite games and screen time
- Grammar: present simple for gaming habits
- Questions about gaming preferences and experiences`
  },
  {
    id: 138, // Unit 4: Places in the Town
    shortDescription: `🏙️🚶 Places in the Town! Learn to identify urban locations, give directions, and discuss community facilities. Practice conversations about getting around town.`,
    materialContent: `### Material Covered
- Places vocabulary (post office, bank, supermarket, restaurant)
- Giving and following directions
- Asking where places are located
- Grammar: prepositions of place and "Where is/are...?" questions
- Conversations about community facilities and services`
  },
  {
    id: 139, // Unit 5: Winter Fun
    shortDescription: `❄️⛄ Winter Fun! Learn vocabulary for winter activities, clothes and celebrations. Practice talking about cold weather fun and seasonal traditions.`,
    materialContent: `### Material Covered
- Winter activities vocabulary (skiing, sledding, ice skating)
- Winter clothes and seasonal items
- Weather expressions and winter celebrations
- Grammar: present simple for preferences and past simple for experiences
- Conversations about winter sports and traditions`
  },
  {
    id: 140, // Unit 6: Nationalities
    shortDescription: `🌎🧑‍🤝‍🧑 Nationalities! Learn country names, languages, and cultural traditions. Practice introducing people from different countries and discussing cultural differences.`,
    materialContent: `### Material Covered
- Country names and nationalities vocabulary
- Languages spoken in different countries
- Cultural differences and traditions
- Grammar: "Where are you from?" questions
- Discussions about international cultures and languages`
  },
  {
    id: 141, // Unit 7: Get Well Soon!
    shortDescription: `🏥💊 Get Well Soon! Learn health-related vocabulary, common illnesses, and medical treatments. Practice expressing sympathy and discussing health problems.`,
    materialContent: `### Material Covered
- Health vocabulary (cold, flu, headache, fever)
- Body parts and medical treatments
- Expressing sympathy and giving advice
- Grammar: "What's wrong?" questions and should/shouldn't
- Conversations about health problems and solutions`
  },
  {
    id: 142, // Unit 8: What Did You Do Yesterday?
    shortDescription: `⏰📅 What Did You Do Yesterday? Learn past tense verbs and time expressions. Practice talking about completed activities and describing past events.`,
    materialContent: `### Material Covered
- Past tense verbs for daily activities
- Time expressions for the past
- Talking about completed activities
- Grammar: simple past tense regular and irregular verbs
- Questions about past experiences and events`
  },
  {
    id: 143, // Unit 9: Emotions
    shortDescription: `😊😢 Emotions! Learn vocabulary for feelings and emotional states. Practice expressing and responding to different emotions in various situations.`,
    materialContent: `### Material Covered
- Emotions vocabulary (happy, sad, angry, surprised)
- Facial expressions and feelings
- Expressing and asking about emotions
- Grammar: "How do you feel?" and "Why are you...?" questions
- Conversations about different emotional situations`
  },
  {
    id: 144, // Unit 10: At the Supermarket
    shortDescription: `🛒🥕 At the Supermarket! Learn food vocabulary and shopping phrases. Practice conversations about buying groceries and discussing prices.`,
    materialContent: `### Material Covered
- Food and grocery vocabulary
- Shopping phrases and expressions
- Prices and quantity words
- Grammar: countable/uncountable nouns and quantity expressions
- Role-plays for shopping conversations`
  },
  {
    id: 145, // Unit 11: Where Are You Going?
    shortDescription: `🚗🗺️ Where Are You Going? Learn travel vocabulary and future plans. Practice talking about destinations and upcoming trips using present continuous for future.`,
    materialContent: `### Material Covered
- Travel destinations and activities vocabulary
- Future plans and intentions
- Trip planning expressions
- Grammar: present continuous for future plans
- Conversations about upcoming journeys and vacation plans`
  },
  {
    id: 146, // Unit 12: How Did You Get Here?
    shortDescription: `🚌✈️ How Did You Get Here? Learn transportation vocabulary and travel experiences. Practice discussing different ways of traveling and past journeys.`,
    materialContent: `### Material Covered
- Transportation vocabulary (car, bus, train, plane)
- Travel methods and journey expressions
- Past travel experiences
- Grammar: past simple and transportation prepositions
- Discussions about different ways of traveling`
  },
  {
    id: 147, // Unit 13: What Did You Do Yesterday?
    shortDescription: `📆✓ What Did You Do Yesterday? Learn past tense verbs for daily activities. Practice describing completed actions and talking about recent events.`,
    materialContent: `### Material Covered
- Past tense verbs for routine activities
- Time expressions and sequence words
- Daily schedule vocabulary
- Grammar: regular and irregular past verbs
- Conversations about past daily activities`
  },
  {
    id: 148, // Unit 14: Movie Time
    shortDescription: `🎬🍿 Movie Time! Learn film genres, cinema vocabulary, and expressions for opinions. Practice discussing favorite movies and film preferences.`,
    materialContent: `### Material Covered
- Film genres and cinema vocabulary
- Movie opinions and ratings expressions
- Cinema experience phrases
- Grammar: past tense for experiences and opinion structures
- Discussions about favorite films and movie preferences`
  },
  {
    id: 149, // Unit 15: Let's Go Sightseeing
    shortDescription: `🗽🏛️ Let's Go Sightseeing! Learn vocabulary for landmarks and tourist attractions. Practice planning tours and describing famous places.`,
    materialContent: `### Material Covered
- Tourist attractions and landmarks vocabulary
- Sightseeing activities and travel recommendations
- City tour planning phrases
- Grammar: "Let's..." suggestions and modal verbs
- Conversations about famous places and tourist destinations`
  },
  {
    id: 150, // Unit 16: Sounds of Music
    shortDescription: `🎵🎸 Sounds of Music! Learn musical instruments, genres, and performance vocabulary. Practice talking about musical preferences and abilities.`,
    materialContent: `### Material Covered
- Musical instruments and music genres vocabulary
- Performance and concert phrases
- Musical abilities expressions
- Grammar: "Can you play...?" questions and frequency adverbs
- Discussions about musical preferences and experiences`
  }
];

async function updateDescriptionsAndContent() {
  try {
    console.log("Updating units with short descriptions and adding 'Material Content' fields...");
    
    for (const unit of unitData) {
      // Update unit description with short description
      await db.update(units)
        .set({ 
          description: unit.shortDescription,
          updatedAt: new Date()
        })
        .where(eq(units.id, unit.id));
      
      console.log(`Updated Unit ${unit.id} with short description`);
      
      // Check if materials table exists and has proper structure
      try {
        // First, check if there's an existing "Material Content" material
        const existingMaterialsResult = await db.select({ count: db.fn.count() })
          .from(materials);
        
        // If materials table exists and has structure, try to create/update material content
        if (existingMaterialsResult) {
          try {
            await db.insert(materials)
              .values({
                unitId: unit.id,
                title: "Material Content",
                contentType: "lesson",
                content: unit.materialContent,
                orderIndex: 0,
                isPublished: true,
                createdAt: new Date(),
                updatedAt: new Date()
              })
              .onConflictDoUpdate({
                target: [materials.unitId, materials.title],
                set: {
                  content: unit.materialContent,
                  updatedAt: new Date()
                }
              });
            
            console.log(`Added/Updated Material Content for Unit ${unit.id}`);
          } catch (materialError) {
            console.error(`Error adding material for Unit ${unit.id}:`, materialError);
          }
        }
      } catch (materialsTableError) {
        console.log(`Materials table not fully accessible, skipping material content addition.`);
      }
    }
    
    console.log("All updates completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating descriptions and content:", error);
    process.exit(1);
  }
}

updateDescriptionsAndContent();