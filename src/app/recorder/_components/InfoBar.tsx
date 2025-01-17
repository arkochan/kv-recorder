import React from 'react'
import { cn } from '@/lib/utils/tailwind';
import Image from 'next/image';
import ButtonTBD from '@/components/ButtonTBD';

export default function InfoBar({ className, setModalOpen, closeModal }: { className?: string, setModalOpen: (s: string) => void, closeModal: () => void }) {
  return (
    <div className={cn("", className)}>
      <ButtonTBD
        svgSrc="./cog.svg"
        onClick={() => (setModalOpen("settings"))}
      />
    </div>
  )
}
