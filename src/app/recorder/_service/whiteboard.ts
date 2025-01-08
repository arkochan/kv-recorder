import { Point, Stroke, Event } from "@/types/types";

export class Whiteboard {
  public started = false;
  public Events: Event[] = [];
  private smoothFactor = 4;
  public size = 0;
  private dpr = 2;
  public tool: string = "pen";
  public startTime: number = 0;
  public currentEvent: Event | null = null;
  constructor({ smoothFactor }: { smoothFactor: number }) {
    this.smoothFactor = smoothFactor;
    this.Events = [];
  }

  startSession(time: number) {
    this.startTime = time;
  }


  pointerDown(p: Point) {
    this.size++;
    this.currentEvent = {
      type: this.tool,
      startTime: p.time,
      points: [p],
      ...(this.tool === "pen" && { stroke: { width: 2, color: 'black' } })
    };
  }

  pointerMove(p: Point) {
    if (this.tool === "pen" && this.size % this.smoothFactor !== 0) {
      this.currentEvent?.points.pop();
    }
    this.currentEvent?.points.push(p);
    this.size++;
  }

  pointerUp(p: Point) {
    this.started = false;
    if (this.currentEvent) {
      this.currentEvent.points.push(p);
      this.Events.push(this.currentEvent);
      this.currentEvent.points = [];
    }
    this.size = 0;
  }
}
