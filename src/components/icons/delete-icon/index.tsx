import { useTheme } from "@/hooks/use-theme";
import { DeleteFilled } from "@ant-design/icons";
import { ComponentProps } from "react";

export const DeleteIcon = (props: ComponentProps<typeof DeleteFilled>) => {
  const { theme } = useTheme();
  return (
    <DeleteFilled
      {...props}
      data-cy="delete-icon"
      style={{
        ...props.style,
        color: theme.colorError,
      }}
    />
  );
};
