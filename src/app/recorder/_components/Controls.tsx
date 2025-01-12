import React, { useState } from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';
import IdleState from './stateComponents/IdleState';
import RecordingState from './stateComponents/RecordingState';
import PausedState from './stateComponents/PausedState';
import PlayingState from './stateComponents/PlayingState';
import StoppedState from './stateComponents/StoppedState';

type State = 'idle' | 'recording' | 'paused' | 'playing' | 'stopped';

interface ControlsProps {
  state: State;
  handleRecord: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleStop: () => void;
}

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

  function handleResume() {
    setState('recording');
    timer = setInterval(function () {
      setRecordingTime(function (prev) {
        return prev + 1;
      });
    }, 1000);
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
      {state === 'idle' && <IdleState handleRecord={handleRecord} />}
      {state === 'recording' && <RecordingState handlePause={handlePause} handleStop={handleStop} />}
      {state === 'paused' && <PausedState handleResume={handleResume} handleStop={handleStop} />}
      {state === 'playing' && <PlayingState handlePause={handlePause} handleStop={handleStop} />}
      {state === 'stopped' && <StoppedState handleRecord={handleRecord} />}
    </div>
  );
}
