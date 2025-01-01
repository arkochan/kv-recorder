'use client';
import Camera from "./_components/Camera";
import Canvas from "./_components/Canvas";
import Controls from "./_components/Controls";
import InfoBar from "./_components/InfoBar";
import Presentation from "./_components/Presentation";
import Toolbox from "./_components/Toolbox";
import { useEffect, useRef, useState } from "react";
import { clear, setSmoothness, getStrokes } from "./_service/whiteboard";
import { playback } from "./_service/playback";


export default function page() {
  const [smooth, setSmooth] = useState(5);
  useEffect(() => {
    setSmoothness(smooth);
  }, [smooth]);
  var memCanvas = document.createElement('canvas');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  function clearBoard() {
    clear(canvasRef.current as HTMLCanvasElement, memCanvas);
  }
  function play() {
    const strokes = getStrokes();
    const currentSession = { strokes: strokes };
    playback(currentSession, canvasRef.current as HTMLCanvasElement, memCanvas);

  }
  return (
    <div className="relative max-h-screen flex flex-col">
      <Canvas canvasRef={canvasRef} memCanvas={memCanvas} className="" />
      <Presentation className="-z-10 shadow-md absolute rounded-xl right-0 top-1/2 -translate-y-full border h-52 w-72 flex justify-center items-center" />
      <Camera className="absolute" />
      <Toolbox className="absolute" />
      <InfoBar className="absolute" />
      <Controls play={play} clearBoard={clearBoard} className="absolute bottom-0" smooth={smooth} setSmooth={setSmooth} />
    </div>
  );
}
