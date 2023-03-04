import { useTheme } from "@/hooks/use-theme";
import { DeleteFilled } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { DeleteIconPopProps } from "./types";

export const DeleteIconPop = ({
  title = "Delete?",
  description,
  onConfirm,
  placement = "bottomLeft",
}: DeleteIconPopProps) => {
  const { theme } = useTheme();

  return (
    <Popconfirm
      placement={placement}
      title={title}
      description={description}
      onConfirm={onConfirm}
      okText="Yes"
      cancelText="No"
      icon={
        // TODO - create delete icon
        <DeleteFilled
          style={{
            color: theme.colorError,
          }}
        />
      }
    >
      <Button
        style={{
          color: theme.colorError,
        }}
      >
        <DeleteFilled size={30} />
      </Button>
    </Popconfirm>
  );
};
