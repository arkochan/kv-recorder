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
