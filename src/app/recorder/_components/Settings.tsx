import React, { useState } from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTBD';
import { Config } from '@/types/types';

export default function Settings({ className, closeModal, updateConfig, configRef }:
  {
    className?: string,
    closeModal: () => void,
    updateConfig: (s: Config) => void,
    configRef: React.RefObject<Config | null>
  }) {
  if (configRef.current === null) return <div>NO CONFIG FOUND</div>;

  const [config, setConfig] = useState<Config>(configRef.current);
  const handleChange = (configClass: string, category: string, key: string, value: string) => {
    console.log("handle", key, value)
    const prevSettings = config;
    const newSettings = {
      ...prevSettings,
      [configClass]: {
        ...prevSettings[configClass],
        [category]: {
          ...prevSettings[configClass][category],
          [key]: value
        }
      }
    };
    console.log("newSettings", newSettings)
    setConfig(newSettings);
  };
  function saveHandler() {
    updateConfig(config);
    closeModal();
  }

  return (
    <div className={cn("p-4 bg-white rounded shadow-md", className)}>
      <ButtonTB className='absolute right-4 top-4' svgSrc="/x-circle.svg" onClick={closeModal} />

      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {Object.entries(config).map(([config, categories]) => (
        <div key={config}>
          <h2 className="text-2xl font-bold mb-4">{config}</h2>
          {Object.entries(categories).map(([category, keys]) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold capitalize">{category}</h3>
              {Object.entries(keys).map(([key, value]) => (
                <div key={key} className="flex items-center mb-2">
                  <label className="w-32 capitalize">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(config, category, key, e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <ButtonTB svgSrc="./pencil.svg" label="Save" onClick={saveHandler} />
    </div>
  );
}
