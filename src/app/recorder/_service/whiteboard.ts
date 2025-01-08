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
  head: number = 0;

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
  drawTill(index: number) {
    for (var i = 0; i < index; i++) {
      const event = this.Events[i];
      this.tools[event.type].draw(event.points);

    }
    this.tools.pen.clearMemCanvas();
    this.tools.pen.saveCanvas();
  }
  pointerDown(p: Point) {
    if (this.head !== this.Events.length) {
      this.Events = this.Events.slice(0, this.head);
    }
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
  public draw(event: Event) {
    this.tools[event.type].draw(event.points);
  }

  public clear() {
    this.Events = [];
    this.canvasService.clear();

  }
  head_decrease() {
    if (this.head <= 0) return false;
    this.head--;
    return true;
  }
  head_increase() {
    if (this.head >= this.Events.length) return false;
    this.head++;
    return true;
  }
  public undo() {
    if (!this.head_decrease()) return;
    console.log("this.Events", this.Events);
    console.log("this.head", this.head);
    this.canvasService.clear();
    this.drawTill(this.head);
  }
  public redo() {
    if (!this.head_increase()) return;
    console.log("this.Events", this.Events);
    console.log("this.head", this.head);
    this.canvasService.clear();
    this.drawTill(this.head);
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
    this.head++;
    this.started = false;
  }
}
