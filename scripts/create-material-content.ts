import { db } from "../server/db";
import { materials } from "../shared/schema";
import { eq } from "drizzle-orm";

// Content for each Book 5 unit to be used in Material Viewer
const materialContents = [
  {
    unitId: 135, // Unit 1: School Tour
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- School facilities: classroom, gym, library, cafeteria, computer lab
- School subjects: math, English, science, PE, art
- School staff: principal, teacher, librarian, janitor

### Grammar Focus
- Present simple tense for routines
- "Where is/are..." questions
- Prepositions of place (in, on, at, next to)

### Teaching Activities
- School tour role-plays
- Subject preference discussions
- School facility identification exercises
`,
    orderIndex: 0
  },
  {
    unitId: 136, // Unit 2: House Chores
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Cleaning tools: mop, broom, vacuum, duster, bin
- Household appliances: dishwasher, washing machine, iron
- Garden tools: watering can, lawn mower

### Grammar Focus
- "Do you..." questions and responses
- Frequency expressions (always, sometimes, never)
- Simple present tense for routines

### Teaching Activities
- Household responsibilities discussions
- Chore frequency games
- Cleaning tool identification exercises
`,
    orderIndex: 0
  },
  {
    unitId: 137, // Unit 3: Are You a Gamer?
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Gaming devices: console, controller, keyboard, headset
- Game types: action, adventure, strategy, sports
- Gaming verbs: play, win, lose, compete

### Grammar Focus
- Present tense for habitual activities
- Time expressions for gaming habits
- Comparative structures for discussing games

### Teaching Activities
- Gaming preferences discussions
- Screen time conversations
- Digital entertainment vocabulary games
`,
    orderIndex: 0
  },
  {
    unitId: 138, // Unit 4: Places in the Town
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Public buildings: post office, bank, library, museum
- Shops and services: supermarket, restaurant, café, pharmacy
- City landmarks: square, park, station, bridge

### Grammar Focus
- Prepositions of place
- Giving directions using imperatives
- "Where is/are..." questions and responses

### Teaching Activities
- Town map navigation exercises
- Directions role-plays
- Community services discussions
`,
    orderIndex: 0
  },
  {
    unitId: 139, // Unit 5: Winter Fun
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Winter activities: skiing, sledding, ice skating, building snowmen
- Winter clothes: hat, scarf, gloves, coat, boots
- Winter celebrations: Christmas, New Year

### Grammar Focus
- Present simple for preferences
- Past simple for experiences
- "Can you..." for abilities

### Teaching Activities
- Winter sports discussions
- Seasonal clothing role-plays
- Holiday tradition comparisons
`,
    orderIndex: 0
  },
  {
    unitId: 140, // Unit 6: Nationalities
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Countries: France, Spain, Germany, Japan, Brazil
- Nationalities: French, Spanish, German, Japanese, Brazilian
- Languages: French, Spanish, German, Japanese, Portuguese

### Grammar Focus
- "Where are you from?" questions
- "What language do you speak?" questions
- "He/She is from..." statements

### Teaching Activities
- Country identification games
- Cultural differences discussions
- Language exploration activities
`,
    orderIndex: 0
  },
  {
    unitId: 141, // Unit 7: Get Well Soon!
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Illnesses: cold, flu, headache, stomachache, fever
- Body parts: head, stomach, throat, ear, nose
- Treatments: medicine, rest, doctor, hospital

### Grammar Focus
- "What's wrong?" questions
- "I have a..." expressions
- Advice with "should/shouldn't"

### Teaching Activities
- Health problem role-plays
- Body parts identification
- Medical advice dialogues
`,
    orderIndex: 0
  },
  {
    unitId: 142, // Unit 8: What Did You Do Yesterday?
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Daily activities: wake up, eat breakfast, go to school, watch TV
- Time expressions: yesterday, last night, in the morning
- Past tense verbs: went, saw, ate, played, did

### Grammar Focus
- Simple past tense regular and irregular verbs
- Yes/no questions in past tense
- Wh-questions in past tense

### Teaching Activities
- Past activities discussions
- Time sequence exercises
- Past tense verb games
`,
    orderIndex: 0
  },
  {
    unitId: 143, // Unit 9: Emotions
    title: "Unit Content Overview", 
    contentType: "lesson",
    content: `
### Key Vocabulary
- Basic emotions: happy, sad, angry, scared, surprised
- Complex emotions: excited, nervous, disappointed, proud
- Facial expressions: smile, frown, laugh, cry

### Grammar Focus
- "How do you feel?" questions
- "I feel..." expressions
- "Why are you...?" questions

### Teaching Activities
- Emotions identification games
- Feeling expression role-plays
- Situation-based emotion discussions
`,
    orderIndex: 0
  },
  {
    unitId: 144, // Unit 10: At the Supermarket
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Food items: fruit, vegetables, meat, dairy, bread
- Shopping phrases: How much is...?, I'd like..., Do you have...?
- Quantities: a bottle of, a carton of, a kilo of

### Grammar Focus
- Countable/uncountable nouns
- Quantity expressions
- Polite requests

### Teaching Activities
- Shopping role-plays
- Food categorization exercises 
- Price inquiry dialogues
`,
    orderIndex: 0
  },
  {
    unitId: 145, // Unit 11: Where Are You Going?
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Travel destinations: beach, mountains, city, countryside
- Travel activities: sightseeing, swimming, hiking, shopping
- Travel plans: hotel, flight, trip, vacation

### Grammar Focus
- Present continuous for future plans
- "Where are you going...?" questions
- Time expressions for future

### Teaching Activities
- Travel plan discussions
- Destination preference conversations
- Future trip role-plays
`,
    orderIndex: 0
  },
  {
    unitId: 146, // Unit 12: How Did You Get Here?
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Transportation: car, bus, train, plane, boat
- Travel verbs: drive, ride, fly, sail
- Journey words: trip, route, way, journey

### Grammar Focus
- Past simple tense for completed journeys
- "How did you...?" questions
- Transportation prepositions (by, on, in)

### Teaching Activities
- Transport comparison discussions
- Journey description exercises
- Travel experience conversations
`,
    orderIndex: 0
  },
  {
    unitId: 147, // Unit 13: What Did You Do Yesterday?
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Routine activities: study, clean, cook, shop, exercise
- Past time expressions: yesterday, last night, earlier
- Past tense verbs: studied, cleaned, cooked, shopped

### Grammar Focus
- Regular and irregular past verbs
- Sequence words (first, then, after that)
- Questions in the past tense

### Teaching Activities
- Past routine discussions
- Daily schedule comparisons
- Regular vs. irregular verb practice
`,
    orderIndex: 0
  },
  {
    unitId: 148, // Unit 14: Movie Time
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Film genres: comedy, action, drama, animation, horror
- Cinema words: ticket, screen, seat, popcorn, movie theater
- Opinion expressions: I liked/didn't like, It was amazing/boring

### Grammar Focus
- Past tense for movie experiences
- Opinion phrases and adjectives
- Comparative structures for films

### Teaching Activities
- Movie preference discussions
- Film review exercises
- Cinema experience role-plays
`,
    orderIndex: 0
  },
  {
    unitId: 149, // Unit 15: Let's Go Sightseeing
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Tourist attractions: museum, castle, tower, statue, monument
- Sightseeing activities: visit, take photos, buy souvenirs
- Travel recommendations: must-see, worth visiting, famous for

### Grammar Focus
- "Let's..." suggestions
- Modal verbs for recommendations
- Imperatives for directions

### Teaching Activities
- Landmark identification games
- Tour planning exercises
- Travel recommendation role-plays
`,
    orderIndex: 0
  },
  {
    unitId: 150, // Unit 16: Sounds of Music
    title: "Unit Content Overview",
    contentType: "lesson",
    content: `
### Key Vocabulary
- Musical instruments: guitar, piano, drums, violin, flute
- Music genres: pop, rock, classical, jazz, hip-hop
- Performance words: concert, practice, play, sing, listen

### Grammar Focus
- "Can you play...?" questions
- Present simple for musical preferences
- Frequency adverbs for music habits

### Teaching Activities
- Instrument identification games
- Music preference discussions
- Musical ability conversations
`,
    orderIndex: 0
  }
];

