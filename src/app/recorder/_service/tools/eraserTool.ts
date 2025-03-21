import { Point, Event, EventExtension } from "@/types/types";
import { pathTool } from "./pathTool";

export class EraserTool extends pathTool {
  eventIds: number[] = [];
  public isElementInProximity(e: Event, p: Point, proximity: number): boolean {
    console.log("isElementInProximity called with", { e, p, proximity });
    const result = this.whiteboard.strokeTools[e.type].isProximal(e, p, proximity);
    console.log("isElementInProximity result:", result);
    return result;
  }
  draw(points: Point[]) {
    console.log("draw called with points:", points);
  }
  filterEvent(p: Point, e: Event): boolean {
    console.log("filterEvent called with", { p, e });
    if (e.type === "eraser") {
      console.log("Event type is eraser, returning false");
      return false;
    }
    if (e.erased === true) {
      console.log("Event is already erased, returning false");
      return false;
    }
    if (e.max_horizontal < p.x) {
      console.log("Event max_horizontal is less than point x, returning false");
      return false;
    }
    if (e.min_horizontal > p.x) {
      console.log("Event min_horizontal is greater than point x, returning false");
      return false;
    }
    if (e.max_vertical < p.y) {
      console.log("Event max_vertical is less than point y, returning false");
      return false;
    }
    if (e.min_vertical > p.y) {
      console.log("Event min_vertical is greater than point y, returning false");
      return false;
    }
    const result = this.isElementInProximity(e, p, 10);
    console.log("filterEvent result:", result);
    return result;
  }
  process(e: Event, p: Point) {
    console.log("process called with", { e, p });
    if (this.filterEvent(p, e)) {
      if (e.type !== "eraser") {
        e.erased = true;
        console.log("Event marked as erased", e);
      }
      console.log("Primary Filter Capture", e);
      this.eventIds.push(e.id);
      this.reDraw();
    }
  }
  reDraw() {
    console.log("reDraw called");
    this.whiteboard.clearCanvas();
    for (const event of this.whiteboard.Events) {
      if (event.type === "eraser") {
        console.log("Skipping eraser event", event);
        continue;
      }
      if (event.erased === true) {
        console.log("Skipping erased event", event);
        continue;
      }
      console.log("Drawing event", event);
      this.whiteboard.drawEvent(event);
    }
    this.clearMemCanvas();
    this.saveCanvas();
  }
  down(p: Point) {
    console.log("down called with point:", p);
    this.eventIds = [];
    for (const e of this.whiteboard.Events) {
      this.process(e, p);
    }
  }
  move(p: Point) {
    console.log("move called with point:", p);
    if (!this.whiteboard.started) {
      console.log("Whiteboard not started, returning");
      return;
    }
    for (const e of this.whiteboard.Events) {
      this.process(e, p);
    }
  }
  up(p: Point) {
    console.log("up called with point:", p);
    if (!this.whiteboard.started) {
      console.log("Whiteboard not started, returning");
      return;
    }
    console.log("EventIds", this.eventIds);
  }
  createExtension(points: Point[]) {
    console.log("createExtension called with points:", points);
    if (this.eventIds.length === 0) {
      console.log("No eventIds, returning false");
      return false;
    }
    const extension = {
      type: "eraser",
      eventIds: this.eventIds,
    };
    console.log("createExtension result:", extension);
    return extension;
  }

}
