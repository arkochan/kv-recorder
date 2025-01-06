import { Point } from "@/types/types";
import { Tool } from "./tool";

export class PenTool extends Tool {

  drawPoints() {
    console.log(this.whiteboard.points);
    // draw a basic circle instead
    if (!this.ctx) return;
    // if (!this.canvas) return;
    const points = this.whiteboard.points;
    if (this.whiteboard.size < 6) {
      var b = this.whiteboard.points[0];
      this.ctx.beginPath(), this.ctx.arc(b.x, b.y, this.ctx.lineWidth / 2, 0, Math.PI * 2, !0), this.ctx.closePath(), this.ctx.fill();
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
    this.whiteboard.pointerDown(p);
    // this.canvas.started = true;
  }

  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();
    this.drawPoints();
  }

  up(p: Point,) {
    if (!this.whiteboard.started) return;
    this.whiteboard.pointerUp(p);
    this.drawPoints();
    this.clearMemCanvas();
    this.saveCanvas();
  }
}

