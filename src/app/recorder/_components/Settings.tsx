import React, { useState } from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTBD';

interface Keybinds {
  [category: string]: {
    [key: string]: string;
  };
}

const initialSettings: Keybinds = {
  tools: {
    pen: "P",
    eraser: "E",
    rectangle: "R",
    circle: "C",
    selection: "S"
  },
  actions: {
    undo: "Ctrl+Z",
    redo: "Ctrl+Y",
    clear: "Ctrl+C"
  },
  media: {
    record: "Ctrl+R",
    pause: "Ctrl+P",
    stop: "Ctrl+S"
  }
};

export default function Settings({ className, closeModal }: { className?: string, closeModal: () => void }) {
  const [settings, setSettings] = useState<Keybinds>(initialSettings);

  const handleChange = (category: string, key: string, value: string) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [key]: value
      }
    }));
  };

  return (

    <div className={cn("p-4 bg-white rounded shadow-md", className)}>
      <ButtonTB className='absolute right-4 top-4' svgSrc="/x-circle.svg" onClick={closeModal} />
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      {Object.entries(settings).map(([category, keys]) => (
        <div key={category} className="mb-4">
          <h3 className="text-lg font-semibold capitalize">{category}</h3>
          {Object.entries(keys).map(([key, value]) => (
            <div key={key} className="flex items-center mb-2">
              <label className="w-32 capitalize">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(category, key, e.target.value)}
                className="border p-1 rounded w-full"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
