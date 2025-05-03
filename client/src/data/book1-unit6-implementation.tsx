import React from 'react';
import { type LessonPlanItem as LessonPlan } from '@shared/schema';

/**
 * Implementation file for Book 1 Unit 6: My Favourite Colour
 *
 * This unit focuses on teaching colors and expressing preferences using
 * "My favourite colour is..."
 */

export const book1Unit6LessonPlans: LessonPlan[] = [
  {
    id: 'book1-unit6-lesson1',
    bookId: '1',
    unitId: '6',
    title: 'Colours and Preferences - Lesson 1',
    durationMinutes: 45,
    content: (
      <div className="lesson-plan">
        <h2 className="text-xl font-bold mb-4">Lesson Plan: Colours and Preferences (45 minutes)</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Learn and identify basic colours (red, blue, green, yellow, orange, purple, pink, black, white, brown)</li>
            <li>Use the structure "My favourite colour is..."</li>
            <li>Ask and answer "What is your favourite colour?"</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Materials:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Coloured flashcards</li>
            <li>"I See Something Blue" video</li>
            <li>Coloured objects or pictures</li>
            <li>Drawing paper and coloured pencils/crayons</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Warm-up (5 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Greet students and introduce the topic of colours.</li>
            <li>Show coloured flashcards one by one and ask "What colour is this?"</li>
            <li>Students respond with the colour name.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Presentation (10 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Play the video "I See Something Blue" from Super Simple Songs.</li>
            <li>Pause at different points to reinforce colour vocabulary.</li>
            <li>Introduce the question "What colour is it?" and model responses.</li>
            <li>Show various classroom objects and ask "What colour is the [object]?"</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Practice (15 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Pair activity: Students take turns asking "What colour is this?" about classroom objects.</li>
            <li>Introduce the question "What is your favourite colour?"</li>
            <li>Model the answer: "My favourite colour is [colour]."</li>
            <li>Students practice asking and answering about favourite colours in pairs.</li>
            <li>Play the video "What's Your Favorite Color" to reinforce the language pattern.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Production (10 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Students draw a picture using their favourite colour.</li>
            <li>Students present their drawings to the class saying "My favourite colour is [colour]."</li>
            <li>Teacher asks additional questions: "What colour is this part?"</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Wrap-up (5 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Review the colours learned today.</li>
            <li>Play a quick game: "Touch something [colour]" where students must quickly touch something of that colour in the classroom.</li>
            <li>Assign homework: Find 5 objects at home with different colours.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Extension/Differentiation:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Advanced students: Learn additional colour vocabulary (grey, gold, silver, etc.)</li>
            <li>Struggling students: Focus on 4-5 main colours only.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'book1-unit6-lesson2',
    bookId: '1',
    unitId: '6',
    title: 'Colours in Our World - Lesson 2',
    durationMinutes: 45,
    content: (
      <div className="lesson-plan">
        <h2 className="text-xl font-bold mb-4">Lesson Plan: Colours in Our World (45 minutes)</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Review and reinforce colour vocabulary</li>
            <li>Use "It's [colour]" to describe objects</li>
            <li>Learn colour adjectives (bright, dark, light)</li>
            <li>Practice spelling colour words</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Materials:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>"I See Something Pink" video</li>
            <li>"Colour Spelling" video</li>
            <li>Wordwall colour games</li>
            <li>Pictures of objects in different colours</li>
            <li>Coloured paper strips</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Warm-up (5 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Review colours by showing coloured cards or objects.</li>
            <li>Ask students to say the colour and one object of that colour ("Blue like the sky").</li>
            <li>Quick review of favourite colours: "My favourite colour is..."</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Presentation (10 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Play the video "I See Something Pink".</li>
            <li>Introduce the concept of light and dark colours using visual examples.</li>
            <li>Model phrases like: "This is light blue" and "This is dark blue".</li>
            <li>Play the "Colour Spelling" video to practice spelling colour words.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Practice (15 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Divide the class into small groups.</li>
            <li>Give each group a set of coloured paper strips.</li>
            <li>Students arrange them from lightest to darkest.</li>
            <li>Students practice: "This is light green. This is dark green."</li>
            <li>Game: "I spy with my little eye something that is [colour]"</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Digital Activity (10 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Use one of the Wordwall colour games for interactive practice.</li>
            <li>Students take turns playing the game to identify colours and vocabulary.</li>
            <li>Class cheers and helps with correct answers.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Wrap-up (5 minutes):</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Play the video "What colour is it?" as a review.</li>
            <li>Conduct a quick colour quiz with pictures shown on screen.</li>
            <li>Review the favourite colour question and have a few students answer.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Extension/Differentiation:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Advanced students: Introduce colour idioms ("feeling blue", "seeing red").</li>
            <li>Struggling students: Focus on basic colour recognition and simple sentences.</li>
            <li>Homework: Create a colour collage with magazine cutouts of their favourite colour.</li>
          </ul>
        </div>
      </div>
    )
  }
];
