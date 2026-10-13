import { useEffect } from "react";

/**
 * Calls onEscape when the Escape key is pressed, but only while isActive is true.
 * Used so drawers and overlays can be closed from the keyboard.
 */
export function useEscapeKey(onEscape: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onEscape();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, isActive]);
}