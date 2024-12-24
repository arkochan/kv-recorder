"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

interface Session {
  strokes: Stroke[];
}

let startTime = Date.now();
export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([{ strokes: [] }]);
  const [currentSession, setCurrentSession] = useState<Session>({
    strokes: [],
  });
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    dpr = Math.max(dpr, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);

    // Disable zooming
  }, []);

  function startDrawing(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.PointerEvent<HTMLCanvasElement>
  ) {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    const pos = getPosition(event);
    const newStroke: Stroke = { points: [pos], color: "#000000", width: 1 };
    setCurrentStroke(newStroke);
  }

  function stopDrawing() {
    setIsDrawing(false);
    if (currentStroke) {
      currentSession.strokes.push(currentStroke);
      setCurrentSession(currentSession);
    }
    setCurrentStroke(null);
  }

  function draw(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.PointerEvent<HTMLCanvasElement>
  ) {
    if (!isDrawing) return;

    const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
    const pos = getPosition(event);
    if (currentStroke) {
      currentStroke.points.push(pos);
      ctx.beginPath();
      ctx.moveTo(
        currentStroke.points[currentStroke.points.length - 2].x,
        currentStroke.points[currentStroke.points.length - 2].y
      );
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  }

  function getPosition(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.PointerEvent<HTMLCanvasElement>
  ) {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      time: Date.now() - startTime,
    };
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      onPointerDown={startDrawing}
      onPointerUp={stopDrawing}
      onPointerMove={draw}
      className="w-full h-full"
    />
  );
}
