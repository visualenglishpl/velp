import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Unit ID 135 is the School Tour unit (Unit 1 of Book 5)
const UNIT_ID = 135;

// Short concise description as requested
const shortDescription = `Embark on the 'School Tour' unit! 🎒📚 This ESL module guides students through school areas, introducing facilities and activities. Perfect for practising English discussions about school life.`;

async function updateUnitDescription() {
  try {
    console.log("Updating unit description for School Tour (Unit ID: 135)...");
    
    const result = await db.update(units)
      .set({ 
        description: shortDescription,
        updatedAt: new Date()
      })
      .where(eq(units.id, UNIT_ID))
      .returning();
    
    console.log("Update successful!");
    console.log("Updated unit:", result[0]);
    
    process.exit(0);
  } catch (error) {
    console.error("Error updating unit description:", error);
    process.exit(1);
  }
}

updateUnitDescription();