import { FormErrorText } from "@/components/atoms/form-error-text";
import { CheckboxOptionType, Radio, RadioGroupProps } from "antd";
import { Controller } from "react-hook-form";
import { ControlledInput } from "../types";

export type RadioInputItem = CheckboxOptionType;

export const ControlledRadioInput = <T extends object>({
  control,
  label,
  name,
  ...props
}: ControlledInput<T, RadioGroupProps>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor={name}>{label}</label>
          <Radio.Group {...field} {...props} />
          <FormErrorText error={fieldState.error} />
        </div>
      )}
    />
  );
};
