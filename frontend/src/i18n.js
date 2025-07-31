// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../src/locales/en/translation.json';
import translationFR from '../src/locales/fr/translation.json';
import translationKW from '../src/locales/kw/translation.json';
import translationCN from '../src/locales/cn/translation.json';
import translationSP from '../src/locales/sp/translation.json';
import translationGN from '../src/locales/gn/translation.json';
import translationJP from '../src/locales/jp/translation.json';


const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  kw: {
    translation: translationKW
  },
  cn: {
    translation: translationCN
  },
  gn: {
    translation: translationGN,
  },
  sp: {
    translation: translationSP
  },
  jp: {
    translation: translationJP
  },
};

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // fallback if no detected lang
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;