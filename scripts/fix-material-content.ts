import { db } from "../server/db";
import { materials } from "../shared/schema";
import { eq, and, like } from "drizzle-orm";

// Fix the material content that might be showing school content in Unit 2 (House Chores)
async function fixMaterialContent() {
  try {
    console.log("Checking for incorrect material content in Unit 2 (House Chores)...");
    
    // Find materials with incorrect content (school-related) in Unit 2
    const incorrectMaterials = await db.select()
      .from(materials)
      .where(
        and(
          eq(materials.unitId, 136), // Unit 2 (House Chores)
          like(materials.content, '%School Facilities%')
        )
      );
    
    if (incorrectMaterials.length > 0) {
      console.log(`Found ${incorrectMaterials.length} materials with incorrect content.`);
      
      // The correct content for House Chores unit
      const correctContent = `Material Covered
Cleaning Tools
Mop: Tool with handle for cleaning floors
Broom: Tool for sweeping floors and surfaces
Vacuum Cleaner: Electric device for cleaning carpets and floors
Duster: Tool for removing dust from surfaces
Bin/Trash Can: Container for disposing waste
Garden Tools
Watering Can: Container with spout for watering plants
Lawn Mower: Machine for cutting grass
Garden Hose: Flexible tube for watering plants and gardens
Household Tasks
Sweeping: Using a broom to clean floors
Mopping: Cleaning floors with a wet mop
Vacuuming: Using a vacuum cleaner on carpets and floors
Dusting: Removing dust from furniture and surfaces
Taking out trash: Emptying bins and disposing waste
Gardening: Maintaining plants and lawn
Household Activities
Frequency expressions: How often chores are done
Responsibility discussions: Who does which chore
Task scheduling: When different chores are completed`;
      
      // Update all incorrect materials with the correct content
      for (const material of incorrectMaterials) {
        await db.update(materials)
          .set({ 
            content: correctContent,
            updatedAt: new Date()
          })
          .where(eq(materials.id, material.id));
        
        console.log(`Updated material ${material.id}: ${material.title}`);
      }
      
      console.log("All incorrect materials have been updated with the correct content.");
    } else {
      console.log("No materials with incorrect content found in Unit 2.");
      
      // Check if we need to add content to materials
      const unitMaterials = await db.select()
        .from(materials)
        .where(eq(materials.unitId, 136))
        .limit(1);
      
      if (unitMaterials.length > 0) {
        // Add the correct content to the first material
        const correctContent = `Material Covered
Cleaning Tools
Mop: Tool with handle for cleaning floors
Broom: Tool for sweeping floors and surfaces
Vacuum Cleaner: Electric device for cleaning carpets and floors
Duster: Tool for removing dust from surfaces
Bin/Trash Can: Container for disposing waste
Garden Tools
Watering Can: Container with spout for watering plants
Lawn Mower: Machine for cutting grass
Garden Hose: Flexible tube for watering plants and gardens
Household Tasks
Sweeping: Using a broom to clean floors
Mopping: Cleaning floors with a wet mop
Vacuuming: Using a vacuum cleaner on carpets and floors
Dusting: Removing dust from furniture and surfaces
Taking out trash: Emptying bins and disposing waste
Gardening: Maintaining plants and lawn
Household Activities
Frequency expressions: How often chores are done
Responsibility discussions: Who does which chore
Task scheduling: When different chores are completed`;
        
        await db.update(materials)
          .set({ 
            content: correctContent,
            updatedAt: new Date()
          })
          .where(eq(materials.id, unitMaterials[0].id));
        
        console.log(`Added House Chores content to material ${unitMaterials[0].id}: ${unitMaterials[0].title}`);
      }
    }
    
    console.log("Material content check and update complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing material content:", error);
    process.exit(1);
  }
}

fixMaterialContent();