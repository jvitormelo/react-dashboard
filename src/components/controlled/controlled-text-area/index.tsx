import { FormErrorText } from "@/components/atoms/form-error-text";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { Controller } from "react-hook-form";
import { ControlledInput } from "../types";
const { TextArea } = Input;

export const ControlledTextArea = <T extends object>({
  name,
  control,
  label,
  ...props
}: ControlledInput<T, TextAreaProps>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <TextArea
            {...props}
            {...field}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              field.onChange(e.target.value);
            }}
          />
          <FormErrorText error={fieldState.error}></FormErrorText>
        </div>
      )}
    />
  );
};
