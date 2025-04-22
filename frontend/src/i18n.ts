import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import kk from './locales/kk.json';
import ru from './locales/ru.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
      kk: typeof kk;
      ru: typeof ru;
    };
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      kk: { translation: kk },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;