import React from 'react';

interface QAData {
  country: string;
  question: string;
  answer: string;
  hasData: boolean;
  category?: string;
}

interface QADatabaseEntry {
  code: string;
  question: string;
  answer: string;
  country?: string;
  category?: string;
}

interface QuestionAnswerDisplayProps {
  material: {
    id: number;
    description: string;
    content: string;
    title: string;
  };
  isEditMode?: boolean;
}

// Utility functions
const formatText = {
  // Remove file extensions and code patterns, properly capitalize text
  cleanFileName: (filename: string): string => {
    if (!filename) return '';
    // Remove file extensions
    let cleaned = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
    // Remove technical codes like "01 RA" or "05 LC"
    cleaned = cleaned.replace(/\d+\s+[a-z]\s+[a-z]/i, '');
    // Properly capitalize first letter of each word
    cleaned = cleaned.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
    return cleaned;
  },
  
  // Determine country from content
  determineCountry: (content: string): string => {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('poland') || contentLower.includes('01 r')) {
      return 'POLAND';
    } else if (contentLower.includes('britain') || contentLower.includes('uk') || contentLower.includes('02 n')) {
      return 'BRITAIN / UK';
    } else if (contentLower.includes('ireland') || contentLower.includes('03 g')) {
      return 'NORTHERN IRELAND';
    } else if (contentLower.includes('scotland') || contentLower.includes('04 l')) {
      return 'SCOTLAND';
    } else if (contentLower.includes('england') || contentLower.includes('05 l')) {
      return 'ENGLAND';
    } else if (contentLower.includes('wales') || contentLower.includes('06 h')) {
      return 'WALES';
    } else if (contentLower.includes('australia') || contentLower.includes('07 l')) {
      return 'AUSTRALIA';
    } else if (contentLower.includes('usa') || contentLower.includes('america') || contentLower.includes('08 m')) {
      return 'USA';
    }
    
    return '';
  }
};

