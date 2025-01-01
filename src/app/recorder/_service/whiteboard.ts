import { Point, Stroke } from "@/types/types";

var started = false;

// create an in-memory canvas

var points: Point[] = [];
var strokes: Stroke[] = [];
var SMOOTH_FACTOR = 6;

export function startDraw(p: Point) {
    points.push(p), size++;
    started = true;
};

let size = 0;
var dpr = 2;

export function setDpr(dpr: number) {
    dpr = dpr;
}
export function setSmoothness(smoothness: number) {
    SMOOTH_FACTOR = smoothness;
}
export function draw(p: Point, canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    if (!started) return;
    console.log("draw points length", points.length);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.drawImage(memCanvas, 0, 0, w, h);

    if (size % SMOOTH_FACTOR !== 0)
        points.pop();

    points.push(p);
    size++;
    console.log(size);
    drawPoints(ctx as CanvasRenderingContext2D, points);
}

export function endDraw(p: Point, canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    if (!started) return;
    started = false;
    points.push(p);
    drawPoints(canvas.getContext('2d') as CanvasRenderingContext2D, points);
    memCanvas.getContext('2d')?.clearRect(0, 0, memCanvas.width, memCanvas.height);
    const w = memCanvas.width / dpr;
    const h = memCanvas.height / dpr;
    memCanvas.getContext('2d')?.drawImage(canvas, 0, 0, w, h);
    strokes.push({ points: points, width: 2, color: 'black' });
    points = [];
    size = 0;
};

// clear both canvases!
export function clear(canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const memCtx = memCanvas.getContext('2d') as CanvasRenderingContext2D;
    memCtx.clearRect(0, 0, memCanvas.width, memCanvas.height);
    console.log("cleared");
};

function drawPoints(ctx: CanvasRenderingContext2D, points: Point[]) {
    // draw a basic circle instead
    if (size < 6) {
        var b = points[0];
        ctx.beginPath(), ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0), ctx.closePath(), ctx.fill();
        return
    }
    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
    // draw a bunch of quadratics, using the average of two points as the control point
    for (let i = 1; i < points.length - 1; i++) {
        var c = (points[i].x + points[i + 1].x) / 2,
            d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
    }
    ctx.stroke()
}

export function getStrokes() {
    return strokes;
}
