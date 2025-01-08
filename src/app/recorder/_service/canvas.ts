import { Point, Stroke } from "@/types/types";
import { Whiteboard } from "./whiteboard";
import { Tool, ToolConfig } from "./tools/tool";
import { PenTool } from "./tools/penTool";
import { RectangleTool } from "./tools/rectangleTool";
import { CircleTool } from "./tools/circleTool";

export class CanvasService {
  dpr: number;
  started: boolean = false;
  currentTool: string = "pen";
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

    const toolConfig: ToolConfig = {
      whiteboard: this.whiteboard,
      ctx: this.ctx,
      canvas: this.canvas,
      memCanvas: this.memCanvas,
      dpr: this.dpr,
      canvasService: this,
    }
    this.whiteboard.initTools(toolConfig);

  }

  setTool(tool: string) {
    if (!this.whiteboard.tools[tool]) return;
    this.whiteboard.tool = tool;
  }
  handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = this.getMousePos(e)
    this.whiteboard.pointerDown(p);
  }

  handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = this.getMousePos(e)
    this.whiteboard.pointerMove(p);
  }

  handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    const p = this.getMousePos(e)
    this.whiteboard.pointerUp(p);
  }

  // 
  clear(canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    this.ctx?.clearRect(0, 0, canvas.width, canvas.height);
    this.memCtx?.clearRect(0, 0, memCanvas.width, memCanvas.height);
  };

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
