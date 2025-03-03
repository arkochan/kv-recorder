export interface Point {
  x: number;
  y: number;
  time?: number;
}


// Define the Operation interface with Event details
//
export interface BaseEvent {
  id: number;
  startTime: number;
  points: Point[];
}

export interface StrokeEvent {
  type: "pen" | "circle" | "rectangle";
  min_vertical: number;
  min_horizontal: number;
  max_vertical: number;
  max_horizontal: number;
  erased?: boolean;
  color: string;
  width: number;
}


export interface EraserEvent {
  type: "eraser";
  eventIds: number[];
}

export type EventExtension = (EraserEvent | StrokeEvent);

export type Event = BaseEvent & EventExtension;

// Define the Session interface
export interface Session {
  author: string;
  otherDetails: string;
  details: string;
  events: Event[];
}
export interface Config {
  [config: string]: {
    [category: string]: {
      [key: string]: string;
    };
  };
}
