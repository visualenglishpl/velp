import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Fix Unit 3 content to show gaming material instead of school supplies
async function fixUnit3Content() {
  try {
    console.log("Fixing Unit 3 material content...");
    
    // Correct content for Unit 3 (Are You a Gamer?)
    const correctContent = `🎮🕹️ Are You a Gamer? Learn gaming vocabulary and discuss video games, devices, and gaming habits. Practice expressing preferences about digital entertainment.

### Material Covered
- Gaming vocabulary and devices (console, controller, games)
- Types of video games and gaming activities
- Discussing favorite games and screen time
- Grammar: present simple for gaming habits
- Questions about gaming preferences and experiences`;
    
    // Update Unit 3 specifically (ID 137)
    await db.update(units)
      .set({ 
        description: correctContent,
        updatedAt: new Date()
      })
      .where(eq(units.id, 137));
    
    console.log("Unit 3 content fixed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing Unit 3 content:", error);
    process.exit(1);
  }
}

fixUnit3Content();