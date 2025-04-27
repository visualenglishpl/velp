import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as xlsx from "xlsx";
import { Readable } from "stream";
import path from "path";
import fs from "fs";
import os from "os";

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-north-1",
});

/**
 * Return hardcoded question/answer pairs for specific book/unit combinations
 * This ensures data availability when Excel processing might not find matches
 */
export function getHardcodedQuestionAnswers(bookId: string, unitId: string): QuestionAnswerEntry[] {
  // Initialize the array of entries
  const entries: QuestionAnswerEntry[] = [];
  
  // Units that have hardcoded data
  const hardcodedUnits = [
    "unit3", "unit4", "unit5", "unit6", "unit7", "unit8", "unit9", "unit10", "unit11",
    "unit12", "unit13", "unit14", "unit15", "unit16", "unit17", "unit18"
  ];
  
  // Only provide hardcoded data for specific book/unit combinations
  if (bookId === 'book1' && hardcodedUnits.includes(unitId)) {
    // If we're calling for a unit that has hardcoded data, this will be handled by specific conditions below
    // This ensures the functions below will be used
  }
  
  // Only provide hardcoded data for specific book/unit combinations
  if (bookId === 'book1' && unitId === 'unit1') {
    // Exact question-answer pairs from the user-provided file
    return [
      {
        filename: "01 I A What Do You Say in the Morning – Good Morning.gif",
        codePattern: "01 I A",
        question: "What do you say in the morning?",
        answer: "I say 'Good Morning' in the morning."
      },
      {
        filename: "01 I B What Time Do You Get Up – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "01 I B",
        question: "What time do you get up?",
        answer: "I get up in the morning."
      },
      {
        filename: "01 I C What Time Do You Eat Breakfast – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "01 I C",
        question: "What time do you eat breakfast?",
        answer: "I eat breakfast in the morning."
      },
      {
        filename: "01 I D What Time Do You Go to School – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "01 I D",
        question: "What time do you go to school?",
        answer: "I go to school in the morning."
      },
      {
        filename: "01 I E What Do You Drink in the Morning.gif",
        codePattern: "01 I E",
        question: "What do you drink in the morning?",
        answer: "I drink milk/juice/coffee in the morning."
      },
      {
        filename: "01 I F What Do You Eat in the Morning.gif",
        codePattern: "01 I F",
        question: "What do you eat in the morning?",
        answer: "I eat cereal/toast/fruit in the morning."
      },
      {
        filename: "01 I G Do You Like to Get Up in the Morning – Yes, I Do – No, I Don't.gif",
        codePattern: "01 I G",
        question: "Do you like to get up in the morning?",
        answer: "\"Yes, I like to get up in the morning.\" / \"No, I don't like to get up in the morning.\""
      },
      {
        filename: "01 I Greetings – Good Morning – New.png",
        codePattern: "01 I H",
        question: "Do you run in the morning?",
        answer: "\"Yes, I run in the morning.\" / \"No, I don't run in the morning.\""
      },
      // Poland related data
      {
        filename: "01 R A What country is this",
        codePattern: "01 R A",
        question: "What country is this?",
        answer: "It is Poland."
      },
      {
        filename: "01 R B Where is this flag from",
        codePattern: "01 R B",
        question: "Where is this flag from?",
        answer: "It is from Poland."
      },
      {
        filename: "01 R C What nationality are these people",
        codePattern: "01 R C",
        question: "What nationality are these people?",
        answer: "They are Polish."
      },
      {
        filename: "01 S A Is she from Poland",
        codePattern: "01 S A",
        question: "Is she from Poland?",
        answer: "Yes, she is from Poland."
      },
      {
        filename: "01 S B Is he Polish",
        codePattern: "01 S B",
        question: "Is he Polish?",
        answer: "Yes, he is Polish."
      },
      // Warsaw data
      {
        filename: "01 T A What is the name of this city",
        codePattern: "01 T A",
        question: "What is the name of this city?",
        answer: "This city is Warsaw."
      },
      {
        filename: "01 T B What is the capital of Poland",
        codePattern: "01 T B",
        question: "What is the capital of Poland?",
        answer: "The capital of Poland is Warsaw."
      },
      {
        filename: "01 T C Are these Polish cities",
        codePattern: "01 T C",
        question: "Are these Polish cities?",
        answer: "Yes, they are Polish cities."
      },
      // Section 02 entries (afternoon routine)
      {
        filename: "02 I A What Do You Say in the Afternoon – Good Afternoon.gif",
        codePattern: "02 I A",
        question: "What do you say in the afternoon?",
        answer: "I say 'Good Afternoon' in the afternoon."
      },
      {
        filename: "02 I B What Time Do You Go Home – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "02 I B",
        question: "What time do you go home?",
        answer: "I go home in the afternoon."
      },
      {
        filename: "02 I C What Time Do You Eat Lunch – in the Morning, in the Afternoon, in the Evening or at Night.png",
        codePattern: "02 I C",
        question: "What time do you eat lunch?",
        answer: "I eat lunch in the afternoon."
      },
      {
        filename: "02 I D Do You Have Lunch in the Afternoon in School – Yes, I Do – No, I Don't.png",
        codePattern: "02 I D",
        question: "Do you have lunch in the afternoon at school?",
        answer: "Yes, I have lunch in the afternoon at school. / No, I don't have lunch in the afternoon at school."
      },
      {
        filename: "02 I E What Do You Eat in the Afternoon.gif",
        codePattern: "02 I E",
        question: "What do you eat in the afternoon?",
        answer: "I eat sandwiches/snacks/fruit in the afternoon."
      },
      {
        filename: "02 I F Do You Do Homework in the Afternoon – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I F",
        question: "Do you do homework in the afternoon?",
        answer: "Yes, I do homework in the afternoon. / No, I don't do homework in the afternoon."
      },
      {
        filename: "02 I G Do You Play with Friends in the Afternoon – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I G",
        question: "Do you play with friends in the afternoon?",
        answer: "Yes, I play with friends in the afternoon. / No, I don't play with friends in the afternoon."
      },
      {
        filename: "02 I H Do You Go Home by Bus in the Afternoon – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I H",
        question: "Do you go home by bus in the afternoon?",
        answer: "Yes, I go home by bus in the afternoon. / No, I don't go home by bus in the afternoon."
      },
      // Section 03 entries (evening routine)
      {
        filename: "03 I A What Do You Say in the Evening – Good Evening.gif",
        codePattern: "03 I A",
        question: "What do you say in the evening?",
        answer: "I say 'Good Evening' in the evening."
      },
      {
        filename: "03 I B What Time Do You Eat Dinner – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "03 I B",
        question: "What time do you eat dinner?",
        answer: "I eat dinner in the evening."
      },
      {
        filename: "03 I C What Time is It in the Picture – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "03 I C",
        question: "What time is it in the picture?",
        answer: "It is in the evening."
      },
      {
        filename: "03 I D What Do You Have for Dinner in the Evening.gif",
        codePattern: "03 I D",
        question: "What do you have for dinner in the evening?",
        answer: "I have pasta/rice/meat for dinner in the evening."
      },
      {
        filename: "03 I E Do You Do Homework in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I E",
        question: "Do you do homework in the evening?",
        answer: "Yes, I do homework in the evening. / No, I don't do homework in the evening."
      },
      {
        filename: "03 I F Do You Watch Tv in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I F",
        question: "Do you watch TV in the evening?",
        answer: "Yes, I watch TV in the evening. / No, I don't watch TV in the evening."
      },
      {
        filename: "03 I G Do You Take A Bath in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I G",
        question: "Do you take a bath in the evening?",
        answer: "Yes, I take a bath in the evening. / No, I don't take a bath in the evening."
      },
      {
        filename: "03 I H Do You Take A Shower in the Evening – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I H",
        question: "Do you take a shower in the evening?",
        answer: "Yes, I take a shower in the evening. / No, I don't take a shower in the evening."
      },
      // Section 04 entries (night routine)
      {
        filename: "04 I A What Do You Say at Night – Good Night.gif",
        codePattern: "04 I A",
        question: "What do you say at night?",
        answer: "I say 'Good Night' at night."
      },
      {
        filename: "04 I B What Time Do You Go to Sleep – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "04 I B",
        question: "What time do you go to sleep?",
        answer: "I go to sleep at night. / I go to sleep in the evening."
      },
      {
        filename: "04 I C What Time Do You Go to Sleep at Night.gif",
        codePattern: "04 I C",
        question: "What time do you go to sleep at night?",
        answer: "I go to sleep at [time] at night."
      },
      {
        filename: "04 I D What Time Do You Wear Pyjamas – in the Morning, in the Afternoon, in the Evening or at Night.gif",
        codePattern: "04 I D",
        question: "What time do you wear pyjamas?",
        answer: "I wear pyjamas in the evening. / I wear pyjamas at night."
      },
      {
        filename: "04 I E Do You Brush Your Teeth at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I E",
        question: "Do you brush your teeth at night?",
        answer: "Yes, I brush my teeth at night. / No, I don't brush my teeth at night."
      },
      {
        filename: "04 I F Do You Sit on the Telephone at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I F", 
        question: "Do you sit on the telephone at night?",
        answer: "Yes, I sit on the telephone at night. / No, I don't sit on the telephone at night."
      },
      {
        filename: "04 I G Do You Watch Tv at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I G",
        question: "Do you watch TV at night?",
        answer: "Yes, I watch TV at night. / No, I don't watch TV at night."
      },
      {
        filename: "04 I H Do You Read Books at Night – Yes, I Do – No, I Don't.gif",
        codePattern: "04 I H",
        question: "Do you read books at night?",
        answer: "Yes, I read books at night. / No, I don't read books at night."
      }
    ];
  }
  
  // Book 1, Unit 15 hardcoded data based on provided content (Clothing)
  if (bookId === 'book1' && unitId === 'unit15') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 F A What is It - It is A Hat.gif",
        codePattern: "02 F A",
        question: "What is it?",
        answer: "It is a hat."
      },
      {
        filename: "02 F B is It A Big or Small Hat.gif",
        codePattern: "02 F B",
        question: "Is it a big or small hat?",
        answer: "It is a big hat. / It is a small hat."
      },
      {
        filename: "02 F C What Colour is the Hat.gif",
        codePattern: "02 F C",
        question: "What color is the hat?",
        answer: "The hat is [color]."
      },
      {
        filename: "02 F D Do You Have A Hat.gif",
        codePattern: "02 F D",
        question: "Do you have a hat?",
        answer: "Yes, I have a hat. / No, I don't have a hat."
      },
      {
        filename: "03 F A What is It - It is A Shirt.gif",
        codePattern: "03 F A",
        question: "What is it?",
        answer: "It is a shirt."
      },
      {
        filename: "03 F B is It A Long or Short Sleeved Shirt.gif",
        codePattern: "03 F B",
        question: "Is it a long or short sleeved shirt?",
        answer: "It is a long sleeved shirt. / It is a short sleeved shirt."
      },
      {
        filename: "03 F C What Colour is the Shirt.gif",
        codePattern: "03 F C",
        question: "What color is the shirt?",
        answer: "The shirt is [color]."
      },
      {
        filename: "03 F D Do You Have A Shirt.gif",
        codePattern: "03 F D",
        question: "Do you have a shirt?",
        answer: "Yes, I have a shirt. / No, I don't have a shirt."
      },
      {
        filename: "04 F A What is It - It is A Skirt.gif",
        codePattern: "04 F A",
        question: "What is it?",
        answer: "It is a skirt."
      },
      {
        filename: "04 F B is It A Long or Short Skirt.gif",
        codePattern: "04 F B",
        question: "Is it a long or short skirt?",
        answer: "It is a long skirt. / It is a short skirt."
      },
      {
        filename: "04 F C What Colour is the Skirt.gif",
        codePattern: "04 F C",
        question: "What color is the skirt?",
        answer: "The skirt is [color]."
      },
      {
        filename: "04 F D Do You Have A Skirt.gif",
        codePattern: "04 F D",
        question: "Do you have a skirt?",
        answer: "Yes, I have a skirt. / No, I don't have a skirt."
      },
      {
        filename: "05 F A What is It - It is A Pair of Trousers.gif",
        codePattern: "05 F A",
        question: "What is it?",
        answer: "It is a pair of trousers."
      },
      {
        filename: "05 F B are They Long or Short Trousers.gif",
        codePattern: "05 F B",
        question: "Are they long or short trousers?",
        answer: "They are long trousers. / They are short trousers."
      },
      {
        filename: "05 F C What Colour are the Trousers.gif",
        codePattern: "05 F C",
        question: "What color are the trousers?",
        answer: "The trousers are [color]."
      },
      {
        filename: "05 F D Do You Have Trousers.gif",
        codePattern: "05 F D",
        question: "Do you have trousers?",
        answer: "Yes, I have trousers. / No, I don't have trousers."
      },
      {
        filename: "06 F A What is It - It is A Jumper.gif",
        codePattern: "06 F A",
        question: "What is it?",
        answer: "It is a jumper."
      },
      {
        filename: "06 F B is It A Summer or Winter Jumper.gif",
        codePattern: "06 F B",
        question: "Is it a summer or winter jumper?",
        answer: "It is a summer jumper. / It is a winter jumper."
      },
      {
        filename: "06 F C What Colour is the Jumper.gif",
        codePattern: "06 F C",
        question: "What color is the jumper?",
        answer: "The jumper is [color]."
      },
      {
        filename: "06 F D Do You Have A Jumper.gif",
        codePattern: "06 F D",
        question: "Do you have a jumper?",
        answer: "Yes, I have a jumper. / No, I don't have a jumper."
      },
      {
        filename: "07 F A What is It - It is A Pair of Shoes.gif",
        codePattern: "07 F A",
        question: "What is it?",
        answer: "It is a pair of shoes."
      },
      {
        filename: "07 F B are They Big or Small Shoes.gif",
        codePattern: "07 F B",
        question: "Are they big or small shoes?",
        answer: "They are big shoes. / They are small shoes."
      },
      {
        filename: "07 F C What Colour are the Shoes.gif",
        codePattern: "07 F C",
        question: "What color are the shoes?",
        answer: "The shoes are [color]."
      },
      {
        filename: "07 F D Do You Have Shoes.gif",
        codePattern: "07 F D",
        question: "Do you have shoes?",
        answer: "Yes, I have shoes. / No, I don't have shoes."
      },
      {
        filename: "08 F A What is It - It is A Dress.gif",
        codePattern: "08 F A",
        question: "What is it?",
        answer: "It is a dress."
      },
      {
        filename: "08 F B is It A Long or Short Dress.gif",
        codePattern: "08 F B",
        question: "Is it a long or short dress?",
        answer: "It is a long dress. / It is a short dress."
      },
      {
        filename: "08 F C What Colour is the Dress.gif",
        codePattern: "08 F C",
        question: "What color is the dress?",
        answer: "The dress is [color]."
      },
      {
        filename: "08 F D Do You Have A Dress.gif",
        codePattern: "08 F D",
        question: "Do you have a dress?",
        answer: "Yes, I have a dress. / No, I don't have a dress."
      }
    ];
  }

  // Book 1, Unit 16 hardcoded data based on provided content (Transport)
  if (bookId === 'book1' && unitId === 'unit16') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 K A What is It - It is A Car.gif",
        codePattern: "02 K A",
        question: "What is it?",
        answer: "It is a car."
      },
      {
        filename: "02 K B is It A Big or Small Car.gif",
        codePattern: "02 K B",
        question: "Is it a big or small car?",
        answer: "It is a big car. / It is a small car."
      },
      {
        filename: "02 K C is It A Fast or Slow Car.gif",
        codePattern: "02 K C",
        question: "Is it a fast or slow car?",
        answer: "It is a fast car. / It is a slow car."
      },
      {
        filename: "02 K D Do You Have A Car.gif",
        codePattern: "02 K D",
        question: "Do you have a car?",
        answer: "Yes, I have a car. / No, I don't have a car."
      },
      {
        filename: "03 K A What is It - It is A Bus.gif",
        codePattern: "03 K A",
        question: "What is it?",
        answer: "It is a bus."
      },
      {
        filename: "03 K B is It A Big or Small Bus.gif",
        codePattern: "03 K B",
        question: "Is it a big or small bus?",
        answer: "It is a big bus. / It is a small bus."
      },
      {
        filename: "03 K C is It A Fast or Slow Bus.gif",
        codePattern: "03 K C",
        question: "Is it a fast or slow bus?",
        answer: "It is a fast bus. / It is a slow bus."
      },
      {
        filename: "03 K D Do You Go to School by Bus.gif",
        codePattern: "03 K D",
        question: "Do you go to school by bus?",
        answer: "Yes, I go to school by bus. / No, I don't go to school by bus."
      },
      {
        filename: "04 K A What is It - It is A Train.gif",
        codePattern: "04 K A",
        question: "What is it?",
        answer: "It is a train."
      },
      {
        filename: "04 K B is It A Big or Small Train.gif",
        codePattern: "04 K B",
        question: "Is it a big or small train?",
        answer: "It is a big train. / It is a small train."
      },
      {
        filename: "04 K C is It A Fast or Slow Train.gif",
        codePattern: "04 K C",
        question: "Is it a fast or slow train?",
        answer: "It is a fast train. / It is a slow train."
      },
      {
        filename: "04 K D Do You Go on Holiday by Train.gif",
        codePattern: "04 K D",
        question: "Do you go on holiday by train?",
        answer: "Yes, I go on holiday by train. / No, I don't go on holiday by train."
      },
      {
        filename: "05 K A What is It - It is A Plane.gif",
        codePattern: "05 K A",
        question: "What is it?",
        answer: "It is a plane."
      },
      {
        filename: "05 K B is It A Big or Small Plane.gif",
        codePattern: "05 K B",
        question: "Is it a big or small plane?",
        answer: "It is a big plane. / It is a small plane."
      },
      {
        filename: "05 K C is It A Fast or Slow Plane.gif",
        codePattern: "05 K C",
        question: "Is it a fast or slow plane?",
        answer: "It is a fast plane. / It is a slow plane."
      },
      {
        filename: "05 K D Do You Go on Holiday by Plane.gif",
        codePattern: "05 K D",
        question: "Do you go on holiday by plane?",
        answer: "Yes, I go on holiday by plane. / No, I don't go on holiday by plane."
      },
      {
        filename: "06 K A What is It - It is A Ship.gif",
        codePattern: "06 K A",
        question: "What is it?",
        answer: "It is a ship."
      },
      {
        filename: "06 K B is It A Big or Small Ship.gif",
        codePattern: "06 K B",
        question: "Is it a big or small ship?",
        answer: "It is a big ship. / It is a small ship."
      },
      {
        filename: "06 K C is It A Fast or Slow Ship.gif",
        codePattern: "06 K C",
        question: "Is it a fast or slow ship?",
        answer: "It is a fast ship. / It is a slow ship."
      },
      {
        filename: "06 K D Do You Go on Holiday by Ship.gif",
        codePattern: "06 K D",
        question: "Do you go on holiday by ship?",
        answer: "Yes, I go on holiday by ship. / No, I don't go on holiday by ship."
      },
      {
        filename: "07 K A What is It - It is A Bike.gif",
        codePattern: "07 K A",
        question: "What is it?",
        answer: "It is a bike."
      },
      {
        filename: "07 K B is It A Big or Small Bike.gif",
        codePattern: "07 K B",
        question: "Is it a big or small bike?",
        answer: "It is a big bike. / It is a small bike."
      },
      {
        filename: "07 K C is It A Fast or Slow Bike.gif",
        codePattern: "07 K C",
        question: "Is it a fast or slow bike?",
        answer: "It is a fast bike. / It is a slow bike."
      },
      {
        filename: "07 K D Do You Have A Bike.gif",
        codePattern: "07 K D",
        question: "Do you have a bike?",
        answer: "Yes, I have a bike. / No, I don't have a bike."
      },
      {
        filename: "08 K A What is It - It is A Helicopter.gif",
        codePattern: "08 K A",
        question: "What is it?",
        answer: "It is a helicopter."
      },
      {
        filename: "08 K B is It A Big or Small Helicopter.gif",
        codePattern: "08 K B",
        question: "Is it a big or small helicopter?",
        answer: "It is a big helicopter. / It is a small helicopter."
      },
      {
        filename: "08 K C is It A Fast or Slow Helicopter.gif",
        codePattern: "08 K C",
        question: "Is it a fast or slow helicopter?",
        answer: "It is a fast helicopter. / It is a slow helicopter."
      },
      {
        filename: "08 K D Have You Been in A Helicopter.gif",
        codePattern: "08 K D",
        question: "Have you been in a helicopter?",
        answer: "Yes, I have been in a helicopter. / No, I haven't been in a helicopter."
      }
    ];
  }

  // Book 1, Unit 14 hardcoded data based on provided content (Animals)
  if (bookId === 'book1' && unitId === 'unit14') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 J A What is It - It is A Dog.gif",
        codePattern: "02 J A",
        question: "What is it?",
        answer: "It is a dog."
      },
      {
        filename: "02 J B is It A Big or Small Dog.gif",
        codePattern: "02 J B",
        question: "Is it a big or small dog?",
        answer: "It is a big dog. / It is a small dog."
      },
      {
        filename: "02 J C is It A Happy or Sad Dog.gif",
        codePattern: "02 J C",
        question: "Is it a happy or sad dog?",
        answer: "It is a happy dog. / It is a sad dog."
      },
      {
        filename: "02 J D Do You Have A Dog.gif",
        codePattern: "02 J D",
        question: "Do you have a dog?",
        answer: "Yes, I have a dog. / No, I don't have a dog."
      },
      {
        filename: "03 J A What is It - It is A Cat.gif",
        codePattern: "03 J A",
        question: "What is it?",
        answer: "It is a cat."
      },
      {
        filename: "03 J B is It A Big or Small Cat.gif",
        codePattern: "03 J B",
        question: "Is it a big or small cat?",
        answer: "It is a big cat. / It is a small cat."
      },
      {
        filename: "03 J C is It A Happy or Sad Cat.gif",
        codePattern: "03 J C",
        question: "Is it a happy or sad cat?",
        answer: "It is a happy cat. / It is a sad cat."
      },
      {
        filename: "03 J D Do You Have A Cat.gif",
        codePattern: "03 J D",
        question: "Do you have a cat?",
        answer: "Yes, I have a cat. / No, I don't have a cat."
      },
      {
        filename: "04 J A What is It - It is A Bird.gif",
        codePattern: "04 J A",
        question: "What is it?",
        answer: "It is a bird."
      },
      {
        filename: "04 J B is It A Big or Small Bird.gif",
        codePattern: "04 J B",
        question: "Is it a big or small bird?",
        answer: "It is a big bird. / It is a small bird."
      },
      {
        filename: "04 J C What Colour is the Bird.gif",
        codePattern: "04 J C",
        question: "What color is the bird?",
        answer: "The bird is [color]."
      },
      {
        filename: "04 J D Do You Have A Bird.gif",
        codePattern: "04 J D",
        question: "Do you have a bird?",
        answer: "Yes, I have a bird. / No, I don't have a bird."
      },
      {
        filename: "05 J A What is It - It is A Fish.gif",
        codePattern: "05 J A",
        question: "What is it?",
        answer: "It is a fish."
      },
      {
        filename: "05 J B is It A Big or Small Fish.gif",
        codePattern: "05 J B",
        question: "Is it a big or small fish?",
        answer: "It is a big fish. / It is a small fish."
      },
      {
        filename: "05 J C What Colour is the Fish.gif",
        codePattern: "05 J C",
        question: "What color is the fish?",
        answer: "The fish is [color]."
      },
      {
        filename: "05 J D Do You Have A Fish.gif",
        codePattern: "05 J D",
        question: "Do you have a fish?",
        answer: "Yes, I have a fish. / No, I don't have a fish."
      },
      {
        filename: "06 J A What is It - It is A Rabbit.gif",
        codePattern: "06 J A",
        question: "What is it?",
        answer: "It is a rabbit."
      },
      {
        filename: "06 J B is It A Big or Small Rabbit.gif",
        codePattern: "06 J B",
        question: "Is it a big or small rabbit?",
        answer: "It is a big rabbit. / It is a small rabbit."
      },
      {
        filename: "06 J C What Colour is the Rabbit.gif",
        codePattern: "06 J C",
        question: "What color is the rabbit?",
        answer: "The rabbit is [color]."
      },
      {
        filename: "06 J D Do You Have A Rabbit.gif",
        codePattern: "06 J D",
        question: "Do you have a rabbit?",
        answer: "Yes, I have a rabbit. / No, I don't have a rabbit."
      },
      {
        filename: "07 J A What is It - It is A Hamster.gif",
        codePattern: "07 J A",
        question: "What is it?",
        answer: "It is a hamster."
      },
      {
        filename: "07 J B is It A Big or Small Hamster.gif",
        codePattern: "07 J B",
        question: "Is it a big or small hamster?",
        answer: "It is a big hamster. / It is a small hamster."
      },
      {
        filename: "07 J C What Colour is the Hamster.gif",
        codePattern: "07 J C",
        question: "What color is the hamster?",
        answer: "The hamster is [color]."
      },
      {
        filename: "07 J D Do You Have A Hamster.gif",
        codePattern: "07 J D",
        question: "Do you have a hamster?",
        answer: "Yes, I have a hamster. / No, I don't have a hamster."
      },
      {
        filename: "08 J A What is It - It is A Horse.gif",
        codePattern: "08 J A",
        question: "What is it?",
        answer: "It is a horse."
      },
      {
        filename: "08 J B is It A Big or Small Horse.gif",
        codePattern: "08 J B",
        question: "Is it a big or small horse?",
        answer: "It is a big horse. / It is a small horse."
      },
      {
        filename: "08 J C What Colour is the Horse.gif",
        codePattern: "08 J C",
        question: "What color is the horse?",
        answer: "The horse is [color]."
      },
      {
        filename: "08 J D Do You Have A Horse.gif",
        codePattern: "08 J D",
        question: "Do you have a horse?",
        answer: "Yes, I have a horse. / No, I don't have a horse."
      }
    ];
  }

  // Book 1, Unit 13 hardcoded data based on provided content (Food)
  if (bookId === 'book1' && unitId === 'unit13') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 G A What is It - It is An Apple.gif",
        codePattern: "02 G A",
        question: "What is it?",
        answer: "It is an apple."
      },
      {
        filename: "02 G B is It A Big or Small Apple.gif",
        codePattern: "02 G B",
        question: "Is it a big or small apple?",
        answer: "It is a big apple. / It is a small apple."
      },
      {
        filename: "02 G C is It A Red or Green Apple.gif",
        codePattern: "02 G C",
        question: "Is it a red or green apple?",
        answer: "It is a red apple. / It is a green apple."
      },
      {
        filename: "02 G D Do You Like Apples.gif",
        codePattern: "02 G D",
        question: "Do you like apples?",
        answer: "Yes, I like apples. / No, I don't like apples."
      },
      {
        filename: "03 G A What is It - It is A Banana.gif",
        codePattern: "03 G A",
        question: "What is it?",
        answer: "It is a banana."
      },
      {
        filename: "03 G B is It A Big or Small Banana.gif",
        codePattern: "03 G B",
        question: "Is it a big or small banana?",
        answer: "It is a big banana. / It is a small banana."
      },
      {
        filename: "03 G C is It A Yellow or Green Banana.gif",
        codePattern: "03 G C",
        question: "Is it a yellow or green banana?",
        answer: "It is a yellow banana. / It is a green banana."
      },
      {
        filename: "03 G D Do You Like Bananas.gif",
        codePattern: "03 G D",
        question: "Do you like bananas?",
        answer: "Yes, I like bananas. / No, I don't like bananas."
      },
      {
        filename: "04 G A What is It - It is A Strawberry.gif",
        codePattern: "04 G A",
        question: "What is it?",
        answer: "It is a strawberry."
      },
      {
        filename: "04 G B is It A Big or Small Strawberry.gif",
        codePattern: "04 G B",
        question: "Is it a big or small strawberry?",
        answer: "It is a big strawberry. / It is a small strawberry."
      },
      {
        filename: "04 G C is It A Red or Green Strawberry.gif",
        codePattern: "04 G C",
        question: "Is it a red or green strawberry?",
        answer: "It is a red strawberry. / It is a green strawberry."
      },
      {
        filename: "04 G D Do You Like Strawberries.gif",
        codePattern: "04 G D",
        question: "Do you like strawberries?",
        answer: "Yes, I like strawberries. / No, I don't like strawberries."
      },
      {
        filename: "05 G A What is It - It is A Watermelon.gif",
        codePattern: "05 G A",
        question: "What is it?",
        answer: "It is a watermelon."
      },
      {
        filename: "05 G B is It A Big or Small Watermelon.gif",
        codePattern: "05 G B",
        question: "Is it a big or small watermelon?",
        answer: "It is a big watermelon. / It is a small watermelon."
      },
      {
        filename: "05 G C What Colour is the Watermelon.gif",
        codePattern: "05 G C",
        question: "What color is the watermelon?",
        answer: "The watermelon is green on the outside and red on the inside."
      },
      {
        filename: "05 G D Do You Like Watermelon.gif",
        codePattern: "05 G D",
        question: "Do you like watermelon?",
        answer: "Yes, I like watermelon. / No, I don't like watermelon."
      },
      {
        filename: "06 G A What is It - It is Pizza.gif",
        codePattern: "06 G A",
        question: "What is it?",
        answer: "It is pizza."
      },
      {
        filename: "06 G B is It A Big or Small Pizza.gif",
        codePattern: "06 G B",
        question: "Is it a big or small pizza?",
        answer: "It is a big pizza. / It is a small pizza."
      },
      {
        filename: "06 G C is It A Hot or Cold Pizza.gif",
        codePattern: "06 G C",
        question: "Is it a hot or cold pizza?",
        answer: "It is a hot pizza. / It is a cold pizza."
      },
      {
        filename: "06 G D Do You Like Pizza.gif",
        codePattern: "06 G D",
        question: "Do you like pizza?",
        answer: "Yes, I like pizza. / No, I don't like pizza."
      },
      {
        filename: "07 G A What is It - It is Ice Cream.gif",
        codePattern: "07 G A",
        question: "What is it?",
        answer: "It is ice cream."
      },
      {
        filename: "07 G B is It A Chocolate or Vanilla Ice Cream.gif",
        codePattern: "07 G B",
        question: "Is it chocolate or vanilla ice cream?",
        answer: "It is chocolate ice cream. / It is vanilla ice cream."
      },
      {
        filename: "07 G C is It A Hot or Cold Ice Cream.gif",
        codePattern: "07 G C",
        question: "Is it hot or cold ice cream?",
        answer: "It is cold ice cream."
      },
      {
        filename: "07 G D Do You Like Ice Cream.gif",
        codePattern: "07 G D",
        question: "Do you like ice cream?",
        answer: "Yes, I like ice cream. / No, I don't like ice cream."
      },
      {
        filename: "08 G A What is It - It is A Cookie.gif",
        codePattern: "08 G A",
        question: "What is it?",
        answer: "It is a cookie."
      },
      {
        filename: "08 G B is It A Chocolate or Vanilla Cookie.gif",
        codePattern: "08 G B",
        question: "Is it a chocolate or vanilla cookie?",
        answer: "It is a chocolate cookie. / It is a vanilla cookie."
      },
      {
        filename: "08 G C is It A Big or Small Cookie.gif",
        codePattern: "08 G C",
        question: "Is it a big or small cookie?",
        answer: "It is a big cookie. / It is a small cookie."
      },
      {
        filename: "08 G D Do You Like Cookies.gif",
        codePattern: "08 G D",
        question: "Do you like cookies?",
        answer: "Yes, I like cookies. / No, I don't like cookies."
      }
    ];
  }
  
  // Book 1, Unit 12 hardcoded data based on provided content (Toys)
  if (bookId === 'book1' && unitId === 'unit12') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 H A What is It - It is A Car.gif",
        codePattern: "02 H A",
        question: "What is it?",
        answer: "It is a car."
      },
      {
        filename: "02 H B is It A Big or Small Car.gif",
        codePattern: "02 H B",
        question: "Is it a big or small car?",
        answer: "It is a big car. / It is a small car."
      },
      {
        filename: "02 H C is It A Fast or Slow Car.gif",
        codePattern: "02 H C",
        question: "Is it a fast or slow car?",
        answer: "It is a fast car. / It is a slow car."
      },
      {
        filename: "02 H D Do You Have A Car.gif",
        codePattern: "02 H D",
        question: "Do you have a car?",
        answer: "Yes, I have a car. / No, I don't have a car."
      },
      {
        filename: "03 H A What is It - It is A Doll.gif",
        codePattern: "03 H A",
        question: "What is it?",
        answer: "It is a doll."
      },
      {
        filename: "03 H B is It A Big or Small Doll.gif",
        codePattern: "03 H B",
        question: "Is it a big or small doll?",
        answer: "It is a big doll. / It is a small doll."
      },
      {
        filename: "03 H C is It A Boy or Girl Doll.gif",
        codePattern: "03 H C",
        question: "Is it a boy or girl doll?",
        answer: "It is a boy doll. / It is a girl doll."
      },
      {
        filename: "03 H D Do You Have A Doll.gif",
        codePattern: "03 H D",
        question: "Do you have a doll?",
        answer: "Yes, I have a doll. / No, I don't have a doll."
      },
      {
        filename: "04 H A What is It - It is A Ball.gif",
        codePattern: "04 H A",
        question: "What is it?",
        answer: "It is a ball."
      },
      {
        filename: "04 H B is It A Big or Small Ball.gif",
        codePattern: "04 H B",
        question: "Is it a big or small ball?",
        answer: "It is a big ball. / It is a small ball."
      },
      {
        filename: "04 H C What Colour is the Ball.gif",
        codePattern: "04 H C",
        question: "What color is the ball?",
        answer: "The ball is [color]."
      },
      {
        filename: "04 H D Do You Have A Ball.gif",
        codePattern: "04 H D",
        question: "Do you have a ball?",
        answer: "Yes, I have a ball. / No, I don't have a ball."
      },
      {
        filename: "05 H A What is It - It is A Teddy Bear.gif",
        codePattern: "05 H A",
        question: "What is it?",
        answer: "It is a teddy bear."
      },
      {
        filename: "05 H B is It A Big or Small Teddy Bear.gif",
        codePattern: "05 H B",
        question: "Is it a big or small teddy bear?",
        answer: "It is a big teddy bear. / It is a small teddy bear."
      },
      {
        filename: "05 H C What Colour is the Teddy Bear.gif",
        codePattern: "05 H C",
        question: "What color is the teddy bear?",
        answer: "The teddy bear is [color]."
      },
      {
        filename: "05 H D Do You Have A Teddy Bear.gif",
        codePattern: "05 H D",
        question: "Do you have a teddy bear?",
        answer: "Yes, I have a teddy bear. / No, I don't have a teddy bear."
      },
      {
        filename: "06 H A What is It - It is A Plane.gif",
        codePattern: "06 H A",
        question: "What is it?",
        answer: "It is a plane."
      },
      {
        filename: "06 H B is It A Big or Small Plane.gif",
        codePattern: "06 H B",
        question: "Is it a big or small plane?",
        answer: "It is a big plane. / It is a small plane."
      },
      {
        filename: "06 H C What Colour is the Plane.gif",
        codePattern: "06 H C",
        question: "What color is the plane?",
        answer: "The plane is [color]."
      },
      {
        filename: "06 H D Do You Have A Plane.gif",
        codePattern: "06 H D",
        question: "Do you have a plane?",
        answer: "Yes, I have a plane. / No, I don't have a plane."
      },
      {
        filename: "07 H A What is It - It is A Robot.gif",
        codePattern: "07 H A",
        question: "What is it?",
        answer: "It is a robot."
      },
      {
        filename: "07 H B is It A Big or Small Robot.gif",
        codePattern: "07 H B",
        question: "Is it a big or small robot?",
        answer: "It is a big robot. / It is a small robot."
      },
      {
        filename: "07 H C What Colour is the Robot.gif",
        codePattern: "07 H C",
        question: "What color is the robot?",
        answer: "The robot is [color]."
      },
      {
        filename: "07 H D Do You Have A Robot.gif",
        codePattern: "07 H D",
        question: "Do you have a robot?",
        answer: "Yes, I have a robot. / No, I don't have a robot."
      },
      {
        filename: "08 H A What is It - It is A Train.gif",
        codePattern: "08 H A",
        question: "What is it?",
        answer: "It is a train."
      },
      {
        filename: "08 H B is It A Big or Small Train.gif",
        codePattern: "08 H B",
        question: "Is it a big or small train?",
        answer: "It is a big train. / It is a small train."
      },
      {
        filename: "08 H C What Colour is the Train.gif",
        codePattern: "08 H C",
        question: "What color is the train?",
        answer: "The train is [color]."
      },
      {
        filename: "08 H D Do You Have A Train.gif",
        codePattern: "08 H D",
        question: "Do you have a train?",
        answer: "Yes, I have a train. / No, I don't have a train."
      }
    ];
  }
  
  // Book 1, Unit 4 hardcoded data based on provided content (Family)
  if (bookId === 'book1' && unitId === 'unit4') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 N A Who is He – He is A Father.gif",
        codePattern: "02 N A",
        question: "Who is he?",
        answer: "He is a father."
      },
      {
        filename: "02 N B is He Happy or Sad.gif",
        codePattern: "02 N B",
        question: "Is he happy or sad?",
        answer: "He is happy. / He is sad."
      },
      {
        filename: "02 N C is He Angry or Happy.gif",
        codePattern: "02 N C",
        question: "Is he angry or happy?",
        answer: "He is angry. / He is happy."
      },
      {
        filename: "02 N D is Dad Tired or Scared.gif",
        codePattern: "02 N D",
        question: "Is dad tired or scared?",
        answer: "Dad is tired. / Dad is scared."
      },
      {
        filename: "03 N A Who is He – He is A Mother.gif",
        codePattern: "03 N A",
        question: "Who is he?",
        answer: "He is a mother."
      },
      {
        filename: "03 N B is She Happy or Sad.gif",
        codePattern: "03 N B",
        question: "Is she happy or sad?",
        answer: "She is happy. / She is sad."
      },
      {
        filename: "03 N C is Mum A Man or A Woman.gif",
        codePattern: "03 N C",
        question: "Is mum a man or a woman?",
        answer: "Mum is a woman."
      },
      {
        filename: "03 N D is She A Happy or Sad Mother.gif",
        codePattern: "03 N D",
        question: "Is she a happy or sad mother?",
        answer: "She is a happy mother. / She is a sad mother."
      },
      {
        filename: "04 N A Who is He – He is A Baby.gif",
        codePattern: "04 N A",
        question: "Who is he?",
        answer: "He is a baby."
      },
      {
        filename: "04 N B is the Baby Happy or Sad.gif",
        codePattern: "04 N B",
        question: "Is the baby happy or sad?",
        answer: "The baby is happy. / The baby is sad."
      },
      {
        filename: "04 N C is the Baby A Boy or A Girl.gif",
        codePattern: "04 N C",
        question: "Is the baby a boy or a girl?",
        answer: "The baby is a boy. / The baby is a girl."
      },
      {
        filename: "04 N D is the Baby Sleeping or Crying.gif",
        codePattern: "04 N D",
        question: "Is the baby sleeping or crying?",
        answer: "The baby is sleeping. / The baby is crying."
      },
      {
        filename: "05 N A Who are They – They are A Family.gif",
        codePattern: "05 N A",
        question: "Who are they?",
        answer: "They are a family."
      },
      {
        filename: "05 N B is It A Big or Small Family.gif",
        codePattern: "05 N B",
        question: "Is it a big or small family?",
        answer: "It is a big family. / It is a small family."
      },
      {
        filename: "05 N C is It A Happy or Sad Family.gif",
        codePattern: "05 N C",
        question: "Is it a happy or sad family?",
        answer: "It is a happy family. / It is a sad family."
      },
      {
        filename: "05 N D How Many People are There in the Family.gif",
        codePattern: "05 N D",
        question: "How many people are there in the family?",
        answer: "There are [number] people in the family."
      },
      {
        filename: "06 N A is Grandma A Man or A Woman.gif",
        codePattern: "06 N A",
        question: "Is grandma a man or a woman?",
        answer: "Grandma is a woman."
      },
      {
        filename: "06 N B is Grandpa A Man or A Woman.gif",
        codePattern: "06 N B",
        question: "Is grandpa a man or a woman?",
        answer: "Grandpa is a man."
      },
      {
        filename: "06 N C is Grandma Young or Old.gif",
        codePattern: "06 N C",
        question: "Is grandma young or old?",
        answer: "Grandma is young. / Grandma is old."
      },
      {
        filename: "06 N D is Grandpa Young or Old.gif",
        codePattern: "06 N D",
        question: "Is grandpa young or old?",
        answer: "Grandpa is young. / Grandpa is old."
      },
      {
        filename: "07 N A is Uncle A Man or A Woman.gif",
        codePattern: "07 N A",
        question: "Is uncle a man or a woman?",
        answer: "Uncle is a man."
      },
      {
        filename: "07 N B is Aunt A Man or A Woman.gif",
        codePattern: "07 N B",
        question: "Is aunt a man or a woman?",
        answer: "Aunt is a woman."
      },
      {
        filename: "07 N C is Uncle Young or Old.gif",
        codePattern: "07 N C",
        question: "Is uncle young or old?",
        answer: "Uncle is young. / Uncle is old."
      },
      {
        filename: "07 N D is Aunt Young or Old.gif",
        codePattern: "07 N D",
        question: "Is aunt young or old?",
        answer: "Aunt is young. / Aunt is old."
      },
      {
        filename: "08 B A What is Brother.gif",
        codePattern: "08 B A",
        question: "What is a brother?",
        answer: "A brother is a boy in a family."
      },
      {
        filename: "08 B C What is Sister.gif",
        codePattern: "08 B C",
        question: "What is a sister?",
        answer: "A sister is a girl in a family."
      },
      {
        filename: "09 C A Do You Have A Brother.gif",
        codePattern: "09 C A",
        question: "Do you have a brother?",
        answer: "Yes, I have a brother. / No, I don't have a brother."
      },
      {
        filename: "09 C B Do You Have A Sister.gif",
        codePattern: "09 C B",
        question: "Do you have a sister?",
        answer: "Yes, I have a sister. / No, I don't have a sister."
      },
      {
        filename: "10 B A is the Boy Happy or Sad.gif",
        codePattern: "10 B A",
        question: "Is the boy happy or sad?",
        answer: "The boy is happy. / The boy is sad."
      }
    ];
  }
  
  // Book 1, Unit 2 hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit2') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      // Pen category - pattern E
      {
        filename: "01 E A What is It – It is A Pen.gif",
        codePattern: "01 E A",
        question: "What is it?",
        answer: "It is a pen."
      },
      {
        filename: "01 E B What are They – They are Pens.gif",
        codePattern: "01 E B",
        question: "What are they?",
        answer: "They are pens."
      },
      {
        filename: "01 E C is It A Girl or A Boy Pen.gif",
        codePattern: "01 E C",
        question: "Is it a girl or boy pen?",
        answer: "It is a girl pen. / It is a boy pen."
      },
      {
        filename: "01 E D is It A Dog or A Cat Pen.jpg",
        codePattern: "01 E D",
        question: "Is it a dog or cat pen?",
        answer: "It is a dog pen. / It is a cat pen."
      },
      {
        filename: "01 E F is It A Hotdog or A Hamburger Pen.png",
        codePattern: "01 E F",
        question: "Is it a hotdog or hamburger pen?",
        answer: "It is a hotdog pen. / It is a hamburger pen."
      },
      {
        filename: "01 E F is It A Lion or Tiger Pen.png",
        codePattern: "01 E F",
        question: "Is it a lion or tiger pen?",
        answer: "It is a lion pen. / It is a tiger pen."
      },
      {
        filename: "01 E G Do You Have A Pen in Your Pencil Case.gif",
        codePattern: "01 E G",
        question: "Do you have a pen in your pencil case?",
        answer: "Yes, I have a pen in my pencil case. / No, I don't have a pen in my pencil case."
      },
      {
        filename: "01 E H Do You Have A Blue Pen.gif",
        codePattern: "01 E H",
        question: "Do you have a blue pen?",
        answer: "Yes, I have a blue pen. / No, I don't have a blue pen."
      },
      {
        filename: "01 E I Do You Have A Black Pen.gif",
        codePattern: "01 E I",
        question: "Do you have a black pen?",
        answer: "Yes, I have a black pen. / No, I don't have a black pen."
      },
      {
        filename: "01 E J Do You Have A Lego Pen.png",
        codePattern: "01 E J",
        question: "Do you have a Lego pen?",
        answer: "Yes, I have a Lego pen. / No, I don't have a Lego pen."
      },
      {
        filename: "01 E K What Colour is the Pen – Blue.gif",
        codePattern: "01 E K",
        question: "What color is the pen?",
        answer: "The pen is blue."
      },
      {
        filename: "01 E L What Colour are the Pens.gif",
        codePattern: "01 E L",
        question: "What color are the pens?",
        answer: "The pens are [color]."
      },
      {
        filename: "01 E M How Many Pens are There – 4 Pens.gif",
        codePattern: "01 E M",
        question: "How many pens are there?",
        answer: "There are 4 pens."
      },
      {
        filename: "02 N A What is It – It is A Pencil (2).gif",
        codePattern: "02 N A",
        question: "What is it?",
        answer: "It is a pencil."
      },
      {
        filename: "02 N B What are They – They are Pencils.gif",
        codePattern: "02 N B",
        question: "What are they?",
        answer: "They are pencils."
      },
      {
        filename: "02 N C is It A Dog or A Cat Pencil.gif",
        codePattern: "02 N C",
        question: "Is it a dog or cat pencil?",
        answer: "It is a dog pencil. / It is a cat pencil."
      },
      {
        filename: "02 N D is It A Happy or A Sad Pencil.gif",
        codePattern: "02 N D",
        question: "Is it a happy or sad pencil?",
        answer: "It is a happy pencil. / It is a sad pencil."
      },
      {
        filename: "02 N E is It A Small or Big Pencil.jpg",
        codePattern: "02 N E",
        question: "Is it a small or big pencil?",
        answer: "It is a small pencil. / It is a big pencil."
      },
      {
        filename: "02 N F is It A Red or Black Pencil.gif",
        codePattern: "02 N F",
        question: "Is it a red or black pencil?",
        answer: "It is a red pencil. / It is a black pencil."
      },
      {
        filename: "02 N G is It A Small or Big Pencil.jpg",
        codePattern: "02 N G",
        question: "Is it a small or big pencil?",
        answer: "It is a small pencil. / It is a big pencil."
      },
      {
        filename: "02 N H Do You Have A Pencil in Your Pencil Case.gif",
        codePattern: "02 N H",
        question: "Do you have a pencil in your pencil case?",
        answer: "Yes, I have a pencil in my pencil case. / No, I don't have a pencil in my pencil case."
      },
      {
        filename: "02 N I Do You Have Glitter Pencils.gif",
        codePattern: "02 N I",
        question: "Do you have glitter pencils?",
        answer: "Yes, I have glitter pencils. / No, I don't have glitter pencils."
      },
      {
        filename: "02 N J Do You Have A Lego Pencil.gif",
        codePattern: "02 N J",
        question: "Do you have a Lego pencil?",
        answer: "Yes, I have a Lego pencil. / No, I don't have a Lego pencil."
      },
      {
        filename: "02 N K Do You Have A Yellow Pencil.gif",
        codePattern: "02 N K",
        question: "Do you have a yellow pencil?",
        answer: "Yes, I have a yellow pencil. / No, I don't have a yellow pencil."
      },
      {
        filename: "02 N L Do You Have A Rainbow Pencil.gif",
        codePattern: "02 N L",
        question: "Do you have a rainbow pencil?",
        answer: "Yes, I have a rainbow pencil. / No, I don't have a rainbow pencil."
      },
      {
        filename: "02 N M How Many Pencils are There – 4 Pencils.gif",
        codePattern: "02 N M",
        question: "How many pencils are there?",
        answer: "There are 4 pencils."
      },
      {
        filename: "03 N A What is It – It is A Crayon.gif",
        codePattern: "03 N A",
        question: "What is it?",
        answer: "It is a crayon."
      },
      {
        filename: "03 N B What are They – They are Crayons- Colour Pencils.gif",
        codePattern: "03 N B",
        question: "What are they?",
        answer: "They are crayons."
      },
      {
        filename: "03 N C are They Big or Small Crayons.gif",
        codePattern: "03 N C",
        question: "Are they big or small crayons?",
        answer: "They are big crayons. / They are small crayons."
      },
      {
        filename: "03 N D is It A Big or Small Crayon.jpg",
        codePattern: "03 N D",
        question: "Is it a big or small crayon?",
        answer: "It is a big crayon. / It is a small crayon."
      },
      {
        filename: "03 N E What is in the Red Box – Crayons.gif",
        codePattern: "03 N E",
        question: "What is in the red box?",
        answer: "There are crayons in the red box."
      },
      {
        filename: "03 N F Do You Have Glitter Crayons.jpg",
        codePattern: "03 N F",
        question: "Do you have glitter crayons?",
        answer: "Yes, I have glitter crayons. / No, I don't have glitter crayons."
      },
      {
        filename: "03 N G Do You Have Crayons.gif",
        codePattern: "03 N G",
        question: "Do you have crayons?",
        answer: "Yes, I have crayons. / No, I don't have crayons."
      },
      {
        filename: "03 N H How Many Crayons are There – 3 Crayons.gif",
        codePattern: "03 N H",
        question: "How many crayons are there?",
        answer: "There are 3 crayons."
      },
      {
        filename: "03 N I How Many Crayons are There – 2 Crayons.png",
        codePattern: "03 N I",
        question: "How many crayons are there?",
        answer: "There are 2 crayons."
      },
      {
        filename: "03 N J What Colour is the Crayon – Green.gif",
        codePattern: "03 N J",
        question: "What color is the crayon?",
        answer: "The crayon is green."
      },
      {
        filename: "03 N K What Colour is the Crayon – Red.gif",
        codePattern: "03 N K",
        question: "What color is the crayon?",
        answer: "The crayon is red."
      },
      {
        filename: "03 N L What Colour is the Crayon – Pink.gif",
        codePattern: "03 N L",
        question: "What color is the crayon?",
        answer: "The crayon is pink."
      },
      {
        filename: "03 N M What Colour are the Crayons.gif",
        codePattern: "03 N M",
        question: "What color are the crayons?",
        answer: "The crayons are [color]."
      },
      {
        filename: "04 N A What is It – It is A Book.gif",
        codePattern: "04 N A",
        question: "What is it?",
        answer: "It is a book."
      },
      {
        filename: "04 N B What are They – They are Books.gif",
        codePattern: "04 N B",
        question: "What are they?",
        answer: "They are books."
      },
      {
        filename: "04 N C is It A Normal or Telephone Book.gif",
        codePattern: "04 N C",
        question: "Is it a normal or telephone book?",
        answer: "It is a normal book. / It is a telephone book."
      },
      {
        filename: "04 N D is It A Big or Small Book.gif",
        codePattern: "04 N D",
        question: "Is it a big or small book?",
        answer: "It is a big book. / It is a small book."
      },
      {
        filename: "04 N E is It an Open or Closed Book.gif",
        codePattern: "04 N E",
        question: "Is it an open or closed book?",
        answer: "It is an open book. / It is a closed book."
      },
      {
        filename: "04 N F is It A Big or Small Book.jpg",
        codePattern: "04 N F",
        question: "Is it a big or small book?",
        answer: "It is a big book. / It is a small book."
      },
      {
        filename: "04 N G is It A Big or Small Book.jpg",
        codePattern: "04 N G",
        question: "Is it a big or small book?",
        answer: "It is a big book. / It is a small book."
      },
      {
        filename: "04 N H Do You Have A Book in Your Bag.gif",
        codePattern: "04 N H",
        question: "Do you have a book in your bag?",
        answer: "Yes, I have a book in my bag. / No, I don't have a book in my bag."
      },
      {
        filename: "04 N I How Many Books are There – 7 Books.gif",
        codePattern: "04 N I",
        question: "How many books are there?",
        answer: "There are 7 books."
      },
      {
        filename: "04 N J What Colour is the Book – Red.gif",
        codePattern: "04 N J",
        question: "What color is the book?",
        answer: "The book is red."
      },
      {
        filename: "04 N K What Colour is the Book – Blue.gif",
        codePattern: "04 N K",
        question: "What color is the book?",
        answer: "The book is blue."
      },
      {
        filename: "04 N L What Colour is the Book – Pink.gif",
        codePattern: "04 N L",
        question: "What color is the book?",
        answer: "The book is pink."
      },
      {
        filename: "04 N M What Colour is the Book – White.gif",
        codePattern: "04 N M",
        question: "What color is the book?",
        answer: "The book is white."
      },
      // Section 5 - Notebook (pattern B)
      {
        filename: "05 B A What is It – It is A Notebook.gif",
        codePattern: "05 B A",
        question: "What is it?",
        answer: "It is a notebook."
      },
      {
        filename: "05 B C is It A Banana or an Apple Book.jpg",
        codePattern: "05 B C",
        question: "Is it a banana or apple book?",
        answer: "It is a banana book. / It is an apple book."
      },
      {
        filename: "05 B D is It A Girl's or Boy's Notebook.jpg",
        codePattern: "05 B D",
        question: "Is it a girl's or boy's notebook?",
        answer: "It is a girl's notebook. / It is a boy's notebook."
      },
      {
        filename: "05 B D is It an Open or Closed Notebook.gif",
        codePattern: "05 B D",
        question: "Is it an open or closed notebook?",
        answer: "It is an open notebook. / It is a closed notebook."
      },
      {
        filename: "05 B E is It A Girl's or Boy's Notebook.jpg",
        codePattern: "05 B E",
        question: "Is it a girl's or boy's notebook?",
        answer: "It is a girl's notebook. / It is a boy's notebook."
      },
      {
        filename: "05 B F is It A Lion or Crocodile Notebook.jpg",
        codePattern: "05 B F",
        question: "Is it a lion or crocodile notebook?",
        answer: "It is a lion notebook. / It is a crocodile notebook."
      },
      {
        filename: "05 B G is It A Pizza or A Hamburger Notebook.gif",
        codePattern: "05 B G",
        question: "Is it a pizza or hamburger notebook?",
        answer: "It is a pizza notebook. / It is a hamburger notebook."
      },
      {
        filename: "05 B H Do You Have A Notebook in Your Bag.gif",
        codePattern: "05 B H",
        question: "Do you have a notebook in your bag?",
        answer: "Yes, I have a notebook in my bag. / No, I don't have a notebook in my bag."
      },
      {
        filename: "05 B I Do You Have an Elmo Notebook.gif",
        codePattern: "05 B I",
        question: "Do you have an Elmo notebook?",
        answer: "Yes, I have an Elmo notebook. / No, I don't have an Elmo notebook."
      },
      {
        filename: "05 B J Do You Have A Unicorn Notebook.jpg",
        codePattern: "05 B J",
        question: "Do you have a unicorn notebook?",
        answer: "Yes, I have a unicorn notebook. / No, I don't have a unicorn notebook."
      },
      {
        filename: "05 B K Do You Have an English Notebook.jpg",
        codePattern: "05 B K",
        question: "Do you have an English notebook?",
        answer: "Yes, I have an English notebook. / No, I don't have an English notebook."
      },
      {
        filename: "05 B L What Colour is the Notebook – It is Grey.gif",
        codePattern: "05 B L",
        question: "What color is the notebook?",
        answer: "The notebook is grey."
      },
      {
        filename: "05 B M Do You Have A Maths Notebook.jpg",
        codePattern: "05 B M",
        question: "Do you have a maths notebook?",
        answer: "Yes, I have a maths notebook. / No, I don't have a maths notebook."
      },
      // Section 6 - Glue (pattern K)
      {
        filename: "06 K A What is It – It is Glue.gif",
        codePattern: "06 K A",
        question: "What is it?",
        answer: "It is glue."
      },
      {
        filename: "06 K B What are They – They are Glue Sticks.gif",
        codePattern: "06 K B",
        question: "What are they?",
        answer: "They are glue sticks."
      },
      {
        filename: "06 K C Do You Prefer White Glue or A Glues Stick.jpg",
        codePattern: "06 K C",
        question: "Do you prefer white glue or a glue stick?",
        answer: "I prefer white glue. / I prefer a glue stick."
      },
      {
        filename: "06 K D Do You Have Glue in Your Pencil Case.gif",
        codePattern: "06 K D",
        question: "Do you have glue in your pencil case?",
        answer: "Yes, I have glue in my pencil case. / No, I don't have glue in my pencil case."
      },
      {
        filename: "06 K E Do You Have Glitter Glue.jpg",
        codePattern: "06 K E",
        question: "Do you have glitter glue?",
        answer: "Yes, I have glitter glue. / No, I don't have glitter glue."
      },
      {
        filename: "06 K F Do You Have White Glue.gif",
        codePattern: "06 K F",
        question: "Do you have white glue?",
        answer: "Yes, I have white glue. / No, I don't have white glue."
      },
      {
        filename: "06 K G Do You Have A Glue Gun.gif",
        codePattern: "06 K G",
        question: "Do you have a glue gun?",
        answer: "Yes, I have a glue gun. / No, I don't have a glue gun."
      },
      {
        filename: "06 K H Do You Have A Glue Stick.gif",
        codePattern: "06 K H",
        question: "Do you have a glue stick?",
        answer: "Yes, I have a glue stick. / No, I don't have a glue stick."
      },
      {
        filename: "06 K I What Colour is the Glue – White.gif",
        codePattern: "06 K I",
        question: "What color is the glue?",
        answer: "The glue is white."
      },
      {
        filename: "06 K J What Colour is the Glue – Blue.gif",
        codePattern: "06 K J",
        question: "What color is the glue?",
        answer: "The glue is blue."
      },
      {
        filename: "06 K L is It Glue or Ketchup.gif",
        codePattern: "06 K L",
        question: "Is it glue or ketchup?",
        answer: "It is glue. / It is ketchup."
      },
      {
        filename: "06 K L is It Normal or Slime Glue.jpg",
        codePattern: "06 K L",
        question: "Is it normal or slime glue?",
        answer: "It is normal glue. / It is slime glue."
      },
      {
        filename: "06 K M How Many Glue Sticks are There – There are 8.gif",
        codePattern: "06 K M",
        question: "How many glue sticks are there?",
        answer: "There are 8 glue sticks."
      },
      // Section 7 - Eraser (pattern N)
      {
        filename: "07 N A What is It – It is an Eraser.gif",
        codePattern: "07 N A",
        question: "What is it?",
        answer: "It is an eraser."
      },
      
      // Section 9 - School Bag (pattern N)
      {
        filename: "09 N A What is It – It is A School Bag.gif",
        codePattern: "09 N A",
        question: "What is it?",
        answer: "It is a school bag."
      },
      {
        filename: "09 N B What School Bag Do You Like.gif",
        codePattern: "09 N B",
        question: "What school bag do you like?",
        answer: "I like the [color/pattern] school bag."
      },
      {
        filename: "09 N C Do You Have A School Bag.gif",
        codePattern: "09 N C",
        question: "Do you have a school bag?",
        answer: "Yes, I have a school bag. / No, I don't have a school bag."
      },
      {
        filename: "09 N D is It A Backpack or Shoulder Bag.gif",
        codePattern: "09 N D", 
        question: "Is it a backpack or shoulder bag?",
        answer: "It is a backpack. / It is a shoulder bag."
      },
      {
        filename: "09 N E is It A Tiger or A Lion School Bag.gif",
        codePattern: "09 N E",
        question: "Is it a tiger or lion school bag?",
        answer: "It is a tiger school bag. / It is a lion school bag."
      },
      {
        filename: "07 N B What Colour is the Eraser.gif",
        codePattern: "07 N B",
        question: "What color is the eraser?",
        answer: "The eraser is [color]."
      },
      {
        filename: "07 N C is It A Cat or Dog Eraser.jpg",
        codePattern: "07 N C",
        question: "Is it a cat or dog eraser?",
        answer: "It is a cat eraser. / It is a dog eraser."
      },
      {
        filename: "07 N D is It A Cat or Dog Eraser.jpg",
        codePattern: "07 N D",
        question: "Is it a cat or dog eraser?",
        answer: "It is a cat eraser. / It is a dog eraser."
      },
      {
        filename: "07 N E is It A Big or Small Eraser.gif",
        codePattern: "07 N E",
        question: "Is it a big or small eraser?",
        answer: "It is a big eraser. / It is a small eraser."
      },
      {
        filename: "07 N F is It A Happy or Sad Eraser.gif",
        codePattern: "07 N F",
        question: "Is it a happy or sad eraser?",
        answer: "It is a happy eraser. / It is a sad eraser."
      },
      {
        filename: "07 N G Do You Have an Eraser in Your Pencil Case.gif",
        codePattern: "07 N G",
        question: "Do you have an eraser in your pencil case?",
        answer: "Yes, I have an eraser in my pencil case. / No, I don't have an eraser in my pencil case."
      },
      {
        filename: "07 N H is It an Icecream or Cake Eraser.jpg",
        codePattern: "07 N H",
        question: "Is it an ice cream or cake eraser?",
        answer: "It is an ice cream eraser. / It is a cake eraser."
      },
      {
        filename: "07 N I What Colour are the Erasers.gif",
        codePattern: "07 N I",
        question: "What color are the erasers?",
        answer: "The erasers are [color]."
      },
      {
        filename: "07 N J is It A Man or Woman Eraser.jpg",
        codePattern: "07 N J",
        question: "Is it a man or woman eraser?",
        answer: "It is a man eraser. / It is a woman eraser."
      }
    ];
  }
  
  // Book 1, Unit 3 hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit3') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 N A is the Dog Happy or Sad.gif",
        codePattern: "02 N A",
        question: "Is the dog happy or sad?",
        answer: "The dog is happy. / The dog is sad."
      },
      {
        filename: "02 N B is the Baby Happy or Sad.gif",
        codePattern: "02 N B",
        question: "Is the baby happy or sad?",
        answer: "The baby is happy. / The baby is sad."
      },
      {
        filename: "02 N C is the Monster Sad or Happy.gif",
        codePattern: "02 N C",
        question: "Is the monster sad or happy?",
        answer: "The monster is sad. / The monster is happy."
      },
      {
        filename: "02 N D is the Girl Happy or Sad.gif",
        codePattern: "02 N D",
        question: "Is the girl happy or sad?",
        answer: "The girl is happy. / The girl is sad."
      },
      {
        filename: "02 N E is the Girl Happy or Sad.gif",
        codePattern: "02 N E",
        question: "Is the girl happy or sad?",
        answer: "The girl is happy. / The girl is sad."
      },
      {
        filename: "02 N F is the Monster Happy or Sad.gif",
        codePattern: "02 N F",
        question: "Is the monster happy or sad?",
        answer: "The monster is happy. / The monster is sad."
      },
      {
        filename: "02 N G is the Man Sad or Happy.gif",
        codePattern: "02 N G",
        question: "Is the man sad or happy?",
        answer: "The man is sad. / The man is happy."
      },
      {
        filename: "02 N H is the Cactus Happy or Sad.gif",
        codePattern: "02 N H",
        question: "Is the cactus happy or sad?",
        answer: "The cactus is happy. / The cactus is sad."
      },
      {
        filename: "02 N I is the Clown Happy or Sad.gif",
        codePattern: "02 N I",
        question: "Is the clown happy or sad?",
        answer: "The clown is happy. / The clown is sad."
      },
      {
        filename: "02 N J is It A Happy or A Sad Eagle.gif",
        codePattern: "02 N J",
        question: "Is it a happy or sad eagle?",
        answer: "It is a happy eagle. / It is a sad eagle."
      },
      {
        filename: "02 N K is It A Happy or A Sad Snake.gif",
        codePattern: "02 N K",
        question: "Is it a happy or sad snake?",
        answer: "It is a happy snake. / It is a sad snake."
      },
      {
        filename: "02 N L is It A Happy or A Sad Elephant.gif",
        codePattern: "02 N L",
        question: "Is it a happy or sad elephant?",
        answer: "It is a happy elephant. / It is a sad elephant."
      },
      {
        filename: "02 N M are They Sad or Happy.gif",
        codePattern: "02 N M",
        question: "Are they sad or happy?",
        answer: "They are sad. / They are happy."
      },
      {
        filename: "03 N A is the Man Cold or Hot.gif",
        codePattern: "03 N A",
        question: "Is the man cold or hot?",
        answer: "The man is cold. / The man is hot."
      },
      {
        filename: "03 N B is the Man Cold or Hot.gif",
        codePattern: "03 N B",
        question: "Is the man cold or hot?",
        answer: "The man is cold. / The man is hot."
      },
      {
        filename: "03 N C is the Man Cold or Hot.gif",
        codePattern: "03 N C",
        question: "Is the man cold or hot?",
        answer: "The man is cold. / The man is hot."
      },
      {
        filename: "03 N D is the Woman Cold or Hot.gif",
        codePattern: "03 N D",
        question: "Is the woman cold or hot?",
        answer: "The woman is cold. / The woman is hot."
      },
      {
        filename: "03 N E is the Man Hot or Cold.gif",
        codePattern: "03 N E",
        question: "Is the man hot or cold?",
        answer: "The man is hot. / The man is cold."
      },
      {
        filename: "03 N F is the Animal Cold or Hot.gif",
        codePattern: "03 N F",
        question: "Is the animal cold or hot?",
        answer: "The animal is cold. / The animal is hot."
      },
      {
        filename: "03 N G is the Man Hot or Cold.gif",
        codePattern: "03 N G",
        question: "Is the man hot or cold?",
        answer: "The man is hot. / The man is cold."
      },
      {
        filename: "03 N H is the Cow Hot or Cold.gif",
        codePattern: "03 N H",
        question: "Is the cow hot or cold?",
        answer: "The cow is hot. / The cow is cold."
      },
      {
        filename: "03 N I is the Boy Hot or Cold.gif",
        codePattern: "03 N I",
        question: "Is the boy hot or cold?",
        answer: "The boy is hot. / The boy is cold."
      },
      {
        filename: "03 N J is the Girl Cold or Hot.gif",
        codePattern: "03 N J",
        question: "Is the girl cold or hot?",
        answer: "The girl is cold. / The girl is hot."
      },
      {
        filename: "03 N K is the Potato Hot or Cold.gif",
        codePattern: "03 N K",
        question: "Is the potato hot or cold?",
        answer: "The potato is hot. / The potato is cold."
      },
      {
        filename: "03 N L is the Woman Hot or Cold.gif",
        codePattern: "03 N L",
        question: "Is the woman hot or cold?",
        answer: "The woman is hot. / The woman is cold."
      },
      {
        filename: "03 N M is He Hot or Cold.gif",
        codePattern: "03 N M",
        question: "Is he hot or cold?",
        answer: "He is hot. / He is cold."
      },
      {
        filename: "04 N A is the Hamburger Hungry or Thirsty.gif",
        codePattern: "04 N A",
        question: "Is the hamburger hungry or thirsty?",
        answer: "The hamburger is hungry. / The hamburger is thirsty."
      },
      {
        filename: "04 N B is the Girl Thirsty or Hungry.gif",
        codePattern: "04 N B",
        question: "Is the girl thirsty or hungry?",
        answer: "The girl is thirsty. / The girl is hungry."
      },
      {
        filename: "04 N C is the Cat Hungry or Thirsty.gif",
        codePattern: "04 N C",
        question: "Is the cat hungry or thirsty?",
        answer: "The cat is hungry. / The cat is thirsty."
      },
      {
        filename: "04 N D is the Mouse Hungry or Thirsty.gif",
        codePattern: "04 N D",
        question: "Is the mouse hungry or thirsty?",
        answer: "The mouse is hungry. / The mouse is thirsty."
      },
      {
        filename: "04 N E are They Hungry or Thirsty.gif",
        codePattern: "04 N E",
        question: "Are they hungry or thirsty?",
        answer: "They are hungry. / They are thirsty."
      },
      {
        filename: "04 N F is the Monster Thirsty or Hungry.gif",
        codePattern: "04 N F",
        question: "Is the monster thirsty or hungry?",
        answer: "The monster is thirsty. / The monster is hungry."
      },
      {
        filename: "04 N G is the Cat Hungry or Thirsty.gif",
        codePattern: "04 N G",
        question: "Is the cat hungry or thirsty?",
        answer: "The cat is hungry. / The cat is thirsty."
      },
      {
        filename: "04 N H is the Dragon Hungry or Thirsty.gif",
        codePattern: "04 N H",
        question: "Is the dragon hungry or thirsty?",
        answer: "The dragon is hungry. / The dragon is thirsty."
      },
      {
        filename: "04 N I is the Girl Thirsty or Hungry.gif",
        codePattern: "04 N I",
        question: "Is the girl thirsty or hungry?",
        answer: "The girl is thirsty. / The girl is hungry."
      },
      {
        filename: "04 N J is the Bee Thirsty or Hungry Fanta.gif",
        codePattern: "04 N J",
        question: "Is the bee thirsty or hungry?",
        answer: "The bee is thirsty. / The bee is hungry."
      },
      {
        filename: "04 N K is the Man Thirsty or Hungry Fanta.gif",
        codePattern: "04 N K",
        question: "Is the man thirsty or hungry?",
        answer: "The man is thirsty. / The man is hungry."
      },
      {
        filename: "04 N L is the Panda Thirsty or Hungry Fanta.gif",
        codePattern: "04 N L",
        question: "Is the panda thirsty or hungry?",
        answer: "The panda is thirsty. / The panda is hungry."
      },
      {
        filename: "04 N M is the Man Thirsty or Hungry.gif",
        codePattern: "04 N M",
        question: "Is the man thirsty or hungry?",
        answer: "The man is thirsty. / The man is hungry."
      },
      {
        filename: "05 N A is Patrick Scared or Tired.gif",
        codePattern: "05 N A",
        question: "Is Patrick scared or tired?",
        answer: "Patrick is scared. / Patrick is tired."
      },
      {
        filename: "05 N B is the Monster Tired or Scared.gif",
        codePattern: "05 N B",
        question: "Is the monster tired or scared?",
        answer: "The monster is tired. / The monster is scared."
      }
    ];
  }
  
  // Book 1, Unit 5 (Family) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit5') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 E A Who is He – He is A Father.gif",
        codePattern: "02 E A",
        question: "Who is he?",
        answer: "He is a father."
      },
      {
        filename: "02 E B is He A Mum or A Dad.gif",
        codePattern: "02 E B",
        question: "Is he a mum or a dad?",
        answer: "He is a dad."
      },
      {
        filename: "02 E C is Dad A Man or A Woman.gif",
        codePattern: "02 E C",
        question: "Is dad a man or a woman?",
        answer: "Dad is a man."
      },
      {
        filename: "02 E D is Dad Tired or Scared.gif",
        codePattern: "02 E D",
        question: "Is dad tired or scared?",
        answer: "Dad is tired. / Dad is scared."
      },
      {
        filename: "03 E A Who is He – He is A Mother.gif",
        codePattern: "03 E A",
        question: "Who is she?",
        answer: "She is a mother."
      },
      {
        filename: "03 E B is She A Mum or A Dad.gif",
        codePattern: "03 E B",
        question: "Is she a mum or a dad?",
        answer: "She is a mum."
      },
      {
        filename: "03 E C is Mum A Man or A Woman.gif",
        codePattern: "03 E C",
        question: "Is mum a man or a woman?",
        answer: "Mum is a woman."
      },
      {
        filename: "03 E D is She A Happy or Sad Mum.gif",
        codePattern: "03 E D",
        question: "Is she a happy or sad mum?",
        answer: "She is a happy mum. / She is a sad mum."
      },
      {
        filename: "04 E A Who are They – They are Brothers.gif",
        codePattern: "04 E A",
        question: "Who are they?",
        answer: "They are brothers."
      },
      {
        filename: "04 E B How Many Brothers Can You See – 3 Brothers.gif",
        codePattern: "04 E B",
        question: "How many brothers can you see?",
        answer: "I can see 3 brothers."
      },
      {
        filename: "04 E C are Brothers Girls or Boys.gif",
        codePattern: "04 E C",
        question: "Are brothers girls or boys?",
        answer: "Brothers are boys."
      },
      {
        filename: "04 E D are They Happy or Sad Brothers.gif",
        codePattern: "04 E D",
        question: "Are they happy or sad brothers?",
        answer: "They are happy brothers. / They are sad brothers."
      },
      {
        filename: "05 E A Who are They – They are Sisters 2.gif",
        codePattern: "05 E A",
        question: "Who are they?",
        answer: "They are sisters."
      },
      {
        filename: "05 E B How Many Sisters Can You See – 2 Sisters.gif",
        codePattern: "05 E B",
        question: "How many sisters can you see?",
        answer: "I can see 2 sisters."
      },
      {
        filename: "05 E C are Sisters Girls or Boys.gif",
        codePattern: "05 E C",
        question: "Are sisters girls or boys?",
        answer: "Sisters are girls."
      },
      {
        filename: "05 E D are They Swimming or Flying Sisters.gif",
        codePattern: "05 E D",
        question: "Are they swimming or flying sisters?",
        answer: "They are swimming sisters. / They are flying sisters."
      },
      {
        filename: "06 E A Who is He – He is A Grandfather.gif",
        codePattern: "06 E A",
        question: "Who is he?",
        answer: "He is a grandfather."
      },
      {
        filename: "06 E B is He A Grandad or A Grandmum.gif",
        codePattern: "06 E B",
        question: "Is he a grandad or a grandmum?",
        answer: "He is a grandad."
      },
      {
        filename: "06 E C is Granddad A Man or A Woman.gif",
        codePattern: "06 E C",
        question: "Is granddad a man or a woman?",
        answer: "Granddad is a man."
      },
      {
        filename: "06 E D is He A Scared or Tired Granddad.gif",
        codePattern: "06 E D",
        question: "Is he a scared or tired granddad?",
        answer: "He is a scared granddad. / He is a tired granddad."
      },
      {
        filename: "07 E A Who is She – She is A Grandmother.gif",
        codePattern: "07 E A",
        question: "Who is she?",
        answer: "She is a grandmother."
      },
      {
        filename: "07 E B is She A Grandad or A Grandmum.gif",
        codePattern: "07 E B",
        question: "Is she a grandad or a grandmum?",
        answer: "She is a grandmum."
      },
      {
        filename: "07 E C is Grandmum A Man or A Woman.gif",
        codePattern: "07 E C",
        question: "Is grandmum a man or a woman?",
        answer: "Grandmum is a woman."
      },
      {
        filename: "07 E D is She an Angry or A Hungry Grandmum.gif",
        codePattern: "07 E D",
        question: "Is she an angry or hungry grandmum?",
        answer: "She is an angry grandmum. / She is a hungry grandmum."
      },
      {
        filename: "08 B A Who is He – He is an Uncle.jpeg",
        codePattern: "08 B A",
        question: "Who is he?",
        answer: "He is an uncle."
      },
      {
        filename: "08 B C is an Uncle A Man or A Woman.jpg",
        codePattern: "08 B C",
        question: "Is an uncle a man or a woman?",
        answer: "An uncle is a man."
      },
      {
        filename: "09 C A Who is She – She is an Aunt.jpg",
        codePattern: "09 C A",
        question: "Who is she?",
        answer: "She is an aunt."
      },
      {
        filename: "09 C B is an Aunt A Woman or A Man.jpg",
        codePattern: "09 C B",
        question: "Is an aunt a woman or a man?",
        answer: "An aunt is a woman."
      },
      {
        filename: "10 B A Who Can You See – I Can See an Uncle, an Aunt and 2 Cousins.jpg",
        codePattern: "10 B A",
        question: "Who can you see?",
        answer: "I can see an uncle, an aunt, and two cousins."
      }
    ];
  }
  
  // Book 1, Unit 6 (Colors) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit6') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 A a What is It – It is A Red Pen.gif",
        codePattern: "02 A a",
        question: "What is it?",
        answer: "It is a red pen."
      },
      {
        filename: "02 A b What Colour is Planet Mars.gif",
        codePattern: "02 A b",
        question: "What colour is planet Mars?",
        answer: "Planet Mars is red."
      },
      {
        filename: "02 A c What Colour is the Frog – is the Picture Fake or Real.jpg",
        codePattern: "02 A c",
        question: "What colour is the frog? Is the picture fake or real?",
        answer: "The frog is green. The picture is fake. / The frog is green. The picture is real."
      },
      {
        filename: "02 A d What Colour are the Bananas – is the Picture Fake or Real.jpg",
        codePattern: "02 A d",
        question: "What colour are the bananas? Is the picture fake or real?",
        answer: "The bananas are yellow. The picture is fake. / The bananas are yellow. The picture is real."
      },
      {
        filename: "02 A e What Colour is the Zebra – is the Picture Fake or Real.jpg",
        codePattern: "02 A e",
        question: "What colour is the zebra? Is the picture fake or real?",
        answer: "The zebra is black and white. The picture is fake. / The zebra is black and white. The picture is real."
      },
      {
        filename: "02 B a What is It – It is A Yellow Book.jpg",
        codePattern: "02 B a",
        question: "What is it?",
        answer: "It is a yellow book."
      },
      {
        filename: "02 B c What Colour is the Cat – is the Picture Fake or Real.jpg",
        codePattern: "02 B c",
        question: "What colour is the cat? Is the picture fake or real?",
        answer: "The cat is yellow. The picture is fake. / The cat is yellow. The picture is real."
      },
      {
        filename: "02 B d What Colour is the Frog – is the Picture Fake or Real.jpg",
        codePattern: "02 B d",
        question: "What colour is the frog? Is the picture fake or real?",
        answer: "The frog is yellow. The picture is fake. / The frog is yellow. The picture is real."
      },
      {
        filename: "02 B h What Colour is the Bee – is the Picture Fake or Real.jpg",
        codePattern: "02 B h",
        question: "What colour is the bee? Is the picture fake or real?",
        answer: "The bee is yellow. The picture is fake. / The bee is yellow. The picture is real."
      },
      {
        filename: "02 B i What Colour is the Snake – is the Picture Fake or Real.jpg",
        codePattern: "02 B i",
        question: "What colour is the snake? Is the picture fake or real?",
        answer: "The snake is yellow. The picture is fake. / The snake is yellow. The picture is real."
      },
      {
        filename: "02 C a What is It – It is an Orange Cat.jpg",
        codePattern: "02 C a",
        question: "What is it?",
        answer: "It is an orange cat."
      },
      {
        filename: "02 C b What Colour is the Orange – is the Picture Fake or Real.gif",
        codePattern: "02 C b",
        question: "What colour is the orange? Is the picture fake or real?",
        answer: "The orange is orange. The picture is fake. / The orange is orange. The picture is real."
      },
      {
        filename: "02 C c What Colour is the Fanta – is the Picture Fake or Real.gif",
        codePattern: "02 C c",
        question: "What colour is the Fanta? Is the picture fake or real?",
        answer: "The Fanta is orange. The picture is fake. / The Fanta is orange. The picture is real."
      },
      {
        filename: "02 C d What Colour is the Bird – is the Picture Fake or Real.jpg",
        codePattern: "02 C d",
        question: "What colour is the bird? Is the picture fake or real?",
        answer: "The bird is orange. The picture is fake. / The bird is orange. The picture is real."
      },
      {
        filename: "02 C e What Colour is the Pumpkin – is the Picture Fake or Real.gif",
        codePattern: "02 C e",
        question: "What colour is the pumpkin? Is the picture fake or real?",
        answer: "The pumpkin is orange. The picture is fake. / The pumpkin is orange. The picture is real."
      },
      {
        filename: "02 D a What is It – It is A Golden Ring.gif",
        codePattern: "02 D a",
        question: "What is it?",
        answer: "It is a golden ring."
      },
      {
        filename: "02 D b What Colour is the Car – is the Picture Fake or Real.jpg",
        codePattern: "02 D b",
        question: "What colour is the car? Is the picture fake or real?",
        answer: "The car is gold. The picture is fake. / The car is gold. The picture is real."
      },
      {
        filename: "02 D c What Colour is the Bird – is the Picture Fake or Real.jpg",
        codePattern: "02 D c",
        question: "What colour is the bird? Is the picture fake or real?",
        answer: "The bird is gold. The picture is fake. / The bird is gold. The picture is real."
      },
      {
        filename: "02 D d What Colour is the Bug – is the Picture Fake or Real.jpg",
        codePattern: "02 D d",
        question: "What colour is the bug? Is the picture fake or real?",
        answer: "The bug is gold. The picture is fake. / The bug is gold. The picture is real."
      },
      {
        filename: "02 D e What Colour is the Strawberry – is the Picture Fake or Real.jpg",
        codePattern: "02 D e",
        question: "What colour is the strawberry? Is the picture fake or real?",
        answer: "The strawberry is gold. The picture is fake. / The strawberry is gold. The picture is real."
      },
      {
        filename: "02 E a What is It – It is A Pink Kiwi.jpg",
        codePattern: "02 E a",
        question: "What is it?",
        answer: "It is a pink kiwi."
      },
      {
        filename: "02 E b What Colour is the Laptop – is the Picture Fake or Real.jpg",
        codePattern: "02 E b",
        question: "What colour is the laptop? Is the picture fake or real?",
        answer: "The laptop is pink. The picture is fake. / The laptop is pink. The picture is real."
      },
      {
        filename: "02 E c What Colour is the Fruit – is the Picture Fake or Real.jpg",
        codePattern: "02 E c",
        question: "What colour is the fruit? Is the picture fake or real?",
        answer: "The fruit is pink. The picture is fake. / The fruit is pink. The picture is real."
      },
      {
        filename: "02 E d What Colour is the Cow – is the Picture Fake or Real.jpg",
        codePattern: "02 E d",
        question: "What colour is the cow? Is the picture fake or real?",
        answer: "The cow is pink. The picture is fake. / The cow is pink. The picture is real."
      },
      {
        filename: "02 E e What Colour is the Dolphin – is the Picture Fake or Real.gif",
        codePattern: "02 E e",
        question: "What colour is the dolphin? Is the picture fake or real?",
        answer: "The dolphin is pink. The picture is fake. / The dolphin is pink. The picture is real."
      }
    ];
  }
  
  // Book 1, Unit 7 (Numbers) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit7') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "03 A Colour Number 1 – Yellow.jpg",
        codePattern: "03 A",
        question: "What colour is number 1?",
        answer: "Number 1 is yellow."
      },
      {
        filename: "04 A Colour Number 2 – Blue.jpg",
        codePattern: "04 A",
        question: "What colour is number 2?",
        answer: "Number 2 is blue."
      },
      {
        filename: "05 A Colour Number 3 – Red.jpg",
        codePattern: "05 A",
        question: "What colour is number 3?",
        answer: "Number 3 is red."
      },
      {
        filename: "06 A Colour Number 4 – Green.jpg",
        codePattern: "06 A",
        question: "What colour is number 4?",
        answer: "Number 4 is green."
      },
      {
        filename: "07 A Colour Number 5 – Silver.jpg",
        codePattern: "07 A",
        question: "What colour is number 5?",
        answer: "Number 5 is silver."
      },
      {
        filename: "08 A Colour Number 6 – Orange.jpg",
        codePattern: "08 A",
        question: "What colour is number 6?",
        answer: "Number 6 is orange."
      },
      {
        filename: "09 A Colour Number 7 – Pink.jpg",
        codePattern: "09 A",
        question: "What colour is number 7?",
        answer: "Number 7 is pink."
      },
      {
        filename: "10 A Colour Number 8 – Black.jpg",
        codePattern: "10 A",
        question: "What colour is number 8?",
        answer: "Number 8 is black."
      },
      {
        filename: "11 A Colour Number 10 – Brown.jpg",
        codePattern: "11 A",
        question: "What colour is number 9?",
        answer: "Number 9 is brown."
      },
      {
        filename: "12 A Colour Number 10 – Purple.jpg",
        codePattern: "12 A",
        question: "What colour is number 10?",
        answer: "Number 10 is purple."
      },
      {
        filename: "13 A Colour Number 10 – Grey.jpg",
        codePattern: "13 A",
        question: "What colour is number 11?",
        answer: "Number 11 is grey."
      },
      {
        filename: "14 A Colour Number 10 – Gold.jpg",
        codePattern: "14 A",
        question: "What colour is number 12?",
        answer: "Number 12 is gold."
      }
    ];
  }
  
  // Book 1, Unit 17 (Weather) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit17') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "01 G A What Can You See – I Can See Rain.gif",
        codePattern: "01 G A",
        question: "What can you see?",
        answer: "I can see rain."
      },
      {
        filename: "01 G B What is the Weather Like – It is Rainy.gif",
        codePattern: "01 G B",
        question: "What is the weather like?",
        answer: "It is rainy."
      },
      {
        filename: "01 G C Who is Standing in the Rain – A Girl or A Boy.gif",
        codePattern: "01 G C",
        question: "Who is standing in the rain?",
        answer: "A girl is standing in the rain. / A boy is standing in the rain."
      },
      {
        filename: "01 G D Who is Standing in the Rain – A Woman or A Man.gif",
        codePattern: "01 G D",
        question: "Who is standing in the rain?",
        answer: "A woman is standing in the rain. / A man is standing in the rain."
      },
      {
        filename: "01 G E is It A Woman or A Man Sitting in the Rain.gif",
        codePattern: "01 G E",
        question: "Is it a woman or a man sitting in the rain?",
        answer: "It is a woman sitting in the rain. / It is a man sitting in the rain."
      },
      {
        filename: "01 G F is She Sleeping or Jumping in the Rain.gif",
        codePattern: "01 G F",
        question: "Is she sleeping or jumping in the rain?",
        answer: "She is sleeping in the rain. / She is jumping in the rain."
      },
      {
        filename: "02 G A What Can You See in the Picture – A Cloud.gif",
        codePattern: "02 G A",
        question: "What can you see in the picture?",
        answer: "I can see a cloud."
      },
      {
        filename: "02 G B What is the Weather Like – It is Cloudy.gif",
        codePattern: "02 G B",
        question: "What is the weather like?",
        answer: "It is cloudy."
      },
      {
        filename: "02 G C What Colour are the Clouds – Black.gif",
        codePattern: "02 G C",
        question: "What colour are the clouds?",
        answer: "The clouds are black."
      },
      {
        filename: "02 G D is the Cloud Drinking or Eating.gif",
        codePattern: "02 G D",
        question: "Is the cloud drinking or eating?",
        answer: "The cloud is drinking. / The cloud is eating."
      },
      {
        filename: "02 G E is It A Hungry or an Angry Cloud.gif",
        codePattern: "02 G E",
        question: "Is it a hungry or an angry cloud?",
        answer: "It is a hungry cloud. / It is an angry cloud."
      },
      {
        filename: "02 G F How Many Clouds Can You See – 2 Clouds.gif",
        codePattern: "02 G F",
        question: "How many clouds can you see?",
        answer: "I can see 2 clouds."
      },
      {
        filename: "03 G A What Can You See – I Can See Snow.gif",
        codePattern: "03 G A",
        question: "What can you see?",
        answer: "I can see snow."
      },
      {
        filename: "03 G B What is the Weather Like – It is Snowy.gif",
        codePattern: "03 G B",
        question: "What is the weather like?",
        answer: "It is snowy."
      },
      {
        filename: "03 G C What Colour is the Snow – White.gif",
        codePattern: "03 G C",
        question: "What colour is the snow?",
        answer: "The snow is white."
      },
      {
        filename: "03 G D is It A Boy or A Girl in the Snow.gif",
        codePattern: "03 G D",
        question: "Is it a boy or a girl in the snow?",
        answer: "It is a boy in the snow. / It is a girl in the snow."
      },
      {
        filename: "03 G E is It A Man or A Woman in the Snow.gif",
        codePattern: "03 G E",
        question: "Is it a man or a woman in the snow?",
        answer: "It is a man in the snow. / It is a woman in the snow."
      },
      {
        filename: "03 G F What Animal Can You See in the Snow – A Dog or A Cat.gif",
        codePattern: "03 G F",
        question: "What animal can you see in the snow?",
        answer: "I can see a dog in the snow. / I can see a cat in the snow."
      },
      {
        filename: "04 G A What Can You See in the Picture – the Sun.gif",
        codePattern: "04 G A",
        question: "What can you see in the picture?",
        answer: "I can see the sun."
      },
      {
        filename: "04 G B What is the Weather Like – It is Sunny.gif",
        codePattern: "04 G B",
        question: "What is the weather like?",
        answer: "It is sunny."
      },
      {
        filename: "04 G C What Colour is the Sun – Yellow.gif",
        codePattern: "04 G C",
        question: "What colour is the sun?",
        answer: "The sun is yellow."
      },
      {
        filename: "04 G D is the Sun Hot or Cold.gif",
        codePattern: "04 G D",
        question: "Is the sun hot or cold?",
        answer: "The sun is hot."
      },
      {
        filename: "04 G E is the Ghost Sleeping or Swimming in the Sun.gif",
        codePattern: "04 G E",
        question: "Is the ghost sleeping or swimming in the sun?",
        answer: "The ghost is sleeping in the sun. / The ghost is swimming in the sun."
      },
      {
        filename: "04 G F is the Man Sleeping or Playing in the Sun.gif",
        codePattern: "04 G F",
        question: "Is the man sleeping or playing in the sun?",
        answer: "The man is sleeping in the sun. / The man is playing in the sun."
      },
      {
        filename: "05 G A What Can You See in the Picture – Wind.gif",
        codePattern: "05 G A",
        question: "What can you see in the picture?",
        answer: "I can see wind."
      },
      {
        filename: "05 G B What is the Weather Like – It is Windy.gif",
        codePattern: "05 G B",
        question: "What is the weather like?",
        answer: "It is windy."
      },
      {
        filename: "05 G C What is Standing in the Wind – A Cat or A Dog.gif",
        codePattern: "05 G C",
        question: "What is standing in the wind?",
        answer: "A cat is standing in the wind. / A dog is standing in the wind."
      },
      {
        filename: "05 G D is It A Girl or A Boy in the Wind.gif",
        codePattern: "05 G D",
        question: "Is it a girl or a boy in the wind?",
        answer: "It is a girl in the wind. / It is a boy in the wind."
      },
      {
        filename: "05 G E is It A Man or A Woman in the Wind.gif",
        codePattern: "05 G E",
        question: "Is it a man or a woman in the wind?",
        answer: "It is a man in the wind. / It is a woman in the wind."
      },
      {
        filename: "05 G F is the Girl Sitting or Standing in the Wind.gif",
        codePattern: "05 G F",
        question: "Is the girl sitting or standing in the wind?",
        answer: "The girl is sitting in the wind. / The girl is standing in the wind."
      }
    ];
  }
  
  // Book 1, Unit 18 (Can You...) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit18') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "01 I A Can You Climb A Tree – Yes, I Can – No, I Can't.jpg",
        codePattern: "01 I A",
        question: "Can you climb a tree?",
        answer: "Yes, I can. / No, I can't."
      },
      {
        filename: "01 I B Can A Monkey Climb A Tree – Yes, It Can. No, It Can't.gif",
        codePattern: "01 I B",
        question: "Can a monkey climb a tree?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "01 I C Can A Fish Climb – Yes, It Can. No, It Can't.jpeg",
        codePattern: "01 I C",
        question: "Can a fish climb?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "01 I D Can an Elephant Climb – Yes, It Can. No, It Can't.jpeg",
        codePattern: "01 I D",
        question: "Can an elephant climb?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "01 I E Can Spiderman Climb – Yes, He Can. No, He Can't.gif",
        codePattern: "01 I E",
        question: "Can Spiderman climb?",
        answer: "Yes, he can. / No, he can't."
      },
      {
        filename: "01 I F Can A Rhino Climb – Yes, It Can. No, It Can't.jpeg",
        codePattern: "01 I F",
        question: "Can a rhino climb?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "01 I G Can A Snake Climb – Yes, It Can. No, It Can't.gif",
        codePattern: "01 I G",
        question: "Can a snake climb?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "01 I H Do You Like Climbing Mountains – Yes, I Do – No, I Don't.gif",
        codePattern: "01 I H",
        question: "Do you like climbing mountains?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 I A Can You Swim – Yes, I Can – No, I Cant.gif",
        codePattern: "02 I A",
        question: "Can you swim?",
        answer: "Yes, I can. / No, I can't."
      },
      {
        filename: "02 I B Can A Fish Swim – Yes, It Can. No, It Can't.gif",
        codePattern: "02 I B",
        question: "Can a fish swim?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "02 I C Can A Bee Swim – Yes, It Can. No, It Can't.gif",
        codePattern: "02 I C",
        question: "Can a bee swim?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "02 I D Can an Owl Swim – Yes, It Can. No, It Can't.jpeg",
        codePattern: "02 I D",
        question: "Can an owl swim?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "02 I E Can A Dolphin Swim – Yes, It Can. No, It Can't.gif",
        codePattern: "02 I E",
        question: "Can a dolphin swim?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "02 I F Can A Cheetah Swim – Yes, It Can. No, It Can't.jpeg",
        codePattern: "02 I F",
        question: "Can a cheetah swim?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "02 I G Can A Dog Swim – Yes, It Can. No, It Can't.gif",
        codePattern: "02 I G",
        question: "Can a dog swim?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "02 I H Do You Like Swimming – Yes, I Do – No, I Don't.gif",
        codePattern: "02 I H",
        question: "Do you like swimming?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "03 I A Can You Run – Yes, I Can – No, I Cant.gif",
        codePattern: "03 I A",
        question: "Can you run?",
        answer: "Yes, I can. / No, I can't."
      },
      {
        filename: "03 I B Can A Cheetah Run – Yes, It Can. No, It Can't.gif",
        codePattern: "03 I B",
        question: "Can a cheetah run?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "03 I C Can A Fish Run – Yes, It Can. No, It Can't.gif",
        codePattern: "03 I C",
        question: "Can a fish run?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "03 I D Can A Rhino Run – Yes, It Can. No, It Can't.gif",
        codePattern: "03 I D",
        question: "Can a rhino run?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "03 I E Can A Snake Run – Yes, It Can. No, It Can't.jpeg",
        codePattern: "03 I E",
        question: "Can a snake run?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "03 I F Can A Deer Run – Yes, It Can. No, It Can't.gif",
        codePattern: "03 I F",
        question: "Can a deer run?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "03 I G Can A Frog Run – Yes, It Can. No, It Can't.jpeg",
        codePattern: "03 I G",
        question: "Can a frog run?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "03 I H Do You Like Running – Yes, I Do – No, I Don't.gif",
        codePattern: "03 I H",
        question: "Do you like running?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "04 I A Can You Fly – Yes, I Can – No, I Cant.gif",
        codePattern: "04 I A",
        question: "Can you fly?",
        answer: "Yes, I can. / No, I can't."
      },
      {
        filename: "04 I B Can A Bee Fly – Yes, It Can. No, It Can't.gif",
        codePattern: "04 I B",
        question: "Can a bee fly?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "04 I C Can an Elephant Fly – Yes, It Can. No, It Can't.gif",
        codePattern: "04 I C",
        question: "Can an elephant fly?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "04 I D Can A Chicken Fly – Yes, It Can. No, It Can't.gif",
        codePattern: "04 I D",
        question: "Can a chicken fly?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "04 I E Can A Bird Fly – Yes, It Can. No, It Can't.gif",
        codePattern: "04 I E",
        question: "Can a bird fly?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "04 I F Can A Monkey Fly – Yes, It Can. No, It Can't.gif",
        codePattern: "04 I F",
        question: "Can a monkey fly?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "04 I G Can A Shark Fly – Yes, It Can. No, It Can't.jpeg",
        codePattern: "04 I G",
        question: "Can a shark fly?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "04 I H How Many Girls are Flying – 5 Girls.gif",
        codePattern: "04 I H",
        question: "How many girls are flying?",
        answer: "There are 5 girls flying."
      },
      {
        filename: "05 I A Can You Jump – Yes, I Can – No, I Cant.gif",
        codePattern: "05 I A",
        question: "Can you jump?",
        answer: "Yes, I can. / No, I can't."
      },
      {
        filename: "05 I B Can A Kangaroo Jump – Yes, It Can. No, It Can't.gif",
        codePattern: "05 I B",
        question: "Can a kangaroo jump?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "05 I C Can an Elephant Jump – Yes, It Can. No, It Can't.gif",
        codePattern: "05 I C",
        question: "Can an elephant jump?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "05 I D Can A Deer Jump – Yes, It Can. No, It Can't.gif",
        codePattern: "05 I D",
        question: "Can a deer jump?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "05 I E Can A Dolphin Jump – Yes, It Can. No, It Can't.gif",
        codePattern: "05 I E",
        question: "Can a dolphin jump?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "05 I F Can an Owl Jump – Yes, It Can. No, It Can't.gif",
        codePattern: "05 I F",
        question: "Can an owl jump?",
        answer: "Yes, it can. / No, it can't."
      },
      {
        filename: "05 I G Can A Frog Jump – Yes, It Can. No, It Can't.gif",
        codePattern: "05 I G",
        question: "Can a frog jump?",
        answer: "Yes, it can. / No, it can't."
      }
    ];
  }
  
  // Book 1, Unit 8 (Hair) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit8') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "01 L A the Girl Has Got Fair – Dark Hair.gif",
        codePattern: "01 L A",
        question: "Does the girl have fair or dark hair?",
        answer: "The girl has fair hair. / The girl has dark hair."
      },
      {
        filename: "01 L B the Man Has Got Fair – Dark Hair.gif",
        codePattern: "01 L B",
        question: "Does the man have fair or dark hair?",
        answer: "The man has fair hair. / The man has dark hair."
      },
      {
        filename: "01 L C the Woman Has Got Fair – Dark Hair.gif",
        codePattern: "01 L C",
        question: "Does the woman have fair or dark hair?",
        answer: "The woman has fair hair. / The woman has dark hair."
      },
      {
        filename: "01 L D the Man Has Got Fair – Dark Hair.gif",
        codePattern: "01 L D",
        question: "Does the man have fair or dark hair?",
        answer: "The man has fair hair. / The man has dark hair."
      },
      {
        filename: "01 L E the Boy Has Got Fair – Dark Hair.gif",
        codePattern: "01 L E",
        question: "Does the boy have fair or dark hair?",
        answer: "The boy has fair hair. / The boy has dark hair."
      },
      {
        filename: "01 L F the Man Has Got Fair – Dark Hair.gif",
        codePattern: "01 L F",
        question: "Does the man have fair or dark hair?",
        answer: "The man has fair hair. / The man has dark hair."
      },
      {
        filename: "01 L G the Woman Has Got Fair – Dark Hair.gif",
        codePattern: "01 L G",
        question: "Does the woman have fair or dark hair?",
        answer: "The woman has fair hair. / The woman has dark hair."
      },
      {
        filename: "01 L H the Woman Has Got Fair – Dark Hair.gif",
        codePattern: "01 L H",
        question: "Does the woman have fair or dark hair?",
        answer: "The woman has fair hair. / The woman has dark hair."
      },
      {
        filename: "01 L I the Baby Has Got Dark – Fair Hair.gif",
        codePattern: "01 L I",
        question: "Does the baby have fair or dark hair?",
        answer: "The baby has fair hair. / The baby has dark hair."
      },
      {
        filename: "01 L J the Woman Has Got Fair – Dark Hair.gif",
        codePattern: "01 L J",
        question: "Does the woman have fair or dark hair?",
        answer: "The woman has fair hair. / The woman has dark hair."
      },
      {
        filename: "01 L K the Woman Has Got Fair – Dark Hair.gif",
        codePattern: "01 L K",
        question: "Does the woman have fair or dark hair?",
        answer: "The woman has fair hair. / The woman has dark hair."
      },
      {
        filename: "02 M A the Girl Has Got Short – Long Hair.gif",
        codePattern: "02 M A",
        question: "Does the girl have short or long hair?",
        answer: "The girl has short hair. / The girl has long hair."
      },
      {
        filename: "02 M B the Baby Has Got Short – Long Hair.jpg",
        codePattern: "02 M B",
        question: "Does the baby have short or long hair?",
        answer: "The baby has short hair. / The baby has long hair."
      },
      {
        filename: "02 M C the Woman Has Got Short – Long Hair.gif",
        codePattern: "02 M C",
        question: "Does the woman have short or long hair?",
        answer: "The woman has short hair. / The woman has long hair."
      },
      {
        filename: "02 M D the Boy Has Got Short – Long Hair.gif",
        codePattern: "02 M D",
        question: "Does the boy have short or long hair?",
        answer: "The boy has short hair. / The boy has long hair."
      },
      {
        filename: "02 M E the Woman Has Got Short – Long Hair.gif",
        codePattern: "02 M E",
        question: "Does the woman have short or long hair?",
        answer: "The woman has short hair. / The woman has long hair."
      },
      {
        filename: "02 M F the Man Has Got Short – Long Hair.gif",
        codePattern: "02 M F",
        question: "Does the man have short or long hair?",
        answer: "The man has short hair. / The man has long hair."
      },
      {
        filename: "02 M G the Woman Has Got Short – Long Hair.gif",
        codePattern: "02 M G",
        question: "Does the woman have short or long hair?",
        answer: "The woman has short hair. / The woman has long hair."
      },
      {
        filename: "02 M H the Girl Has Got Short – Long Hair.gif",
        codePattern: "02 M H",
        question: "Does the girl have short or long hair?",
        answer: "The girl has short hair. / The girl has long hair."
      },
      {
        filename: "02 M I the Baby Has Got Short – Long Hair.gif",
        codePattern: "02 M I",
        question: "Does the baby have short or long hair?",
        answer: "The baby has short hair. / The baby has long hair."
      },
      {
        filename: "02 M J the Woman Has Got Short – Long Hair.gif",
        codePattern: "02 M J",
        question: "Does the woman have short or long hair?",
        answer: "The woman has short hair. / The woman has long hair."
      },
      {
        filename: "02 M K the Girl Has Got Short – Long Hair.gif",
        codePattern: "02 M K",
        question: "Does the girl have short or long hair?",
        answer: "The girl has short hair. / The girl has long hair."
      },
      {
        filename: "02 M L the Witch Has Got Short – Long Hair.gif",
        codePattern: "02 M L",
        question: "Does the witch have short or long hair?",
        answer: "The witch has short hair. / The witch has long hair."
      },
      {
        filename: "03 L A the Woman Has Got Straight – Curly Hair.gif",
        codePattern: "03 L A",
        question: "Does the woman have straight or curly hair?",
        answer: "The woman has straight hair. / The woman has curly hair."
      },
      {
        filename: "03 L B the Woman Has Got Straight – Curly Hair.gif",
        codePattern: "03 L B",
        question: "Does the woman have straight or curly hair?",
        answer: "The woman has straight hair. / The woman has curly hair."
      },
      {
        filename: "03 L C the Woman Has Got Straight – Curly Hair.gif",
        codePattern: "03 L C",
        question: "Does the woman have straight or curly hair?",
        answer: "The woman has straight hair. / The woman has curly hair."
      },
      {
        filename: "03 L D the Girl Has Got Straight – Curly Hair.gif",
        codePattern: "03 L D",
        question: "Does the girl have straight or curly hair?",
        answer: "The girl has straight hair. / The girl has curly hair."
      },
      {
        filename: "03 L E the Woman Has Got Straight – Curly Hair.gif",
        codePattern: "03 L E",
        question: "Does the woman have straight or curly hair?",
        answer: "The woman has straight hair. / The woman has curly hair."
      },
      {
        filename: "03 L F the Girl Has Got Short – Curly – Straight Hair.gif",
        codePattern: "03 L F",
        question: "Does the girl have short, curly, or straight hair?",
        answer: "The girl has short hair. / The girl has curly hair. / The girl has straight hair."
      },
      {
        filename: "03 L G the Woman Has Got Curly – Straight Hair.gif",
        codePattern: "03 L G",
        question: "Does the woman have curly or straight hair?",
        answer: "The woman has curly hair. / The woman has straight hair."
      },
      {
        filename: "03 L H the Man Has Got Curly – Straight Hair.gif",
        codePattern: "03 L H",
        question: "Does the man have curly or straight hair?",
        answer: "The man has curly hair. / The man has straight hair."
      },
      {
        filename: "03 L I the Bird Has Got Curly – Straight Hair.gif",
        codePattern: "03 L I",
        question: "Does the bird have curly or straight hair?",
        answer: "The bird has curly hair. / The bird has straight hair."
      },
      {
        filename: "03 L J the Girl Has Got Curly – Straight Hair.gif",
        codePattern: "03 L J",
        question: "Does the girl have curly or straight hair?",
        answer: "The girl has curly hair. / The girl has straight hair."
      },
      {
        filename: "03 L K the Dog Has Got Short – Curly – Straight Hair.gif",
        codePattern: "03 L K",
        question: "Does the dog have short, curly, or straight hair?",
        answer: "The dog has short hair. / The dog has curly hair. / The dog has straight hair."
      },
      {
        filename: "04 A How Many Hairs Can You See – 1.gif",
        codePattern: "04 A",
        question: "How many hairs can you see?",
        answer: "I can see one hair."
      },
      {
        filename: "04 B What Colour is the Boy's Hair – Red.gif",
        codePattern: "04 B",
        question: "What color is the boy's hair?",
        answer: "The boy's hair is red."
      },
      {
        filename: "04 C What Colour is the Girl's Hair – Green.gif",
        codePattern: "04 C",
        question: "What color is the girl's hair?",
        answer: "The girl's hair is green."
      },
      {
        filename: "04 D What Colour is the Girl's Hair – Ginger.gif",
        codePattern: "04 D",
        question: "What color is the girl's hair?",
        answer: "The girl's hair is ginger."
      },
      {
        filename: "04 D What Colour is the Girl's Hair – Purple.gif",
        codePattern: "04 D",
        question: "What color is the girl's hair?",
        answer: "The girl's hair is purple."
      }
    ];
  }
  
  // Book 1, Unit 9 (Face) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit9') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 F A What is It – It is A Nose.gif",
        codePattern: "02 F A",
        question: "What is it?",
        answer: "It is a nose."
      },
      {
        filename: "02 F B What Colour is the Nose – Red.gif",
        codePattern: "02 F B",
        question: "What color is the nose?",
        answer: "The nose is red."
      },
      {
        filename: "02 F C is It A Cat or A Dog Nose.gif",
        codePattern: "02 F C",
        question: "Is it a cat or a dog nose?",
        answer: "It is a cat nose. / It is a dog nose."
      },
      {
        filename: "02 F D is It A Small or A Big Nose.gif",
        codePattern: "02 F D",
        question: "Is it a small or big nose?",
        answer: "It is a small nose. / It is a big nose."
      },
      {
        filename: "02 F E is It A Small or A Big Nose.gif",
        codePattern: "02 F E",
        question: "Is it a small or big nose?",
        answer: "It is a small nose. / It is a big nose."
      },
      {
        filename: "03 F A What is It – It is an Eye.gif",
        codePattern: "03 F A",
        question: "What is it?",
        answer: "It is an eye."
      },
      {
        filename: "03 F B What are They – They are Eyes.gif",
        codePattern: "03 F B",
        question: "What are they?",
        answer: "They are eyes."
      },
      {
        filename: "03 F C What Colour are the Eyes – They are Green.gif",
        codePattern: "03 F C",
        question: "What color are the eyes?",
        answer: "The eyes are green."
      },
      {
        filename: "03 F D What Colour are the Eyes – They are Blue.gif",
        codePattern: "03 F D",
        question: "What color are the eyes?",
        answer: "The eyes are blue."
      },
      {
        filename: "03 F E are They Small or Big Eyes.gif",
        codePattern: "03 F E",
        question: "Are they small or big eyes?",
        answer: "They are small eyes. / They are big eyes."
      },
      {
        filename: "04 F A What is It – It is Hair.gif",
        codePattern: "04 F A",
        question: "What is it?",
        answer: "It is hair."
      },
      {
        filename: "04 F B is It Short or Long Hair.gif",
        codePattern: "04 F B",
        question: "Is it short or long hair?",
        answer: "It is short hair. / It is long hair."
      },
      {
        filename: "04 F C is It Fair or Dark Hair.gif",
        codePattern: "04 F C",
        question: "Is it fair or dark hair?",
        answer: "It is fair hair. / It is dark hair."
      },
      {
        filename: "04 F D How Many Hairs Can You See – 1.gif",
        codePattern: "04 F D",
        question: "How many hairs can you see?",
        answer: "I can see one hair."
      },
      {
        filename: "04 F E What Colour is the Hair – Red.gif",
        codePattern: "04 F E",
        question: "What color is the hair?",
        answer: "The hair is red."
      },
      {
        filename: "05 F A What is It – It is A Tooth.gif",
        codePattern: "05 F A",
        question: "What is it?",
        answer: "It is a tooth."
      },
      {
        filename: "05 F B What are They – They are Teeth.gif",
        codePattern: "05 F B",
        question: "What are they?",
        answer: "They are teeth."
      },
      {
        filename: "05 F C are They Small or Big Teeth.gif",
        codePattern: "05 F C",
        question: "Are they small or big teeth?",
        answer: "They are small teeth. / They are big teeth."
      },
      {
        filename: "05 F D How Many Teeth Can You See – 8 Teeth.gif",
        codePattern: "05 F D",
        question: "How many teeth can you see?",
        answer: "I can see eight teeth."
      },
      {
        filename: "05 F E are They Fish or Shark Teeth.gif",
        codePattern: "05 F E",
        question: "Are they fish or shark teeth?",
        answer: "They are fish teeth. / They are shark teeth."
      },
      {
        filename: "06 F A What is It – It is A Mouth.jpg",
        codePattern: "06 F A",
        question: "What is it?",
        answer: "It is a mouth."
      },
      {
        filename: "06 F B Where is the Man – in the Tiger's or Lion's Mouth.gif",
        codePattern: "06 F B",
        question: "Where is the man?",
        answer: "The man is in the tiger's mouth. / The man is in the lion's mouth."
      },
      {
        filename: "06 F C is It A Small or A Big Mouth.gif",
        codePattern: "06 F C",
        question: "Is it a small or big mouth?",
        answer: "It is a small mouth. / It is a big mouth."
      },
      {
        filename: "06 F D is the Mouth Open or Closed.gif",
        codePattern: "06 F D",
        question: "Is the mouth open or closed?",
        answer: "The mouth is open. / The mouth is closed."
      },
      {
        filename: "06 F E is It A Small or A Big Mouth.gif",
        codePattern: "06 F E",
        question: "Is it a small or big mouth?",
        answer: "It is a small mouth. / It is a big mouth."
      },
      {
        filename: "07 F A What is It – It is an Ear.gif",
        codePattern: "07 F A",
        question: "What is it?",
        answer: "It is an ear."
      },
      {
        filename: "07 F B What are They – They are Ears.gif",
        codePattern: "07 F B",
        question: "What are they?",
        answer: "They are ears."
      },
      {
        filename: "07 F C are They Short or Long Ears.gif",
        codePattern: "07 F C",
        question: "Are they short or long ears?",
        answer: "They are short ears. / They are long ears."
      },
      {
        filename: "07 F D What Colour are the Ears – Green.gif",
        codePattern: "07 F D",
        question: "What color are the ears?",
        answer: "The ears are green."
      },
      {
        filename: "07 F E are They Small or Big Ears.gif",
        codePattern: "07 F E",
        question: "Are they small or big ears?",
        answer: "They are small ears. / They are big ears."
      },
      {
        filename: "08 A What is It – It is A Head.gif",
        codePattern: "08 A",
        question: "What is it?",
        answer: "It is a head."
      },
      {
        filename: "08 B is It A Big or A Small Head.gif",
        codePattern: "08 B",
        question: "Is it a big or small head?",
        answer: "It is a big head. / It is a small head."
      },
      {
        filename: "08 D How Many Heads Can You See – 0.jpg",
        codePattern: "08 D",
        question: "How many heads can you see?",
        answer: "I can see zero heads."
      },
      {
        filename: "08 F is It A Normal or Robot Head.gif",
        codePattern: "08 F",
        question: "Is it a normal or robot head?",
        answer: "It is a normal head. / It is a robot head."
      },
      {
        filename: "08 G How Many Heads Can You See – 2 Heads.gif",
        codePattern: "08 G",
        question: "How many heads can you see?",
        answer: "I can see two heads."
      },
      {
        filename: "08 H What Colour is the Head – Green.gif",
        codePattern: "08 H",
        question: "What color is the head?",
        answer: "The head is green."
      }
    ];
  }
  
  // Book 1, Unit 11 (Seasons) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit11') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "01 D Aa What are the Four Seasons of the Year.gif",
        codePattern: "01 D Aa",
        question: "What are the four seasons of the year?",
        answer: "The four seasons are spring, summer, autumn, and winter."
      },
      {
        filename: "01 D Ab What is Your Favourite Season.gif",
        codePattern: "01 D Ab",
        question: "What is your favorite season?",
        answer: "Spring / Summer / Autumn / Winter."
      },
      {
        filename: "01 D Ac What Do You Prefer Cold or Hot Weather.gif",
        codePattern: "01 D Ac",
        question: "What do you prefer: cold or hot weather?",
        answer: "I prefer cold weather. / I prefer hot weather."
      },
      {
        filename: "02 A a What Season is This – It is Spring.gif",
        codePattern: "02 A a",
        question: "What season is this?",
        answer: "It is spring."
      },
      {
        filename: "02 A c Do You Like Spring – Yes, I Do – No, I Don't.gif",
        codePattern: "02 A c",
        question: "Do you like spring?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 A c When Does Spring Start – in March.gif",
        codePattern: "02 A c",
        question: "When does spring start?",
        answer: "Spring starts in March."
      },
      {
        filename: "02 A d What Do You See in Spring – Flowers.gif",
        codePattern: "02 A d",
        question: "What do you see in spring?",
        answer: "I see flowers in spring."
      },
      {
        filename: "02 A e What Do You See in Spring – Birds.gif",
        codePattern: "02 A e",
        question: "What do you see in spring?",
        answer: "I see birds in spring."
      },
      {
        filename: "02 B a What Season is This – It is Summer.gif",
        codePattern: "02 B a",
        question: "What season is this?",
        answer: "It is summer."
      },
      {
        filename: "02 B b Do You Like Summer – Yes, I Do – No, I Don't.gif",
        codePattern: "02 B b",
        question: "Do you like summer?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 B c is It Hot or Cold in the Summer.gif",
        codePattern: "02 B c",
        question: "Is it hot or cold in the summer?",
        answer: "It is hot in the summer."
      },
      {
        filename: "02 B d Do You Swim in the Summer – Yes, I Do – No, I Don't.gif",
        codePattern: "02 B d",
        question: "Do you swim in the summer?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 be Do You Sunbathe in the Summer – Yes, I Do – No, I Don't.gif",
        codePattern: "02 be",
        question: "Do you sunbathe in the summer?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 C a What Season is This – It is Autumn.gif",
        codePattern: "02 C a",
        question: "What season is this?",
        answer: "It is autumn."
      },
      {
        filename: "02 C b Do You Like Autumn – Yes, I Do – No, I Don't.gif",
        codePattern: "02 C b",
        question: "Do you like autumn?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 C b is It an Autumn or A Winter Tree.gif",
        codePattern: "02 C b",
        question: "Is it an autumn or winter tree?",
        answer: "It is an autumn tree. / It is a winter tree."
      },
      {
        filename: "02 C c is It Warm or Cool in the Autumn.gif",
        codePattern: "02 C c",
        question: "Is it warm or cool in the autumn?",
        answer: "It is cool in the autumn."
      },
      {
        filename: "02 C e is It Rainy or Sunny in the Autumn.gif",
        codePattern: "02 C e",
        question: "Is it rainy or sunny in the autumn?",
        answer: "It is rainy in the autumn. / It is sunny in the autumn."
      },
      {
        filename: "02 D a What Season is This – It is Winter.gif",
        codePattern: "02 D a",
        question: "What season is this?",
        answer: "It is winter."
      },
      {
        filename: "02 D b Do You Like Winter – Yes, I Do – No, I Don't.gif",
        codePattern: "02 D b",
        question: "Do you like winter?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 D c is It Hot or Cold in the Winter.gif",
        codePattern: "02 D c",
        question: "Is it hot or cold in the winter?",
        answer: "It is cold in the winter."
      },
      {
        filename: "02 D d Do You Make Snowmen in the Winter – Yes, I Do – No, I Don't.gif",
        codePattern: "02 D d",
        question: "Do you make snowmen in the winter?",
        answer: "Yes, I do. / No, I don't."
      },
      {
        filename: "02 D e Do You Ice Skate in the Winter – Yes, I Do – No, I Don't.gif",
        codePattern: "02 D e",
        question: "Do you ice skate in the winter?",
        answer: "Yes, I do. / No, I don't."
      }
    ];
  }
  
  // Book 1, Unit 10 (Shapes) hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit10') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
      {
        filename: "02 I A What is It – It is A Heart.gif",
        codePattern: "02 I A",
        question: "What is it?",
        answer: "It is a heart."
      },
      {
        filename: "02 I B is It A Happy or Sad Heart.gif",
        codePattern: "02 I B",
        question: "Is it a happy or sad heart?",
        answer: "It is a happy heart. / It is a sad heart."
      },
      {
        filename: "02 I C is It A Small or Big Heart.gif",
        codePattern: "02 I C",
        question: "Is it a small or big heart?",
        answer: "It is a small heart. / It is a big heart."
      },
      {
        filename: "02 I D is It A Standing or Sitting Heart.gif",
        codePattern: "02 I D",
        question: "Is it a standing or sitting heart?",
        answer: "It is a standing heart. / It is a sitting heart."
      },
      {
        filename: "02 I E is It A Happy or Sad Heart.gif",
        codePattern: "02 I E",
        question: "Is it a happy or sad heart?",
        answer: "It is a happy heart. / It is a sad heart."
      },
      {
        filename: "02 I F Who Has Got the Heart – A Cowboy or Cowgirl.gif",
        codePattern: "02 I F",
        question: "Who has got the heart?",
        answer: "A cowboy has got the heart. / A cowgirl has got the heart."
      },
      {
        filename: "02 I G How Many Hearts Can You See – 3 Hearts.gif",
        codePattern: "02 I G",
        question: "How many hearts can you see?",
        answer: "I can see 3 hearts."
      },
      {
        filename: "02 I H is It A Heart Mouth or A Heart Nose.gif",
        codePattern: "02 I H",
        question: "Is it a heart mouth or a heart nose?",
        answer: "It is a heart mouth. / It is a heart nose."
      },
      {
        filename: "03 I A What is It – It is A Square.gif",
        codePattern: "03 I A",
        question: "What is it?",
        answer: "It is a square."
      },
      {
        filename: "03 I B is It A Drinking or an Eating Sqaure.gif",
        codePattern: "03 I B",
        question: "Is it a drinking or eating square?",
        answer: "It is a drinking square. / It is an eating square."
      },
      {
        filename: "03 I C is It A Man or A Woman Square.gif",
        codePattern: "03 I C",
        question: "Is it a man or woman square?",
        answer: "It is a man square. / It is a woman square."
      },
      {
        filename: "03 I D is It A Happy or Angry Square.gif",
        codePattern: "03 I D",
        question: "Is it a happy or angry square?",
        answer: "It is a happy square. / It is an angry square."
      },
      {
        filename: "03 I E is It A Square Bee or A Square Butterfly.gif",
        codePattern: "03 I E",
        question: "Is it a square bee or square butterfly?",
        answer: "It is a square bee. / It is a square butterfly."
      },
      {
        filename: "03 I F What Shape is Spongebob – He is Sqaure.gif",
        codePattern: "03 I F",
        question: "What shape is SpongeBob?",
        answer: "SpongeBob is square."
      },
      {
        filename: "03 I G is It Square Window or Square Door.gif",
        codePattern: "03 I G",
        question: "Is it a square window or square door?",
        answer: "It is a square window. / It is a square door."
      },
      {
        filename: "03 I H is It A Square Cat or Square Dog.gif",
        codePattern: "03 I H",
        question: "Is it a square cat or square dog?",
        answer: "It is a square cat. / It is a square dog."
      },
      {
        filename: "04 I A What is It – It is A Triangle.gif",
        codePattern: "04 I A",
        question: "What is it?",
        answer: "It is a triangle."
      },
      {
        filename: "04 I B is It Standing or Sitting Triangle.gif",
        codePattern: "04 I B",
        question: "Is it a standing or sitting triangle?",
        answer: "It is a standing triangle. / It is a sitting triangle."
      },
      {
        filename: "04 I C is It A Pizza or A Tortilla Triangle.gif",
        codePattern: "04 I C",
        question: "Is it a pizza or a tortilla triangle?",
        answer: "It is a pizza triangle. / It is a tortilla triangle."
      },
      {
        filename: "04 I E is It A Woman or Man Triangle.gif",
        codePattern: "04 I E",
        question: "Is it a woman or man triangle?",
        answer: "It is a woman triangle. / It is a man triangle."
      },
      {
        filename: "04 I F is It A Running or Walking Triangle.gif",
        codePattern: "04 I F",
        question: "Is it a running or walking triangle?",
        answer: "It is a running triangle. / It is a walking triangle."
      },
      {
        filename: "04 I G What Colour is the Triangle Flag – Red Triangle.gif",
        codePattern: "04 I G",
        question: "What colour is the triangle flag?",
        answer: "The triangle flag is red."
      },
      {
        filename: "04 I H is It A Happy or Angry Triangle.gif",
        codePattern: "04 I H",
        question: "Is it a happy or angry triangle?",
        answer: "It is a happy triangle. / It is an angry triangle."
      },
      {
        filename: "05 I A What is It – It is A Circle.gif",
        codePattern: "05 I A",
        question: "What is it?",
        answer: "It is a circle."
      },
      {
        filename: "05 I B is It A Cat or Dog Circle.gif",
        codePattern: "05 I B",
        question: "Is it a cat or dog circle?",
        answer: "It is a cat circle. / It is a dog circle."
      },
      {
        filename: "05 I C How Many Circles Can You See – 2 Circles.gif",
        codePattern: "05 I C",
        question: "How many circles can you see?",
        answer: "I can see 2 circles."
      },
      {
        filename: "05 I D is It A Circle Sofa or A Circle Chair.gif",
        codePattern: "05 I D",
        question: "Is it a circle sofa or a circle chair?",
        answer: "It is a circle sofa. / It is a circle chair."
      },
      {
        filename: "05 I E is It A Circle Lion or Circle Tiger.gif",
        codePattern: "05 I E",
        question: "Is it a circle lion or circle tiger?",
        answer: "It is a circle lion. / It is a circle tiger."
      },
      {
        filename: "05 I F is It A Circle Dog or Circle Cat.gif",
        codePattern: "05 I F",
        question: "Is it a circle dog or circle cat?",
        answer: "It is a circle dog. / It is a circle cat."
      },
      {
        filename: "05 I G is It A Circle Cookie or Circle Cake.gif",
        codePattern: "05 I G",
        question: "Is it a circle cookie or circle cake?",
        answer: "It is a circle cookie. / It is a circle cake."
      },
      {
        filename: "05 I H Where is the Dog – on the Circle or Under the Circle.gif",
        codePattern: "05 I H",
        question: "Where is the dog?",
        answer: "The dog is on the circle. / The dog is under the circle."
      },
      {
        filename: "06 I A What is It – It is A Rectangle.gif",
        codePattern: "06 I A",
        question: "What is it?",
        answer: "It is a rectangle."
      },
      {
        filename: "06 I B is It A Rectangle Cake or Rectangle Chocolate.gif",
        codePattern: "06 I B",
        question: "Is it a rectangle cake or rectangle chocolate?",
        answer: "It is a rectangle cake. / It is a rectangle chocolate."
      },
      {
        filename: "06 I C is It A Rectangle Telephone or A Rectangle Tablet.gif",
        codePattern: "06 I C",
        question: "Is it a rectangle telephone or rectangle tablet?",
        answer: "It is a rectangle telephone. / It is a rectangle tablet."
      },
      {
        filename: "06 I D is It A Dancing or Sleeping Rectangle.gif",
        codePattern: "06 I D",
        question: "Is it a dancing or sleeping rectangle?",
        answer: "It is a dancing rectangle. / It is a sleeping rectangle."
      },
      {
        filename: "06 I E is It A Rectangle Man or Woman.gif",
        codePattern: "06 I E",
        question: "Is it a rectangle man or woman?",
        answer: "It is a rectangle man. / It is a rectangle woman."
      },
      {
        filename: "06 I F is It A Rectangular Door or Window.gif",
        codePattern: "06 I F",
        question: "Is it a rectangular door or window?",
        answer: "It is a rectangular door. / It is a rectangular window."
      },
      {
        filename: "06 I G is It A Rectangle Telephone or A Rectangle Tablet.gif",
        codePattern: "06 I G",
        question: "Is it a rectangle telephone or rectangle tablet?",
        answer: "It is a rectangle telephone. / It is a rectangle tablet."
      },
      {
        filename: "06 I H How Many Rectangles Can You See in the House – 4 Rectangles.gif",
        codePattern: "06 I H",
        question: "How many rectangles can you see in the house?",
        answer: "I can see 4 rectangles."
      },
      {
        filename: "07 I A What is It – It is A Star.gif",
        codePattern: "07 I A",
        question: "What is it?",
        answer: "It is a star."
      },
      {
        filename: "07 I B How Many Stars Can You See – 5 Stars.gif",
        codePattern: "07 I B",
        question: "How many stars can you see?",
        answer: "I can see 5 stars."
      },
      {
        filename: "07 I C What is in Her Hands – A Star.gif",
        codePattern: "07 I C",
        question: "What is in her hands?",
        answer: "There is a star in her hands."
      },
      {
        filename: "07 I D Where is the Star – in or Under the Christams Tree.gif",
        codePattern: "07 I D",
        question: "Where is the star?",
        answer: "The star is in the Christmas tree. / The star is under the Christmas tree."
      },
      {
        filename: "07 I E is It A Happy or Sad Star.gif",
        codePattern: "07 I E",
        question: "Is it a happy or sad star?",
        answer: "It is a happy star. / It is a sad star."
      },
      {
        filename: "07 I F What Colour is the Star Fish.gif",
        codePattern: "07 I F",
        question: "What colour is the starfish?",
        answer: "The starfish is [colour]."
      },
      {
        filename: "07 I G is Patrick A Circle Fish or A Star Fish.gif",
        codePattern: "07 I G",
        question: "Is Patrick a circle fish or a starfish?",
        answer: "Patrick is a starfish."
      },
      {
        filename: "07 I H is It A Happy or Sad Star.gif",
        codePattern: "07 I H",
        question: "Is it a happy or sad star?",
        answer: "It is a happy star. / It is a sad star."
      },
      {
        filename: "08 G A What is It – It is A Diamond.gif",
        codePattern: "08 G A",
        question: "What is it?",
        answer: "It is a diamond."
      },
      {
        filename: "08 G B What Colour is the Diamond – It is Red.gif",
        codePattern: "08 G B",
        question: "What colour is the diamond?",
        answer: "The diamond is red."
      },
      {
        filename: "08 G C is It A Real or Fake Diamond.gif",
        codePattern: "08 G C",
        question: "Is it a real or fake diamond?",
        answer: "It is a real diamond. / It is a fake diamond."
      },
      {
        filename: "08 G D How Many Diamonds Can You See – 6 Diamonds.gif",
        codePattern: "08 G D",
        question: "How many diamonds can you see?",
        answer: "I can see 6 diamonds."
      },
      {
        filename: "08 G E is It A Small Diamond or A Big Diamond.gif",
        codePattern: "08 G E",
        question: "Is it a small diamond or a big diamond?",
        answer: "It is a small diamond. / It is a big diamond."
      },
      {
        filename: "08 G F How Many Diamonds Can You See – 3 Diamonds.gif",
        codePattern: "08 G F",
        question: "How many diamonds can you see?",
        answer: "I can see 3 diamonds."
      },
      {
        filename: "08 G H How Many Diamonds Can You See – 10 Diamonds.gif",
        codePattern: "08 G H",
        question: "How many diamonds can you see?",
        answer: "I can see 10 diamonds."
      },
      {
        filename: "09 I A What is It – It is an Oval.gif",
        codePattern: "09 I A",
        question: "What is it?",
        answer: "It is an oval."
      },
      {
        filename: "09 I B What Shape is the Head – It is Oval.gif",
        codePattern: "09 I B",
        question: "What shape is the head?",
        answer: "The head is oval."
      },
      {
        filename: "09 I C What Shape are the Eggs – They are Oval.gif",
        codePattern: "09 I C",
        question: "What shape are the eggs?",
        answer: "The eggs are oval."
      },
      {
        filename: "09 I D How Many Ovals Can You See – 5 Ovals.gif",
        codePattern: "09 I D",
        question: "How many ovals can you see?",
        answer: "I can see 5 ovals."
      },
      {
        filename: "09 I E is It A Happy or Sad Oval.gif",
        codePattern: "09 I E",
        question: "Is it a happy or sad oval?",
        answer: "It is a happy oval. / It is a sad oval."
      },
      {
        filename: "09 I F is It A Happy or Sad Oval.gif",
        codePattern: "09 I F",
        question: "Is it a happy or sad oval?",
        answer: "It is a happy oval. / It is a sad oval."
      },
      {
        filename: "09 I G is It an Oval Ball or A Circle Ball.gif",
        codePattern: "09 I G",
        question: "Is it an oval ball or a circle ball?",
        answer: "It is an oval ball. / It is a circle ball."
      },
      {
        filename: "09 I H What Shape is the Baby – It is Oval.gif",
        codePattern: "09 I H",
        question: "What shape is the baby?",
        answer: "The baby is oval."
      }
    ];
  }
  
  // Add more book/unit combinations as needed
  
  // Return the generated entries
  return entries;
}

