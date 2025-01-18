import React from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';
import { useStore } from '../_store/useStore'; // Adjust the import path as necessary
import Tweaker from './ToolTweak';

const tools = [
  // { name: 'mouse', svgSrc: '/mouse-pointer-2.svg' },
  { name: 'pen', svgSrc: '/pencil.svg' },
  { name: 'eraser', svgSrc: '/eraser.svg' },
  { name: 'rectangle', svgSrc: '/rectangle-horizontal.svg' },
  { name: 'circle', svgSrc: '/circle.svg' },
];

export default function Toolbox({ className, changeTool, setColor, setWidth }: { className?: string, changeTool: (tool: string) => void, setColor: (s: string) => void, setWidth: (n: number) => void }) {
  const setCurrentTool = useStore((state) => state.setCurrentTool);
  const currentTool = useStore((state) => state.currentTool);
  const [tweakerVisible, setTweakerVisible] = React.useState(false);
  function handleToolChange(tool: string) {
    if (tool === 'eraser') {
      setTweakerVisible(false);
    }
    else if (currentTool === tool) {
      setTweakerVisible(!tweakerVisible);
    }
    else { setTweakerVisible(true); }
    changeTool(tool);
    setCurrentTool(tool);
  }
  return (
    <>
      <div className={cn("flex-col h-fit tool-container-vertical", className)}>
        {tools.map((tool) => (
          <ButtonTB
            key={tool.name}
            active={currentTool === tool.name}
            svgSrc={tool.svgSrc}
            onClick={() => handleToolChange(tool.name)}
          />
        ))}
      </div>
      <div className={cn('absolute top-10 left-20 h-fit', tweakerVisible ? "block" : "hidden")}>
        <Tweaker setColor={setColor} setWidth={setWidth} />
      </div>
    </>
  );
}