async function createMaterialContent() {
  try {
    console.log("Creating material content for all Book 5 units...");
    
    for (const material of materialContents) {
      try {
        // Check if material content already exists
        const existingMaterials = await db.select()
          .from(materials)
          .where(eq(materials.unitId, material.unitId))
          .where(eq(materials.title, material.title));
        
        // If material exists, update it
        if (existingMaterials.length > 0) {
          const updatedMaterial = await db.update(materials)
            .set({
              content: material.content,
              updatedAt: new Date()
            })
            .where(eq(materials.id, existingMaterials[0].id))
            .returning();
          
          console.log(`Updated existing material for Unit ${material.unitId}: ${updatedMaterial[0].title}`);
        } 
        // If material doesn't exist, create it
        else {
          const newMaterial = await db.insert(materials)
            .values({
              unitId: material.unitId,
              title: material.title,
              contentType: material.contentType,
              content: material.content,
              orderIndex: material.orderIndex,
              isPublished: true,
              createdAt: new Date(),
              updatedAt: new Date()
            })
            .returning();
          
          console.log(`Created new material for Unit ${material.unitId}: ${newMaterial[0].title}`);
        }
      } catch (error) {
        console.error(`Error processing material for Unit ${material.unitId}:`, error);
      }
    }
    
    console.log("Material content creation/update completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating material content:", error);
    process.exit(1);
  }
}

createMaterialContent();