"use client";
import { useRef, useState, MouseEvent, useEffect } from "react";
import { LazyBrush } from "lazy-brush";

type Point = { x: number; y: number; time: number }; // Includes time
type Stroke = Point[];

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke>([]);
  const [startTime, setStartTime] = useState<number | null>(null); // Track drawing start time

  // Initialize LazyBrush
  const lazyBrush = useRef(
    new LazyBrush({ radius: 10, enabled: true }),
  ).current;

  const getDeltaTime = () => {
    return startTime ? Date.now() - startTime : 0;
  };

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Update LazyBrush to start from the initial point
    lazyBrush.update({ x, y }, { both: true });

    setCurrentStroke([{ x, y, time: getDeltaTime() }]); // Add time
    setIsDrawing(true);
    setStartTime(Date.now());
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Update LazyBrush with the new pointer position
    lazyBrush.update({ x, y });

    // Get the smoothed position from LazyBrush
    const { x: smoothX, y: smoothY } = lazyBrush.getBrush();

    const newPoint: Point = { x: smoothX, y: smoothY, time: getDeltaTime() };
    setCurrentStroke((prev) => [...prev, newPoint]);

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    if (currentStroke.length > 0) {
      const lastPoint = currentStroke[currentStroke.length - 1];
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(smoothX, smoothY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke([]);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setStrokes([]);
  };

  const saveStrokes = () => {
    console.log("Saved strokes with timestamps:", strokes);
    alert("Drawing saved with timestamps to console!");
  };

  const playback = async () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    clearCanvas();

    for (const stroke of strokes) {
      for (let i = 0; i < stroke.length - 1; i++) {
        const point = stroke[i];
        const nextPoint = stroke[i + 1];

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();

        const delay = nextPoint.time - point.time; // Calculate delay between points
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black", cursor: "crosshair" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={clearCanvas} style={{ marginRight: "10px" }}>
          Clear
        </button>
        <button onClick={saveStrokes} style={{ marginRight: "10px" }}>
          Save
        </button>
        <button onClick={playback}>Playback</button>
      </div>
    </div>
  );
}
