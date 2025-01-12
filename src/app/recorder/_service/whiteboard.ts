import { Point, Stroke, Event, BaseEvent, StrokeEvent } from "@/types/types";
import { strokeTool } from "./tools/strokeTool";
import { pathTool, ToolConfig } from "./tools/pathTool";
import { CircleTool } from "./tools/circleTool";
import { PenTool } from "./tools/penTool";
import { RectangleTool } from "./tools/rectangleTool";
import { CanvasService } from "./canvas";
import { EraserTool } from "./tools/eraserTool";

export class Whiteboard {
  globalEventCounter = 0;
  public points: Point[] = [];
  public started = false;
  public Events: Event[] = [];
  private smoothFactor = 4;
  public size = 0;
  // private dpr = 2;
  public tool: "pen" | "rectangle" | "circle" | "eraser" = "pen";
  public startTime: number = 0;
  strokeTools: Record<string, strokeTool> = {};
  pathTools: Record<string, pathTool> = {};
  canvasService: CanvasService;
  head: number = 0;

  constructor({ smoothFactor, canvasService }: { smoothFactor: number, canvasService: CanvasService }) {
    this.smoothFactor = smoothFactor;
    this.Events = [];
    this.canvasService = canvasService;
  }

  initTools(toolConfig: ToolConfig) {
    this.strokeTools.pen = new PenTool(toolConfig);
    this.strokeTools.rectangle = new RectangleTool(toolConfig);
    this.strokeTools.circle = new CircleTool(toolConfig);
    this.pathTools.eraser = new EraserTool(toolConfig);
  }

  startSession(time: number) {
    this.startTime = time;
  }
  drawTill(index: number) {
    for (var i = 0; i < index; i++) {
      const event = this.Events[i];
      this.getTool(event.type).draw(event.points);
      // FIX :
      // strokeTools.pen shodnlt be
      this.strokeTools.pen.clearMemCanvas();
      this.strokeTools.pen.saveCanvas();
    }
  }
  getTool(eventType: string = this.tool) {
    return this.strokeTools[eventType] || this.pathTools[eventType] || false;
  }
  pointerDown(p: Point) {
    if (this.head !== this.Events.length) {
      this.Events = this.Events.slice(0, this.head);
    }
    this.started = true;
    this.size++;
    this.points.push(p);
    this.getTool().down(p);
  }

  pointerMove(p: Point) {
    if (!this.started) return;
    if (this.tool !== "eraser" && this.size % this.smoothFactor !== 0) {
      this.points.pop();
    }
    this.points.push(p);
    this.size++;

    this.getTool().move(p);
  }
  public draw(event: Event) {
    this.getTool(event.type).draw(event.points);
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
  getNewId() {
    return this.globalEventCounter++;
  }

  getEvent(): Event {
    const eventExtension = this.getTool().createExtension(this.points);
    return {
      id: this.getNewId(),
      points: this.points,
      startTime: this.points[0].time as number,
      ...eventExtension,
    }

  }
  storeEvent() {
    const currentEvent = this.getEvent();
    this.Events.push(currentEvent);
    this.head++;
  }
  resetEvent() {
    this.size = 0;
    this.points = [];
    this.started = false;
  }

  pointerUp(p: Point) {
    this.points.push(p);
    this.getTool().up(p);
    this.storeEvent();
    this.resetEvent();
    console.log("this.Events", this.Events);
  }
}