export interface QuestionAnswerEntry {
  filename: string;
  codePattern: string;
  question: string;
  answer: string;
}

/**
 * Process Excel file for a specific book unit from S3
 * @param bookId The book ID (e.g., "book1")
 * @param unitId The unit ID (e.g., "unit1")
 */
export async function processUnitExcel(bookId: string, unitId: string): Promise<QuestionAnswerEntry[]> {
  try {
    console.log(`Processing Excel for ${bookId}/${unitId}`);
    
    // Check if we have hardcoded data for this book/unit combination
    const hardcodedData = getHardcodedQuestionAnswers(bookId, unitId);
    if (hardcodedData && hardcodedData.length > 0) {
      console.log(`Using ${hardcodedData.length} hardcoded QA entries for ${bookId}/${unitId}`);
      return hardcodedData;
    }
    
    // First, download the Excel file
    const excelFilePath = await downloadExcelFile(bookId);
    if (!excelFilePath) {
      console.error(`Could not download Excel file for ${bookId}`);
      return [];
    }
    
    // Load the workbook
    console.log(`Loading Excel workbook from ${excelFilePath}`);
    const workbook = xlsx.readFile(excelFilePath);
    
    // Process the workbook to extract QA pairs for this unit
    const qaEntries = processExcelWorkbook(workbook, unitId);
    
    console.log(`Processed ${qaEntries.length} QA entries for ${bookId}/${unitId}`);
    
    return qaEntries;
  } catch (error) {
    console.error(`Error processing Excel file for unit: ${error}`);
    return [];
  }
}

