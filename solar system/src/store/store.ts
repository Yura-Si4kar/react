import { StoreState } from '@/types/type';
import { create } from 'zustand';

export const useStore = create<StoreState>((set) => ({
  trajectory: false,
    isTrajectory: () => set((state) => ({
        trajectory: !state.trajectory
    })),
}))