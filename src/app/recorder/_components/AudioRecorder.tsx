'use client'
import React, { useState } from "react";
import clsx from "clsx"; // Optional, for cleaner conditional class handling
import { cn } from "@/lib/utils/tailwind";
type State = "idle" | "recording" | "paused" | "playing" | "stopped";

function AudioRecorder({ className }: { className: string }) {
  const [state, setState] = useState<State>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingTime, setPlayingTime] = useState(0);
  let timer: NodeJS.Timeout;

  const handleRecord = () => {
    setState("recording");
    setRecordingTime(0);
    timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(timer);
    setState("paused");
  };

  const handlePlay = () => {
    setState("playing");
    setPlayingTime(0);
    timer = setInterval(() => {
      setPlayingTime((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timer);
    setState("stopped");
  };

  const handleDiscard = () => {
    clearInterval(timer);
    setState("idle");
    setRecordingTime(0);
    setPlayingTime(0);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white", className)}>
      <div
        className={clsx(
          "p-6 bg-gray-800 rounded-lg shadow-lg",
          "transition duration-500 ease-in-out transform",
          {
            "scale-100": state === "idle",
            "scale-105 bg-red-800": state === "recording",
            "scale-95 bg-yellow-700": state === "paused",
            "scale-100 bg-blue-700": state === "playing",
            "scale-90 bg-gray-700": state === "stopped",
          }
        )}
      >
        {state === "idle" && (
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
            onClick={handleRecord}
          >
            Record
          </button>
        )}

        {state === "recording" && (
          <>
            <p className="mb-4 text-red-400">Recording: {recordingTime}s</p>
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded mr-2"
              onClick={handlePause}
            >
              Pause
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded mr-2"
              onClick={handleStop}
            >
              Stop
            </button>
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded"
              onClick={handleDiscard}
            >
              Discard
            </button>
          </>
        )}

        {state === "paused" && (
          <>
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded mr-2"
              onClick={handleRecord}
            >
              Resume Recording
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded"
              onClick={handlePlay}
            >
              Play
            </button>
          </>
        )}

        {state === "playing" && (
          <>
            <p className="mb-4 text-blue-400">Playing: {playingTime}s</p>
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded mr-2"
              onClick={handlePause}
            >
              Pause
            </button>
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded"
              onClick={handleStop}
            >
              Stop
            </button>
          </>
        )}

        {state === "stopped" && (
          <>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded mr-2"
              onClick={handlePlay}
            >
              Play
            </button>
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded"
              onClick={handleDiscard}
            >
              Discard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
