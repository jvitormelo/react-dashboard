import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledTextArea } from "@/components/controlled/controlled-text-area";
import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { User } from "@/types/entities/user";
import { BaseModalForm } from "../base-modal-form";
import { WorkOrderSchema, workOrderSchema } from "./schema";

interface Props {
  onSubmitHandler: (data: WorkOrderSchema) => Promise<void>;
  users: User[];
}

export const WorkOrderForm = ({ onSubmitHandler, users = [] }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormResolver<WorkOrderSchema>(workOrderSchema, {});

  const onSubmit = handleSubmit(onSubmitHandler);

  const options = users.map((user) => ({
    label: `${user.email} ${user.email}}`,
    value: user.id,
  }));

  return (
    <BaseModalForm
      onSubmit={onSubmit}
      buttonProps={{
        loading: isSubmitting,
      }}
    >
      <ControlledTextField
        placeholder="Title of the work order"
        label="Title"
        name="title"
        control={control}
      />

      <ControlledTextArea
        label="Description"
        placeholder="Enter a description of the work order"
        name="description"
        rows={1}
        autoSize
        control={control}
      />

      <ControlledTextArea
        label="Checklist"
        name="checklist"
        autoSize={{ minRows: 3 }}
        placeholder="Enter a checklist item and press enter, each paragraph will be a checklist item"
        control={control}
      />

      <ControlledSelect
        label="Assigned Users"
        name="assignedUserIds"
        mode="multiple"
        placeholder="Select users to assign to this work order"
        control={control}
        options={options}
      />
    </BaseModalForm>
  );
};
