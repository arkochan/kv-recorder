import { Point, Stroke } from "@/types/types";
import { Whiteboard } from "./whiteboard";

export class CanvasService {
  dpr: number;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  memCanvas: HTMLCanvasElement | null;
  memCtx: CanvasRenderingContext2D | null;
  whiteboard = new Whiteboard({ smoothFactor: 4 });

  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.memCanvas = null;
    this.memCtx = null;
    this.dpr = 2;
  }

  init({ canvas, dpr }: { canvas: HTMLCanvasElement, dpr: number }) {
    this.dpr = dpr;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const rect = canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.memCanvas = document.createElement('canvas');
    this.memCanvas.width = rect.width * dpr;
    this.memCanvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);
    this.memCtx = this.memCanvas.getContext('2d') as CanvasRenderingContext2D;
    if (!this.memCtx) return;
    this.memCtx.scale(dpr, dpr);
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }


  handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = this.getMousePos(e)

    this.whiteboard.pointerDown(p);
    this.draw();
  }

  handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    console.log("mouse move");
    const p = this.getMousePos(e);

  }
  handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {

  }
  clearCanvas() {
    if (!this.ctx) return;
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  putMemCanvas() {
    if (!this.memCanvas) return;
    if (!this.canvas) return;
    if (!this.ctx) return;

    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    this.ctx.drawImage(this.memCanvas, 0, 0, w, h);
  }
  draw() {
    if (!this.whiteboard.started) return;
    this.clearCanvas();
    this.putMemCanvas();
    this.drawPoints();
  }

  endDraw(p: Point, canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    if (!this.whiteboard.started) return;
    this.whiteboard.pointerUp(p);
    this.drawPoints();
    memCanvas.getContext('2d')?.clearRect(0, 0, memCanvas.width, memCanvas.height);
    const w = memCanvas.width / this.dpr;
    const h = memCanvas.height / this.dpr;
    memCanvas.getContext('2d')?.drawImage(canvas, 0, 0, w, h);

  };

  // 
  clear(canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const memCtx = memCanvas.getContext('2d') as CanvasRenderingContext2D;
    memCtx.clearRect(0, 0, memCanvas.width, memCanvas.height);
    console.log("cleared");
  };

  drawPoints() {
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
  getMousePos(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!this.canvas) return { x: 0, y: 0, time: 0 };
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now() - this.whiteboard.startTime,
    };
  }
}
