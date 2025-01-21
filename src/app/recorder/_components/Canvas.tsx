"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { Config, Point } from "@/types/types";
import { init } from "next/dist/compiled/webpack/webpack";
import { cn } from "@/lib/utils/tailwind";
import { CanvasService } from "../_service/canvas";
import useGridGenerator from "@/hooks/useGridGenerator";

export default function Canvas({ className, canvas, canvasRef, configRef }: { className?: string, canvas: CanvasService, canvasRef: React.RefObject<HTMLCanvasElement | null>, configRef: React.RefObject<Config | null> }) {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  useGridGenerator(configRef, gridCanvasRef);
  return (
    <div className="h-canvas">
      <canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // zIndex: , // Ensure it stays behind all elements
          // pointerEvents: "none", // Prevent interactions
          touchAction: 'none'
        }}
        ref={canvasRef}
        // onMouseDown={(e) => canvas.handleMouseDown(e)}
        // onMouseUp={(e) => canvas.handleMouseUp(e)}
        // onMouseMove={(e) => canvas.handleMouseMove(e)}
        {...canvas.pointerProps}
      // onPointerDown={pointerDown}
      // onPointerUp={pointerUp}
      // onPointerMove={pointerMove}
      />
      <canvas
        ref={gridCanvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Ensure it stays behind all elements
          pointerEvents: "none", // Prevent interactions
        }}
      >
      </canvas>
    </div>
  );
}
