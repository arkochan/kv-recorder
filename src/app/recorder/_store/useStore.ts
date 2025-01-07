import { Session } from '@/types/types';
import { create } from 'zustand';

interface CanvasState {
  currentTool: string;
  setCurrentTool: (tool: string) => void;
}

export const useStore = create<CanvasState>((set) => ({
  currentTool: 'pen',
  setCurrentTool: (tool: string) => set({ currentTool: tool }),
}));
