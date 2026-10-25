import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import direct de vos fichiers de traduction JSON
import fr from "./translations/fr.json";
import en from "./translations/en.json";
import de from "./translations/al.json";

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  de: { translation: de },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // Langue par défaut fixe pour éviter le module natif
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false, // React gère déjà les XSS
    },
  });

export default i18n;