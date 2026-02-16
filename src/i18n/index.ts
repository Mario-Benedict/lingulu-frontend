import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import id from './locales/id.json';

// Get saved language from localStorage, or auto-detect from browser
const getInitialLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved) return saved;
  
  // Auto-detect from browser language
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return ['en', 'id'].includes(browserLang) ? browserLang : 'en';
};

const savedLanguage = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
