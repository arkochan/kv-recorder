"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { Point } from "@/types/types";
import { init } from "next/dist/compiled/webpack/webpack";
import { cn } from "@/lib/utils/tailwind";
import { CanvasService } from "../_service/canvas";

export default function Canvas({ className, canvasRef }: { className?: string, canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const canvas = new CanvasService();

  useEffect(() => {
    canvas.init({ canvas: canvasRef.current as HTMLCanvasElement, dpr: 2 });
  }, []);
  return (
    <canvas
      className="border-2 border-green-500 min-h-screen"
      ref={canvasRef}
      onMouseDown={(e) => canvas.handleMouseDown(e)}
      onMouseUp={(e) => canvas.handleMouseUp(e)}
      onMouseMove={(e) => canvas.handleMouseMove(e)}
    // onPointerDown={pointerDown}
    // onPointerUp={pointerUp}
    // onPointerMove={pointerMove}
    />
  );
}
