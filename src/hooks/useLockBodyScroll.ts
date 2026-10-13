import { useEffect } from "react";

/**
 * Stops the page behind a drawer or overlay from scrolling while it is open.
 */
export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Cleanup runs when the drawer closes: put the page back the way it was.
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}