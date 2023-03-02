import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "antd";
import { companyFormSchema, CompanyFormSchema } from "./schema";

interface Props {
  defaultValues?: CompanyFormSchema;
  onSubmit: (values: CompanyFormSchema) => void;
  loading?: boolean;
}

export const CompanyForm = ({ onSubmit, defaultValues, loading }: Props) => {
  const { theme } = useTheme();

  const { handleSubmit, control } = useFormResolver<CompanyFormSchema>(
    companyFormSchema,
    {
      defaultValues,
    }
  );

  const submit = handleSubmit(onSubmit);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.marginMD,
      }}
      onSubmit={submit}
    >
      <ControlledTextField<CompanyFormSchema>
        label="Name"
        name="name"
        control={control}
      />

      <Button
        loading={loading}
        style={{ marginLeft: "auto" }}
        type="primary"
        size="large"
        htmlType="submit"
      >
        Create
      </Button>
    </form>
  );
};
