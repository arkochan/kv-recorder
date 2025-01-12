import React, { useState } from 'react';
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';
import IdleState from './stateComponents/IdleState';
import RecordingState from './stateComponents/RecordingState';
import PausedState from './stateComponents/PausedState';
import PlayingState from './stateComponents/PlayingState';
import StoppedState from './stateComponents/StoppedState';

enum State {
  Idle = 'idle',
  Recording = 'recording',
  Paused = 'paused',
  Playing = 'playing',
  Stopped = 'stopped'
}

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
  const [state, setState] = useState<State>(State.Idle);
  const [recordingTime, setRecordingTime] = useState(0);
  let timer: NodeJS.Timeout;

  function handleRecord() {
    setState(State.Recording);
    setRecordingTime(0);
    timer = setInterval(function () {
      setRecordingTime(function (prev) {
        return prev + 1;
      });
    }, 1000);
  }

  function handlePause() {
    clearInterval(timer);
    setState(State.Paused);
  }

  function handleResume() {
    setState(State.Recording);
    timer = setInterval(function () {
      setRecordingTime(function (prev) {
        return prev + 1;
      });
    }, 1000);
  }

  function handleStop() {
    clearInterval(timer);
    setState(State.Stopped);
  }

  function handleDiscard() {
    clearInterval(timer);
    setState(State.Idle);
    setRecordingTime(0);
  }

  function handlePlay() {
    setState(State.Playing);
  }

  return (
    <div
      className={cn(
        'flex flex-row gap-4 p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out',
        {
          'bg-gray-800 ': state === State.Idle,
          'bg-red-800 ': state === State.Recording,
          'bg-yellow-700': state === State.Paused,
          'bg-blue-700 ': state === State.Playing,
          'bg-gray-700 ': state === State.Stopped,
        },
        className,
      )}
    >
      {state === State.Idle && <IdleState handleRecord={handleRecord} />}
      {state === State.Recording && <RecordingState handlePause={handlePause} handleStop={handleStop} />}
      {state === State.Paused && <PausedState handleResume={handleResume} handleStop={handleStop} />}
      {state === State.Playing && <PlayingState handlePause={handlePause} handleStop={handleStop} />}
      {state === State.Stopped && <StoppedState handleRecord={handleRecord} />}
    </div>
  );
}
