import fetch from 'node-fetch';

// This script updates the description for Unit 1 (School Tour) of Book 5
async function updateSchoolTourDescription() {
  // Unit ID 135 corresponds to the "School Tour" unit in Book 5
  const unitId = 135;

  // Comprehensive description combining all the school facilities information
  const description = `Embark on the "School Tour" unit! 🎒📚 This ESL module guides students through school areas, introducing facilities and activities.

School Facilities:
🏫 Primary School: Learn about primary education structure and role.
🏢 Office: Administrative area; often houses the headmaster/headmistress.
💪 Gym: Physical education and sports activities.
🍽️ Canteen/Tuck Shop: Where students eat lunch and buy snacks.
📚 Library: Quiet area for reading and studying.
🏫 Classroom: Primary learning space for lessons.
⚽ Sports Field: Outdoor sports and physical activities.
🤾 Playground: Space for free play and informal activities.
🎨 Art Room: Creative space for drawing, painting, and crafting.
🎼 Music Room: Where students learn and practice music.

Key ESL activities include role plays about school directions, creating school maps, discussing favorite areas, and designing a dream school. Perfect for practicing English discussions about school life!`;

  try {
    // Make the API call to update the unit description
    const response = await fetch(`http://localhost:5000/api/units/${unitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update unit description: ${JSON.stringify(errorData)}`);
    }

    const updatedUnit = await response.json();
    console.log('Unit description updated successfully!');
    console.log('Updated unit:', updatedUnit);
  } catch (error) {
    console.error('Error updating unit description:', error);
  }
}

// Execute the update function
updateSchoolTourDescription()
  .then(() => {
    console.log('Script completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });