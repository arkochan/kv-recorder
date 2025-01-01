import React from 'react'
import { cn } from '@/lib/utils/tailwind';
export default function Controls({ className, clearBoard, smooth, setSmooth, play }: { className?: string, smooth: number, setSmooth: (value: number) => void, clearBoard: () => void, play: () => void }) {

    return (
        <div className={cn("flex flex-row", className)}>
            <button className={cn("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded")}>Start</button>
            <button className={cn("bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded")}>Stop</button>
            <div className="flex flex-col">
                <label>Smoothness {smooth}</label>
                <input
                    type="range"
                    min="1"
                    max="20" value={smooth}
                    onChange={(e) => setSmooth(parseInt(e.target.value))}
                />
            </div>
            {/*clear button*/}
            <button onClick={() => clearBoard()} className={cn("bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded")}>Clear</button>
            {/*play Button*/}
            <button onClick={() => play()} className={cn("bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded")}>Play</button>
        </div>

    )
}
