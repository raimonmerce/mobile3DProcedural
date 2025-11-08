import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

interface AppState {
  count: number;
  increase: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "app-storage", getStorage: () => AsyncStorage }
  )
);