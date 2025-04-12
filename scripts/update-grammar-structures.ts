import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Update the unit descriptions to remove redundant "I" in grammar structures
async function updateGrammarStructures() {
  try {
    console.log("Updating unit descriptions to remove redundant 'I'...");
    
    // Get all units
    const allUnits = await db.select()
      .from(units);
    
    for (const unit of allUnits) {
      // Check if the description contains grammar structures with redundant "I"
      if (unit.description && unit.description.includes('Subject + is + adjective')) {
        // Replace the redundant pattern
        const updatedDescription = unit.description
          .replace('Subject + is + adjective', 'Subject + is + adjective')
          .replace('Subject + is + adjective + or + adjective?', 'Subject + is + adjective + or + adjective?');
        
        // Update the unit
        await db.update(units)
          .set({ 
            description: updatedDescription,
            updatedAt: new Date()
          })
          .where(eq(units.id, unit.id));
        
        console.log(`Updated grammar structures for Unit ${unit.id}`);
      }
    }
    
    console.log("Grammar structure updates completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating grammar structures:", error);
    process.exit(1);
  }
}

updateGrammarStructures();