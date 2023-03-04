import { PopconfirmProps } from "antd";

export interface DeleteIconPopProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  placement?: PopconfirmProps["placement"];
}
