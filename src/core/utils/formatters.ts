import i18n from "../i18n/i18n";


export const formatCurrency = (
  amount: number, 
  currency: string = "XAF"
): string => {
  const locale = i18n.language || "fr";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString(locale)} ${currency}`;
  }
};


export const formatDateShort = (date: Date | string | number): string => {
  const d = new Date(date);
  const locale = i18n.language || "fr";

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
};


export const formatDateLong = (date: Date | string | number): string => {
  const d = new Date(date);
  const locale = i18n.language || "fr";

  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
};


export const formatTime = (date: Date | string | number): string => {
  const d = new Date(date);
  const locale = i18n.language || "fr";

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};