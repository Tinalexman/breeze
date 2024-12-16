import { create } from "zustand";

type GlobalData = {
  currentIndex: number;
  gotoIndex(index: number): void;

  reload: boolean;
  reloadCurrentPage: () => void;
};

export const useGlobalData = create<GlobalData>((set, get) => ({
  currentIndex: 0,
  gotoIndex: (index: number) => set({ currentIndex: index }),
  reload: false,
  reloadCurrentPage: () => set({ reload: !get().reload }),
}));
