import { useTheme } from "@/hooks/use-theme";
import { Button, Divider } from "antd";
import { FormEvent } from "react";

interface Props {
  children: React.ReactNode;
  onSubmit: (values: FormEvent<HTMLFormElement>) => void;
  buttonProps?: {
    loading?: boolean;
    label?: string;
  };
}

export const BaseModalForm = ({ children, buttonProps, onSubmit }: Props) => {
  const { theme } = useTheme();

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.marginMD,
      }}
    >
      {children}
      <Divider />
      <Button
        style={{
          display: "flex",
          marginLeft: "auto",
        }}
        type="primary"
        htmlType="submit"
        size="large"
        loading={buttonProps?.loading}
      >
        {buttonProps?.label ?? "Submit"}
      </Button>
    </form>
  );
};
