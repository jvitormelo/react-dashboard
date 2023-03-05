import { useTheme } from "@/hooks/use-theme";
import { Button, Popconfirm } from "antd";
import { DeleteIcon } from "../../icons/delete-icon";
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
      icon={<DeleteIcon />}
    >
      <Button
        style={{
          color: theme.colorError,
        }}
      >
        <DeleteIcon />
      </Button>
    </Popconfirm>
  );
};
