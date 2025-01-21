import { Config } from "@/types/types";
export const config: Config = {
  grid: {
    appearance: {
      lineColor: "#cccccc",
      lineWidth: "0.4",
      gridSpacing: "30",
      backgroundColor: "#eeeeee",
    },
  },
  keybindings: {
    tools: {
      pen: "P",
      eraser: "E",
    },
    actions: {
      undo: "Ctrl+Z",
      redo: "Ctrl+Y",
    },
  },
};
