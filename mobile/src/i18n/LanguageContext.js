import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGES, DEFAULT_LANGUAGE, makeTranslator } from "../../data/i18n.js";

const LANG_STORAGE_KEY = "q4co-lang";

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  t: makeTranslator(DEFAULT_LANGUAGE),
  ready: false,
});

/* AsyncStorage is async, so the persisted language loads after first
   render — screens render in English for one frame on cold start, then
   switch if Spanish was saved. `ready` is exposed in case a screen wants
   to avoid a visible flash, though none currently need to. */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(LANG_STORAGE_KEY)
      .then((saved) => {
        if (saved && LANGUAGES.some((l) => l.code === saved)) setLangState(saved);
      })
      .finally(() => setReady(true));
  }, []);

  const setLang = (l) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_STORAGE_KEY, l).catch(() => {
      /* persistence failed — language still works for this session */
    });
  };

  const t = makeTranslator(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export { LANGUAGES };
