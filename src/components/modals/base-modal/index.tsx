import { Modal, ModalProps } from "antd";

interface Props extends ModalProps {
  showFooter?: boolean;
  body: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}

export const BaseModal = (props: Props) => {
  return (
    <Modal
      {...props}
      onCancel={() => props.setIsOpen(false)}
      footer={props.footer || props.showFooter ? undefined : null}
    >
      <div
        style={{
          marginTop: 32,
        }}
      >
        {props.body}
      </div>
    </Modal>
  );
};
