import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Ensure all material covered sections match their respective unit topics
async function verifyAllUnitContent() {
  try {
    console.log("Verifying all unit content matches their topics...");
    
    // Get all units from Book 5
    const bookUnits = await db.select()
      .from(units)
      .where(eq(units.bookId, 8));
    
    // Define correct content for each unit
    const correctContent = {
      // Unit 1: School Tour
      135: `🏫📚 School Tour! Learn vocabulary for school facilities and subjects. Practice talking about classrooms, teachers, and school activities.

### Material Covered
- School facilities vocabulary (classroom, library, gym, cafeteria)
- School subjects (Math, English, Science, P.E.)
- Conversations about school activities
- Grammar: present simple and prepositions of place
- Questions about school locations and favorite subjects`,
      
      // Unit 2: House Chores
      136: `🏠✨ House Chores! Learn vocabulary for household tasks and cleaning tools. Practice discussing who does chores at home and how often.

### Material Covered
- Cleaning tools vocabulary (mop, broom, vacuum, duster, bin)
- Household appliances (dishwasher, washing machine, iron)
- Discussing who does chores at home and how often
- Grammar: "Do you..." questions and frequency expressions
- Questions about household responsibilities`,
      
      // Unit 3: Are You a Gamer?
      137: `🎮🕹️ Are You a Gamer? Learn gaming vocabulary and discuss video games, devices, and gaming habits. Practice expressing preferences about digital entertainment.

### Material Covered
- Gaming vocabulary and devices (console, controller, games)
- Types of video games and gaming activities
- Discussing favorite games and screen time
- Grammar: present simple for gaming habits
- Questions about gaming preferences and experiences`,
      
      // Unit 4: Places in the Town
      138: `🏙️🚶 Places in the Town! Learn to identify urban locations, give directions, and discuss community facilities. Practice conversations about getting around town.

### Material Covered
- Places vocabulary (post office, bank, supermarket, restaurant)
- Giving and following directions
- Asking where places are located
- Grammar: prepositions of place and "Where is/are...?" questions
- Conversations about community facilities and services`,
      
      // Unit 5: Winter Fun
      139: `❄️⛄ Winter Fun! Learn vocabulary for winter activities, clothes and celebrations. Practice talking about cold weather fun and seasonal traditions.

### Material Covered
- Winter activities vocabulary (skiing, sledding, ice skating)
- Winter clothes and seasonal items
- Weather expressions and winter celebrations
- Grammar: present simple for preferences and past simple for experiences
- Conversations about winter sports and traditions`,
      
      // Unit 6: Nationalities
      140: `🌎🧑‍🤝‍🧑 Nationalities! Learn country names, languages, and cultural traditions. Practice introducing people from different countries and discussing cultural differences.

### Material Covered
- Country names and nationalities vocabulary
- Languages spoken in different countries
- Cultural differences and traditions
- Grammar: "Where are you from?" questions
- Discussions about international cultures and languages`,
      
      // Unit 7: Get Well Soon!
      141: `🏥💊 Get Well Soon! Learn health-related vocabulary, common illnesses, and medical treatments. Practice expressing sympathy and discussing health problems.

### Material Covered
- Health vocabulary (cold, flu, headache, fever)
- Body parts and medical treatments
- Expressing sympathy and giving advice
- Grammar: "What's wrong?" questions and should/shouldn't
- Conversations about health problems and solutions`,
      
      // Unit 8: What Did You Do Yesterday?
      142: `⏰📅 What Did You Do Yesterday? Learn past tense verbs and time expressions. Practice talking about completed activities and describing past events.

### Material Covered
- Past tense verbs for daily activities
- Time expressions for the past
- Talking about completed activities
- Grammar: simple past tense regular and irregular verbs
- Questions about past experiences and events`,
      
      // Unit 9: Emotions
      143: `😊😢 Emotions! Learn vocabulary for feelings and emotional states. Practice expressing and responding to different emotions in various situations.

### Material Covered
- Emotions vocabulary (happy, sad, angry, surprised)
- Facial expressions and feelings
- Expressing and asking about emotions
- Grammar: "How do you feel?" and "Why are you...?" questions
- Conversations about different emotional situations`,
      
      // Unit 10: At the Supermarket
      144: `🛒🥕 At the Supermarket! Learn food vocabulary and shopping phrases. Practice conversations about buying groceries and discussing prices.

### Material Covered
- Food and grocery vocabulary
- Shopping phrases and expressions
- Prices and quantity words
- Grammar: countable/uncountable nouns and quantity expressions
- Role-plays for shopping conversations`,
      
      // Unit 11: Where Are You Going?
      145: `🚗🗺️ Where Are You Going? Learn travel vocabulary and future plans. Practice talking about destinations and upcoming trips using present continuous for future.

### Material Covered
- Travel destinations and activities vocabulary
- Future plans and intentions
- Trip planning expressions
- Grammar: present continuous for future plans
- Conversations about upcoming journeys and vacation plans`,
      
      // Unit 12: How Did You Get Here?
      146: `🚌✈️ How Did You Get Here? Learn transportation vocabulary and travel experiences. Practice discussing different ways of traveling and past journeys.

### Material Covered
- Transportation vocabulary (car, bus, train, plane)
- Travel methods and journey expressions
- Past travel experiences
- Grammar: past simple and transportation prepositions
- Discussions about different ways of traveling`,
      
      // Unit 13: What Did You Do Yesterday?
      147: `📆✓ What Did You Do Yesterday? Learn past tense verbs for daily activities. Practice describing completed actions and talking about recent events.

### Material Covered
- Past tense verbs for routine activities
- Time expressions and sequence words
- Daily schedule vocabulary
- Grammar: regular and irregular past verbs
- Conversations about past daily activities`,
      
      // Unit 14: Movie Time
      148: `🎬🍿 Movie Time! Learn film genres, cinema vocabulary, and expressions for opinions. Practice discussing favorite movies and film preferences.

### Material Covered
- Film genres and cinema vocabulary
- Movie opinions and ratings expressions
- Cinema experience phrases
- Grammar: past tense for experiences and opinion structures
- Discussions about favorite films and movie preferences`,
      
      // Unit 15: Let's Go Sightseeing
      149: `🗽🏛️ Let's Go Sightseeing! Learn vocabulary for landmarks and tourist attractions. Practice planning tours and describing famous places.

### Material Covered
- Tourist attractions and landmarks vocabulary
- Sightseeing activities and travel recommendations
- City tour planning phrases
- Grammar: "Let's..." suggestions and modal verbs
- Conversations about famous places and tourist destinations`,
      
      // Unit 16: Sounds of Music
      150: `🎵🎸 Sounds of Music! Learn musical instruments, genres, and performance vocabulary. Practice talking about musical preferences and abilities.

### Material Covered
- Musical instruments and music genres vocabulary
- Performance and concert phrases
- Musical abilities expressions
- Grammar: "Can you play...?" questions and frequency adverbs
- Discussions about musical preferences and experiences`
    };
    
    // Update each unit with the correct content
    for (const unit of bookUnits) {
      if (correctContent[unit.id]) {
        // Check if the content actually needs to be updated
        if (unit.description !== correctContent[unit.id]) {
          await db.update(units)
            .set({ 
              description: correctContent[unit.id],
              updatedAt: new Date()
            })
            .where(eq(units.id, unit.id));
          
          console.log(`Updated content for Unit ${unit.unitNumber}: ${unit.title}`);
        } else {
          console.log(`Unit ${unit.unitNumber} already has correct content`);
        }
      }
    }
    
    console.log("All unit content verified and updated!");
    process.exit(0);
  } catch (error) {
    console.error("Error verifying unit content:", error);
    process.exit(1);
  }
}

verifyAllUnitContent();