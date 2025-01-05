import React, { useState } from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';

type State = 'idle' | 'recording' | 'paused' | 'playing' | 'stopped';

export default function Controls({
  className,
}: {
  className?: string;
}) {
  const [state, setState] = useState<State>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  let timer: NodeJS.Timeout;

  function handleRecord() {
    setState('recording');
    setRecordingTime(0);
    timer = setInterval(function () {
      setRecordingTime(function (prev) {
        return prev + 1;
      });
    }, 1000);
  }

  function handlePause() {
    clearInterval(timer);
    setState('paused');
  }

  function handleStop() {
    clearInterval(timer);
    setState('stopped');
  }

  function handleDiscard() {
    clearInterval(timer);
    setState('idle');
    setRecordingTime(0);
  }

  function handlePlay() {
    setState('playing');
  }

  return (
    <div
      className={cn(
        'flex flex-row gap-4 p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out',
        className,
        {
          'bg-gray-800 ': state === 'idle',
          'bg-red-800 ': state === 'recording',
          'bg-yellow-700': state === 'paused',
          'bg-blue-700 ': state === 'playing',
          'bg-gray-700 ': state === 'stopped',
        }
      )}
    >
      {state === 'idle' && (
        <ButtonTB
          svgSrc="/circle-dot.svg"
          label="Record"
          onClick={handleRecord}
        />
      )}
      {state === 'recording' && (
        <>
          <ButtonTB
            svgSrc="/pause-circle.svg"
            label="Pause"
            onClick={handlePause}
          />
          <ButtonTB
            svgSrc="/stop-circle.svg"
            label="Stop"
            onClick={handleStop}
          />
          <ButtonTB
            svgSrc="/x-circle.svg"
            label="Discard"
            onClick={handleDiscard}
          />
        </>
      )}
      {state === 'paused' && (
        <>
          <ButtonTB
            svgSrc="/circle-dot.svg"
            label="Resume"
            onClick={handleRecord}
          />
          <ButtonTB
            svgSrc="/play-circle.svg"
            label="Play"
            onClick={handlePlay}
          />
        </>
      )}
      {state === 'stopped' && (
        <>
          <ButtonTB
            svgSrc="/play-circle.svg"
            label="Play"
            onClick={handlePlay}
          />
          <ButtonTB
            svgSrc="/x-circle.svg"
            label="Discard"
            onClick={handleDiscard}
          />
        </>
      )}
      {state === 'playing' && (
        <>
          <ButtonTB
            svgSrc="/pause-circle.svg"
            label="Pause"
            onClick={handlePause}
          />
          <ButtonTB
            svgSrc="/stop-circle.svg"
            label="Stop"
            onClick={handleStop}
          />
        </>
      )}
    </div>
  );
}
