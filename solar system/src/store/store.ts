import { StoreState } from '@/types/type';
import { create } from 'zustand';

export const useStore = create<StoreState>((set) => ({
  trajectory: false,
  loading: false,
    isTrajectory: () => set((state) => ({
        trajectory: !state.trajectory
    })),
    isLoading: () => set((state) => ({
      loading: !state.loading
    })), 
}))