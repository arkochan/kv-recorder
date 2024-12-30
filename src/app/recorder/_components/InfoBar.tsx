import React from 'react'
import { cn } from '@/lib/utils/tailwind';

export default function InfoBar({ className }: { className?: string }) {
    return (
        <div className={cn("", className)}>InfoBar</div>
    )
}
