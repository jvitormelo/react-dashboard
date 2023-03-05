import { useTheme } from "@/hooks/use-theme";
import { EditFilled } from "@ant-design/icons";
import { Button } from "antd";
import { forwardRef } from "react";

interface Props {
  onClick: () => void | Promise<void>;
}

export const EditIcon = forwardRef<HTMLButtonElement, Props>(
  ({ onClick }, ref) => {
    const { theme } = useTheme();

    return (
      <Button
        style={{
          color: theme.colorPrimary,
          padding: 12,
          display: "flex",
          alignItems: "center",
        }}
        ref={ref}
        onClick={onClick}
      >
        <EditFilled
          style={{
            fontSize: 20,
          }}
          type="error"
        />
      </Button>
    );
  }
);
