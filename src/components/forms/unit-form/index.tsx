import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { BaseModalForm } from "../base-modal-form";
import { BaseModalFormProps } from "../types";
import { UnitSchema, unitSchema } from "./schema";

export const UnitForm = ({
  onSubmitHandler,
  defaultValues,
  buttonLabel,
}: BaseModalFormProps<UnitSchema>) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormResolver<UnitSchema>(unitSchema, {
    defaultValues,
  });

  const onSubmit = handleSubmit(onSubmitHandler);

  return (
    <BaseModalForm
      onSubmit={onSubmit}
      buttonProps={{
        loading: isSubmitting,
        label: buttonLabel,
      }}
    >
      <ControlledTextField<UnitSchema>
        name="name"
        control={control}
        label="Name"
      />
    </BaseModalForm>
  );
};
