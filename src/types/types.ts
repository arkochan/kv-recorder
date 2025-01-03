export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

export interface Session {
  strokes: Stroke[];
}


export interface Eraser_path {
  points: Point[];
  radius: number;
}

// Define the Operation interface with Event details
export interface Event {
  type: string;
  startTime: number;
  Stroke?: Point[];
  Eraser_path?: { points: Point[], radius: number };
  rec_points?: Point;
  circle_points?: Point[];
}

// Define the Session interface
export interface Session {
  author: string;
  otherDetails: string;
  details: string;
  events: Event[];
}
