import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-react-native-language-detector";

import en from "../locale/en.json";
import ja from "../locale/jp.json";
import uz from "../locale/uz.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ja: { translation: ja },
      uz: { translation: uz },
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
