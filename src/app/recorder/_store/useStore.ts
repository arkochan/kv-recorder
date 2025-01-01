import { Session } from '@/types/types';
import { create } from 'zustand';

interface canvasState {
    smooth: number;
    setSmooth: (smooth: number) => void;
    sessions: Session[];
    setSessions: (sessions: Session[]) => void;
    startTime: number;
    setStartTime: (startTime: number) => void;

}

export const useStore = create<canvasState>((set) => ({
    smooth: 5,
    setSmooth: (smooth) => set({ smooth }),
    sessions: [],
    setSessions: (sessions) => set({ sessions }),
    startTime: 0,
    setStartTime: (startTime) => set({ startTime }),
}));