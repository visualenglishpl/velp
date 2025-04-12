import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Unit ID 138 is "Places in the Town" (Unit 4 of Book 5)
const UNIT_ID = 138;

// Unit description based on visualenglish.pl website
const placesinTownDescription = `Explore 'Places in the Town'! 🏙️🚶 This practical unit introduces students to essential vocabulary for navigating urban environments and discussing community locations.

Students learn to identify and describe key places like the post office, bank, supermarket, restaurant, and train station. They practice giving and following directions, discussing distances, and explaining the purpose of different town facilities.

The unit builds functional language skills for real-world situations such as asking for directions, explaining locations relative to landmarks, and talking about favorite places to visit in a town or city. Perfect for everyday conversation practice!`;

async function updateUnitDescription() {
  try {
    console.log("Updating unit description for 'Places in the Town' (Unit ID: 138)...");
    
    const result = await db.update(units)
      .set({ 
        description: placesinTownDescription,
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