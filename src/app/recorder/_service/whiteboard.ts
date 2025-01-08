import { Point, Stroke } from "@/types/types";

export class Whiteboard {
  public points: Point[] = [];
  public started = false;
  public strokes: Stroke[] = [];
  private smoothFactor = 4;
  public size = 0;
  private dpr = 2;
  public tool: string = "pen";
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
    this.points.push(p);
    this.size++;
  }

  pointerMove(p: Point) {
    if (this.size % this.smoothFactor !== 0) {
      this.points.pop();
    }
    this.points.push(p);
    this.size++;
  }
  pointerUp(p: Point) {
    this.started = false;
    this.points.push(p);
    this.strokes.push({ points: this.points, width: 2, color: 'black' });
    this.points = [];
    this.size = 0;
  }
}
