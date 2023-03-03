import { ModalProps } from "antd";
import { create } from "zustand";

export interface Modal extends ModalProps {
  body?: React.ReactNode;
}

interface Store {
  modal: Modal;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
}

export const useModalStore = create<Store>((set) => ({
  modal: {
    open: false,
  },
  openModal: (modal) =>
    set({
      modal: {
        ...modal,
        open: true,
      },
    }),
  closeModal: () => {
    set({
      modal: {
        open: false,
      },
    });
  },
}));
