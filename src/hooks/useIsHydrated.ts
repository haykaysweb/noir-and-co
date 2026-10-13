import { useSyncExternalStore } from "react";

function subscribe() {
  // Nothing ever changes after hydration, so there is nothing to listen to.
  return () => {};
}

/**
 * false on the server and during hydration, true once the page is running in the browser.
 * Lets us show a loading state instead of briefly flashing "Your cart is empty"
 * before the saved cart has been read.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // browser
    () => false, // server
  );
}