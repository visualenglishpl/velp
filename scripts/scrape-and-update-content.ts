import { db } from "../server/db";
import { materials, units } from "../shared/schema";
import { eq } from "drizzle-orm";
import axios from "axios";
import { load } from "cheerio";

// URLs for content to scrape
const UNIT_CONTENT_URLS = {
  // Unit 1: School Tour
  135: "https://visualenglish.org/units/school-tour",
  
  // Unit 2: House Chores
  136: "https://visualenglish.org/units/house-chores",
  
  // Unit 3: Are You a Gamer?
  137: "https://visualenglish.org/units/are-you-a-gamer",
  
  // Unit 4: Places in the Town
  138: "https://visualenglish.org/units/places-in-town",
  
  // Unit 5: Winter Fun
  139: "https://visualenglish.org/units/winter-fun",
  
  // Unit 6: Nationalities
  140: "https://visualenglish.org/units/nationalities",
  
  // Unit 7: Get Well Soon!
  141: "https://visualenglish.org/units/get-well-soon",
  
  // Unit 8: What Did You Do Yesterday?
  142: "https://visualenglish.org/units/what-did-you-do-yesterday",
  
  // Unit 9: Emotions
  143: "https://visualenglish.org/units/emotions",
  
  // Unit 10: At the Supermarket
  144: "https://visualenglish.org/units/at-the-supermarket",
  
  // Unit 11: Where Are You Going?
  145: "https://visualenglish.org/units/where-are-you-going",
  
  // Unit 12: How Did You Get Here?
  146: "https://visualenglish.org/units/how-did-you-get-here",
  
  // Unit 13: What Did You Do Yesterday?
  147: "https://visualenglish.org/units/what-did-you-do-yesterday-2",
  
  // Unit 14: Movie Time
  148: "https://visualenglish.org/units/movie-time",
  
  // Unit 15: Let's Go Sightseeing
  149: "https://visualenglish.org/units/lets-go-sightseeing",
  
  // Unit 16: Sounds of Music
  150: "https://visualenglish.org/units/sounds-of-music"
};

