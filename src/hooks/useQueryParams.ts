import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Helpers for reading and changing the URL query string (?category=Bags&size=M).
 * The shop filters use this so that filter state lives in the URL.
 */
export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Copies the current query string, lets the caller change the copy,
   * then navigates to the same page with the new query string.
   */
  function updateParams(change: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    change(params);

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // replace() instead of push() so every click on a filter does not add
    // a new entry to the browser history. scroll: false keeps the scroll position.
    router.replace(nextUrl, { scroll: false });
  }

  /** Sets a single value (?sort=price-asc). Pass null to remove it. */
  function setParam(key: string, value: string | null) {
    updateParams((params) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
  }

  /** For multi-value params (?size=M&size=L): adds the value, or removes it if already there. */
  function toggleParamValue(key: string, value: string) {
    updateParams((params) => {
      const currentValues = params.getAll(key);
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value];

      params.delete(key);
      nextValues.forEach((nextValue) => params.append(key, nextValue));
    });
  }

  function removeParams(keys: string[]) {
    updateParams((params) => keys.forEach((key) => params.delete(key)));
  }

  return { searchParams, setParam, toggleParamValue, removeParams };
}