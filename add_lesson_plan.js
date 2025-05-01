// Simple script to add a lesson plan for Unit 5
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const http = require('http');

const lessonPlan = {
  bookId: "book7",
  unitId: "unit5",
  resourceType: "lessonPlan",
  title: "School Facilities Lesson Plan",
  content: `<div class="lesson-plan-container">
    <h1>School Facilities and Learning Environment</h1>
    <h2>Lesson Overview</h2>
    <div class="overview-grid">
      <div class="overview-item"><strong>Duration:</strong> 45-60 minutes</div>
      <div class="overview-item"><strong>Level:</strong> Intermediate</div>
    </div>
    <h2>Learning Objectives</h2>
    <ul>
      <li>Identify and name different school facilities (library, classroom, staffroom, etc.)</li>
      <li>Practice asking and answering questions about school facilities</li>
      <li>Compare different types of schools and their facilities</li>
      <li>Develop vocabulary related to the school environment</li>
    </ul>
    <h2>Materials Needed</h2>
    <ul>
      <li>Visual English Book 7, Unit 5 slides</li>
      <li>Flashcards of school facilities</li>
      <li>School floor plan templates</li>
      <li>Pictures of different school facilities</li>
      <li>Colored pencils and paper</li>
    </ul>
    <h2>Lesson Procedure</h2>
    <div class="procedure-steps">
      <div class="step">
        <h3>Step 1: Warm-up: School Vocabulary (5-7 minutes)</h3>
        <p>Begin with a quick review of basic school-related vocabulary that students already know.</p>
        <h4>Instructions:</h4>
        <ol>
          <li>Show flashcards of different school areas one by one</li>
          <li>Ask students to identify each facility</li>
          <li>Have students share what activities typically happen in each area</li>
        </ol>
        <div class="teacher-note">
          <strong>Teacher Note:</strong> This helps assess prior knowledge and introduces the topic in an engaging way. Pay attention to areas where students might need more vocabulary support.
        </div>
      </div>
      <div class="step">
        <h3>Step 2: Presentation: School Facilities (10-12 minutes)</h3>
        <p>Introduce the main school facilities using the Visual English slides.</p>
        <h4>Instructions:</h4>
        <ol>
          <li>Show slides with different school facilities (library, staff room, assembly hall, etc.)</li>
          <li>Teach the question format: "Is there a [facility] in your school?"</li>
          <li>Demonstrate appropriate answers: "Yes, there is a [facility] in my school" or "No, there isn't a [facility] in my school"</li>
          <li>Have students repeat the new vocabulary and practice the question-answer pattern</li>
        </ol>
        <h4>Materials:</h4>
        <ul>
          <li>Visual English Book 7, Unit 5 slides</li>
        </ul>
      </div>
      <div class="step">
        <h3>Step 3: Practice: School Survey (15 minutes)</h3>
        <p>Students work in pairs to ask and answer questions about facilities in their schools.</p>
        <h4>Instructions:</h4>
        <ol>
          <li>Divide students into pairs</li>
          <li>Distribute a worksheet with a list of school facilities</li>
          <li>Students take turns asking: "Is there a [facility] in your school?" and answering</li>
          <li>After completing the survey, pairs report back to the class about similarities and differences</li>
        </ol>
        <div class="teacher-note">
          <strong>Teacher Note:</strong> For schools with students from the same school, you can modify this to ask about facilities in their dream school.
        </div>
      </div>
      <div class="step">
        <h3>Step 4: Group Activity: Design Your Ideal School (15-20 minutes)</h3>
        <p>Students work in small groups to design their ideal school with all the facilities they would like to have.</p>
        <h4>Instructions:</h4>
        <ol>
          <li>Divide class into groups of 3-4 students</li>
          <li>Provide large papers and colored pencils</li>
          <li>Groups draw a floor plan of their ideal school with at least 8 different facilities</li>
          <li>Each group presents their school design to the class, explaining what facilities they included and why</li>
        </ol>
        <h4>Materials:</h4>
        <ul>
          <li>Large paper</li>
          <li>Colored pencils</li>
          <li>Floor plan templates (optional)</li>
        </ul>
      </div>
      <div class="step">
        <h3>Step 5: Wrap-up and Review (5 minutes)</h3>
        <p>Review the key vocabulary and structures learned in the lesson.</p>
        <h4>Instructions:</h4>
        <ol>
          <li>Show a picture of a school with multiple facilities</li>
          <li>Ask students to identify as many facilities as they can</li>
          <li>Conduct a quick exit quiz: "What's this place called?" while showing pictures of different school areas</li>
        </ol>
      </div>
    </div>
    <h2>Assessment</h2>
    <p>Observe students during the pair work and group activities to assess their ability to use the target vocabulary and question structures. Note which students need additional support with specific vocabulary or concepts.</p>
    <h2>Homework Ideas</h2>
    <ul>
      <li>Draw a map of your school and label at least 6 different facilities in English</li>
      <li>Write 5 sentences comparing facilities in your school with those in an ideal school</li>
      <li>Create a mini-poster showing your favorite place in the school and write 3-5 sentences explaining why you like it</li>
    </ul>
    <h2>Additional Resources</h2>
    <ul>
      <li><a href="https://www.youtube.com/embed/fAAFO44pJlU" target="_blank">Schools in the UK and USA (YouTube Video)</a></li>
      <li><a href="https://www.youtube.com/embed/l1xgc0aTnLU" target="_blank">After School Clubs (YouTube Video)</a></li>
      <li><a href="https://www.youtube.com/embed/Z3y_RrLdYtE" target="_blank">School Rules (YouTube Video)</a></li>
      <li><a href="https://wordwall.net/embed/f72c3b6631a649f0b68952153fbc6441" target="_blank">Wordwall - Places in School Game</a></li>
    </ul>
  </div>`,
  thumbnailUrl: null,
  metadata: {
    description: "A comprehensive 45-60 minute lesson plan for teaching school facilities vocabulary and conversation patterns to intermediate ESL students."
  }
};

const data = JSON.stringify(lessonPlan);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/direct/teacher-resources',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
    console.log('Lesson plan successfully added!');
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();
