import { Point } from "@/types/types";

export interface ToolConfig {
  whiteboard: any;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  memCanvas: HTMLCanvasElement;
  dpr: number;
}

export abstract class Tool {
  whiteboard: any;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  memCanvas: HTMLCanvasElement;
  dpr: number;
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
