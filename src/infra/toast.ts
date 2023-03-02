import { notification } from "antd";

export const toast = {
  success: (message: string) => {
    notification.success({
      message,
    });
  },
  error: (message: string) => {
    notification.error({
      message,
    });
  },
};
