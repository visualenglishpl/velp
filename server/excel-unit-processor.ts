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
  
  // Book 1, Unit 2 hardcoded data from the provided text file
  if (bookId === 'book1' && unitId === 'unit2') {
    console.log(`Using hardcoded data for ${bookId}/${unitId} from text file`);
    return [
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