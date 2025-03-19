import React from 'react';
import styles from './LanguageToggle.module.css';
import { Language } from '../../types/Language';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === Language.EN ? Language.RU : Language.EN;
    onLanguageChange(newLanguage);
  };

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleLanguage}
      aria-label={`Switch to ${currentLanguage === Language.EN ? 'Russian' : 'English'}`}
    >
      {currentLanguage === Language.EN ? '🇬🇧' : '🇷🇺'}
    </button>
  );
};

export default LanguageToggle;