// Helper function to get question and answer for a material
function getQuestionAnswerFromData(material: any): QAData {
  const content = material.content || '';
  const description = material.description || '';
  
  // Clean the title
  const title = material.title ? formatText.cleanFileName(material.title) : '';
  
  // Function to extract code pattern from filename (like "01 R A" from various formats)
  const extractCodePattern = (text: string): string => {
    // Match patterns like "01 R A" or "05 L C" anywhere in the text
    const codeMatch = text.match(/(\d{2})\s+([a-z])\s+([a-z])/i);
    if (codeMatch) {
      // Return standardized format for matching: "01 r a"
      return `${codeMatch[1]} ${codeMatch[2].toLowerCase()} ${codeMatch[3].toLowerCase()}`;
    }
    return '';
  };
  
  // Extract code pattern from content and description
  const contentCode = extractCodePattern(content);
  const descriptionCode = extractCodePattern(description);
  
  // Use the first code pattern found
  const codePattern = contentCode || descriptionCode;
  
  // Map of code patterns to exact questions and answers
  const qaDatabase: QADatabaseEntry[] = [
    // POLAND
    { code: "01 r a", country: "POLAND", question: "What country is this?", answer: "It is Poland." },
    { code: "01 r b", country: "POLAND", question: "Where is this flag from?", answer: "It is from Poland." },
    { code: "01 r c", country: "POLAND", question: "What colors are the Polish flag?", answer: "They are red and white." },
    { code: "01 r d", country: "POLAND", question: "Where are these people from?", answer: "They are from Poland." },
    { code: "01 r f", country: "POLAND", question: "What nationality are they?", answer: "They are Polish." },
    { code: "01 r i", country: "POLAND", question: "What is the capital of Poland?", answer: "It is Warsaw." },
    { code: "01 r k", country: "POLAND", question: "What language does she speak?", answer: "She speaks Polish." },
    
    // BRITAIN / UK
    { code: "02 n a", country: "BRITAIN / UK", question: "Which countries are in Britain?", answer: "They are England, Scotland, and Wales." },
    { code: "02 n c", country: "BRITAIN / UK", question: "Where is this flag from?", answer: "It is from Britain." },
    { code: "02 n d", country: "BRITAIN / UK", question: "What nationality is he?", answer: "He is British." },
    { code: "02 n g", country: "BRITAIN / UK", question: "Who is Britain's leader?", answer: "He is King Charles." },
    { code: "02 n l", country: "BRITAIN / UK", question: "Where is this money from?", answer: "It is from the UK." },
    
    // NORTHERN IRELAND
    { code: "03 g a", country: "NORTHERN IRELAND", question: "Which country is colored pink?", answer: "It is Northern Ireland." },
    { code: "03 g c", country: "NORTHERN IRELAND", question: "What is the capital of Northern Ireland?", answer: "It is Belfast." },
    { code: "03 g d", country: "NORTHERN IRELAND", question: "What nationality is he?", answer: "He is Northern Irish." },
    
    // SCOTLAND
    { code: "04 l a", country: "SCOTLAND", question: "What country is this?", answer: "It is Scotland." },
    { code: "04 l b", country: "SCOTLAND", question: "Where is this flag from?", answer: "It is from Scotland." },
    { code: "04 l c", country: "SCOTLAND", question: "What is Scotland's capital?", answer: "It is Edinburgh." },
    { code: "04 l d", country: "SCOTLAND", question: "What nationality is he?", answer: "He is Scottish." },
    { code: "04 l i", country: "SCOTLAND", question: "Where is the Loch Ness Monster from?", answer: "It is from Scotland." },
    
    // ENGLAND
    { code: "05 l a", country: "ENGLAND", question: "What country is this?", answer: "It is England." },
    { code: "05 l b", country: "ENGLAND", question: "Where is this flag from?", answer: "It is from England." },
    { code: "05 l c", country: "ENGLAND", question: "What is England's capital?", answer: "It is London." },
    { code: "05 l d", country: "ENGLAND", question: "What nationality is he?", answer: "He is English." },
    { code: "05 l e", country: "ENGLAND", question: "Where is he from?", answer: "He is from England." },
    { code: "05 l f", country: "ENGLAND", question: "Where are they from?", answer: "They are from England." },
    { code: "05 l g", country: "ENGLAND", question: "Is an English breakfast big?", answer: "Yes, it is big." },
    { code: "05 l h", country: "ENGLAND", question: "What type of food is it?", answer: "It is English food." },
    
    // WALES
    { code: "06 h a", country: "WALES", question: "What country is this?", answer: "It is Wales." },
    { code: "06 h b", country: "WALES", question: "Where is this flag from?", answer: "It is from Wales." },
    { code: "06 h c", country: "WALES", question: "Describe the Welsh flag.", answer: "It is white, green, and has a dragon." },
    { code: "06 h d", country: "WALES", question: "What is Wales's capital?", answer: "It is Cardiff." },
    { code: "06 h f", country: "WALES", question: "What nationality is he?", answer: "He is Welsh." },
    { code: "06 h", country: "WALES", question: "What language is this?", answer: "It is Welsh." },
    
    // AUSTRALIA
    { code: "07 l a", country: "AUSTRALIA", question: "What country is this?", answer: "It is Australia." },
    { code: "07 l b", country: "AUSTRALIA", question: "Where is this flag from?", answer: "It is from Australia." },
    { code: "07 l d", country: "AUSTRALIA", question: "What nationality is he?", answer: "He is Australian." },
    { code: "07 l h", country: "AUSTRALIA", question: "Name three Australian animals.", answer: "They are kangaroos, koalas, and wombats." },
    
    // USA
    { code: "08 m a", country: "USA", question: "What country is this?", answer: "It is the USA." },
    { code: "08 m b", country: "USA", question: "Where is this flag from?", answer: "It is from the USA." },
    { code: "08 m c", country: "USA", question: "How many stars are on the American flag?", answer: "There are 50 stars." },
    { code: "08 m e", country: "USA", question: "What nationality is he?", answer: "He is American." },
    { code: "08 m k", country: "USA", question: "What type of food is this?", answer: "It is American food." },
    
    // UK/British Isles Review
    { code: "09 a b", country: "BRITAIN / UK", question: "Which countries are on the British flag?", answer: "They are England, Scotland, and Northern Ireland." },
    { code: "10 a b", country: "BRITAIN / UK", question: "What countries are in the British Isles?", answer: "They are the UK and Ireland." },
    
    // MOBILE PHONES
    { code: "01 a a", category: "MOBILE PHONES", question: "What is this?", answer: "It is a phone." },
    { code: "01 a b", category: "MOBILE PHONES", question: "Do you have a phone?", answer: "Yes, I have a phone / No, I do not have a phone." },
    { code: "01 a c", category: "MOBILE PHONES", question: "What phone do you have?", answer: "I have a [iPhone/Samsung/Android]." },
    { code: "01 a d", category: "MOBILE PHONES", question: "Who has a phone in your house?", answer: "My [mother/father/sister] has a phone." },
    { code: "01 a e", category: "MOBILE PHONES", question: "Are these old or new phones?", answer: "They are old/new phones." },
    { code: "01 a f", category: "MOBILE PHONES", question: "Do you shop using your phone?", answer: "Yes, I shop using my phone / No, I do not." },
    { code: "01 a g", category: "MOBILE PHONES", question: "Do you play games on your phone?", answer: "Yes, I play games / No, I do not." },
    { code: "01 a h", category: "MOBILE PHONES", question: "Are mobile phones cheap or expensive?", answer: "They are cheap/expensive." },
    { code: "01 a i", category: "MOBILE PHONES", question: "Do you take selfies with your phone?", answer: "Yes, I take selfies / No, I do not." },
    { code: "01 a j", category: "MOBILE PHONES", question: "Do you listen to music with your phone?", answer: "Yes, I listen to music / No, I do not." },
    { code: "01 a k", category: "MOBILE PHONES", question: "Do you take photos with your phone?", answer: "Yes, I take photos / No, I do not." },
    
    // CHARGERS & BATTERIES
    { code: "02 a a", category: "CHARGERS & BATTERIES", question: "What is this?", answer: "It is a charger." },
    { code: "02 a b", category: "CHARGERS & BATTERIES", question: "Do you have a charger?", answer: "Yes, I have a charger / No, I do not." },
    { code: "02 a c", category: "CHARGERS & BATTERIES", question: "Do you have a wireless charger?", answer: "Yes, I do / No, I do not." },
    { code: "02 a d", category: "CHARGERS & BATTERIES", question: "How long does your battery last?", answer: "It lasts [1 hour/5 hours]." },
    { code: "02 a e", category: "CHARGERS & BATTERIES", question: "What color is your charger?", answer: "It is [red/black/white]." },
    { code: "02 a f", category: "CHARGERS & BATTERIES", question: "Is your phone battery full or empty?", answer: "It is full/empty." },
    { code: "02 a i", category: "CHARGERS & BATTERIES", question: "How long does it take to charge your phone?", answer: "It takes [30 minutes/2 hours]." },
    { code: "02 b b", category: "CHARGERS & BATTERIES", question: "How often do you charge your phone?", answer: "I charge it [once/twice] a day." },
    { code: "02 b c", category: "CHARGERS & BATTERIES", question: "Is your charger fast or slow?", answer: "It is fast/slow." },
    
    // HEADPHONES & EARPHONES
    { code: "03 a a", category: "HEADPHONES & EARPHONES", question: "What are these?", answer: "They are headphones." },
    { code: "03 a c", category: "HEADPHONES & EARPHONES", question: "What are these?", answer: "They are earphones." },
    { code: "03 a e", category: "HEADPHONES & EARPHONES", question: "Do you prefer headphones, earbuds, or earphones?", answer: "I prefer [headphones/earbuds/earphones]." },
    { code: "03 a f", category: "HEADPHONES & EARPHONES", question: "Do you prefer wireless or wired earphones?", answer: "I prefer wireless/wired earphones." },
    { code: "03 a h", category: "HEADPHONES & EARPHONES", question: "What color headphones do you like?", answer: "I like [blue/red/black] headphones." },
    { code: "03 a i", category: "HEADPHONES & EARPHONES", question: "Are these headphones big or small?", answer: "They are big/small." },
    { code: "03 c a", category: "HEADPHONES & EARPHONES", question: "What is he doing?", answer: "He is listening to music with headphones." },
    { code: "03 c d", category: "HEADPHONES & EARPHONES", question: "Do you listen to music with headphones every day?", answer: "Yes, I do / No, I do not." },
    { code: "03 c e", category: "HEADPHONES & EARPHONES", question: "Do you listen to music while studying?", answer: "Yes, I do / No, I do not." },
    { code: "03 c h", category: "HEADPHONES & EARPHONES", question: "What music do you listen to?", answer: "I listen to [pop/rock/classical] music." },
    
    // SPEAKERS
    { code: "04 a a", category: "SPEAKERS", question: "What are these?", answer: "They are speakers." },
    { code: "04 a c", category: "SPEAKERS", question: "Do you have a mini speaker at home?", answer: "Yes, I do / No, I do not." },
    { code: "04 a h", category: "SPEAKERS", question: "Do you prefer speakers or headphones?", answer: "I prefer speakers/headphones." },
    { code: "04 a j", category: "SPEAKERS", question: "Does your phone have speakers?", answer: "Yes, it does / No, it does not." },
    { code: "04 a m", category: "SPEAKERS", question: "Where are the speakers in a car?", answer: "They are [in the doors/on the dashboard]." },
    
    // COMPUTERS & LAPTOPS
    { code: "05 a a", category: "COMPUTERS & LAPTOPS", question: "What is this?", answer: "It is a laptop." },
    { code: "05 a c", category: "COMPUTERS & LAPTOPS", question: "Do you have a laptop in your bedroom?", answer: "Yes, I do / No, I do not." },
    { code: "05 a e", category: "COMPUTERS & LAPTOPS", question: "Do you have a gaming laptop?", answer: "Yes, I do / No, I do not." },
    { code: "05 a f", category: "COMPUTERS & LAPTOPS", question: "Do you prefer a laptop or a computer?", answer: "I prefer a laptop/computer." },
    { code: "05 a l", category: "COMPUTERS & LAPTOPS", question: "Do you watch films on your laptop?", answer: "Yes, I do / No, I do not." },
    { code: "05 b b", category: "COMPUTERS & LAPTOPS", question: "Do you surf the internet every day?", answer: "Yes, I do / No, I do not." },
    { code: "05 b g", category: "COMPUTERS & LAPTOPS", question: "Do you surf the internet with your phone?", answer: "Yes, I do / No, I do not." },
    
    // GAME CONSOLES
    { code: "06 a b", category: "GAME CONSOLES", question: "What is this?", answer: "It is a game console." },
    { code: "06 a e", category: "GAME CONSOLES", question: "Do you have a game console at home?", answer: "Yes, I do / No, I do not." },
    { code: "06 b b", category: "GAME CONSOLES", question: "What games do you play?", answer: "I play [Fortnite/Minecraft/Roblox]." },
    { code: "06 b d", category: "GAME CONSOLES", question: "Do you prefer gaming on a console or laptop?", answer: "I prefer a console/laptop." },
    
    // CAMERAS
    { code: "07 a b", category: "CAMERAS", question: "What type of camera is this?", answer: "It is a digital camera." },
    { code: "07 a g", category: "CAMERAS", question: "Do you prefer a digital or phone camera?", answer: "I prefer a digital/phone camera." },
    { code: "07 b a", category: "CAMERAS", question: "What is he doing?", answer: "He is taking photos." },
    { code: "07 b d", category: "CAMERAS", question: "Are you good at taking photos?", answer: "Yes, I am / No, I am not." },
    
    // OTHER GADGETS
    { code: "08 a a", category: "OTHER GADGETS", question: "What is this?", answer: "It is a USB drive." },
    { code: "08 a c", category: "OTHER GADGETS", question: "How big is your USB drive?", answer: "It is [32GB/64GB]." },
    { code: "09 a a", category: "OTHER GADGETS", question: "What is this?", answer: "It is an e-book reader." },
    { code: "09 a c", category: "OTHER GADGETS", question: "Do you prefer e-books or paper books?", answer: "I prefer e-books/paper books." },
    { code: "10 c aa", category: "OTHER GADGETS", question: "What is this?", answer: "It is a printer." },
    { code: "12 c aa", category: "OTHER GADGETS", question: "What is this?", answer: "It is a remote control." }
  ];
  
  // Check for an exact match in our database using the code pattern
  if (codePattern) {
    console.log("Found code pattern: ", codePattern);
    const matchedQA = qaDatabase.find(qa => qa.code === codePattern);
    if (matchedQA) {
      return { 
        country: matchedQA.country || matchedQA.category || "",
        question: matchedQA.question, 
        answer: matchedQA.answer, 
        hasData: true 
      };
    }
  }
  
  // Try to extract question directly from content/description
  const contentLower = content.toLowerCase();
  const country = formatText.determineCountry(content);
  
  // Try to match by the first part of the code (e.g., "01 r")
  if (codePattern) {
    const mainCode = codePattern.substring(0, 4); // Like "01 r" 
    const countryQAs = qaDatabase.filter(qa => qa.code.startsWith(mainCode));
    if (countryQAs.length > 0) {
      // Use the first question for this country
      return { 
        country: countryQAs[0].country || countryQAs[0].category || "",
        question: countryQAs[0].question, 
        answer: countryQAs[0].answer, 
        hasData: true 
      };
    }
  }
  
  // Try to match by filename content
  if (contentLower.includes('flag')) {
    if (country) {
      return { 
        country,
        question: "Where is this flag from?", 
        answer: `It is from ${country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()}.`, 
        hasData: true 
      };
    }
  } else if (contentLower.includes('capital')) {
    if (country === 'POLAND') {
      return { country, question: "What is the capital of Poland?", answer: "It is Warsaw.", hasData: true };
    } else if (country === 'ENGLAND') {
      return { country, question: "What is England's capital?", answer: "It is London.", hasData: true };
    } else if (country === 'SCOTLAND') {
      return { country, question: "What is Scotland's capital?", answer: "It is Edinburgh.", hasData: true };
    }
  } else if (contentLower.includes('nationality')) {
    if (country) {
      let nationality = '';
      if (country === 'POLAND') nationality = 'Polish';
      else if (country === 'ENGLAND') nationality = 'English';
      else if (country === 'SCOTLAND') nationality = 'Scottish';
      else if (country === 'USA') nationality = 'American';
      else if (country === 'WALES') nationality = 'Welsh';
      else if (country === 'AUSTRALIA') nationality = 'Australian';
      
      if (nationality) {
        return { 
          country,
          question: "What nationality is he?", 
          answer: `He is ${nationality}.`, 
          hasData: true 
        };
      }
    }
  }
  
  // Default country question if nothing specific was found
  if (country) {
    return {
      country,
      question: "What can you see in this image?",
      answer: `Something from ${country}.`,
      hasData: true
    };
  }
  
  // Fallback to title parsing if available
  if (title) {
    if (title.includes('→')) {
      const parts = title.split('→');
      return {
        country: '',
        question: parts[0].trim(),
        answer: parts[1].trim(),
        hasData: true
      };
    } else if (title.includes('?')) {
      return {
        country: '',
        question: title.split('?')[0].trim() + '?',
        answer: description,
        hasData: true
      };
    } else if (title.match(/^[A-Z\s]+\s\(Files/)) {
      return {
        country: title.split('(')[0].trim(),
        question: "What country is this?",
        answer: `It is ${title.split('(')[0].trim()}.`,
        hasData: true
      };
    }
  }
  
  // Default fallback
  return { 
    country: "",
    question: "", 
    answer: "",
    hasData: false
  };
}

function QuestionAnswerDisplay({ material, isEditMode }: QuestionAnswerDisplayProps) {
  // Get question and answer data
  const qaData = React.useMemo(() => getQuestionAnswerFromData(material), [material]);
  const [editedQuestion, setEditedQuestion] = React.useState<string>(qaData.question);
  const [editedAnswer, setEditedAnswer] = React.useState<string>(qaData.answer);
  const [editedCountry, setEditedCountry] = React.useState<string>(qaData.country);
  
  // Update state when material changes
  React.useEffect(() => {
    setEditedQuestion(qaData.question);
    setEditedAnswer(qaData.answer);
    setEditedCountry(qaData.country);
  }, [material.id, qaData.question, qaData.answer, qaData.country]);
  
  // Save custom questions locally
  React.useEffect(() => {
    if (!isEditMode) return;
    
    // Save to localStorage
    const customQA = JSON.parse(localStorage.getItem('customQA') || '{}');
    customQA[material.id] = {
      question: editedQuestion,
      answer: editedAnswer,
      country: editedCountry
    };
    localStorage.setItem('customQA', JSON.stringify(customQA));
  }, [isEditMode, material.id, editedQuestion, editedAnswer, editedCountry]);
  
  // Load custom questions if available
  React.useEffect(() => {
    const customQA = JSON.parse(localStorage.getItem('customQA') || '{}');
    if (customQA[material.id]) {
      setEditedQuestion(customQA[material.id].question);
      setEditedAnswer(customQA[material.id].answer);
      setEditedCountry(customQA[material.id].country);
    }
  }, [material.id]);

  if (qaData.hasData || editedQuestion || editedAnswer) {
    return (
      <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
        {/* Show country name if available */}
        {(qaData.country || editedCountry) && (
          <div className="mb-1 flex items-center justify-center">
            {isEditMode ? (
              <input
                type="text"
                value={editedCountry}
                onChange={(e) => setEditedCountry(e.target.value)}
                className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200 text-center focus:ring-2 focus:ring-blue-300 outline-none"
              />
            ) : (
              <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                {editedCountry || qaData.country}
              </h3>
            )}
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          {/* Show question */}
          <div className="text-center">
            {isEditMode ? (
              <textarea
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                className="text-gray-800 text-base bg-white p-1 rounded w-full border-blue-200 border focus:ring-2 focus:ring-blue-300 outline-none text-center"
                rows={2}
                placeholder="Question"
              />
            ) : (
              <span className="text-gray-800 text-base font-medium block">{editedQuestion || qaData.question}</span>
            )}
          </div>
          
          {/* Show answer */}
          <div className="mt-2 text-center">
            {isEditMode ? (
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                className="font-medium text-indigo-900 text-base bg-white p-1 rounded w-full border-indigo-200 border focus:ring-2 focus:ring-indigo-300 outline-none text-center"
                rows={2}
                placeholder="Answer"
              />
            ) : (
              <span className="font-medium text-indigo-900 text-base block">{editedAnswer || qaData.answer}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // For materials with no data but with title
  if (material.title) {
    const cleanedTitle = formatText.cleanFileName(material.title);
    
    return (
      <div className="mb-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
        {isEditMode ? (
          <textarea
            value={cleanedTitle}
            readOnly
            className="font-medium text-gray-700 bg-white p-1 rounded w-full border-gray-200 border"
          />
        ) : (
          <div className="font-medium text-gray-700">
            {cleanedTitle}
          </div>
        )}
      </div>
    );
  }
  
  return null;
}

export default QuestionAnswerDisplay;