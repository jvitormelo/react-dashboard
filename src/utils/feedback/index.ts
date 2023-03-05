import { message, notification } from "antd";

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

export const showMessage = {
  success: (value: string) => {
    message.success(value);
  },
  error: (value: string) => {
    message.error(value);
  },
};
