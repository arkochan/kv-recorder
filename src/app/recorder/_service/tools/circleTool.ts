import { Point } from "@/types/types";
import { Tool, toolDrawArgument } from "./tool";

export class CircleTool extends Tool {

  draw(points: Point[]) {

    const startPoint = points[0];
    const endPoint = points[points.length - 1];

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const radius = Math.sqrt(Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2));

    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
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
