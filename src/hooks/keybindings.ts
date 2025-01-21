import { useEffect } from "react";
import { Config } from "@/types/types";

// Utility to handle keybinding detection
const matchKeybinding = (
  keyCombination: string,
  keybindings: Record<string, Record<string, string>>
): { category: string, action: string } | null => {
  for (const [category, actions] of Object.entries(keybindings)) {
    for (const [action, key] of Object.entries(actions)) {
      if (keyCombination === key) {
        return { category, action };
      }
    }
  }
  return null;
};

// Custom hook for keybinding management
export const useKeybindings = (
  configRef: React.RefObject<Config | null>,
  onKeyDown: ({ category, action }: { category: string, action: string }) => void,
  onKeyUp: ({ category, action }: { category: string, action: string }) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle key up events if needed
      if (configRef.current === null) return;
      var keyCombination = "";
      if (event.key === "Shift") {
        keyCombination = "Shift";
      }
      else {
        keyCombination = `${event.ctrlKey ? "Ctrl+" : ""}${event.key.toUpperCase()}`;
      }
      const result = matchKeybinding(keyCombination, configRef.current.keybindings);
      if (result) {
        onKeyDown(result);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      // Handle key up events if needed
      if (configRef.current === null) return;
      var keyCombination = "";
      if (event.key === "Shift") {
        keyCombination = "Shift";
      }
      else {
        keyCombination = `${event.ctrlKey ? "Ctrl+" : ""}${event.key.toUpperCase()}`;
      }
      const result = matchKeybinding(keyCombination, configRef.current.keybindings);
      if (result) {
        onKeyUp(result);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
};
