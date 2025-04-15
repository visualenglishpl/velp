import React from 'react';

interface QAData {
  country: string;
  question: string;
  answer: string;
  hasData: boolean;
}

interface QuestionAnswerDisplayProps {
  material: {
    description: string;
    content: string;
    title: string;
  };
}

// Simple function to determine the content's country based on filename
const determineCountry = (content: string): string => {
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
};

// Helper function to get question and answer for a material
export const getQuestionAnswer = (material: any): QAData => {
  const content = material.content.toLowerCase();
  const title = material.title || '';
  const description = material.description || '';
  
  // Try to extract from filename patterns
  if (content.match(/\d+\s+[a-z]\s+[a-z]/i)) {
    const country = determineCountry(content);
    
    if (country === 'POLAND') {
      if (content.includes('a')) {
        return {
          country,
          question: "What country is this?",
          answer: "It is Poland.",
          hasData: true
        };
      } else if (content.includes('b')) {
        return {
          country,
          question: "Where is this flag from?",
          answer: "It is from Poland.",
          hasData: true
        };
      } else {
        return {
          country,
          question: "What can you see in this image?",
          answer: "It shows something from Poland.",
          hasData: true
        };
      }
    }
    
    if (country) {
      return {
        country,
        question: "What country is this?",
        answer: `It is ${country}.`,
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
};

export const QuestionAnswerDisplay: React.FC<QuestionAnswerDisplayProps> = ({ material }) => {
  // Get question and answer data
  const qaData = getQuestionAnswer(material);

  if (qaData.hasData) {
    return (
      <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
        {/* Show country name if available */}
        {qaData.country && (
          <div className="mb-1 flex items-center justify-center">
            <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
              {qaData.country}
            </h3>
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          {/* Show question */}
          {qaData.question && (
            <div className="flex gap-2">
              <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
              <span className="text-gray-800 text-base">{qaData.question}</span>
            </div>
          )}
          
          {/* Show answer */}
          {qaData.answer && (
            <div className="flex gap-2 mt-2">
              <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
              <span className="font-medium text-indigo-900 text-base">{qaData.answer}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // For materials with no data but with title
  if (material.title) {
    return (
      <div className="mb-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
        <div className="font-medium text-gray-700">
          {material.title}
        </div>
      </div>
    );
  }
  
  return null;
};

export default QuestionAnswerDisplay;