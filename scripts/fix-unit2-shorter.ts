import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Fix Unit 2 content with shorter description and correct material content
async function fixUnit2Content() {
  try {
    console.log("Fixing Unit 2 (House Chores) with shorter description...");
    
    // Very short description for Unit 2 with just essential information
    const shorterDescription = `🏠✨ House Chores! Learn cleaning tools vocabulary and discuss household tasks.`;
    
    // Update Unit 2 specifically (ID 136)
    await db.update(units)
      .set({ 
        description: shorterDescription,
        updatedAt: new Date()
      })
      .where(eq(units.id, 136));
    
    console.log("Unit 2 (House Chores) content fixed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing Unit 2 content:", error);
    process.exit(1);
  }
}

fixUnit2Content();