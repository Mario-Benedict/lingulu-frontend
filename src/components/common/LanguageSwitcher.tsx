import React from 'react';
import { useTranslation } from 'react-i18next';
import usFlag from '@assets/common/united-states.png';
import idFlag from '@assets/common/indonesia.png';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';

  const handleToggle = () => {
    const newLang = isEnglish ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 bg-gray-100 rounded-full p-1 transition-all duration-300 hover:bg-gray-200 ${className ?? ''}`}
    >
      {/* English Flag */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          isEnglish ? 'bg-primary shadow-md scale-110' : 'bg-transparent'
        }`}
      >
        <img src={usFlag} alt="English" className="w-7 h-7 object-contain rounded-sm" />
      </div>
      
      {/* Indonesian Flag */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          !isEnglish ? 'bg-primary shadow-md scale-110' : 'bg-transparent'
        }`}
      >
        <img src={idFlag} alt="Indonesia" className="w-7 h-7 object-contain rounded-sm" />
      </div>
    </button>
  );
};

export default LanguageSwitcher;
