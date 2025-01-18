import { cn } from "@/lib/utils/tailwind";
import { useState } from "react";

export default function Tweaker({ className, setWidth, setColor }: { className?: string, setWidth: (s: number) => void, setColor: (s: string) => void }) {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(4);
  const [activeColor, setActiveColor] = useState("Black");

  const colors = [
    { value: '#FF0000', label: 'Red' },
    { value: '#00FF00', label: 'Green' },
    { value: '#0000FF', label: 'Blue' },
    { value: '#000000', label: 'Black' }
  ];

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setActiveColor(color);
    setColor(color);
  };

  const handleWidthChange = (e) => {
    const w = parseInt(e.target.value);
    setLineWidth(w);
    setWidth(w);
  };

  return (
    <div className={cn("py-10", "tool-container-vertical")}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col space-y-3">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${activeColor === color.value ? 'scale-110 border-blue-500' : 'border-gray-200'
                }`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorClick(color.value)}
              aria-label={color.label}
            />
          ))}
        </div>

        <div className="h-32 flex items-center">
          <div className="-rotate-90 transform origin-center w-32">
            <input
              type="range"
              min="2"
              max="10"
              value={lineWidth}
              onChange={handleWidthChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

