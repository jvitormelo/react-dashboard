import { FormErrorText } from "@/components/atoms/form-error-text";
import { Radio, RadioProps } from "antd";
import { Controller } from "react-hook-form";
import { ControlledInput } from "../types";

export const ControlledRadioInput = <T extends object>({
  control,
  label,
  name,
}: ControlledInput<T, RadioProps>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <label>{label}</label>
          <Radio.Group {...field} />
          <FormErrorText error={fieldState.error} />
        </div>
      )}
    />
  );
};
