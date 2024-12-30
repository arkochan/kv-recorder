'use client';
import Camera from "./_components/Camera";
import Canvas from "./_components/Canvas";
import Controls from "./_components/Controls";
import InfoBar from "./_components/InfoBar";
import Presentation from "./_components/Presentation";
import Toolbox from "./_components/Toolbox";
import { useEffect, useState } from "react";
import { setSmoothness } from "./_service/whiteboard";


export default function page() {
  const [smooth, setSmooth] = useState(5);
  useEffect(() => {
    setSmoothness(smooth);
  }, [smooth]);
  return (
    <div className="relative min-h-screen flex flex-col">
      <Canvas className="w-full" />
      <Presentation className="shadow-md absolute rounded-xl right-0 top-1/2 -translate-y-full border h-52 w-72 flex justify-center items-center" />
      <Camera className="absolute" />
      <Toolbox className="absolute" />
      <InfoBar className="absolute" />
      <Controls className="absolute " smooth={smooth} setSmooth={setSmooth} />
    </div>
  );
}
