import { Point, Event, EventExtension } from "@/types/types";
import { strokeTool } from "./strokeTool";

export class CircleTool extends strokeTool {

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

  calculateSpan(points: Point[]) {
    const center = points[0];
    const circumference = points[points.length - 1];
    const radius = Math.sqrt(Math.pow(center.x - circumference.x, 2) + Math.pow(center.y - circumference.y, 2));
    const max_horizontal = center.x + radius;
    const min_horizontal = center.x - radius;
    const max_vertical = center.y + radius;
    const min_vertical = center.y - radius;
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
    const center = e.points[0];
    const pointOncircum = e.points[e.points.length - 1];
    const radius = Math.sqrt(Math.pow(center.x - pointOncircum.x, 2) + Math.pow(center.y - pointOncircum.y, 2));

    // The distance between the circle's center and the point
    const distanceToCenter = Math.sqrt(
      (center.x - p.x) ** 2 + (center.y - p.y) ** 2
    );

    // Calculate the minimum and maximum distances from the circle's circumference
    const minDistance = radius - proximity;
    const maxDistance = radius + proximity;

    // Check if the point lies within the proximal range of the circle's circumference
    return distanceToCenter >= minDistance && distanceToCenter <= maxDistance;
  }

  createExtension(points: Point[]): EventExtension {
    return {
      type: "circle",
      ...this.calculateSpan(points)
    }
  }
}
