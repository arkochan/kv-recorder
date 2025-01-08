
import { Point } from "@/types/types";
import { Tool } from "./tool";

export class RectangleTool extends Tool {

  private drawRectangle(p: Point) {

    const startPoint = this.whiteboard.points[0];
    if (!startPoint) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const x = Math.min(startPoint.x, p.x);
    const y = Math.min(startPoint.y, p.y);
    const width = (startPoint.x - p.x);
    const height = (startPoint.y - p.y);

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.drawRectangle(p);

  }

  up(p: Point,) {
    if (!this.whiteboard.started) return;
    this.clearMemCanvas();
    this.saveCanvas();

    this.whiteboard.pointerUp(p);
    this.whiteboard.started = false;
  }
}

