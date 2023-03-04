import { useTheme } from "@/hooks/use-theme";
import { CloseCircleOutlined } from "@ant-design/icons";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof CloseCircleOutlined>;
export const CloseIcon = (props: Props) => {
  const { theme } = useTheme();
  return (
    <CloseCircleOutlined
      style={{
        fontSize: 24,
        color: theme.colorError,
        ...props.style,
      }}
      {...props}
    />
  );
};