/**
 * Process the Excel workbook to extract question-answer pairs for a specific unit
 */
function processExcelWorkbook(workbook: xlsx.WorkBook, unitId: string): QuestionAnswerEntry[] {
  const result: QuestionAnswerEntry[] = [];
  
  try {
    // Get the sheet names
    const sheetNames = workbook.SheetNames;
    console.log(`Excel file contains ${sheetNames.length} sheets: ${sheetNames.join(', ')}`);
    
    // Try all sheets to maximize our chance of finding the right data
    let foundEntries = false;
    
    // Extract unit number from unitId (e.g., "unit1" -> "1")
    const unitNumberMatch = unitId.match(/\d+/);
    if (!unitNumberMatch) {
      console.error(`Could not extract unit number from ${unitId}`);
      return result;
    }
    
    const unitNumber = parseInt(unitNumberMatch[0], 10);
    console.log(`Processing Q&A for unit number: ${unitNumber}`);
    
    // Try each sheet until we find matching entries
    for (const sheetName of sheetNames) {
      console.log(`Processing sheet: ${sheetName}`);
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) continue;
      
      // Convert sheet to JSON
      const rows = xlsx.utils.sheet_to_json<{ [key: string]: any }>(sheet, { 
        header: 'A',
        defval: '',
        blankrows: false
      });
      
      console.log(`Sheet ${sheetName} has ${rows.length} rows`);
      if (rows.length === 0) continue;
      
      // Log a few sample rows for debugging
      console.log("Sample row structure:", JSON.stringify(rows[0]));
      
      // Try to determine column structure
      let codeColumn = 'A';
      let questionColumn = 'B';
      let answerColumn = 'C';
      
      // Try to auto-detect column structure by checking the first few rows
      for (let i = 0; i < Math.min(5, rows.length); i++) {
        const row = rows[i];
        const keys = Object.keys(row);
        
        // Look for a row that has at least 3 columns
        if (keys.length >= 3) {
          // If first column contains code-like patterns (e.g., "01 A a"), use this structure
          const firstColValue = String(row[keys[0]] || '').trim();
          const codeMatch = firstColValue.match(/^\d{2}\s+[A-Za-z]\s+[A-Za-z]/);
          
          if (codeMatch) {
            codeColumn = keys[0];
            questionColumn = keys[1];
            answerColumn = keys[2];
            console.log(`Auto-detected columns: Code=${codeColumn}, Question=${questionColumn}, Answer=${answerColumn}`);
            break;
          }
        }
      }
      
      // Filter rows that belong to this unit
      let entriesInSheet = 0;
      
      for (const row of rows) {
        // Get values from the determined columns
        const codeCol = row[codeColumn] || '';
        const questionCol = row[questionColumn] || '';
        const answerCol = row[answerColumn] || '';
        
        // Skip rows without all required columns
        if (!codeCol || !questionCol || !answerCol) {
          continue;
        }
        
        // Convert to strings
        const codePattern = String(codeCol).trim();
        const question = String(questionCol).trim();
        const answer = String(answerCol).trim();
        
        // Debug logging
        // console.log(`Processing row: Code=${codePattern}, Q=${question}, A=${answer}`);
        
        // Only process rows with valid code patterns
        // Code pattern format: "01 R A" where first digits indicate unit number
        const codeUnitMatch = codePattern.match(/^(\d{2})/);
        if (!codeUnitMatch) {
          continue;
        }
        
        const codeUnit = parseInt(codeUnitMatch[1], 10);
        
        // Check if this row belongs to our unit
        if (codeUnit === unitNumber) {
          // Create multiple filename patterns that could match with content in the material
          const basePattern = codePattern;
          
          // Create several filename variations to increase matching success
          // 1. Standard format: "01 R A What country is this.png"
          const filenameStandard = `${basePattern} ${question.replace(/\?$/, '')}`;
          
          // 2. Format for dashPattern: "01 R A What country is this - It is Poland.png"
          const dashPattern = `${basePattern} ${question.replace(/\?$/, '')} - ${answer}`;
          
          // 3. Format with different spacings: "01R A What country is this.png"
          const compactPattern = `${basePattern.replace(/\s+/g, '')} ${question.replace(/\?$/, '')}`;
          
          // 4. Format with code at the end: "What country is this 01 R A.png"
          const codeAtEnd = `${question.replace(/\?$/, '')} ${basePattern}`;
          
          // Debug logging for pattern matching
          console.log(`Creating entries for code pattern "${basePattern}" with question "${question}"`);
          console.log(`Pattern variants: "${filenameStandard}", "${dashPattern}", "${compactPattern}", "${codeAtEnd}"`);
          
          // Add additional variants with just the code pattern itself
          // This helps match files that just have the code in the name
          const codeOnly = basePattern;
          const codeFirstPart = basePattern.split(' ')[0]; // "01" from "01 R A"
          const codeFirstTwoParts = basePattern.split(' ').slice(0, 2).join(' '); // "01 R" from "01 R A"
          
          // Store all variants in an array for easier management
          const variants = [
            filenameStandard,
            dashPattern,
            compactPattern,
            codeAtEnd,
            codeOnly,
            codeFirstPart,
            codeFirstTwoParts
          ];
          
          // Add entries for each variation of the filename
          for (const variant of variants) {
            result.push({
              filename: variant,
              codePattern: basePattern,
              question,
              answer
            });
          }
          
          // Also add the pattern with just the number (e.g., 01, 02)
          // This is important for matching with files that just have a number in their name
          if (codeFirstPart) {
            result.push({
              filename: codeFirstPart,
              codePattern: basePattern,
              question,
              answer
            });
          }
          
          entriesInSheet++;
        }
      }
      
      if (entriesInSheet > 0) {
        console.log(`Found ${entriesInSheet} Q&A entries for unit ${unitNumber} in sheet "${sheetName}"`);
        foundEntries = true;
      }
    }
    
    // Remove duplicates based on codePattern to avoid redundancy
    const uniqueEntries: { [key: string]: QuestionAnswerEntry } = {};
    
    for (const entry of result) {
      const key = entry.codePattern;
      uniqueEntries[key] = entry;
    }
    
    const finalResult = Object.values(uniqueEntries);
    console.log(`Final result: ${finalResult.length} unique Q&A entries for unit ${unitNumber}`);
    return finalResult;
  } catch (error) {
    console.error(`Error processing Excel workbook: ${error}`);
    return result;
  }
}

