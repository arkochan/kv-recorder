import { Point } from "@/types/types";
import { Tool } from "./tool";

export class CircleTool extends Tool {

  drawCircle(p: Point) {
    const startPoint = this.whiteboard.points[0];
    if (!startPoint) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const radius = Math.sqrt(Math.pow(startPoint.x - p.x, 2) + Math.pow(startPoint.y - p.y, 2));

    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
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
    this.drawCircle(p);
  }

  up(p: Point) {
    if (!this.whiteboard.started) return;
    this.clearMemCanvas();
    this.saveCanvas();
    console.log("canvas Saved");
    this.whiteboard.pointerUp(p);
    this.whiteboard.started = false;
  }
}
