export const getTranslatedValue = (field, lang = "en") => {
  if (!field) return "";

  // যদি object না হয় (fallback case)
  if (typeof field !== "object") return field;

  return field[lang] || field["en"] || field["bn"] || "";
};
