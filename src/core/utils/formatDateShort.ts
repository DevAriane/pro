import i18n from "../i18n/i18n";


export const formatDateShort = (date: Date | string | number): string => {
  const d = new Date(date);
  const locale = i18n.language || "fr";

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
};