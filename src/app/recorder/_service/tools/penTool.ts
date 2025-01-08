import { Point } from "@/types/types";
import { Tool } from "./tool";

export class PenTool extends Tool {
  draw(points: Point[]) {


    if (!this.ctx) return;

    if (points.length < 2) {
      var b = points[points.length - 1];
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
  }

  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();
    this.draw(this.whiteboard.points);
  }

  up(p: Point) {
    if (!this.whiteboard.started) return;
    console.log("up", "executed");
    this.clearCanvas();
    this.putMemCanvas();
    this.draw(this.whiteboard.points);
    this.clearMemCanvas();
    this.saveCanvas();
  }
}

