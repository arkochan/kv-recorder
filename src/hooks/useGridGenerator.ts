import { Config } from "@/types/types";
import { useEffect, RefObject } from "react";
// import { Config } from "@/types/types";

// Define the type for the grid configuration
interface GridConfig {
  lineColor: string; // Color of grid lines
  lineWidth: number; // Width of grid lines
  gridSpacing: number; // Spacing between grid lines
  backgroundColor: string; // Optional background color
}

// Define the type for the overall config object
// interface Config {
//   grid: GridConfig; // Grid configuration
//   keybindings?: Record<string, any>; // Optional keybindings or other sections
// }

// Custom hook to generate the grid
export default function useGridGenerator(
  // gridConfig: GridConfig,
  configRef: React.RefObject<Config | null>,
  gridCanvasRef: RefObject<HTMLCanvasElement | null>
) {

  // Function to generate the gridlines
  const generateGrid = (
    ctx: CanvasRenderingContext2D,
    config: GridConfig
  ) => {
    const { lineColor, lineWidth, gridSpacing, backgroundColor } = config;
    const { width, height } = ctx.canvas;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Set grid line styles
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  if (!configRef.current) {
    console.error("Config not found");
    return;
  }
  var gridConfig: GridConfig =
  {
    lineColor: configRef.current.grid.appearance.lineColor,
    lineWidth: parseFloat(configRef.current.grid.appearance.lineWidth),
    gridSpacing: parseInt(configRef.current.grid.appearance.gridSpacing),
    backgroundColor: configRef.current.grid.appearance.backgroundColor
  };
  console.log(gridConfig.lineWidth + 0.5);
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Set canvas size to cover the full viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Generate the grid
        generateGrid(ctx, gridConfig);
      }
    }

    // Handle window resizing to update canvas dimensions
    const handleResize = () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          generateGrid(ctx, gridConfig);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gridConfig, gridCanvasRef]);
}
