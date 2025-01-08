
import { Point } from "@/types/types";
import { Tool, toolDrawArgument } from "./tool";

export class RectangleTool extends Tool {
  draw(points: Point[]) {

    const startPoint = points[0];
    const endPoint = points[points.length - 1];

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const x = Math.min(startPoint.x, endPoint.x);
    const y = Math.min(startPoint.y, endPoint.y);
    const width = Math.abs(startPoint.x - endPoint.x);
    const height = Math.abs(startPoint.y - endPoint.y);

    ctx.strokeRect(x, y, width, height);
  }



  down(p: Point) {
  }

  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();
    this.draw(this.whiteboard.points);

  }

  up(p: Point,) {
    if (!this.whiteboard.started) return;
    this.clearMemCanvas();
    this.saveCanvas();
  }
}

