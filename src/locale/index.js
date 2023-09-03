import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enUS },
      zh: { translation: zhCN },
    },
    fallbackLng: 'zh',
    preload: ['zh', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;