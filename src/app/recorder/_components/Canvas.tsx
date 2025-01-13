"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { Point } from "@/types/types";
import { init } from "next/dist/compiled/webpack/webpack";
import { cn } from "@/lib/utils/tailwind";
import { CanvasService } from "../_service/canvas";

export default function Canvas({ className, canvas, canvasRef }: { className?: string, canvas: CanvasService, canvasRef: React.RefObject<HTMLCanvasElement | null> }) {

  return (
    <canvas
      className="border-2 border-green-500 min-h-screen"
      ref={canvasRef}
      // onMouseDown={(e) => canvas.handleMouseDown(e)}
      // onMouseUp={(e) => canvas.handleMouseUp(e)}
      // onMouseMove={(e) => canvas.handleMouseMove(e)}
      {...canvas.pointerProps}
    // onPointerDown={pointerDown}
    // onPointerUp={pointerUp}
    // onPointerMove={pointerMove}
    />
  );
}
