import { CURRENCY_CODE, CURRENCY_LOCALE } from "@/lib/constants";

// Creating a formatter so we create it once and reuse it.
const priceFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: "currency",
  currency: CURRENCY_CODE,
  maximumFractionDigits: 0, // All prices in this store are whole naira.
});

/** formatPrice(480000) -> "₦480,000" */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}