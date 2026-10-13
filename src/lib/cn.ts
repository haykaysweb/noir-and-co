/**
 * Joins class names together and skips anything falsy.
 *
 *   cn("p-4", isActive && "bg-ink-900", undefined)  ->  "p-4 bg-ink-900"
 *
 * This keeps conditional styling readable compared with template strings.
 */
export function cn(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}