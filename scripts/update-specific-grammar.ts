import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Update specific unit with corrected grammar structures
async function updateSpecificGrammar() {
  try {
    console.log("Directly updating grammar structures for specific units...");
    
    // Book 5, Unit 1 (School Tour) - ID 135
    const unit1 = await db.select()
      .from(units)
      .where(eq(units.id, 135))
      .limit(1);
    
    if (unit1.length > 0) {
      // Set the short description with correct grammar structures
      const shortDescription = `🏫📚 School Tour! Learn vocabulary for school facilities and subjects. Practice talking about classrooms, teachers, and school activities.`;
      
      // Update the unit
      await db.update(units)
        .set({ 
          description: shortDescription,
          updatedAt: new Date()
        })
        .where(eq(units.id, 135));
      
      console.log("Updated Unit 1 (School Tour) with shorter description and corrected grammar.");
    }
    
    console.log("Specific grammar updates completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating specific grammar:", error);
    process.exit(1);
  }
}

updateSpecificGrammar();