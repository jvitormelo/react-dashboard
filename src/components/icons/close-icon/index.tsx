import { useTheme } from "@/hooks/use-theme";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof CloseCircleOutlined>;

export const CloseIcon = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Button
      onClick={props.onClick}
      danger
      color={theme.colorError}
      size="large"
    >
      <CloseCircleOutlined
        style={{
          fontSize: 24,
          color: theme.colorError,
          ...props.style,
        }}
        {...props}
        onClick={() => {
          return;
        }}
      />
    </Button>
  );
};
