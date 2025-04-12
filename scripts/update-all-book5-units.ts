import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Book 5 unit descriptions - shorter, more concise format
const unitDescriptions = [
  {
    id: 135, // Unit 1: School Tour
    description: `🏫📚 School Tour! Learn vocabulary for school facilities and subjects. Practice talking about classrooms, teachers, and school activities.`
  },
  {
    id: 136, // Unit 2: House Chores
    description: `🏠✨ House Chores! Learn vocabulary for household tasks and cleaning tools. Practice discussing who does chores at home and how often.`
  },
  {
    id: 137, // Unit 3: Are You a Gamer?
    description: `🎮🕹️ Are You a Gamer? Learn gaming vocabulary and discuss video games, devices, and gaming habits. Practice expressing preferences about digital entertainment.`
  },
  {
    id: 138, // Unit 4: Places in the Town
    description: `🏙️🚶 Places in the Town! Learn to identify urban locations, give directions, and discuss community facilities. Practice conversations about getting around town.`
  },
  {
    id: 139, // Unit 5: Winter Fun
    description: `❄️⛄ Winter Fun! Learn vocabulary for winter activities, clothes and celebrations. Practice talking about cold weather fun and seasonal traditions.`
  },
  {
    id: 140, // Unit 6: Nationalities
    description: `🌎🧑‍🤝‍🧑 Nationalities! Learn country names, languages, and cultural traditions. Practice introducing people from different countries and discussing cultural differences.`
  },
  {
    id: 141, // Unit 7: Get Well Soon!
    description: `🏥💊 Get Well Soon! Learn health-related vocabulary, common illnesses, and medical treatments. Practice expressing sympathy and discussing health problems.`
  },
  {
    id: 142, // Unit 8: What Did You Do Yesterday?
    description: `⏰📅 What Did You Do Yesterday? Learn past tense verbs and time expressions. Practice talking about completed activities and describing past events.`
  },
  {
    id: 143, // Unit 9: Emotions
    description: `😊😢 Emotions! Learn vocabulary for feelings and emotional states. Practice expressing and responding to different emotions in various situations.`
  },
  {
    id: 144, // Unit 10: At the Supermarket
    description: `🛒🥕 At the Supermarket! Learn food vocabulary and shopping phrases. Practice conversations about buying groceries and discussing prices.`
  },
  {
    id: 145, // Unit 11: Where Are You Going?
    description: `🚗🗺️ Where Are You Going? Learn travel vocabulary and future plans. Practice talking about destinations and upcoming trips using present continuous for future.`
  },
  {
    id: 146, // Unit 12: How Did You Get Here?
    description: `🚌✈️ How Did You Get Here? Learn transportation vocabulary and travel experiences. Practice discussing different ways of traveling and past journeys.`
  },
  {
    id: 147, // Unit 13: What Did You Do Yesterday?
    description: `📆✓ What Did You Do Yesterday? Learn past tense verbs for daily activities. Practice describing completed actions and talking about recent events.`
  },
  {
    id: 148, // Unit 14: Movie Time
    description: `🎬🍿 Movie Time! Learn film genres, cinema vocabulary, and expressions for opinions. Practice discussing favorite movies and film preferences.`
  },
  {
    id: 149, // Unit 15: Let's Go Sightseeing
    description: `🗽🏛️ Let's Go Sightseeing! Learn vocabulary for landmarks and tourist attractions. Practice planning tours and describing famous places.`
  },
  {
    id: 150, // Unit 16: Sounds of Music
    description: `🎵🎸 Sounds of Music! Learn musical instruments, genres, and performance vocabulary. Practice talking about musical preferences and abilities.`
  }
];

async function updateAllBook5Units() {
  try {
    console.log("Updating all Book 5 unit descriptions...");
    
    for (const unit of unitDescriptions) {
      const result = await db.update(units)
        .set({ 
          description: unit.description,
          updatedAt: new Date()
        })
        .where(eq(units.id, unit.id))
        .returning();
      
      console.log(`Updated unit ${unit.id}:`, result[0].title);
    }
    
    console.log("All Book 5 unit descriptions updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating unit descriptions:", error);
    process.exit(1);
  }
}

updateAllBook5Units();