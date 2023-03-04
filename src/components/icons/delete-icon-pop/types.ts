import { PopconfirmProps } from "antd";

export interface DeleteIconPopProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void> | void;
  placement?: PopconfirmProps["placement"];
}
