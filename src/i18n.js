import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import ptBR from "./locales/pt-BR.json";
import it from "./locales/it.json";
import ar from "./locales/ar.json";
import de from "./locales/de.json";
import nl from "./locales/nl.json";
import ru from "./locales/ru.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import hi from "./locales/hi.json";
import ml from "./locales/ml.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import tr from "./locales/tr.json";
import pl from "./locales/pl.json";
import sv from "./locales/sv.json";
import id from "./locales/id.json";
import th from "./locales/th.json";
import vi from "./locales/vi.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  pt: { translation: pt },
  "pt-BR": { translation: ptBR },
  it: { translation: it },
  ar: { translation: ar },
  de: { translation: de },
  nl: { translation: nl },
  ru: { translation: ru },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  hi: { translation: hi },
  ml: { translation: ml },
  ta: { translation: ta },
  te: { translation: te },
  tr: { translation: tr },
  pl: { translation: pl },
  sv: { translation: sv },
  id: { translation: id },
  th: { translation: th },
  vi: { translation: vi },
};

const savedLanguage = localStorage.getItem("appLanguage") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: resources[savedLanguage] ? savedLanguage : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
