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