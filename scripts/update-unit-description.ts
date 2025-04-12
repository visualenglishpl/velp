import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Unit ID 135 is the School Tour unit (Unit 1 of Book 5)
const UNIT_ID = 135;

// Construct a comprehensive unit description with the school facilities content
const schoolTourDescription = `Embark on the 'School Tour' unit! 🎒📚 This ESL module guides students through school areas, introducing facilities and activities. Perfect for practising English discussions about school life.

School Facilities:
🏫 Primary School: Discuss the structure and role of primary education.
🏢 Office: Where administrative tasks occur; often houses the headmaster/headmistress.
💪 Gym: A place for physical education and sports.
🍽️ Canteen/Tuck Shop: Where students eat lunch and buy snacks.
📚 Library: A quiet area for reading and studying.
🌟 After School Care: Where students stay post-school for various activities.

Special School Areas:
🧥 Cloakroom: For changing shoes and storing outdoor clothing.
🏫 Classroom: The primary area for lessons and learning.
⚽ Sports Field: Where outdoor sports and activities take place.
🤾 Playground: A space for free play and informal activities.
🎨 Art Room: Creative space for drawing, painting, and crafting.
🎼 Music Room: Where students learn and practice music.

Engaging ESL Activities:
- Role Plays: Simulate asking for directions within the school and discussing favourite areas.
- Discussion Questions: What is your favourite part of the school and why?
- Vocabulary Games: "Find the Place" matching school activities with locations.
- School Map Creation: Students draw and label their school map.
- Dream School Design: Describe an ideal school with facilities they wish.
- School Day Schedule: Create a timetable using English for activities and times.`;

async function updateUnitDescription() {
  try {
    console.log("Updating unit description for School Tour (Unit ID: 135)...");
    
    const result = await db.update(units)
      .set({ 
        description: schoolTourDescription,
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