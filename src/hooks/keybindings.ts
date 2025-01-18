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
  onKeyMatch: ({ category, action }: { category: string, action: string }) => void
) => {
  // 
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyCombination = `${event.ctrlKey ? "Ctrl+" : ""}${event.key.toUpperCase()}`;
      if (configRef.current === null) return;
      const result = matchKeybinding(keyCombination, configRef.current.keybindings);
      if (result) {
        onKeyMatch(result);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
