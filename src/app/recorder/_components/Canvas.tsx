"use client";

import React, { useEffect, useRef, useState } from "react";
import { draw, startDraw, endDraw, clearCanvas, initCanvas } from "../_service/whiteboard";
import { Point } from "@/types/types";
import { init } from "next/dist/compiled/webpack/webpack";


let startTime = Date.now();

export default function Canvas() {
  useEffect(() => {
    if (canvasRef.current) {
      initCanvas(canvasRef.current);
    }
  }, []);
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
    draw(p, canvasRef.current as HTMLCanvasElement);
  };
  function mouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = getMousePos(e);
    endDraw(p, canvasRef.current as HTMLCanvasElement);
  }
  function pointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = getPointerPos(e);
    startDraw(p);
  };
  function pointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = getPointerPos(e);
    draw(p, canvasRef.current as HTMLCanvasElement);
  };
  function pointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = getPointerPos(e);
    endDraw(p, canvasRef.current as HTMLCanvasElement);
  }

  return (
    <>
      <button onClick={() => clearCanvas(canvasRef.current as HTMLCanvasElement)}>
        Clear
      </button>
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        onPointerDown={pointerDown}
        onPointerUp={pointerUp}
        onPointerMove={pointerMove}
        className="border w-full h-full"
      />
    </>
  );
}
