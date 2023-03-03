import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { BaseModalForm } from "../base-modal-form";
import { UserSchema, userSchema } from "./schema";

interface Props {
  onSubmitHandler: (values: UserSchema) => Promise<void>;
  defaultValues?: UserSchema;
}

export const UserForm = ({ onSubmitHandler, defaultValues }: Props) => {
  const { control, handleSubmit } = useFormResolver<UserSchema>(userSchema, {
    defaultValues,
  });

  const onSubmit = handleSubmit(onSubmitHandler);

  return (
    <BaseModalForm onSubmit={onSubmit}>
      <ControlledTextField<UserSchema>
        control={control}
        name="name"
        label="Name"
      />
      <ControlledTextField<UserSchema>
        control={control}
        name="email"
        label="Email"
        type="email"
      />
    </BaseModalForm>
  );
};
