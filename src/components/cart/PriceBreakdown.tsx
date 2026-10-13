import { calculateShipping } from "@/lib/pricing";
import { formatPrice } from "@/lib/format";

type PriceBreakdownProps = {
  subtotal: number;
  /** The cart page adds a line explaining that tax is calculated at checkout. */
  showTaxNote?: boolean;
};

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm text-ink-600">
      <span>{label}</span>
      <span className="font-medium text-ink-900">{value}</span>
    </div>
  );
}

/**
 * Subtotal, shipping and total.
 * Used by the cart drawer, the cart page and checkout, so the three
 * always show exactly the same numbers.
 */
export default function PriceBreakdown({ subtotal, showTaxNote = false }: PriceBreakdownProps) {
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div>
      <div className="space-y-3 border-b border-sand-200 pb-4">
        <PriceRow label="Subtotal" value={formatPrice(subtotal)} />
        <PriceRow label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
        {showTaxNote && <PriceRow label="Estimated tax" value="Calculated at checkout" />}
      </div>

      <div className="flex justify-between pt-4 text-base font-semibold text-ink-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}