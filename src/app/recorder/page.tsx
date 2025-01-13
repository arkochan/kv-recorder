'use client';
import Camera from "./_components/Camera";
import Canvas from "./_components/Canvas";
import Controls from "./_components/Controls";
import InfoBar from "./_components/InfoBar";
import Presentation from "./_components/Presentation";
import Toolbox from "./_components/Toolbox";
import { useEffect, useRef, useState } from "react";
import { Whiteboard } from "./_service/whiteboard";
import { CanvasService } from "./_service/canvas";

import { playback } from "./_service/playback";
import { Session } from "@/types/types";
import AudioRecorder from "./_components/AudioRecorder";
import StateToolbox from "./_components/StateToolbox";

export default function page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = new CanvasService();
  function changeTool(tool: string) {
    canvas.setTool(tool);
  }
  function executeAction(action: string) {
    canvas.executeAction(action);
  }
  useEffect(() => {

    if (!canvasRef.current) return;
    canvasRef.current.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    canvasRef.current.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    canvas.init({ canvas: canvasRef.current as HTMLCanvasElement, dpr: 2 });
  }, []);
  return (
    <div className="relative max-h-screen flex flex-col bg-grey">
      <Canvas canvasRef={canvasRef} canvas={canvas} className="" />
      <Presentation className="-z-10 shadow-md absolute rounded-xl right-0 top-1/2 -translate-y-full border h-52 w-72 flex justify-center items-center" />
      <Camera className="absolute bg-white rounded-full w-32 h-32 right-10 bottom-10" />
      <div className="absolute -translate-y-1/2 top-1/2 left-4">
        <Toolbox changeTool={changeTool} className="tool-container-vertical  " />
        <StateToolbox executeAction={executeAction} className="tool-container-vertical mt-2 " />
      </div>
      <InfoBar className="tool-container-horizontal absolute right-4 top-4" />
      {/* <Controls className="tool-container-horizontal absolute bottom-10 left-10" /> */}
      {/* <AudioRecorder className="tool-container-horizontal absolute bottom-10 left-10" /> */}
    </div>
  );
}
