import { Button, Typography } from "antd";

interface Props {
  title?: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export const BaseTableHeader = ({
  buttonLabel,
  onButtonClick,
  title,
}: Props) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      {title && <Typography.Title level={3}>{title}</Typography.Title>}

      <Button
        onClick={onButtonClick}
        type="primary"
        size="large"
        style={{ marginLeft: "auto" }}
      >
        {buttonLabel}
      </Button>
    </header>
  );
};
