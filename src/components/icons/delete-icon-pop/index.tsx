import { Button, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useTheme } from "@/hooks/use-theme";

interface Props {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
}

export const DeleteIconPop = ({
  title = "Delete?",
  description,
  onConfirm,
}: Props) => {
  const { theme } = useTheme();

  return (
    <Popconfirm
      placement="bottomLeft"
      title={title}
      description={description}
      onConfirm={onConfirm}
      okText="Yes"
      cancelText="No"
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
