import { Point, Stroke, Event, EventExtension } from "@/types/types";
import { pathTool } from "./pathTool";

export class EraserTool extends pathTool {
  eventIds: number[] = [];
  public isElementInProximity(e: Event, p: Point, proximity: number): boolean {
    // FINISH: 
    return this.whiteboard.strokeTools[e.type].isProximal(e, p, proximity)
  }
  draw([]: Point[]): void {

  }
  filterEvent(p: Point, e: Event): boolean {
    if (e.type === "eraser") return false;
    if (e.max_horizontal < p.x) return false;
    if (e.min_horizontal > p.x) return false;
    if (e.max_vertical < p.y) return false;
    if (e.min_vertical > p.y) return false;
    return true;
  }
  down(p: Point) {
    for (const e of this.whiteboard.Events) {
      if (this.filterEvent(p, e)) {
        console.log("Primary Filter", e);
      }
    }
  }
  move(p: Point) {
    if (!this.whiteboard.started) return;
  }
  up(p: Point) {
    if (!this.whiteboard.started) return;
    this.eventIds = [];
  }
  createExtension(points: Point[]): EventExtension {
    return {
      type: "eraser",
      eventIds: this.eventIds,
    }
  }

}
