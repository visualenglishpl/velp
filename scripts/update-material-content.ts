import { db } from "../server/db";
import { materials } from "../shared/schema";
import { eq } from "drizzle-orm";

// Update the material content for Unit 2 (House Chores)
async function updateMaterialContent() {
  try {
    console.log("Creating a new material with correct content for Unit 2 (House Chores)...");
    
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
    
    // Create a new material for Unit 2 with the correct content
    const newMaterial = await db.insert(materials)
      .values({
        title: "Unit Content",
        unitId: 136,
        contentType: "lesson",
        content: correctContent,
        orderIndex: 0,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    console.log(`Created new material for Unit 2 (House Chores) with ID: ${newMaterial[0].id}`);
    console.log("Material content update complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating material content:", error);
    process.exit(1);
  }
}

updateMaterialContent();