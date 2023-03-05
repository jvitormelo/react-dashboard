import { WorkOrder } from "@/types/entities/work-order";
import { create } from "zustand";

interface Store {
  isCreatingWorkOrder: boolean;
  editingWorkOrder: WorkOrder | null;
  openCreateWorkOrderForm: () => void;
  closeCreateWorkOrderForm: () => void;
  editWorkOrder: (workOrder: WorkOrder | null) => void;
  stopEditingWorkOrder: () => void;
}

export const useAssetViewStore = create<Store>((set) => ({
  isCreatingWorkOrder: false,
  openCreateWorkOrderForm: () => set({ isCreatingWorkOrder: true }),
  closeCreateWorkOrderForm: () => set({ isCreatingWorkOrder: false }),
  editingWorkOrder: null,
  editWorkOrder: (workOrder) => set({ editingWorkOrder: workOrder }),
  stopEditingWorkOrder: () => set({ editingWorkOrder: null }),
}));
