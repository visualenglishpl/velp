import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Update all units with shorter descriptions
async function updateUnitDescriptions() {
  try {
    console.log("Updating all units with shorter descriptions...");
    
    // Define shorter descriptions for all units
    const shorterDescriptions = {
      // Unit 1: School Tour
      135: "🏫📚 School Tour! Learn school facilities and subjects vocabulary.",
      
      // Unit 2: House Chores
      136: "🏠✨ House Chores! Learn cleaning tools vocabulary and discuss household tasks.",
      
      // Unit 3: Are You a Gamer?
      137: "🎮🕹️ Are You a Gamer? Learn gaming vocabulary and discuss video games.",
      
      // Unit 4: Places in the Town
      138: "🏙️🚶 Places in the Town! Learn urban locations and practice giving directions.",
      
      // Unit 5: Winter Fun
      139: "❄️⛄ Winter Fun! Learn winter activities, clothes and celebrations.",
      
      // Unit 6: Nationalities
      140: "🌎🧑‍🤝‍🧑 Nationalities! Learn country names, languages, and cultural traditions.",
      
      // Unit 7: Get Well Soon!
      141: "🏥💊 Get Well Soon! Learn health vocabulary and discuss common illnesses.",
      
      // Unit 8: What Did You Do Yesterday?
      142: "⏰📅 What Did You Do Yesterday? Practice talking about past activities.",
      
      // Unit 9: Emotions
      143: "😊😢 Emotions! Learn vocabulary for feelings and emotional expressions.",
      
      // Unit 10: At the Supermarket
      144: "🛒🥕 At the Supermarket! Learn food vocabulary and shopping phrases.",
      
      // Unit 11: Where Are You Going?
      145: "🚗🗺️ Where Are You Going? Talk about travel plans and destinations.",
      
      // Unit 12: How Did You Get Here?
      146: "🚌✈️ How Did You Get Here? Learn transportation vocabulary and methods.",
      
      // Unit 13: What Did You Do Yesterday?
      147: "📆✓ What Did You Do Yesterday? Describe daily activities in past tense.",
      
      // Unit 14: Movie Time
      148: "🎬🍿 Movie Time! Learn film genres and discuss movie preferences.",
      
      // Unit 15: Let's Go Sightseeing
      149: "🗽🏛️ Let's Go Sightseeing! Learn about landmarks and tourist attractions.",
      
      // Unit 16: Sounds of Music
      150: "🎵🎸 Sounds of Music! Discuss musical instruments and preferences."
    };
    
    // Update each unit with the shorter description
    for (const [unitId, description] of Object.entries(shorterDescriptions)) {
      await db.update(units)
        .set({ 
          description: description,
          updatedAt: new Date()
        })
        .where(eq(units.id, parseInt(unitId)));
      
      console.log(`Updated unit ${unitId} with shorter description`);
    }
    
    console.log("All units updated with shorter descriptions!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating unit descriptions:", error);
    process.exit(1);
  }
}

updateUnitDescriptions();