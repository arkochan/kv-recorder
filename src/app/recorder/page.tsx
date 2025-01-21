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
import Settings from "./_components/Settings";
import { useKeybindings } from "@/hooks/keybindings";
import { config } from "@/lib/cfg/config";
import { Config } from "@/types/types";
import { useStore } from './_store/useStore'; // Adjust the import path as necessary
const canvas = new CanvasService();

export default function page() {

  const setCurrentTool = useStore((state) => state.setCurrentTool);
  const currentTool = useStore((state) => state.currentTool);
  const configRef = useRef<Config | null>(null);
  configRef.current = loadConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [modalOpen, setModalOpen] = useState("closed");
  function getDefaultConfig() {
    return config;
  }
  function loadConfig() {
    const storedConfig = localStorage.getItem("config");
    return storedConfig ? JSON.parse(storedConfig) : getDefaultConfig();
  }
  const closeModal = () => (
    setModalOpen("closed")
  )

  useEffect(() => {
    console.log("useEffect", modalOpen); // Logs whenever modalOpen changes
  }, [modalOpen]);
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

  function keyDownAction({ category, action }: { category: string, action: string }) {
    switch (category) {
      case "tools":
        canvas.setTool(action);
        setCurrentTool(action);
        break;
      case "actions":
        canvas.executeAction(action);
        break;
      case "media":
        break;
      case "modifier":
        canvas.setModifier(action);
        break;
      default:
        console.warn(`Unhandled category: ${category}`);
    }
  };
  function keyUpAction({ category, action }: { category: string, action: string }) {
    switch (category) {
      case "modifier":


    }
  };


  useKeybindings(configRef, keyDownAction, keyUpAction);

  function updateConfig(newConfig: Config) {
    // Update the config in localStorage and ref
    configRef.current = newConfig;
    localStorage.setItem("config", JSON.stringify(newConfig));
  };

  return (
    <div className="relative max-h-screen flex flex-col bg-grey">
      <Canvas canvasRef={canvasRef} canvas={canvas} className="" />
      <Presentation className="-z-10 shadow-md absolute rounded-xl right-0 top-1/2 -translate-y-full border h-52 w-72 flex justify-center items-center" />
      <Camera className="absolute bg-white rounded-full w-32 h-32 right-10 bottom-10" />
      <div className="absolute -translate-y-1/2 top-1/2 left-4">
        <Toolbox setWidth={(width) => canvas.setWidth(width)} setColor={(c) => canvas.setColor(c)} changeTool={changeTool} className="  " />
        <StateToolbox executeAction={executeAction} className="tool-container-vertical mt-2 " />
      </div>
      <InfoBar closeModal={closeModal} setModalOpen={setModalOpen} className="tool-container-horizontal absolute right-4 top-4" />

      {/* <Controls className="tool-container-horizontal absolute bottom-10 left-10" /> */}
      {/* <AudioRecorder className="tool-container-horizontal absolute bottom-10 left-10" /> */}

      {/* Modal Shade Bg */}
      {/* <div */}
      {/*   className={`fixed -z-10 inset-0 bg-black/50 transition-opacity duration-300 ${modalOpen !== "closed" ? 'opacity-100' : 'opacity-0 pointer-events-none' */}
      {/*     }`} */}
      {/*   onClick={() => closeModal()} */}
      {/* > */}
      <div
        className={`fixed inset-0 flex items-center justify-center pointer-events-none`}
      >
        <div
          className={`bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 ${modalOpen === "settings"
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
        >
          <Settings configRef={configRef} updateConfig={updateConfig} closeModal={closeModal} />
        </div>
      </div>
    </div>
    // </div >
  );
}
