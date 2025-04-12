import { db } from "../server/db";
import { units, materials } from "../shared/schema";
import { eq } from "drizzle-orm";

// Shorter unit descriptions based on user's request
const unitDescriptions = [
  {
    id: 136, // Unit 2: House Chores
    description: `🏠✨ House Chores! Learn vocabulary for common household tasks and cleaning tools. Students practice discussing who does what at home and how often chores are completed.`,
    materialContent: `
Key Vocabulary:
- Cleaning tools: mop, broom, vacuum, duster, bin
- Household appliances: dishwasher, washing machine, iron
- Garden tools: watering can, lawn mower

Grammar Focus:
- "Do you..." questions and responses
- Frequency expressions (always, sometimes, never)
- Simple present tense for routines

Activities include interactive games, worksheets, and video lessons about daily chores.`
  },
  {
    id: 137, // Unit 3: Are You a Gamer?
    description: `🎮🕹️ Are You a Gamer? Explore video games vocabulary, gaming devices, and popular gaming activities while practicing conversation about digital entertainment.`,
    materialContent: `
Key Vocabulary:
- Gaming devices: console, controller, keyboard, headset
- Game types: action, adventure, strategy, sports
- Gaming verbs: play, win, lose, compete

Grammar Focus:
- Present tense for habitual activities
- Time expressions for gaming habits
- Comparative structures for discussing games

Activities include discussions about favorite games, screen time debates, and interactive gaming vocabulary practice.`
  },
  {
    id: 138, // Unit 4: Places in the Town
    description: `🏙️🚶 Places in the Town! Learn to identify and describe key locations in urban areas, give directions, and discuss community facilities.`,
    materialContent: `
Key Vocabulary:
- Public buildings: post office, bank, library, museum
- Shops and services: supermarket, restaurant, café, pharmacy
- City landmarks: square, park, station, bridge

Grammar Focus:
- Prepositions of place
- Giving directions using imperatives
- "Where is/are..." questions and responses

Activities include role-plays for asking directions, city mapping exercises, and location-based vocabulary games.`
  }
];

async function updateUnitDescriptions() {
  try {
    console.log("Updating unit descriptions and adding material content...");
    
    for (const unit of unitDescriptions) {
      // Update unit description
      const updatedUnit = await db.update(units)
        .set({ 
          description: unit.description,
          updatedAt: new Date()
        })
        .where(eq(units.id, unit.id))
        .returning();
      
      console.log(`Updated unit ${unit.id} with shorter description:`, updatedUnit[0].title);
      
      // Get the first material (usually "Unit Content") to update with detailed content
      const firstMaterials = await db.select()
        .from(materials)
        .where(eq(materials.unitId, unit.id))
        .orderBy(materials.orderIndex)
        .limit(1);
      
      if (firstMaterials.length > 0) {
        const firstMaterial = firstMaterials[0];
        
        // Update the first material with structured content
        const updatedMaterial = await db.update(materials)
          .set({
            content: unit.materialContent,
            updatedAt: new Date()
          })
          .where(eq(materials.id, firstMaterial.id))
          .returning();
        
        console.log(`Updated material content for unit ${unit.id}, material ID: ${updatedMaterial[0].id}`);
      } else {
        console.log(`No materials found for unit ${unit.id}, skipping material content update`);
      }
    }
    
    console.log("All updates completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating unit descriptions:", error);
    process.exit(1);
  }
}

updateUnitDescriptions();