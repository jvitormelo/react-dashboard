import { useModalStore } from "@/store/modal-store";
import { Modal } from "antd";

export const ModalProvider = () => {
  const { modal, closeModal } = useModalStore();

  return (
    <Modal
      {...modal}
      onCancel={(e) => {
        if (modal.onCancel) modal.onCancel(e);
        closeModal();
      }}
      afterClose={() => {
        if (modal.afterClose) modal.afterClose();
        closeModal();
      }}
      footer={modal.footer || null}
      destroyOnClose
    >
      <div style={{ marginTop: 32 }}>{modal.body}</div>
    </Modal>
  );
};
