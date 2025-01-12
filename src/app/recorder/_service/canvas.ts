import { Point, Stroke } from "@/types/types";
import { Whiteboard } from "./whiteboard";
import { ToolConfig } from "./tools/pathTool";
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
  whiteboard = new Whiteboard({ smoothFactor: 4, canvasService: this });



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
  private getPointerPos(e: React.PointerEvent<HTMLCanvasElement>): Point {
    if (!this.canvas) return { x: 0, y: 0 };

    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  private handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (this.canvas) {
      this.canvas.setPointerCapture(e.pointerId);
    }
    const p = this.getPointerPos(e);
    this.whiteboard.pointerDown(p);
  }

  private handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const p = this.getPointerPos(e);
    this.whiteboard.pointerMove(p);
  }

  private handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    if (this.canvas) {
      this.canvas.releasePointerCapture(e.pointerId);
    }
    const p = this.getPointerPos(e);
    this.whiteboard.pointerUp(p);
  }
  public undo() {
    this.whiteboard.undo();
  }
  public redo() {
    this.whiteboard.redo();
  }

  public executeAction(action: string) {
    if (action === "clear") {
      this.whiteboard.clear();
    }
    else if (action === "undo") {
      this.whiteboard.undo();
    }
    else if (action === "redo") {
      this.whiteboard.redo();
    }
  }
  setTool(tool: string) {

    console.log("tool", tool);
    if (!this.whiteboard.getTool(tool)) return;
    this.whiteboard.tool = tool as "pen" | "rectangle" | "circle" | "eraser";
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

  getMousePos(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!this.canvas) return { x: 0, y: 0, time: 0 };
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
  clear() {
    if (!this.canvas) return;
    if (!this.memCanvas) return;
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.memCtx?.clearRect(0, 0, this.memCanvas.width, this.memCanvas.height);
  };

}
