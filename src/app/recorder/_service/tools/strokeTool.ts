import { Point, Event, EventExtension, StrokeEvent } from "@/types/types";
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
export interface toolDrawArgumentStarEnd {
  startPoint: Point;
  endPoint: Point;
}

export interface toolDrawArgumentWithPoints {
  points: Point[];
}

export type toolDrawArgument = toolDrawArgumentStarEnd | toolDrawArgumentWithPoints;

export abstract class strokeTool {
  modifier: boolean = false;
  whiteboard: Whiteboard;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  memCanvas: HTMLCanvasElement;
  dpr: number;
  startPoint: Point = { x: 0, y: 0, time: 0 };


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

  public isPointProximal(p1: Point, p2: Point, radius: number): boolean {
    const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    return distance <= radius;
  }
  public canDraw(e: Event): boolean {
    if (e.type === "eraser")
      return false;
    return !(e.erased);
  }
  abstract down(point: Point): void;
  abstract move(point: Point): void;
  abstract up(point: Point): void;
  abstract draw(points: Point[], color?: string, width?: number): void;
  abstract calculateSpan(points: Point[]): { max_horizontal: number, min_horizontal: number, max_vertical: number, min_vertical: number };
  abstract isProximal(e: Event, p: Point, proximity: number): boolean;
  abstract createExtension([]: Point[]): EventExtension | false;
}
