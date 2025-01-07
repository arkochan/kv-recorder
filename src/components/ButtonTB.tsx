"use client";
import React from 'react';
import { cn } from '@/lib/utils/tailwind';
import Image from 'next/image';
interface ButtonTBProps {
  svgSrc: string;
  label?: string;
  onClick: () => void;
  className?: string;
  active?: boolean;
}

export default function ButtonTB({ svgSrc, label, onClick, className, active }: ButtonTBProps) {
  return (
    <button onClick={onClick} className={cn("flex items-center p-2 gap-2 bg-white rounded-md border border-grey border-opacity-0 hover:border-opacity-100", className, active && "border-opacity-100 border-black border-2")}>
      <Image src={svgSrc} alt={label || svgSrc} width={24} height={24} />
      {label && <span className="font-medium text-sm text-black">{label}</span>}
    </button>
  );
}
