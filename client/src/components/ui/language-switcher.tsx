import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './button';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };
  
  if (variant === 'minimal') {
    return (
      <button 
        onClick={toggleLanguage}
        className="text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        {language === 'en' ? 'PL' : 'EN'}
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleLanguage}
        className={`px-2 ${language === 'en' ? 'bg-gray-100' : ''}`}
      >
        EN
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleLanguage}
        className={`px-2 ${language === 'pl' ? 'bg-gray-100' : ''}`}
      >
        PL
      </Button>
    </div>
  );
};

export { LanguageSwitcher };