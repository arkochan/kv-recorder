import { useState } from "react";

export default function Tweaker({ className, setWidth, setColor }: { className: string, setWidth: (s: number) => void, setColor: (s: string) => void }) {
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
    <div className="tool-container-vertical ">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Colors</label>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${activeColor === color.value ? 'scale-110 border-blue-500' : 'border-gray-200'
                }`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorClick(color.value)}
              aria-label={color.label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Line Width: {lineWidth}px
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={lineWidth}
          onChange={handleWidthChange}
          className="w-full"
        />
      </div>

      {/*  Preview  */}
      {/* <div className="mt-4 p-4 border rounded-lg"> */}
      {/*   <div className="text-sm font-medium mb-2">Preview</div> */}
      {/*   <div className="h-8 flex items-center justify-center"> */}
      {/*     <div */}
      {/*       className="rounded-full" */}
      {/*       style={{ */}
      {/*         backgroundColor: selectedColor, */}
      {/*         width: `${lineWidth}px`, */}
      {/*         height: `${lineWidth}px` */}
      {/*       }} */}
      {/*     /> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
};

