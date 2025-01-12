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
    if (e.erased === true) return false;
    if (e.max_horizontal < p.x) return false;
    if (e.min_horizontal > p.x) return false;
    if (e.max_vertical < p.y) return false;
    if (e.min_vertical > p.y) return false;
    return this.isElementInProximity(e, p, 10);
  }
  process(e: Event, p: Point) {
    if (this.filterEvent(p, e)) {
      if (e.type !== "eraser")
        e.erased = true;
      console.log("Primary Filter Capture", e);
      this.eventIds.push(e.id);
      this.reDraw();
    }
  }
  reDraw() {
    this.whiteboard.clearCanvas();
    for (const event of this.whiteboard.Events) {
      if (event.type === "eraser") { console.log(event); console.log("type Eraser"); continue; }
      if (event.erased === true) { console.log(event); console.log("erased true"); continue; }
      if (this.eventIds.includes(event.id)) { console.log(event); console.log("Id in event id"); continue; }
      this.whiteboard.getTool(event.type).draw(event.points);
    }
  }
  down(p: Point) {
    this.eventIds = [];
    for (const e of this.whiteboard.Events) {
      this.process(e, p);
    }
  }
  move(p: Point) {
    if (!this.whiteboard.started) return;
    for (const e of this.whiteboard.Events) {
      this.process(e, p);
    }

  }
  up(p: Point) {
    if (!this.whiteboard.started) return;
    console.log("EventIds", this.eventIds);
  }
  createExtension(points: Point[]): EventExtension | false {
    if (this.eventIds.length === 0) return false;
    return {
      type: "eraser",
      eventIds: this.eventIds,
    }
  }

}
