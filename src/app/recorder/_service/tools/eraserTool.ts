import { Point, Stroke } from "@/types/types";
import { Tool } from "./tool";

export class EraserTool extends Tool {
  private eraserRadius: number = 5;


  private isPointInProximity(p1: Point, p2: Point): boolean {
    const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    return distance <= this.eraserRadius;
  }

  private eraseStroke(p: Point) {
    // FIX: 
    const strokes = this.whiteboard.Events;
    for (let i = 0; i < strokes.length; i++) {
      const stroke = strokes[i];
      for (let j = 0; j < stroke.points.length; j++) {
        if (this.isPointInProximity(p, stroke.points[j])) {
          strokes.splice(i, 1);
          i--; // Adjust index after removal
          break;
        }
      }
    }
    this.redrawCanvas();
  }

  private redrawCanvas() {

  }

  down(p: Point) {
    this.whiteboard.pointerDown(p);
    this.whiteboard.started = true;
    this.eraseStroke(p);
  }

  move(p: Point) {
    if (!this.whiteboard.started) return;
    this.whiteboard.pointerMove(p);
    this.eraseStroke(p);
  }

  up(p: Point) {
    if (!this.whiteboard.started) return;
    this.whiteboard.pointerUp(p);
    this.whiteboard.started = false;
  }
}
