import { FormErrorText } from "@/components/atoms/form-error-text";
import { Select, SelectProps } from "antd";
import { Controller } from "react-hook-form";
import { ControlledInput } from "../types";

export const ControlledSelect = <T extends object>({
  control,
  label,
  name,
  ...rest
}: ControlledInput<T, SelectProps>) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor={name}>{label} </label>
          <Select {...rest} {...field} />
          <FormErrorText error={fieldState.error} />
        </div>
      )}
      control={control}
      name={name}
    />
  );
};
