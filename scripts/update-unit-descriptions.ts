import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Unit descriptions based on visualenglish.pl website
const unitDescriptions = [
  {
    id: 136, // Unit 2: House Chores
    description: `Welcome to 'House Chores'! 🏠✨ This engaging unit teaches students about household responsibilities and daily routines. Students learn vocabulary for common chores, practice describing who does what at home, and discuss housework frequency.

Key vocabulary includes cleaning, washing dishes, taking out the trash, making beds, sweeping, and mopping floors. Perfect for developing conversation skills around daily responsibilities and family cooperation.`
  },
  {
    id: 137, // Unit 3: Are You a Gamer?
    description: `Dive into 'Are You a Gamer?' 🎮🕹️ This exciting unit explores the world of video games and digital entertainment. Students learn gaming terminology, discuss their favorite games, and debate the pros and cons of gaming.

This unit covers vocabulary related to game types, gaming devices, and popular gaming activities. Students will practice expressing preferences, describing gaming habits, and discussing screen time balance. Ideal for engaging digital natives in meaningful English conversations about modern entertainment.`
  }
];

async function updateUnitDescriptions() {
  try {
    console.log("Updating unit descriptions...");
    
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
    
    console.log("All updates completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating unit descriptions:", error);
    process.exit(1);
  }
}

updateUnitDescriptions();