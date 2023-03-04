import { create } from "zustand";

interface Store {
  isCreatingWorkOrder: boolean;
  openCreateWorkOrderForm: () => void;
  closeCreateWorkOrderForm: () => void;
}

export const useAssetViewStore = create<Store>((set) => ({
  isCreatingWorkOrder: false,
  openCreateWorkOrderForm: () => set({ isCreatingWorkOrder: true }),
  closeCreateWorkOrderForm: () => set({ isCreatingWorkOrder: false }),
}));