// Function to extract content from a URL (simulation since actual URLs are placeholders)
async function extractContentFromUrl(url: string): Promise<{ title: string, content: string, materialContent: string }> {
  try {
    // In a real implementation, this would make an actual HTTP request
    // const response = await axios.get(url);
    // const $ = load(response.data);
    
    // For now, we'll simulate the content based on the unit title in the URL
    const urlParts = url.split('/');
    const unitSlug = urlParts[urlParts.length - 1];
    
    // Generate appropriate content based on the unit slug
    let title = "Unit Content";
    let content = "";
    let materialContent = "";
    
    if (unitSlug === "school-tour") {
      materialContent = `Material Covered
School Facilities
Primary School: Main building for younger students
Office: Administrative area with headmaster's office
Gym: Space for physical education and sports activities
Canteen/Tuck Shop: Where students eat meals and buy snacks
Library: Quiet area for reading and studying
After School Care: Activities after regular school hours
Special School Areas
Cloakroom: For changing shoes and outdoor clothing
Classroom: Primary learning spaces
Sports Field: Outdoor space for physical activities
Playground: Recreational area for breaks
Art Room: Space for creative projects
Music Room: Where students learn instruments and singing
School Vocabulary
Learn words related to school facilities and locations
Practice sentences about school activities and schedules
Discuss favorite school subjects and teachers`;
    } 
    else if (unitSlug === "house-chores") {
      materialContent = `Material Covered
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
Household Vocabulary
Learn words related to cleaning tools and appliances
Practice sentences about household responsibilities
Discuss who does which chores at home`;
    }
    else if (unitSlug === "are-you-a-gamer") {
      materialContent = `Material Covered
Gaming Devices
Console: Gaming system connected to TV (PlayStation, Xbox, Nintendo)
Controller: Handheld device to control games
Computer: Desktop or laptop used for gaming
Smartphone/Tablet: Mobile devices for casual gaming
Gaming Vocabulary
Game genres: Action, adventure, strategy, sports, puzzle
Gaming terms: Level, character, save, multiplayer, high score
Gaming activities: Playing online, streaming, competing
Gaming Discussions
Talking about favorite games and gaming preferences
Discussing gaming habits and screen time limits
Comparing different gaming platforms and experiences
Digital Entertainment
Learning about age ratings for games
Discussing benefits and challenges of gaming
Vocabulary for describing game experiences`;
    }
    else if (unitSlug === "places-in-town") {
      materialContent = `Material Covered
Town Locations
Post Office: For sending mail and packages
Bank: For financial services
Supermarket: Large store selling food and household items
Restaurant: Place to eat prepared meals
Cafe: Small establishment serving coffee and light meals
Hospital: Medical facility for healthcare
Direction Words
Left/Right: Basic directional instructions
Straight ahead: Continuing in the same direction
Next to/Across from: Relative positions
Between/Behind: Location descriptions
Near/Far: Distance indicators
Around the corner: Just past a turn
Town Activities
Shopping at different types of stores
Using public services like the post office
Finding locations using a town map
Giving and following directions
Community Services
Learning about different community helpers
Discussing the purpose of various town buildings
Vocabulary for describing urban locations`;
    }
    else if (unitSlug === "winter-fun") {
      materialContent = `Material Covered
Winter Activities
Skiing: Sliding down snow-covered hills on skis
Sledding: Riding on a sled down a snowy slope
Ice Skating: Gliding on ice with special boots with blades
Snowball Fight: Playful throwing of packed snow
Building a Snowman: Creating a figure from packed snow
Winter Clothing
Scarf: Fabric worn around the neck for warmth
Gloves/Mittens: Hand coverings for cold weather
Hat/Beanie: Head covering to retain heat
Boots: Footwear for snow and ice
Coat/Jacket: Heavy outer garment for cold weather
Winter Weather
Snow: Frozen precipitation in white flakes
Ice: Frozen water forming a solid surface
Cold: Low temperature sensation
Frost: Thin layer of ice crystals on surfaces
Blizzard: Severe snowstorm with strong winds
Winter Celebrations
Discussing holiday traditions in winter
Vocabulary for winter celebrations
Describing seasonal decorations and customs`;
    }
    else if (unitSlug === "nationalities") {
      materialContent = `Material Covered
Countries and Nationalities
Country names: USA, UK, Japan, China, Brazil, etc.
Nationality adjectives: American, British, Japanese, Chinese, Brazilian
Language names: English, Japanese, Chinese, Portuguese, etc.
Cultural Vocabulary
National flags: Visual symbols representing countries
Traditional foods: Dishes associated with different cultures
Traditional clothing: Garments specific to various countries
National symbols: Objects representing a nation's identity
Cultural Discussions
Asking and answering about countries of origin
Discussing languages spoken in different countries
Comparing cultural traditions and customs
International Topics
Talking about travel experiences to different countries
Discussing cultural differences and similarities
Vocabulary for describing international experiences
Learning about global geography`;
    }
    else if (unitSlug === "get-well-soon") {
      materialContent = `Material Covered
Health Vocabulary
Common illnesses: Cold, flu, fever, headache, stomachache
Body parts: Head, stomach, throat, ear, back, etc.
Symptoms: Pain, ache, cough, sneeze, temperature
Medical Professionals
Doctor: Medical practitioner who diagnoses and treats illness
Nurse: Healthcare professional who assists doctors
Pharmacist: Professional who prepares and dispenses medicine
Medical Places
Hospital: Large facility for medical treatment and care
Clinic: Smaller medical facility for outpatient care
Pharmacy/Drugstore: Place to get medicine and health products
Health Expressions
"I don't feel well" - Expressing general illness
"I have a headache/stomachache" - Specific complaints
"Get well soon" - Wishing recovery
"Take medicine" - Following treatment
"Rest in bed" - Recovery advice
Health and Wellness
Discussing healthy habits and preventive measures
Vocabulary for describing symptoms and treatments
Expressing sympathy and concern for others`;
    }
    else if (unitSlug === "what-did-you-do-yesterday") {
      materialContent = `Material Covered
Past Tense Verbs
Regular verbs: walked, played, watched, studied
Irregular verbs: went, ate, saw, had, did
Time expressions: yesterday, last night, last week
Daily Activities in Past Tense
"I went to school" - Movement and travel in past
"I ate breakfast" - Meals and food in past
"I watched TV" - Entertainment activities in past
"I did my homework" - Study activities in past
"I played games" - Recreational activities in past
Asking Questions about Past Events
"What did you do yesterday?" - General past activities
"Where did you go?" - Past locations and movement
"When did you...?" - Timing of past events
"Who did you see?" - Past social interactions
"How was your day?" - Past experiences and feelings
Describing Past Events
Discussing completed activities in chronological order
Using sequencing words: first, then, after that, finally
Vocabulary for describing past experiences
Talking about the timing of different activities`;
    }
    else if (unitSlug === "emotions") {
      materialContent = `Material Covered
Basic Emotions
Happy: Feeling of joy or pleasure
Sad: Feeling unhappy or sorrowful
Angry: Feeling of strong displeasure or hostility
Scared: Feeling afraid or frightened
Surprised: Feeling astonished or startled
Emotional Expressions
Facial expressions: Smile, frown, wide eyes
Body language: Posture, gestures, movements
Verbal expressions: "I feel..." statements
Emotional Reactions
"Why are you happy/sad/angry?" - Discussing causes
"I'm happy because..." - Explaining emotions
"When do you feel...?" - Situations and emotions
Emotional Vocabulary
Describing different degrees of feelings
Discussing emotional responses to situations
Words for expressing empathy and understanding
Social Interactions
Recognizing others' emotions from expressions
Responding appropriately to different emotions
Vocabulary for comforting or congratulating others`;
    }
    else if (unitSlug === "at-the-supermarket") {
      materialContent = `Material Covered
Food Categories
Fruits: Apple, banana, orange, grapes, strawberry
Vegetables: Carrot, potato, tomato, onion, lettuce
Dairy: Milk, cheese, yogurt, butter, eggs
Meat: Chicken, beef, pork, fish, seafood
Grains: Bread, rice, pasta, cereal, crackers
Shopping Vocabulary
Cart/trolley: For collecting items while shopping
Basket: Smaller container for fewer items
Aisle: Sections of the store with different products
Checkout: Area where you pay for items
Receipt: Paper showing what you purchased
Shopping Expressions
"How much is...?" - Asking about prices
"I'd like..." - Making requests for items
"Do you have...?" - Asking about availability
"Where is the...?" - Asking for item locations
Quantities and Measurements
Numbers for counting items
Weight units: grams, kilograms, pounds
Volume units: liters, milliliters, gallons
Packaging terms: bottle, can, box, jar, bag
Shopping Conversations
Role-playing supermarket interactions
Discussing food preferences and shopping lists
Vocabulary for comparing prices and quality`;
    }
    else if (unitSlug === "where-are-you-going") {
      materialContent = `Material Covered
Travel Destinations
Local places: Park, mall, friend's house, restaurant
City destinations: Museum, zoo, theater, stadium
Vacation spots: Beach, mountains, lake, countryside
Countries and international locations
Travel Plans Vocabulary
Transport methods: car, train, plane, boat, bus
Travel items: ticket, passport, suitcase, map
Travel activities: sightseeing, swimming, hiking
Future Time Expressions
Tomorrow, next week, next month, next year
This weekend, this evening, tonight
In two days, in a few hours, soon
Travel Conversations
"Where are you going?" - Asking about destinations
"I'm going to..." - Stating destinations
"When are you leaving?" - Discussing departure times
"How long are you staying?" - Duration of trips
"What are you going to do there?" - Activities planned
Travel Planning
Discussing itineraries and schedules
Vocabulary for booking tickets and accommodations
Expressing excitement about upcoming journeys`;
    }
    else if (unitSlug === "how-did-you-get-here") {
      materialContent = `Material Covered
Transportation Methods
Car: Personal vehicle for road travel
Bus: Public transport for multiple passengers
Train: Rail transport for longer distances
Plane/Aircraft: Air transport for long distances
Subway/Underground: Urban rail transport
Boat/Ship: Water transport across rivers, lakes, seas
Bicycle: Two-wheeled personal transport
On foot: Walking as transportation
Transportation Vocabulary
Driver: Person who operates a vehicle
Passenger: Person traveling in a vehicle
Ticket: Document allowing travel on public transport
Station: Place where transport vehicles stop
Airport: Facility for aircraft departures and arrivals
Transportation Questions
"How did you get here?" - Asking about transport method
"How long did it take?" - Journey duration
"How much did it cost?" - Travel expenses
"Was it comfortable?" - Journey quality
Journey Descriptions
Describing past travel experiences
Comparing different transportation methods
Vocabulary for travel routes and connections
Discussing advantages and disadvantages of different transport`;
    }
    else if (unitSlug === "what-did-you-do-yesterday-2") {
      materialContent = `Material Covered
Daily Routine Verbs in Past Tense
Woke up: Beginning the day
Got dressed: Preparing for the day
Had breakfast/lunch/dinner: Meal times
Went to school/work: Daily obligations
Came home: Returning from activities
Watched TV: Leisure activities
Went to bed: Ending the day
Time Expressions for Past Events
In the morning/afternoon/evening: Parts of the day
At [specific time]: Exact timing
Before/after: Relative timing
First, then, next, finally: Sequence
Yesterday's Activities
School or work tasks completed
Household chores performed
Recreational activities enjoyed
Social interactions experienced
Asking about Past Activities
"What time did you...?" - Specific timing
"What did you do after...?" - Sequence of events
"Did you...?" - Yes/no questions about past activities
Narrating Past Events
Telling simple stories about yesterday
Using past tense verbs consistently
Vocabulary for daily activities and routines`;
    }
    else if (unitSlug === "movie-time") {
      materialContent = `Material Covered
Movie Genres
Action: Films with exciting sequences and stunts
Comedy: Humorous films designed to make audiences laugh
Drama: Serious, realistic character or plot-driven stories
Horror: Films intended to frighten or scare viewers
Science Fiction: Speculative stories often based on advanced science
Animation: Films created with animated images
Cinema Vocabulary
Actor/Actress: Performer in a film
Director: Person who guides the making of a film
Scene: Section of a film
Soundtrack: Music in a film
Special effects: Visual or sound illusions in films
Plot: Main story of a film
Movie Opinions
"I liked/didn't like..." - Expressing preferences
"It was exciting/boring/funny..." - Describing films
"My favorite part was..." - Discussing specific elements
Rating expressions: excellent, good, okay, terrible
Film Discussions
Talking about favorite movies and actors
Comparing different film genres
Vocabulary for recommending films to others
Describing cinema experiences and movie plots`;
    }
    else if (unitSlug === "lets-go-sightseeing") {
      materialContent = `Material Covered
Tourist Attractions
Monument: Structure created to commemorate a person or event
Museum: Building displaying historical, scientific, or cultural objects
Castle/Palace: Historic royal residence or fortress
Cathedral/Church: Religious building of architectural significance
Tower: Tall, narrow structure, often historic
Park: Public recreational area, often with gardens
Tourist Vocabulary
Sightseeing: Visiting famous places of interest
Tour: Organized visit to multiple attractions
Guide: Person who shows tourists around
Souvenir: Item purchased as a reminder of a visit
Photograph: Picture taken of attractions
Travel Expressions
"Let's go to..." - Suggesting places to visit
"I want to see..." - Expressing sightseeing preferences
"How do we get to...?" - Asking for directions to attractions
"What time does it open/close?" - Asking about visiting hours
Travel Planning
Creating an itinerary for sightseeing
Discussing must-see attractions
Vocabulary for describing famous landmarks
Talking about travel experiences and recommendations`;
    }
    else if (unitSlug === "sounds-of-music") {
      materialContent = `Material Covered
Musical Instruments
String instruments: Guitar, violin, cello, bass
Wind instruments: Flute, clarinet, saxophone, trumpet
Percussion: Drums, cymbals, tambourine, xylophone
Keyboard instruments: Piano, organ, synthesizer
Music Genres
Classical: Traditional Western art music
Pop: Contemporary popular music
Rock: Guitar-based popular music
Jazz: Improvisational music derived from blues
Folk: Traditional cultural music
Hip-hop: Music with rhythmic vocals and beats
Music Vocabulary
Musician: Person who plays music
Band/Orchestra: Group of musicians
Concert: Live music performance
Song/Piece: Musical composition
Lyrics: Words of a song
Melody: Main tune of a music piece
Musical Discussions
"Do you play an instrument?" - Asking about musical abilities
"What kind of music do you like?" - Discussing preferences
"Have you been to a concert?" - Past musical experiences
Learning about Music
Discussing favorite musicians and bands
Describing sounds and musical qualities
Vocabulary for expressing musical preferences
Talking about musical experiences and abilities`;
    }
    else {
      // Default general content if unit not specifically handled
      materialContent = `Material Covered
Vocabulary
Key words related to the unit topic
Expressions for everyday conversations
Grammar points specific to the theme
Activities
Speaking practice with partners
Listening to conversations and dialogues
Reading exercises with comprehension questions
Vocabulary development through games and exercises
Learning Objectives
Understanding and using topic-specific language
Developing conversation skills related to the theme
Building confidence in using English in context`;
    }
    
    return { title, content, materialContent };
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error);
    return { 
      title: "Unit Content", 
      content: "", 
      materialContent: `Material Covered\nVocabulary\nExpressions\nGrammar points\nActivities` 
    };
  }
}

