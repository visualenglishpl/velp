import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Specific grammar structure fixes to remove redundant "I"
async function fixGrammarStructures() {
  try {
    console.log("Fixing grammar structures to remove redundant 'I'...");
    
    // Hard-coded updates for specific unit content
    const updates = [
      {
        bookId: 8, // Book 5
        unitNumber: 1, // Unit 1 - School Tour
        grammarFix: `### Grammar Structures

Use this unit to practice these structures:

Subject + is + adjective               How many + noun + do you have?

Subject + is + adjective + or + adjective?     Who is your + subject + teacher?`
      }
    ];
    
    for (const update of updates) {
      // Find the unit to update
      const unitsToUpdate = await db.select()
        .from(units)
        .where(eq(units.bookId, update.bookId))
        .where(eq(units.unitNumber, update.unitNumber));
      
      if (unitsToUpdate.length > 0) {
        const unit = unitsToUpdate[0];
        
        // Check if the unit description contains "Material Covered"
        if (unit.description && unit.description.includes('Material Covered')) {
          // Keep the original description intact
          await db.update(units)
            .set({ 
              description: unit.description,
              updatedAt: new Date()
            })
            .where(eq(units.id, unit.id));
        } else {
          // Set the new grammar fixes
          await db.update(units)
            .set({ 
              description: update.grammarFix,
              updatedAt: new Date()
            })
            .where(eq(units.id, unit.id));
        }
        
        console.log(`Updated grammar structures for ${update.bookId}.${update.unitNumber}`);
      }
    }
    
    console.log("Grammar structure fixes completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing grammar structures:", error);
    process.exit(1);
  }
}

fixGrammarStructures();