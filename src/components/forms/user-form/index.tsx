import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { BaseModalForm } from "../base-modal-form";
import { BaseModalFormProps } from "../types";
import { UserSchema, userSchema } from "./schema";

export const UserForm = ({
  onSubmitHandler,
  defaultValues,
}: BaseModalFormProps<UserSchema>) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormResolver<UserSchema>(userSchema, {
    defaultValues,
  });

  const onSubmit = handleSubmit(onSubmitHandler);

  return (
    <BaseModalForm
      onSubmit={onSubmit}
      buttonProps={{
        loading: isSubmitting,
      }}
    >
      <ControlledTextField control={control} name="name" label="Name" />
      <ControlledTextField
        control={control}
        name="email"
        label="Email"
        type="email"
      />
    </BaseModalForm>
  );
};
