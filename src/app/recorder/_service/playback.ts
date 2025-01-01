import { Session, Stroke } from "@/types/types";
import { clear } from "./whiteboard";
export async function playback(session: Session, canvas: HTMLCanvasElement, memCanvas: HTMLCanvasElement) {
    var lastStrokeTime = 0;
    //clear out the canvas
    clear(canvas, memCanvas);
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (const stroke of session.strokes) {
        ctx.lineWidth = stroke.width;
        console.log(stroke.width, stroke.points.length);
        ctx.strokeStyle = stroke.color;
        ctx.lineCap = "round";
        // replace the points with the catmull rom spline points
        //sleep for the time it takes the strokes to start
        await sleep(stroke.points[0].time - lastStrokeTime);
        await drawStroke(stroke, ctx);
        lastStrokeTime = stroke.points[stroke.points.length - 1].time;
        // stroke.points = getCatmullRomSpline(stroke.points);
        // drawStroke(stroke, ctx, "green");
    }
}

async function drawStroke(
    stroke: Stroke,
    ctx: CanvasRenderingContext2D,
    dpr = 2,
    color?: string
) {
    const points = stroke.points;
    ctx.lineWidth = stroke.width;
    ctx.strokeStyle = color || stroke.color;
    ctx.lineWidth = 5;

    // replace the points with the catmull rom spline points
    //stroke.points = getCatmullRomSpline(stroke.points);

    //create a mem canvas
    const memCanvas = document.createElement("canvas");
    memCanvas.width = ctx.canvas.width;
    memCanvas.height = ctx.canvas.height;
    const memCtx = memCanvas.getContext("2d") as CanvasRenderingContext2D;
    // put the canvas image in mem canvas
    memCtx.drawImage(ctx.canvas, 0, 0);


    if (points.length < 6) {
        var b = points[0];
        ctx.beginPath(), ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0), ctx.closePath(), ctx.fill();
        return
    }
    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
    // draw a bunch of quadratics, using the average of two points as the control point
    for (let i = 1; i < points.length - 1; i++) {
        await sleep(points[i - 1].time - points[i].time);
        console.log(points[i].time - points[i - 1].time);
        var c = (points[i].x + points[i + 1].x) / 2,
            d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)

        //erase all
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //put mem 
        const w = memCanvas.width / dpr;
        const h = memCanvas.height / dpr;

        ctx.drawImage(memCanvas, 0, 0, w, h);
        //stroke the whole line 
        ctx.stroke();
    }
}
function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
