import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "antd";
import { useState } from "react";
import { UnitSchema, unitSchema } from "./schema";

interface Props {
  onSubmit: (data: UnitSchema) => Promise<void>;
  defaultValues?: UnitSchema;
}

export const UnitForm = ({ onSubmit, defaultValues }: Props) => {
  const { control, handleSubmit } = useFormResolver<UnitSchema>(unitSchema, {
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  });

  const { theme } = useTheme();

  return (
    <form onSubmit={submitHandler}>
      <ControlledTextField<UnitSchema>
        name="name"
        control={control}
        label="Name"
      />

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={isLoading}
        style={{
          marginTop: theme.marginMD,
          marginLeft: "auto",
          display: "flex",
        }}
      >
        Submit
      </Button>
    </form>
  );
};
