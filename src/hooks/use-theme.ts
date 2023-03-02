import { theme } from "antd";

export const useTheme = () => {
  const { token } = theme.useToken();
  return {
    theme: token,
  };
};
