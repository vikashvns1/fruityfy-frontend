import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    // Configures how to detect and cache the language
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'navigator'],
      caches: ['localStorage', 'cookie'], // Keeps language choice after refresh
    },

    interpolation: {
      escapeValue: false, 
    },

    react: {
      useSuspense: false,
    },
  });

// Function to update the direction of the document
const updateHtmlAttributes = (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  // This helps CSS selectors like [dir='rtl'] to work instantly
  document.body.dir = dir; 
};

// Update attributes on initial load
updateHtmlAttributes(i18n.language);

// Update attributes whenever language changes
i18n.on('languageChanged', (lng) => {
  updateHtmlAttributes(lng);
});

export default i18n;