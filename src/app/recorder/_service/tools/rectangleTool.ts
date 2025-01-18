import { Point, Event, EventExtension } from "@/types/types";
import { strokeTool } from "./strokeTool";

export class RectangleTool extends strokeTool {
  draw(points: Point[],
    color: string = this.whiteboard.color,
    width: number = this.whiteboard.width): void {
    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    const x = Math.min(startPoint.x, endPoint.x);
    const y = Math.min(startPoint.y, endPoint.y);
    const _width = Math.abs(startPoint.x - endPoint.x);
    const height = Math.abs(startPoint.y - endPoint.y);
    ctx.strokeRect(x, y, _width, height);
  }
  calculateSpan(points: Point[]) {
    const startingEdge = points[0];
    const endingEdge = points[points.length - 1];
    var max_horizontal;
    var min_horizontal;
    var max_vertical;
    var min_vertical;
    if (startingEdge.x < endingEdge.x) {
      max_horizontal = endingEdge.x;
      min_horizontal = startingEdge.x;
    }
    else {
      max_horizontal = startingEdge.x;
      min_horizontal = endingEdge.x;
    }
    if (startingEdge.y < endingEdge.y) {
      max_vertical = endingEdge.y;
      min_vertical = startingEdge.y;
    }
    else {
      max_vertical = startingEdge.y;
      min_vertical = endingEdge.y;
    }
    return { max_horizontal, min_horizontal, max_vertical, min_vertical };
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
  public isProximal(
    e: Event,
    p: Point, // Point to check proximity
    proximity: number // Maximum allowed proximity
  ): boolean {
    // Rectangle vertices
    const p1 = e.points[0];
    const p2 = e.points[e.points.length - 1];
    const rect = [
      { x: p1.x, y: p1.y },
      { x: p1.x, y: p2.y },
      { x: p2.x, y: p1.y },
      { x: p2.x, y: p2.y }
    ];

    // Edges of the rectangle
    const edges = [
      [rect[0], rect[1]], // Left edge
      [rect[1], rect[3]], // Top edge
      [rect[3], rect[2]], // Right edge
      [rect[2], rect[0]] // Bottom edge
    ];

    // Check proximity to each side
    for (const [start, end] of edges) {
      if (this.isPointCloseToSegment(start, end, p, proximity)) {
        return true;
      }
    }

    return false;
  }
  private isPointCloseToSegment(
    start: Point,
    end: Point,
    p: Point,
    radius: number
  ): boolean {
    const segmentLengthSquared = (end.x - start.x) ** 2 + (end.y - start.y) ** 2;

    // Project p onto the line segment
    let t = ((p.x - start.x) * (end.x - start.x) + (p.y - start.y) * (end.y - start.y)) / segmentLengthSquared;

    // Clamp t to the range [0, 1] to ensure projection falls on the segment
    t = Math.max(0, Math.min(1, t));

    // Find the closest point on the segment
    const closest = {
      x: start.x + t * (end.x - start.x),
      y: start.y + t * (end.y - start.y)
    };

    // Check if the closest point is within the radius
    return this.isPointProximal(p, closest, radius);
  }

  createExtension(points: Point[]): EventExtension {
    return {
      type: "rectangle",
      width: this.whiteboard.width,
      color: this.whiteboard.color,
      ...this.calculateSpan(points)
    }
  }
}

