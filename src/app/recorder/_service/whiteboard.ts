import { Point, Stroke, Event } from "@/types/types";
import { Tool, ToolConfig } from "./tools/tool";
import { CircleTool } from "./tools/circleTool";
import { PenTool } from "./tools/penTool";
import { RectangleTool } from "./tools/rectangleTool";
import { CanvasService } from "./canvas";

export class Whiteboard {
  public points: Point[] = [];
  public started = false;
  public Events: Event[] = [];
  private smoothFactor = 4;
  public size = 0;
  private dpr = 2;
  public tool: string = "pen";
  public startTime: number = 0;
  tools: Record<string, Tool> = {};
  canvasService: CanvasService;

  constructor({ smoothFactor, canvasService }: { smoothFactor: number, canvasService: CanvasService }) {
    this.smoothFactor = smoothFactor;
    this.Events = [];
    this.canvasService = canvasService;
  }
  initTools(toolConfig: ToolConfig) {

    this.tools.pen = new PenTool(toolConfig);
    this.tools.rectangle = new RectangleTool(toolConfig);
    this.tools.circle = new CircleTool(toolConfig);
  }
  startSession(time: number) {
    this.startTime = time;
  }


  pointerDown(p: Point) {
    this.started = true;
    this.size++;
    this.points.push(p);
    this.tools[this.tool].down(p);
  }

  pointerMove(p: Point) {
    if (!this.started) return;
    if (this.tool !== "eraser" && this.size % this.smoothFactor !== 0) {
      this.points.pop();
    }
    this.points.push(p);
    this.size++;

    this.tools[this.tool].move(p);
  }
  public clear() {
    this.Events = [];
    this.canvasService.clear();

  }

  pointerUp(p: Point) {
    this.points.push(p);
    this.tools[this.tool].up(p);
    const currentEvent = {
      type: this.tool,
      startTime: p.time,
      points: this.points,
      ...(this.tool === "pen" && { stroke: { width: 2, color: 'black' } })
    };
    this.Events.push(currentEvent);
    this.size = 0;
    this.points = [];
    console.log("this.Events", this.Events);

    this.started = false;
  }
}
