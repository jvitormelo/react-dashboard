import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { BaseModalForm } from "../base-modal-form";
import { BaseModalFormProps } from "../types";
import { companyFormSchema, CompanyFormSchema } from "./schema";

export const CompanyForm = ({
  onSubmitHandler,
  defaultValues,
  buttonLabel,
}: BaseModalFormProps<CompanyFormSchema>) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useFormResolver<CompanyFormSchema>(companyFormSchema, {
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
      <ControlledTextField<CompanyFormSchema>
        label="Name"
        name="name"
        control={control}
      />
    </BaseModalForm>
  );
};
