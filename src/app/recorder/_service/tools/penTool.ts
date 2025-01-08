import { Point } from "@/types/types";
import { Tool } from "./tool";

export class PenTool extends Tool {


  down(p: Point) {
    this.whiteboard.pointerDown(p);
    this.whiteboard.started = true;
  }

  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.whiteboard.pointerMove(p);
    this.clearCanvas();
    this.putMemCanvas();
    if (this.whiteboard.currentEvent?.points) {
      this.drawPoints(this.whiteboard.currentEvent.points);
    }

  }

  up(p: Point,) {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();

    if (this.whiteboard.currentEvent?.points) {
      this.drawPoints(this.whiteboard.currentEvent.points);
    }
    this.clearMemCanvas();
    this.saveCanvas();

    this.whiteboard.pointerUp(p);
    this.whiteboard.started = false;
  }
}

