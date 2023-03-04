import { FormErrorText } from "@/components/atoms/form-error-text";
import { InputNumber, InputNumberProps } from "antd";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> extends InputNumberProps {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const ControlledNumberInput = <T extends object>({
  control,
  label,
  name,
  ...rest
}: Props<T>) => {
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
