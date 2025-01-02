import React from 'react'
import { cn } from '@/lib/utils/tailwind';
import { setStartTime } from '../_service/whiteboard';
import ButtonTB from '@/components/ButtonTB';


export default function Controls({ className, clearBoard, smooth, setSmooth, play }: { className?: string, smooth: number, setSmooth: (value: number) => void, clearBoard: () => void, play: () => void }) {
    function startSession() {
        setStartTime(Date.now());
    }
    return (
        <div className={cn("flex flex-row", className)}>
            <ButtonTB svgSrc="/circle-dot.svg" label="Record" onClick={startSession} />
            <ButtonTB svgSrc="/pause-circle.svg" label="Pause" onClick={startSession} />
            <ButtonTB svgSrc="/stop-circle.svg" label="Stop" onClick={startSession} />
            <ButtonTB svgSrc="/x-circle.svg" label="Discard" onClick={startSession} />
            <ButtonTB svgSrc="/pencil.svg" label="Sessions" onClick={startSession} />
        </div>

    )
}
