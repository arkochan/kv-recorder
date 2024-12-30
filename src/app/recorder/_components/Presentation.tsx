'use client';
import { useEffect } from 'react';
import { cn } from '@/lib/utils/tailwind';
import functionPlot from 'function-plot';

export default function Page({ className }: { className?: string }) {
    useEffect(() => {
        const container = document.getElementById("plot");

        if (container) {
            const { width, height } = container.getBoundingClientRect();

            functionPlot({
                target: "#plot",
                width: Math.max(width, 200), // Ensure a minimum width
                height: Math.max(height, 200), // Ensure a minimum height
                yAxis: { domain: [-1, 9] },
                grid: true,
                data: [
                    {
                        fn: "x^2",
                        derivative: {
                            fn: "2 * x",
                            updateOnMouseMove: true,
                        },
                    },
                ],
            });
        }
    }, []);

    return (
        <div
            className={cn("relative w-16 h-10", className)} // Add fixed width and height
            style={{ overflow: "hidden" }} // Prevent overflow
        >
            <div id="plot" className="absolute inset-0"></div> {/* Fill the parent */}
        </div>
    );
}
