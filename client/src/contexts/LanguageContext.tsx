import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'pl';

// Define translations interface
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
  addTranslations: (newTranslations: Translations) => void;
}

// Default translations
const defaultTranslations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    pl: 'Strona główna',
  },
  'nav.method': {
    en: 'Method',
    pl: 'Metoda',
  },
  'nav.books': {
    en: 'Books',
    pl: 'Książki',
  },
  'nav.pricing': {
    en: 'Pricing',
    pl: 'Cennik',
  },
  'nav.contact': {
    en: 'Contact',
    pl: 'Kontakt',
  },
  'nav.about': {
    en: 'About Us',
    pl: 'O nas',
  },
  'nav.cart': {
    en: 'Cart',
    pl: 'Koszyk',
  },
  
  // Homepage
  'home.hero.title': {
    en: 'Interactive English Learning',
    pl: 'Interaktywna nauka angielskiego',
  },
  'home.hero.subtitle': {
    en: 'For a visual generation',
    pl: 'Dla wizualnego pokolenia',
  },
  'home.hero.cta': {
    en: 'Start Learning',
    pl: 'Rozpocznij naukę',
  },
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  translations: defaultTranslations,
  addTranslations: () => {},
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'pl' || savedLanguage === 'en') ? savedLanguage : 'en';
  });
  
  // Store translations
  const [translations, setTranslations] = useState<Translations>(defaultTranslations);
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Function to set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    
    // Fallback to English if translation is missing
    if (translations[key] && translations[key]['en']) {
      return translations[key]['en'];
    }
    
    // Return the key as fallback if no translation found
    return key;
  };
  
  // Function to add more translations
  const addTranslations = (newTranslations: Translations) => {
    setTranslations(prevTranslations => ({
      ...prevTranslations,
      ...newTranslations
    }));
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations, addTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);