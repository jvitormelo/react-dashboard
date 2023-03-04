import { ControlledTextArea } from "@/components/controlled/controlled-text-area";
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
  } = useFormResolver<WorkOrderSchema>(workOrderSchema, {});

  const onSubmit = handleSubmit(onSubmitHandler);

  return (
    <BaseModalForm
      onSubmit={onSubmit}
      buttonProps={{
        loading: isSubmitting,
      }}
    >
      <ControlledTextField label="Title" name="title" control={control} />

      <ControlledTextArea
        label="Description"
        name="description"
        control={control}
      />

      <ControlledTextArea
        label="Checklist and Assigned Users"
        name="content"
        control={control}
      />
    </BaseModalForm>
  );
};
