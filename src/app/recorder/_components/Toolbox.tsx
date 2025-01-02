import React from 'react'
import { cn } from '@/lib/utils/tailwind';
import ButtonTB from '@/components/ButtonTB';

export default function Toolbox({ className }: { className?: string }) {
    return (
        <div className={cn("flex-col h-fit ", className)}>
            <ButtonTB svgSrc="/mouse-pointer-2.svg" onClick={() => { }} />
            <ButtonTB svgSrc="/pencil.svg" onClick={() => { }} />
            <ButtonTB svgSrc="/eraser.svg" onClick={() => { }} />
            <ButtonTB svgSrc="/rectangle-horizontal.svg" onClick={() => { }} />
            <ButtonTB svgSrc="/circle.svg" onClick={() => { }} />

        </div>
    )
}
