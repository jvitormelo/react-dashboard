import { useModalStore } from "@/store/modal-store";
import { Modal } from "antd";

export const ModalController = () => {
  const {
    modals,
    actions: { removeModal },
  } = useModalStore();

  return (
    <>
      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          {...modal}
          onCancel={(e) => {
            if (modal.onCancel) modal.onCancel(e);
            removeModal(modal.id);
          }}
          afterClose={() => {
            if (modal.afterClose) modal.afterClose();
            removeModal(modal.id);
          }}
          zIndex={(modal.zIndex ?? 1000) + index}
          footer={modal.footer || null}
          destroyOnClose
        >
          <div style={{ marginTop: 32 }}>{modal.body}</div>
        </Modal>
      ))}
    </>
  );
};
