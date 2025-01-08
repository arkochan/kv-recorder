import { Point, Stroke, Event } from "@/types/types";

export class Whiteboard {
  public points: Point[] = [];
  public started = false;
  public Events: Event[] = [];
  private smoothFactor = 4;
  public size = 0;
  private dpr = 2;
  public tool: string = "pen";
  public startTime: number = 0;
  constructor({ smoothFactor }: { smoothFactor: number }) {
    this.smoothFactor = smoothFactor;
    this.Events = [];
  }

  startSession(time: number) {
    this.startTime = time;
  }


  pointerDown(p: Point) {
    this.size++;
    this.points.push(p);
  }

  pointerMove(p: Point) {
    if (this.tool !== "eraser" && this.size % this.smoothFactor !== 0) {
      this.points.pop();
    }
    this.points.push(p);
    this.size++;
  }

  pointerUp(p: Point) {
    this.started = false;
    const currentEvent = {
      type: this.tool,
      startTime: p.time,
      points: this.points,
      ...(this.tool === "pen" && { stroke: { width: 2, color: 'black' } })
    };
    this.Events.push(currentEvent);
    this.size = 0;
    this.points = [];
    console.log("this.Events", this.Events);
  }
}
