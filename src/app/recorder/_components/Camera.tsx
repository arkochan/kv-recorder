import React from 'react'
import { cn } from '@/lib/utils/tailwind';

export default function Camera({ className }: { className?: string }) {
    return (
        <div className={cn("", className)}></div>
    )
}