export async function downloadExcelFile(bookId: string): Promise<string | null> {
  const tempDir = os.tmpdir();
  const localFilePath = path.join(tempDir, `${bookId}_questions.xlsx`);
  
  // Check if file already exists and is recent (less than 1 hour old)
  if (fs.existsSync(localFilePath)) {
    const stats = fs.statSync(localFilePath);
    const fileAge = Date.now() - stats.mtimeMs;
    
    // If file is less than 1 hour old, use the cached version
    if (fileAge < 60 * 60 * 1000) {
      console.log(`Using cached Excel file for ${bookId} at ${localFilePath}`);
      return localFilePath;
    }
  }
  
  try {
    // Using the exact paths provided for all books
    let possiblePaths = [];
    
    // Book-specific paths based on the exact file naming convention
    if (bookId === 'book1') {
      possiblePaths.push(`${bookId}/VISUAL 1 QUESTIONS.xlsx`);
    } 
    else if (bookId === 'book2' || bookId === 'book3') {
      possiblePaths.push(`${bookId}/VISUAL ${bookId.replace('book', '')}  QUESTIONS.xlsx`); // Note: Two spaces between number and QUESTIONS
    }
    else if (bookId === 'book4') {
      possiblePaths.push(`${bookId}/VISUAL 4 QUESTIONS.xlsx`);
    }
    else if (bookId === 'book5' || bookId === 'book6' || bookId === 'book7') {
      possiblePaths.push(`${bookId}/VISUAL ${bookId.replace('book', '')}  QUESTIONS.xlsx`); // Two spaces for these books
    }
    
    // Add fallback paths in case the specific naming convention changes
    possiblePaths = possiblePaths.concat([
      `${bookId}/VISUAL ${bookId.replace('book', '')} QUESTIONS.xlsx`, // One space
      `${bookId}/VISUAL ${bookId.replace('book', '')}  QUESTIONS.xlsx`, // Two spaces
      `${bookId}/questions.xlsx`,
      `${bookId}/VISUAL-${bookId.replace('book', '')}-QUESTIONS.xlsx`,
      `${bookId}/QA.xlsx`
    ]);
    
    let s3Response = null;
    
    for (const excelPath of possiblePaths) {
      try {
        console.log(`Trying to download Excel from S3: ${excelPath}`);
        s3Response = await s3Client.send(
          new GetObjectCommand({
            Bucket: "visualenglishmaterial",
            Key: excelPath,
          })
        );
        
        if (s3Response.Body) {
          console.log(`Successfully found Excel at ${excelPath}`);
          break;
        }
      } catch (error) {
        console.log(`Excel not found at ${excelPath}`);
      }
    }
    
    if (!s3Response || !s3Response.Body) {
      console.error(`No Excel file found for ${bookId} in any of the expected locations`);
      return null;
    }
    
    // Create writable stream
    const writableStream = fs.createWriteStream(localFilePath);
    
    // Convert the S3 response body to a Node.js Readable stream
    const s3Stream = s3Response.Body as Readable;
    
    // Pipe the S3 stream to the file
    await new Promise((resolve, reject) => {
      s3Stream.pipe(writableStream)
        .on('finish', resolve)
        .on('error', reject);
    });
    
    console.log(`Excel file downloaded to ${localFilePath}`);
    return localFilePath;
  } catch (error) {
    console.error(`Error downloading Excel file for ${bookId}: ${error}`);
    return null;
  }
}