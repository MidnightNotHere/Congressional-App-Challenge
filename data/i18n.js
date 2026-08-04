/* =========================================================================
   Quantum4Colorado — shared data layer: bilingual content resolution
   Translations live inline in the content, as an { en, es } pair right
   alongside the field they translate — e.g. `title: { en: "...", es: "..." }`
   — rather than in a separate translation file that could drift out of
   sync with the source content.

   `pick` resolves one of those fields to the current language. It is
   deliberately defensive: a field that hasn't been translated yet (still
   a plain string, or an object missing one language) degrades gracefully
   instead of throwing, so translation can roll out to one section of the
   app at a time without breaking the sections that haven't been done yet.
   ========================================================================= */

export const LANGUAGES = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "es", label: "Español", shortLabel: "ES" },
];

export const DEFAULT_LANGUAGE = "en";

/* Resolve a content field to the given language.
   - { en: "...", es: "..." } -> field[lang], falling back to field.en
   - a plain string/number/etc. (not yet translated) -> returned as-is
   - null/undefined -> returned as-is */
export function pick(field, lang) {
  if (field == null) return field;
  if (typeof field === "object" && !Array.isArray(field) && ("en" in field || "es" in field)) {
    return field[lang] ?? field.en ?? field.es ?? "";
  }
  return field;
}

/* Convenience curried form: t("es")(someField) === pick(someField, "es").
   Lets call sites read `t(item.title)` once `t` is built from the current
   language, instead of threading `lang` through every call. */
export function makeTranslator(lang) {
  return (field) => pick(field, lang);
}
