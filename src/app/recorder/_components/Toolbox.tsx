import React from 'react'
import { cn } from '@/lib/utils/tailwind';

export default function Toolbox({ className }: { className?: string }) {
    return (
        <div className={cn("", className)}>Toolbox</div>
    )
}
