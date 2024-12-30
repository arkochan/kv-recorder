import Camera from "./_components/Camera";
import Canvas from "./_components/Canvas";
import Controls from "./_components/Controls";
import InfoBar from "./_components/InfoBar";
import Presentation from "./_components/Presentation";
import Toolbox from "./_components/Toolbox";


export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Canvas />
      <Presentation />
      <Camera />
      <Toolbox />
      <InfoBar />
      <Controls />
    </div>
  );
}
