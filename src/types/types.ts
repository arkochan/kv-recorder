export interface Point {
  x: number;
  y: number;
  time?: number;
}

export interface Stroke {
  color?: string;
  width: number;
}

// Define the Operation interface with Event details
//
export interface ToolEvent {
  id: number;
  type: string;
  startTime: number;
  points: Point[];
  min_vertical: number;
  min_horizontal: number;
  max_vertical: number;
  max_horizontal: number;
}

export interface StrokeEvent {
  type: "stroke";
  startTime: number;
  points: Point[];
  stroke: Stroke;
  min_vertical: number;
  min_horizontal: number;
  max_vertical: number;
  max_horizontal: number;
}

export type Event = ToolEvent | StrokeEvent;

// Define the Session interface
export interface Session {
  author: string;
  otherDetails: string;
  details: string;
  events: Event[];
}
