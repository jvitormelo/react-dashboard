import { Modal, useModalStore } from "@/store/modal-store";

// should create one Id per useModal or per openModal call
export const useModal = () => {
  // TO avoid re-rendering the component, we can select the actions
  const { addModal, removeLastModal, removeModal } = useModalStore(
    (select) => select.actions
  );

  const openModal = (modal: Omit<Modal, "id">) => {
    const id = Date.now().toString();

    addModal({ ...modal, id, open: true });

    return id;
  };

  /* 
     @description If id is not passed, it will close the last modal opened
    */
  const closeModal = (modalId?: string) => {
    if (modalId) {
      removeModal(modalId);
    } else {
      removeLastModal();
    }
  };

  return { openModal, closeModal };
};
