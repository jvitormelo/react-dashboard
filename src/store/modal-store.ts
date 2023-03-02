import { ModalProps } from "antd";
import { create } from "zustand";

export interface Modal extends ModalProps {
  id: string;
  body: React.ReactNode;
}

interface Store {
  modals: Modal[];
  actions: {
    addModal: (modal: Modal) => void;
    removeModal: (modalId: string) => void;
    removeLastModal: () => void;
  };
}

export const useModalStore = create<Store>((set) => ({
  modals: [],
  actions: {
    addModal: (modal) =>
      set((state) => ({
        modals: [...state.modals.filter((item) => item.open), modal],
      })),
    removeModal: (modalId) => {
      set((state) => ({
        modals: state.modals.map((modal) =>
          modal.id === modalId ? { ...modal, open: false } : modal
        ),
      }));
    },
    removeLastModal: () => {
      set((state) => ({
        modals: state.modals.map((modal, index) =>
          index === state.modals.length - 1 ? { ...modal, open: false } : modal
        ),
      }));
    },
  },
}));
