import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Stores a value in the browser's localStorage and keeps React in sync with it.
 *
 * Why useSyncExternalStore? localStorage does not exist on the server. This
 * hook is React's official way to read from "outside" data safely:
 *   - on the server (and during hydration) React uses the server snapshot: null
 *   - right after hydration React switches to the real browser value
 * so the server HTML and the first browser render always match, with no
 * hydration errors. It also updates when another browser tab changes the cart.
 */

const STORAGE_CHANGE_EVENT = "noir-and-co:storage-change";

/** Tells React when localStorage changed (this tab via our event, other tabs via "storage"). */
function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_CHANGE_EVENT, onStoreChange);
  };
}

// localStorage can throw (private browsing, blocked cookies), so every access is wrapped.
function readRawValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parseJson<T>(rawValue: string | null, fallbackValue: T): T {
  if (rawValue === null) return fallbackValue;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallbackValue; // Corrupted data: start fresh instead of crashing.
  }
}

/**
 * IMPORTANT: fallbackValue must be a stable reference (a constant defined
 * outside the component). A fresh [] on every render would look like a change
 * to React and cause extra re-renders.
 */
export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const rawValue = useSyncExternalStore(
    subscribe,
    () => readRawValue(key), // browser snapshot
    () => null, // server snapshot
  );

  const value = useMemo(() => parseJson(rawValue, fallbackValue), [rawValue, fallbackValue]);

  const setValue = useCallback(
    (update: T | ((currentValue: T) => T)) => {
      const currentValue = parseJson(readRawValue(key), fallbackValue);
      const nextValue =
        typeof update === "function" ? (update as (current: T) => T)(currentValue) : update;

      try {
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      } catch {
        // Storage full or blocked: the change simply will not be saved.
      }

      // Tell subscribe() above that the value changed so React re-renders.
      window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
    },
    [key, fallbackValue],
  );

  return [value, setValue] as const;
}