import { Point, Stroke } from "@/types/types";

export class Whiteboard {
  public points: Point[] = [];
  public started = false;
  public strokes: Stroke[] = [];
  private smoothFactor = 4;
  public size = 0;
  private dpr = 2;
  private mode: "draw" | "erase" | "recatangle" | "circle" | "line" = "draw";
  public startTime: number = 0;

  constructor({ smoothFactor }: { smoothFactor: number }) {
    this.smoothFactor = smoothFactor;
    this.strokes = [];
    this.points = [];
  }

  startSession(time: number) {
    this.startTime = time;
  }

  pointerDown(p: Point) {
    if (this.mode === "draw") {
      this.started = true;
    }
    this.points.push(p);
    this.size++;
  }

  pointerMove(p: Point) {
    if (!this.started)
      return;
    if (this.mode === "draw") {
      if (this.size % this.smoothFactor !== 0) {
        this.points.pop();
      }
      this.points.push(p);
      this.size++;
    }
  }
  pointerUp(p: Point) {
    if (!this.started)
      return;
    if (this.mode === "draw") {
      this.points.push(p);
      this.strokes.push({ points: this.points, width: 2, color: 'black' });
      this.points = [];
      this.size = 0;
    }
  }
}
