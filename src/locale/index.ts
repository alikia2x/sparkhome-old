import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enUS },
      zh: { translation: zhCN },
    },
    fallbackLng: 'en',
    preload: ['zh', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;