import { useModalStore } from "@/store/modal-store";

export const useModal = () => {
  const openModal = useModalStore((selector) => selector.openModal);
  const closeModal = useModalStore((selector) => selector.closeModal);

  return {
    openModal,
    closeModal,
  };
};
