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
  
  // Try to extract from filename patterns
  if (content.match(/\d+\s+[a-z]\s+[a-z]/i)) {
    const country = formatText.determineCountry(content);
    
    // England questions
    if (country === 'ENGLAND' || content.includes('05 l')) {
      if (content.includes('05 l a')) {
        return { country, question: "What country is this?", answer: "It is England.", hasData: true };
      } else if (content.includes('05 l b')) {
        return { country, question: "Where is this flag from?", answer: "It is from England.", hasData: true };
      } else if (content.includes('05 l c')) {
        return { country, question: "What is England's capital?", answer: "It is London.", hasData: true };
      } else if (content.includes('05 l d')) {
        return { country, question: "What is his nationality?", answer: "He is English.", hasData: true };
      } else if (content.includes('05 l e')) {
        return { country, question: "Where is he from?", answer: "He is from England.", hasData: true };
      } else if (content.includes('05 l f')) {
        return { country, question: "Where are they from?", answer: "They are from England.", hasData: true };
      } else if (content.includes('05 l g')) {
        return { country, question: "Is an English breakfast big or small?", answer: "It is big.", hasData: true };
      } else if (content.includes('05 l h')) {
        return { country, question: "What type of food is it?", answer: "It is English food.", hasData: true };
      }
    }
    
    // Scotland questions
    else if (country === 'SCOTLAND' || content.includes('04 l')) {
      if (content.includes('04 l a')) {
        return { country, question: "What country is this?", answer: "It is Scotland.", hasData: true };
      } else if (content.includes('04 l b')) {
        return { country, question: "Where is this flag from?", answer: "It is from Scotland.", hasData: true };
      } else if (content.includes('04 l c')) {
        return { country, question: "What is Scotland's capital?", answer: "It is Edinburgh.", hasData: true };
      } else if (content.includes('04 l d')) {
        return { country, question: "What nationality is he?", answer: "He is Scottish.", hasData: true };
      } else if (content.includes('04 l i')) {
        return { country, question: "Where is the Loch Ness Monster from?", answer: "It is from Scotland.", hasData: true };
      }
    }
    
    // Poland questions
    else if (country === 'POLAND' || content.includes('01 r')) {
      if (content.includes('01 r a')) {
        return { country, question: "What country is this?", answer: "It is Poland.", hasData: true };
      } else if (content.includes('01 r b')) {
        return { country, question: "Where is this flag from?", answer: "It is from Poland.", hasData: true };
      } else if (content.includes('01 r c')) {
        return { country, question: "What colors are the Polish flag?", answer: "They are red and white.", hasData: true };
      } else if (content.includes('01 r d')) {
        return { country, question: "Where are these people from?", answer: "They are from Poland.", hasData: true };
      } else if (content.includes('01 r f')) {
        return { country, question: "What nationality are they?", answer: "They are Polish.", hasData: true };
      } else if (content.includes('01 r i')) {
        return { country, question: "What is the capital of Poland?", answer: "It is Warsaw.", hasData: true };
      } else if (content.includes('01 r k')) {
        return { country, question: "What language does she speak?", answer: "She speaks Polish.", hasData: true };
      }
    }
    
    // USA questions
    else if (country === 'USA' || content.includes('08 m')) {
      if (content.includes('08 m a')) {
        return { country, question: "What country is this?", answer: "It is the USA.", hasData: true };
      } else if (content.includes('08 m b')) {
        return { country, question: "Where is this flag from?", answer: "It is from the USA.", hasData: true };
      } else if (content.includes('08 m c')) {
        return { country, question: "How many stars are on the American flag?", answer: "There are 50 stars.", hasData: true };
      } else if (content.includes('08 m e')) {
        return { country, question: "What nationality is he?", answer: "He is American.", hasData: true };
      } else if (content.includes('08 m k')) {
        return { country, question: "What type of food is this?", answer: "It is American food.", hasData: true };
      }
    }
    
    // Default country question if we have a country but no specific match
    if (country) {
      // We can try to extract question from the filename if it follows a pattern
      if (content.includes('what')) {
        return { country, question: `What ${content.split('what')[1].split('–')[0].trim()}?`, 
                 answer: content.split('–')[1]?.trim() || `It is from ${country}.`, hasData: true };
      } else if (content.includes('where')) {
        return { country, question: `Where ${content.split('where')[1].split('–')[0].trim()}?`, 
                 answer: content.split('–')[1]?.trim() || `It is from ${country}.`, hasData: true };
      } else if (content.includes('how')) {
        return { country, question: `How ${content.split('how')[1].split('–')[0].trim()}?`, 
                 answer: content.split('–')[1]?.trim() || `It is from ${country}.`, hasData: true };
      }
      
      // If nothing specific was found, return a default question
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