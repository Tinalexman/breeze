import { create } from "zustand";

type GlobalData = {
  currentIndex: number;
  gotoIndex(index: number): void;
  showOverlay: boolean;
  toggleOverlay: () => void;
};

export const useGlobalData = create<GlobalData>((set, get) => ({
  currentIndex: 0,
  gotoIndex: (index: number) => set({ currentIndex: index }),
  showOverlay: false,
  toggleOverlay: () => set({ showOverlay: !get().showOverlay }),
}));
