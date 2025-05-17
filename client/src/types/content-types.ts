// Content types for the SimpleContentViewer

export type QuestionAnswer = {
  question: string;
  answer: string;
};

export type CountryQuestions = {
  [key: string]: QuestionAnswer;
};

export type CountryData = {
  country: string;
  questions: CountryQuestions;
};

export type QuestionDataType = {
  [key: string]: CountryData;
};