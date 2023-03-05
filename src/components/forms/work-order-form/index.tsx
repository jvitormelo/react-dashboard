import { UserPopOver } from "@/components/atoms/user-pop-over";
import {
  ControlledRadioInput,
  RadioInputItem,
} from "@/components/controlled/controlled-radio-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledTextArea } from "@/components/controlled/controlled-text-area";
import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { workOrderPriorityArray } from "@/constants/work-order-priority";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { UserWithUnit } from "@/types/entities/user";
import { WorkOrder } from "@/types/entities/work-order";
import { namesUtils } from "@/utils";
import { stringUtils } from "@/utils/string";
import { useState } from "react";
import { BaseModalForm } from "../base-modal-form";
import { BaseModalFormProps } from "../types";
import { WorkOrderSchema, workOrderSchema } from "./schema";
import "./styles.scss";

const formatToChecklistForm = (checklist: WorkOrder["checklist"]) => {
  return checklist.map((checklistItem) => checklistItem.task).join("\n\n");
};
interface Props
  extends Omit<BaseModalFormProps<WorkOrderSchema>, "defaultValues"> {
  users: UserWithUnit[];
  defaultValues?: WorkOrder;
}

export const WorkOrderForm = ({
  onSubmitHandler,
  users = [],
  defaultValues,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormResolver<WorkOrderSchema>(workOrderSchema, {
    defaultValues: {
      ...defaultValues,
      checklist: formatToChecklistForm(defaultValues?.checklist || []),
    },
  });
  const { workOrderPriorityToColor } = useFeedbackColors();

  const onSubmit = handleSubmit(onSubmitHandler);

  const [searchValue, setSearchValue] = useState("");

  // TODO > Create a component for user Select
  const filteredUsers = users.filter((user) => {
    const nameNormalized = stringUtils.normalize(user.name);
    const emailNormalized = stringUtils.normalize(user.email);
    const unitNameNormalized = stringUtils.normalize(user.unit?.name);

    return (
      nameNormalized.includes(searchValue) ||
      emailNormalized.includes(searchValue) ||
      unitNameNormalized.includes(searchValue)
    );
  });

  const options = filteredUsers.map((user) => ({
    label: <UserPopOver user={user}>{user.name}</UserPopOver>,
    value: user.id,
  }));

  const onSearch = (value: string) => {
    setSearchValue(stringUtils.normalize(value));
  };

  const priorityOptions: RadioInputItem[] = workOrderPriorityArray.map(
    (priority) => ({
      label: namesUtils.getWorkOrderPriorityName(priority),
      value: priority,
      style: {
        color: workOrderPriorityToColor(priority, "hex"),
        fontWeight: "bold",
      },
    })
  );

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
        onSearch={onSearch}
        filterOption={false}
        options={options}
      />

      <ControlledRadioInput
        control={control}
        name="priority"
        options={priorityOptions}
        label="Priority"
        optionType="button"
        rootClassName="radioInput"
        className="radioInput"
        buttonStyle="solid"
      />
    </BaseModalForm>
  );
};
