import { Session } from '@/types/types';
import create from 'zustand';

interface canvasState {
    smooth: number;
    setSmooth: (smooth: number) => void;
    sessions: Session[];
    setSessions: (sessions: Session[]) => void;
    startTime: number;
    setStartTime: (startTime: number) => void;

}

export const useStore = create<canvasState>((set: ({ }) => void) => ({
    smooth: 5,
    setSmooth: (smooth: number) => set({ smooth }),
    sessions: [],
    setSessions: (sessions: Session[]) => set({ sessions }),
}));