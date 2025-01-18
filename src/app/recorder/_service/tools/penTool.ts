import { Point, Event, EventExtension } from "@/types/types";
import { strokeTool } from "./strokeTool";

export class PenTool extends strokeTool {
  draw(points: Point[],
    color: string = this.whiteboard.color,
    width: number = this.whiteboard.width): void {
    if (!this.ctx) return;
    if (points.length < 2) {
      var b = points[points.length - 1];
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = width;
      this.ctx.beginPath()
      this.ctx.arc(b.x, b.y, this.ctx.lineWidth / 2, 0, Math.PI * 2, !0)
      this.ctx.closePath(), this.ctx.fill();
      return
    }
    this.ctx.beginPath(), this.ctx.moveTo(points[0].x, points[0].y);
    // draw a bunch of quadratics, using the average of two points as the control point
    for (let i = 1; i < points.length - 1; i++) {
      var c = (points[i].x + points[i + 1].x) / 2,
        d = (points[i].y + points[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
    }
    this.ctx.stroke()
  }

  down(p: Point) {
  }
  calculateSpan(points: Point[]) {
    var max_horizontal = 0;
    var min_horizontal = Number.MAX_SAFE_INTEGER;
    var max_vertical = 0;
    var min_vertical = Number.MAX_SAFE_INTEGER;
    for (const point of points) {
      max_horizontal = Math.max(max_horizontal, point.x);
      min_horizontal = Math.min(min_horizontal, point.x);
      max_vertical = Math.max(max_vertical, point.y);
      min_vertical = Math.min(min_vertical, point.y);
    }
    return { max_horizontal, min_horizontal, max_vertical, min_vertical };
  }
  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();
    this.draw(this.whiteboard.points);
  }

  up(p: Point) {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();
    this.draw(this.whiteboard.points);
    this.clearMemCanvas();
    this.saveCanvas();
  }

  isProximal(e: Event, p: Point, proximity: number): boolean {
    for (const point of e.points) {
      if (this.isPointProximal(point, p, proximity)) return true;
    }
    return false;

  }
  createExtension(points: Point[]): EventExtension {
    return {
      type: "pen",
      width: this.whiteboard.width,
      color: this.whiteboard.color,
      ...this.calculateSpan(points)
    }
  }
}

