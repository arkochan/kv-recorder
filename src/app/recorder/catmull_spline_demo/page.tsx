"use client";

import { clear } from "console";
import React, { useEffect, useRef, useState } from "react";
const LINE_WIDTH = 5;
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
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    const pos = getPosition(event);
    const newStroke: Stroke = {
      points: [pos],
      color: "#000000",
      width: LINE_WIDTH,
    };
    setCurrentStroke(newStroke);
  }

  function stopDrawing() {
    setIsDrawing(false);
    if (currentStroke) {
      currentSession.strokes.push(currentStroke);
      console.log(currentStroke.width);
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
  function getCatmullRomSpline(points: Point[], alpha = 0.9): Point[] {
    const splinePoints: Point[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 === points.length ? i + 1 : i + 2];

      for (let t = 0; t < 1; t += 0.1) {
        const t2 = t * t;
        const t3 = t2 * t;

        const q0 = -alpha * t3 + 2 * alpha * t2 - alpha * t;
        const q1 = (2 - alpha) * t3 + (alpha - 3) * t2 + 1;
        const q2 = (alpha - 2) * t3 + (3 - 2 * alpha) * t2 + alpha * t;
        const q3 = alpha * t3 - alpha * t2;

        const x = q0 * p0.x + q1 * p1.x + q2 * p2.x + q3 * p3.x;
        const y = q0 * p0.y + q1 * p1.y + q2 * p2.y + q3 * p3.y;

        splinePoints.push({ x, y, time: points[i].time });
      }
    }
    return splinePoints;
  }

  async function drawSession(session: Session, smoothness = 0) {
    //clear out the canvas
    clearCanvas();
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (const stroke of session.strokes) {
      ctx.lineWidth = stroke.width;
      console.log(stroke.width, stroke.points.length);
      ctx.strokeStyle = stroke.color;
      ctx.lineCap = "round";
      // replace the points with the catmull rom spline points
      await drawStroke(stroke, ctx);
      // stroke.points = getCatmullRomSpline(stroke.points);
      // drawStroke(stroke, ctx, "green");
    }
  }
  async function drawStroke(
    stroke: Stroke,
    ctx: CanvasRenderingContext2D,
    color?: string
  ) {
    ctx.lineWidth = stroke.width;
    ctx.strokeStyle = color || stroke.color;
    ctx.lineCap = "round";

    // replace the points with the catmull rom spline points
    //stroke.points = getCatmullRomSpline(stroke.points);

    for (let i = 0; i < stroke.points.length - 1; i++) {
      const startPoint = stroke.points[i];
      const endPoint = stroke.points[i + 1];
      await sleep(endPoint.time - startPoint.time);
      console.log(startPoint.time, endPoint.time);
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }
  }
  function sleep(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  function clearCanvas() {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  return (
    <>
      <button onClick={() => drawSession(currentSession)}>Draw</button>
      <button onClick={() => clearCanvas()}>Clear</button>
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
    </>
  );
}
