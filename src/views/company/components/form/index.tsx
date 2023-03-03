import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { UnitSchema, unitSchema } from "./schema";

interface Props {
  onSubmit: (data: UnitSchema) => Promise<void>;
  defaultValues?: UnitSchema;
}

export const CompanyForm = ({ onSubmit, defaultValues }: Props) => {
  const { control, handleSubmit } = useFormResolver<UnitSchema>(unitSchema, {
    defaultValues,
  });

  const submitHandler = handleSubmit(onSubmit);

  return (
    <form onSubmit={submitHandler}>
      <ControlledTextField<UnitSchema>
        name="name"
        control={control}
        label="Name"
      />
    </form>
  );
};
