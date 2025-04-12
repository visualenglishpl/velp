import { db } from "../server/db";
import { units } from "../shared/schema";
import { eq } from "drizzle-orm";

// Book 5 units with material content
const unitMaterials = [
  {
    id: 135, // Unit 1: School Tour
    materialContent: `### Material Covered
- School facilities vocabulary (classroom, library, gym, cafeteria)
- School subjects (Math, English, Science, P.E.)
- Conversations about school activities
- Grammar: present simple and prepositions of place
- Questions about school locations and favorite subjects`
  },
  {
    id: 136, // Unit 2: House Chores
    materialContent: `### Material Covered
- Cleaning tools vocabulary (mop, broom, vacuum, duster, bin)
- Household appliances (dishwasher, washing machine, iron)
- Discussing who does chores at home and how often
- Grammar: "Do you..." questions and frequency expressions
- Questions about household responsibilities`
  },
  {
    id: 137, // Unit 3: Are You a Gamer?
    materialContent: `### Material Covered
- Gaming vocabulary and devices (console, controller, games)
- Types of video games and gaming activities
- Discussing favorite games and screen time
- Grammar: present simple for gaming habits
- Questions about gaming preferences and experiences`
  },
  {
    id: 138, // Unit 4: Places in the Town
    materialContent: `### Material Covered
- Places vocabulary (post office, bank, supermarket, restaurant)
- Giving and following directions
- Asking where places are located
- Grammar: prepositions of place and "Where is/are...?" questions
- Conversations about community facilities and services`
  },
  {
    id: 139, // Unit 5: Winter Fun
    materialContent: `### Material Covered
- Winter activities vocabulary (skiing, sledding, ice skating)
- Winter clothes and seasonal items
- Weather expressions and winter celebrations
- Grammar: present simple for preferences and past simple for experiences
- Conversations about winter sports and traditions`
  },
  {
    id: 140, // Unit 6: Nationalities
    materialContent: `### Material Covered
- Country names and nationalities vocabulary
- Languages spoken in different countries
- Cultural differences and traditions
- Grammar: "Where are you from?" questions
- Discussions about international cultures and languages`
  },
  {
    id: 141, // Unit 7: Get Well Soon!
    materialContent: `### Material Covered
- Health vocabulary (cold, flu, headache, fever)
- Body parts and medical treatments
- Expressing sympathy and giving advice
- Grammar: "What's wrong?" questions and should/shouldn't
- Conversations about health problems and solutions`
  },
  {
    id: 142, // Unit 8: What Did You Do Yesterday?
    materialContent: `### Material Covered
- Past tense verbs for daily activities
- Time expressions for the past
- Talking about completed activities
- Grammar: simple past tense regular and irregular verbs
- Questions about past experiences and events`
  },
  {
    id: 143, // Unit 9: Emotions
    materialContent: `### Material Covered
- Emotions vocabulary (happy, sad, angry, surprised)
- Facial expressions and feelings
- Expressing and asking about emotions
- Grammar: "How do you feel?" and "Why are you...?" questions
- Conversations about different emotional situations`
  },
  {
    id: 144, // Unit 10: At the Supermarket
    materialContent: `### Material Covered
- Food and grocery vocabulary
- Shopping phrases and expressions
- Prices and quantity words
- Grammar: countable/uncountable nouns and quantity expressions
- Role-plays for shopping conversations`
  },
  {
    id: 145, // Unit 11: Where Are You Going?
    materialContent: `### Material Covered
- Travel destinations and activities vocabulary
- Future plans and intentions
- Trip planning expressions
- Grammar: present continuous for future plans
- Conversations about upcoming journeys and vacation plans`
  },
  {
    id: 146, // Unit 12: How Did You Get Here?
    materialContent: `### Material Covered
- Transportation vocabulary (car, bus, train, plane)
- Travel methods and journey expressions
- Past travel experiences
- Grammar: past simple and transportation prepositions
- Discussions about different ways of traveling`
  },
  {
    id: 147, // Unit 13: What Did You Do Yesterday?
    materialContent: `### Material Covered
- Past tense verbs for routine activities
- Time expressions and sequence words
- Daily schedule vocabulary
- Grammar: regular and irregular past verbs
- Conversations about past daily activities`
  },
  {
    id: 148, // Unit 14: Movie Time
    materialContent: `### Material Covered
- Film genres and cinema vocabulary
- Movie opinions and ratings expressions
- Cinema experience phrases
- Grammar: past tense for experiences and opinion structures
- Discussions about favorite films and movie preferences`
  },
  {
    id: 149, // Unit 15: Let's Go Sightseeing
    materialContent: `### Material Covered
- Tourist attractions and landmarks vocabulary
- Sightseeing activities and travel recommendations
- City tour planning phrases
- Grammar: "Let's..." suggestions and modal verbs
- Conversations about famous places and tourist destinations`
  },
  {
    id: 150, // Unit 16: Sounds of Music
    materialContent: `### Material Covered
- Musical instruments and music genres vocabulary
- Performance and concert phrases
- Musical abilities expressions
- Grammar: "Can you play...?" questions and frequency adverbs
- Discussions about musical preferences and experiences`
  }
];

async function updateUnitWithMaterialContent() {
  try {
    console.log("Updating units with material content...");
    
    for (const unit of unitMaterials) {
      const result = await db.update(units)
        .set({ 
          description: unit.materialContent,
          updatedAt: new Date()
        })
        .where(eq(units.id, unit.id))
        .returning();
      
      console.log(`Updated Unit ${unit.id} with material content`);
    }
    
    console.log("All material content updates completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating material content:", error);
    process.exit(1);
  }
}

updateUnitWithMaterialContent();