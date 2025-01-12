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
    this.startTime = Date.now();
  }
  endSession(fn?: (events: Event[]) => void) {
    if (fn)
      fn(this.Events);
    return this.Events;
  }
  drawTill(index: number) {
    for (var i = 0; i < index; i++) {
      const event = this.Events[i];
      if ("erased" in event && event.erased) continue;
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
  getTimeDelta() {
    if (this.startTime === 0) return 0;
    return Date.now() - this.startTime;
  }

  addTimeToPoints(p: Point) {
    return { ...p, time: this.getTimeDelta() };
  }
  pointerDown(p: Point) {
    p = this.addTimeToPoints(p);
    if (this.head !== this.Events.length) {
      this.Events = this.Events.slice(0, this.head);
    }
    this.started = true;
    this.size++;
    this.points.push(p);
    this.getTool().down(p);
  }

  pointerMove(p: Point) {
    p = this.addTimeToPoints(p);
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

  public clearEvents() {
    this.canvasService.clear();
    this.resetEvent();

  }
  clearCanvas() {
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

  getEvent(): Event | false {
    const eventExtension = this.getTool().createExtension(this.points);
    if (eventExtension === false) {
      return false
    }
    return {
      id: this.getNewId(),
      points: this.points,
      startTime: this.points[0].time as number,
      ...eventExtension,
    }
  }
  storeEvent() {
    const currentEvent = this.getEvent();
    if (currentEvent === false) return;
    this.Events.push(currentEvent);
    this.head++;
  }
  resetEvent() {
    this.size = 0;
    this.points = [];
    this.started = false;
    this.startTime = 0;
  }
  pointerUp(p: Point) {
    p = this.addTimeToPoints(p);
    this.points.push(p);
    this.getTool().up(p);
    this.storeEvent();
    this.resetEvent();
    console.log("this.Events", this.Events);
  }
}
