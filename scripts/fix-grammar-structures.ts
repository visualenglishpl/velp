import { db } from "../server/db";
import { materials } from "../shared/schema";
import { eq, like } from "drizzle-orm";

// Remove grammar structure entries from unit materials
async function fixGrammarStructures() {
  try {
    console.log("Removing grammar structure sections from all units...");
    
    // Check all units for materials with the title "Grammar Structures"
    const allMaterials = await db.select()
      .from(materials)
      .where(like(materials.title, '%Grammar%'));
    
    if (allMaterials.length > 0) {
      console.log(`Found ${allMaterials.length} materials with 'Grammar' in the title.`);
      
      // Delete grammar structure materials
      for (const material of allMaterials) {
        await db.delete(materials)
          .where(eq(materials.id, material.id));
        
        console.log(`Removed grammar structure material with ID ${material.id} from unit ${material.unitId}`);
      }
    } else {
      console.log("No grammar structure materials found.");
    }
    
    // Also search for materials with grammar structure content
    const contentMaterials = await db.select()
      .from(materials)
      .where(like(materials.content, '%Subject + is + adjective%'));
    
    if (contentMaterials.length > 0) {
      console.log(`Found ${contentMaterials.length} materials with grammar structure content.`);
      
      // Delete these materials as well
      for (const material of contentMaterials) {
        await db.delete(materials)
          .where(eq(materials.id, material.id));
        
        console.log(`Removed material with grammar structure content, ID ${material.id}`);
      }
    } else {
      console.log("No materials with grammar structure content found.");
    }
    
    console.log("Grammar structure removal complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing grammar structures:", error);
    process.exit(1);
  }
}

fixGrammarStructures();