import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StarSystem } from "../src/objects/StarSystem";


const asyncStorageAdapter = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

interface AppState {
  count: number;
  increase: () => void;
  starSystem: StarSystem | null;
  updateStarSystem: (system: StarSystem) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
      starSystem: null,
      updateStarSystem: (system: StarSystem) => set({ starSystem: system }),
    }),
    { 
      name: "app-storage",
      storage: asyncStorageAdapter,
    }
  ),
  
);