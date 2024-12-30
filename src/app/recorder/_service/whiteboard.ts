import { Point } from "@/types/types";
let points: Point[] = [];
let isDrawing = false;
let memCanvas = document.createElement("canvas");
let memCtx = memCanvas.getContext("2d");

export function initCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    scaleCanvas(canvas, 2);
    scaleCanvas(memCanvas, 2);
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    const rect = canvas.getBoundingClientRect();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    memCanvas.width = rect.width;
    memCanvas.height = rect.height;
    memCtx = memCanvas.getContext("2d");
    memCtx?.fillRect(0, 0, canvas.width, canvas.height);
}

export function scaleCanvas(canvas: HTMLCanvasElement, scale: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.scale(scale, scale);
}

export function startDraw(p: Point) {
    isDrawing = true;
    points.push(p);
}

export function draw(p: Point, canvas: HTMLCanvasElement) {
    if (!isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    points.push(p);
    ctx.drawImage(memCanvas, 0, 0);
    drawPoints(ctx, points);
    ctx.stroke();

}

function drawPoints(ctx: CanvasRenderingContext2D, points: Point[]) {
    // draw a basic circle instead
    if (points.length < 6) {
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
export function endDraw(p: Point, canvas: HTMLCanvasElement) {
    if (!isDrawing) return;
    isDrawing = false;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    // put back the saved content
    ctx.drawImage(memCanvas, 0, 0);
    points.push(p);
    drawPoints(ctx, points);

    // When the pen is done, save the resulting context
    // to the in-memory canvas
    if (!memCtx) return;
    memCtx.clearRect(0, 0, rect.width, rect.height);
    memCtx.drawImage(canvas, 0, 0);
    points = [];
};
export function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
