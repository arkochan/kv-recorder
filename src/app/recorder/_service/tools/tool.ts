import { Point } from "@/types/types";
import { CanvasService } from "../canvas";
import { Whiteboard } from "../whiteboard";

export interface ToolConfig {
  whiteboard: any;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  memCanvas: HTMLCanvasElement;
  dpr: number;
  canvasService: CanvasService;
}

export abstract class Tool {
  whiteboard: Whiteboard;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  memCanvas: HTMLCanvasElement;
  dpr: number;

  drawPoints(points: Point[]) {
    console.log("drawPoints", "executed");
    console.log(this.whiteboard.points);
    // draw a basic circle instead
    if (!this.ctx) return;
    // if (!this.canvas) return;
    if (this.whiteboard.size < 2) {
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
  constructor({ whiteboard, ctx, canvas, memCanvas, dpr }: ToolConfig) {
    this.whiteboard = whiteboard;
    this.ctx = ctx;
    this.canvas = canvas;
    this.memCanvas = memCanvas;
    this.dpr = dpr;
  }

  clearCanvas() {
    if (!this.ctx) return;
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  putMemCanvas() {
    if (!this.memCanvas) return;
    const w = this.canvas?.width / this.dpr;
    const h = this.canvas?.height / this.dpr;
    this.ctx?.drawImage(this.memCanvas, 0, 0, w, h);
  }

  clearMemCanvas() {
    this.memCanvas?.getContext('2d')?.clearRect(0, 0, this.memCanvas.width, this.memCanvas.height);
  }

  saveCanvas() {
    if (!this.memCanvas) return;
    if (!this.canvas) return;
    const w = this.memCanvas.width / this.dpr;
    const h = this.memCanvas.height / this.dpr;
    this.memCanvas.getContext('2d')?.drawImage(this.canvas, 0, 0, w, h);
  }
  abstract down(point: Point): void;
  abstract move(point: Point): void;
  abstract up(point: Point): void;
}
