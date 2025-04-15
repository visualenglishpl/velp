import React from 'react';

interface QAData {
  country: string;
  question: string;
  answer: string;
  hasData: boolean;
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
  const content = material.content.toLowerCase();
  
  // Clean the title
  const title = material.title ? formatText.cleanFileName(material.title) : '';
  const description = material.description || '';
  
  // Pre-defined exact Q&A pairs from the document
  const exactQAPairs: Record<string, { question: string, answer: string }> = {
    // POLAND
    "01 r a": { question: "What country is this?", answer: "It is Poland." },
    "01 r b": { question: "Where is this flag from?", answer: "It is from Poland." },
    "01 r c": { question: "What colors are the Polish flag?", answer: "They are red and white." },
    "01 r d": { question: "Where are these people from?", answer: "They are from Poland." },
    "01 r f": { question: "What nationality are they?", answer: "They are Polish." },
    "01 r i": { question: "What is the capital of Poland?", answer: "It is Warsaw." },
    "01 r k": { question: "What language does she speak?", answer: "She speaks Polish." },
    
    // BRITAIN / UK
    "02 n a": { question: "Which countries are in Britain?", answer: "They are England, Scotland, and Wales." },
    "02 n c": { question: "Where is this flag from?", answer: "It is from Britain." },
    "02 n d": { question: "What nationality is he?", answer: "He is British." },
    "02 n g": { question: "Who is Britain's leader?", answer: "He is King Charles." },
    "02 n l": { question: "Where is this money from?", answer: "It is from the UK." },
    
    // NORTHERN IRELAND
    "03 g a": { question: "Which country is colored pink?", answer: "It is Northern Ireland." },
    "03 g c": { question: "What is the capital of Northern Ireland?", answer: "It is Belfast." },
    "03 g d": { question: "What nationality is he?", answer: "He is Northern Irish." },
    
    // SCOTLAND
    "04 l a": { question: "What country is this?", answer: "It is Scotland." },
    "04 l b": { question: "Where is this flag from?", answer: "It is from Scotland." },
    "04 l c": { question: "What is Scotland's capital?", answer: "It is Edinburgh." },
    "04 l d": { question: "What nationality is he?", answer: "He is Scottish." },
    "04 l i": { question: "Where is the Loch Ness Monster from?", answer: "It is from Scotland." },
    
    // ENGLAND
    "05 l a": { question: "What country is this?", answer: "It is England." },
    "05 l b": { question: "Where is this flag from?", answer: "It is from England." },
    "05 l c": { question: "What is England's capital?", answer: "It is London." },
    "05 l d": { question: "What nationality is he?", answer: "He is English." },
    "05 l e": { question: "Where is he from?", answer: "He is from England." },
    "05 l f": { question: "Where are they from?", answer: "They are from England." },
    "05 l g": { question: "Is an English breakfast big?", answer: "Yes, it is big." },
    "05 l h": { question: "What type of food is it?", answer: "It is English food." },
    
    // WALES
    "06 h a": { question: "What country is this?", answer: "It is Wales." },
    "06 h b": { question: "Where is this flag from?", answer: "It is from Wales." },
    "06 h c": { question: "Describe the Welsh flag.", answer: "It is white, green, and has a dragon." },
    "06 h d": { question: "What is Wales's capital?", answer: "It is Cardiff." },
    "06 h f": { question: "What nationality is he?", answer: "He is Welsh." },
    "06 h": { question: "What language is this?", answer: "It is Welsh." },
    
    // AUSTRALIA
    "07 l a": { question: "What country is this?", answer: "It is Australia." },
    "07 l b": { question: "Where is this flag from?", answer: "It is from Australia." },
    "07 l d": { question: "What nationality is he?", answer: "He is Australian." },
    "07 l h": { question: "Name three Australian animals.", answer: "They are kangaroos, koalas, and wombats." },
    
    // USA
    "08 m a": { question: "What country is this?", answer: "It is the USA." },
    "08 m b": { question: "Where is this flag from?", answer: "It is from the USA." },
    "08 m c": { question: "How many stars are on the American flag?", answer: "There are 50 stars." },
    "08 m e": { question: "What nationality is he?", answer: "He is American." },
    "08 m k": { question: "What type of food is this?", answer: "It is American food." },
    
    // UK/British Isles Review
    "09 a b": { question: "Which countries are on the British flag?", answer: "They are England, Scotland, and Northern Ireland." },
    "10 a b": { question: "What countries are in the British Isles?", answer: "They are the UK and Ireland." }
  };
  
  // Try to match the content with a code pattern (e.g., "01 r a")
  for (const codePattern in exactQAPairs) {
    if (content.toLowerCase().includes(codePattern.toLowerCase())) {
      const country = formatText.determineCountry(content);
      const { question, answer } = exactQAPairs[codePattern];
      return { country, question, answer, hasData: true };
    }
  }
  
  // Try to extract from filename patterns if no direct match was found
  if (content.match(/\d+\s+[a-z]\s+[a-z]/i)) {
    const country = formatText.determineCountry(content);
    
    // If nothing specific was found, return a default question based on country
    if (country) {
      return {
        country,
        question: "What can you see in this image?",
        answer: `Something from ${country}.`,
        hasData: true
      };
    }
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
          <div>
            {isEditMode ? (
              <textarea
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                className="text-gray-800 text-base bg-white p-1 rounded w-full border-blue-200 border focus:ring-2 focus:ring-blue-300 outline-none"
                rows={2}
                placeholder="Question"
              />
            ) : (
              <span className="text-gray-800 text-base font-medium block">{editedQuestion || qaData.question}</span>
            )}
          </div>
          
          {/* Show answer */}
          <div className="mt-2">
            {isEditMode ? (
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                className="font-medium text-indigo-900 text-base bg-white p-1 rounded w-full border-indigo-200 border focus:ring-2 focus:ring-indigo-300 outline-none"
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