import { FormErrorText } from "@/components/atoms/form-error-text";
import { InputNumber, InputNumberProps } from "antd";
import { Controller } from "react-hook-form";
import { ControlledInput } from "../types";

export const ControlledNumberInput = <T extends object>({
  control,
  label,
  name,
  ...rest
}: ControlledInput<T, InputNumberProps>) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <div
          style={{
            maxWidth: "fit-content",
          }}
        >
          <label htmlFor={name}>{label} </label>
          <div>
            <InputNumber
              {...rest}
              {...field}
              onChange={(value) => field.onChange(value ?? undefined)}
            />
          </div>
          <FormErrorText error={fieldState.error} />
        </div>
      )}
      control={control}
      name={name}
    />
  );
};