// Function to create or update material with the extracted content
async function createOrUpdateMaterial(unitId: number, materialContent: string) {
  try {
    // Check if a material already exists for this unit
    const existingMaterials = await db.select()
      .from(materials)
      .where(eq(materials.unitId, unitId))
      .orderBy(materials.id)
      .limit(1);
    
    if (existingMaterials.length > 0) {
      // Update the existing material with the new content
      const existingMaterial = existingMaterials[0];
      
      await db.update(materials)
        .set({ 
          content: materialContent,
          updatedAt: new Date()
        })
        .where(eq(materials.id, existingMaterial.id));
      
      console.log(`Updated existing material (ID: ${existingMaterial.id}) for unit ${unitId}`);
    } else {
      // Create a new material with the content
      const newMaterial = await db.insert(materials)
        .values({
          title: "Unit Content",
          unitId: unitId,
          contentType: "lesson",
          content: materialContent,
          orderIndex: 0,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      
      console.log(`Created new material (ID: ${newMaterial[0].id}) for unit ${unitId}`);
    }
  } catch (error) {
    console.error(`Error creating/updating material for unit ${unitId}:`, error);
  }
}

// Main function to scrape content and update all units
async function scrapeAndUpdateContent() {
  try {
    console.log("Starting to scrape and update content for all units...");
    
    // Process each unit
    for (const [unitIdStr, url] of Object.entries(UNIT_CONTENT_URLS)) {
      const unitId = parseInt(unitIdStr);
      
      // Get unit info to include in the log
      const unitInfo = await db.select()
        .from(units)
        .where(eq(units.id, unitId))
        .limit(1);
      
      if (unitInfo.length > 0) {
        const unitTitle = unitInfo[0].title;
        console.log(`Processing Unit ${unitInfo[0].unitNumber}: ${unitTitle}`);
        
        // Extract content from URL (simulated)
        const { materialContent } = await extractContentFromUrl(url);
        
        // Create or update material with the extracted content
        await createOrUpdateMaterial(unitId, materialContent);
      } else {
        console.log(`Unit with ID ${unitId} not found, skipping...`);
      }
    }
    
    console.log("Content update completed for all units!");
    process.exit(0);
  } catch (error) {
    console.error("Error during content scraping and update:", error);
    process.exit(1);
  }
}

// Run the function
scrapeAndUpdateContent();