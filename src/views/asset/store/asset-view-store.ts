import { WorkOrder } from "@/types/entities/work-order";
import { create } from "zustand";

interface Store {
  isCreatingWorkOrder: boolean;
  openCreateWorkOrderForm: () => void;
  closeCreateWorkOrderForm: () => void;
  activeWorkOrder: WorkOrder | null;
  setActiveWorkOrder: (workOrder: WorkOrder | null) => void;
  editingWorkOrder: WorkOrder | null;
  setEditingWorkOrder: (workOrder: WorkOrder | null) => void;
}

export const useAssetViewStore = create<Store>((set) => ({
  isCreatingWorkOrder: false,
  openCreateWorkOrderForm: () => set({ isCreatingWorkOrder: true }),
  closeCreateWorkOrderForm: () => set({ isCreatingWorkOrder: false }),
  activeWorkOrder: null,
  setActiveWorkOrder: (workOrder) => set({ activeWorkOrder: workOrder }),
  editingWorkOrder: null,
  setEditingWorkOrder: (workOrder) => set({ editingWorkOrder: workOrder }),
}));
