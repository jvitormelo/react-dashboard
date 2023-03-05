import {
  ControlledRadioInput,
  RadioInputItem,
} from "@/components/controlled/controlled-radio-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledTextArea } from "@/components/controlled/controlled-text-area";
import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { DeleteIcon } from "@/components/icons/delete-icon";
import { UserPopOver } from "@/components/molecules/user-pop-over";
import { workOrderPriorityArray } from "@/constants/work-order-priority";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { useTheme } from "@/hooks/use-theme";
import { UserWithUnit } from "@/types/entities/user";
import { WorkOrder, WorkOrderChecklist } from "@/types/entities/work-order";
import { nameUtils } from "@/utils";
import { stringUtils } from "@/utils/string";
import { Button, Card } from "antd";
import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { BaseModalForm } from "../base-modal-form";
import { BaseModalFormProps } from "../types";
import {
  CreateWorkOrderSchema,
  createWorkOrderSchema,
  EditWorkOrderSchema,
  editWorkOrderSchema,
} from "./schema";
import "./styles.scss";
import { SubmitWorkOrderSchema } from "./types";

interface Props extends BaseModalFormProps<SubmitWorkOrderSchema, WorkOrder> {
  users: UserWithUnit[];
}

export const formatCheckList = (checklistString: string) => {
  const checklistItems = checklistString.split("\n").filter(Boolean);

  const checklist: WorkOrderChecklist[] = checklistItems.map((item) => ({
    completed: false,
    task: item,
  }));

  return checklist;
};

export const WorkOrderForm = ({
  onSubmitHandler,
  users = [],
  defaultValues,
}: Props) => {
  const { theme } = useTheme();

  const isEdit = !!defaultValues;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormResolver<EditWorkOrderSchema | CreateWorkOrderSchema>(
    isEdit ? editWorkOrderSchema : createWorkOrderSchema,
    {
      defaultValues,
    }
  );

  const { workOrderPriorityToColor } = useFeedbackColors();

  const onSubmit = handleSubmit(async (values) => {
    if (typeof values.checklist === "string") {
      const checklist = formatCheckList(values.checklist);

      await onSubmitHandler({ ...values, checklist });
    } else {
      await onSubmitHandler(values as EditWorkOrderSchema);
    }
  });

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
      label: nameUtils.getWorkOrderPriorityName(priority),
      value: priority,
      style: {
        color: workOrderPriorityToColor(priority, "hex"),
        fontWeight: "bold",
      },
    })
  );

  const { fields, append, remove } = useFieldArray({
    control: control as Control<EditWorkOrderSchema>,
    name: "checklist",
  });

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

      {isEdit ? (
        <Card
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            gap: theme.marginSM,
          }}
        >
          {fields.map((_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ControlledTextArea
                label=""
                rows={2}
                name={`checklist.${index}.task`}
                control={control}
                style={{
                  flex: 1,
                }}
              />
              {fields.length > 1 && (
                <DeleteIcon
                  style={{
                    marginInline: theme.marginSM,
                  }}
                  onClick={() => {
                    console.log("remove", index);
                    remove(index);
                  }}
                />
              )}
            </div>
          ))}

          <Button
            type="link"
            style={{
              marginTop: theme.marginSM,
              marginInline: "auto",
              display: "flex",
            }}
            onClick={() => append({ task: "", completed: false })}
          >
            New Checklist Item
          </Button>
        </Card>
      ) : (
        <ControlledTextArea
          label="Checklist"
          name="checklist"
          autoSize={{ minRows: 3 }}
          placeholder="Enter a checklist item and press enter, each paragraph will be a checklist item"
          control={control}
        />
      )}

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
