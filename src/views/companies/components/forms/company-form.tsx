import { useTheme } from "@/hooks/use-theme";
import { Company } from "@/types/entities/company";
import { Button, Form, Input } from "antd";

interface Props {
  defaultValues?: Company;
  onSubmit: (values: Company) => void;
}

export const CompanyForm = ({ onSubmit }: Props) => {
  const { theme } = useTheme();

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.marginMD,
      }}
      onFinish={(values) => {
        onSubmit(values as Company);
        console.log(values);
      }}
    >
      <Form.Item
        required
        rules={[{ required: true }]}
        label="Company name"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item style={{ marginLeft: "auto" }}>
        <Button type="primary" size="large" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
