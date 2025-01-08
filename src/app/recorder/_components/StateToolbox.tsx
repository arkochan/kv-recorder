import React from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';
import { useStore } from '../_store/useStore'; // Adjust the import path as necessary

const tools = [
  { name: 'undo', svgSrc: '/undo.svg' },
  { name: 'redo', svgSrc: '/redo.svg' },
  { name: 'clear', svgSrc: '/x-circle.svg' },
];

export default function StateToolbox({ className, executeAction }: { className?: string, executeAction: (tool: string) => void }) {
  function handleToolChange(tool: string) {
    executeAction(tool);
  }
  return (
    <div className={cn("flex-col h-fit", className)}>
      {tools.map((tool) => (
        <ButtonTB
          key={tool.name}
          svgSrc={tool.svgSrc}
          onClick={() => handleToolChange(tool.name)}
        />
      ))}
    </div>
  );
}
