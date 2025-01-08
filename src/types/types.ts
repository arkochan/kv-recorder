export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface Stroke {
  color?: string;
  width: number;
}

// Define the Operation interface with Event details
//
export interface ToolEvent {
  type: string;
  startTime: number;
  points: Point[];
}

export interface StrokeEvent {
  type: "stroke";
  startTime: number;
  points: Point[];
  stroke: Stroke;
}

export type Event = ToolEvent | StrokeEvent;

// Define the Session interface
export interface Session {
  author: string;
  otherDetails: string;
  details: string;
  events: Event[];
}
