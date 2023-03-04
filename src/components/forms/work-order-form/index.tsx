import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { BaseModalForm } from "../base-modal-form";
import { WorkOrderSchema, workOrderSchema } from "./schema";

interface Props {
  onSubmitHandler: (data: WorkOrderSchema) => Promise<void>;
}

export const WorkOrderForm = ({ onSubmitHandler }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormResolver<WorkOrderSchema>(workOrderSchema);

  const onSubmit = handleSubmit(onSubmitHandler);

  return (
    <BaseModalForm
      onSubmit={onSubmit}
      buttonProps={{
        loading: isSubmitting,
      }}
    >
      <ControlledTextField label="Title" name="title" control={control} />

      <ControlledTextField
        label="Description"
        name="description"
        control={control}
      />

      <ControlledSelect
        name="assignedUserIds"
        label="Assigned To"
        control={control}
      />
    </BaseModalForm>
  );
};
