import { create } from "zustand";

type GlobalData = {
  currentIndex: number;
  gotoIndex(index: number): void;
  expanded: boolean;
};

export const useGlobalData = create<GlobalData>((set) => ({
  currentIndex: 0,
  gotoIndex: (index: number) => set({ currentIndex: index }),
  expanded: false,
}));
