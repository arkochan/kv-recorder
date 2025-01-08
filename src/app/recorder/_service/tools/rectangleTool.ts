
import { Point } from "@/types/types";
import { Tool } from "./tool";

export class RectangleTool extends Tool {

  draw(endPoint: Point, points: Point[] = this.whiteboard.points) {

    const startPoint = points[0];
    if (!startPoint) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const x = Math.min(startPoint.x, endPoint.x);
    const y = Math.min(startPoint.y, endPoint.y);
    const width = Math.abs(startPoint.x - endPoint.x);
    const height = Math.abs(startPoint.y - endPoint.y);

    ctx.strokeRect(x, y, width, height);
  }



  down(p: Point) {
    this.whiteboard.pointerDown(p);
    this.whiteboard.started = true;
  }

  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.whiteboard.pointerMove(p);
    this.clearCanvas();
    this.putMemCanvas();
    this.draw(p);

  }

  up(p: Point,) {
    if (!this.whiteboard.started) return;
    this.clearMemCanvas();
    this.saveCanvas();
    console.log("canvas Saved");
    this.whiteboard.pointerUp(p);
    this.whiteboard.started = false;
  }
}

