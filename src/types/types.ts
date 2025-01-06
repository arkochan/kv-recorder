export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface Stroke {
  points: Point[];
  color?: string;
  width: number;
}

// Define the Operation interface with Event details
export interface Event {
  type: string;
  startTime: number;
  path: Point[];
}

// Define the Session interface
export interface Session {
  author: string;
  otherDetails: string;
  details: string;
  events: Event[];
}
