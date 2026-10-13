// Creating a formatter is relatively expensive, so we create it once and reuse it.
const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0, // All prices in this store are whole dollars.
});

/** formatPrice(1200) -> "$1,200" */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}