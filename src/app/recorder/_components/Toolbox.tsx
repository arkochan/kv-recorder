import React from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';
import { useStore } from '../_store/useStore'; // Adjust the import path as necessary

const tools = [
  { name: 'mouse', svgSrc: '/mouse-pointer-2.svg' },
  { name: 'pen', svgSrc: '/pencil.svg' },
  { name: 'eraser', svgSrc: '/eraser.svg' },
  { name: 'rectangle', svgSrc: '/rectangle-horizontal.svg' },
  { name: 'circle', svgSrc: '/circle.svg' },
];

export default function Toolbox({ className, changeTool }: { className?: string, changeTool: (tool: string) => void }) {
  const setCurrentTool = useStore((state) => state.setCurrentTool);
  const currentTool = useStore((state) => state.currentTool);
  function handleToolChange(tool: string) {
    changeTool(tool);
    setCurrentTool(tool);
  }
  return (
    <div className={cn("flex-col h-fit", className)}>
      {tools.map((tool) => (
        <ButtonTB
          key={tool.name}
          active={currentTool === tool.name}
          svgSrc={tool.svgSrc}
          onClick={() => handleToolChange(tool.name)}
        />
      ))}
    </div>
  );
}
