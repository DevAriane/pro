import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import fr from "./translations/fr.json";
import en from "./translations/en.json";
import de from "./translations/al.json";

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  de: { translation: de },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode || "fr";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: ["fr", "en", "de"].includes(deviceLanguage) ? deviceLanguage : "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;