"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { draw, startDraw, endDraw, clear, setDpr, setSmoothness } from "../_service/whiteboard";
import { Point } from "@/types/types";
import { init } from "next/dist/compiled/webpack/webpack";
import { cn } from "@/lib/utils/tailwind";
let startTime = Date.now();
var memCanvas = document.createElement('canvas');
var memCtx = memCanvas.getContext('2d');

export default function Canvas({ className }: { className?: string }) {
  const [smooth, setSmooth] = useState(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  function getMousePos(e: React.MouseEvent<HTMLCanvasElement>): Point {
    if (!canvasRef.current) return { x: 0, y: 0, time: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now() - startTime,
    };
  }
  function getPointerPos(e: React.PointerEvent<HTMLCanvasElement>): Point {
    if (!canvasRef.current) return { x: 0, y: 0, time: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now() - startTime,
    };
  }
  function mouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = getMousePos(e);
    startDraw(p);
  };
  function mouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = getMousePos(e);
    draw(p, canvasRef.current as HTMLCanvasElement, memCanvas);
  };
  function mouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = getMousePos(e);
    endDraw(p, canvasRef.current as HTMLCanvasElement, memCanvas);
  }
  function pointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = getPointerPos(e);
    startDraw(p);
  };
  function pointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = getPointerPos(e);
    draw(p, canvasRef.current as HTMLCanvasElement, memCanvas);
  };
  function pointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = getPointerPos(e);
    endDraw(p, canvasRef.current as HTMLCanvasElement, memCanvas);
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    //get dpr and set memanvas and canvas value
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    setDpr(dpr);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    memCanvas.width = rect.width * dpr;
    memCanvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const memCtx = memCanvas.getContext('2d');
    if (!memCtx) return;
    memCtx.scale(dpr, dpr);
    if (!ctx) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [canvasRef]);

  return (
    <div className={cn("", className)}>
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        onPointerDown={pointerDown}
        onPointerUp={pointerUp}
        onPointerMove={pointerMove}
        className="border w-full flex-1"
      />
    </div>
  );
}
