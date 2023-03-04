import { FormErrorText } from "@/components/atoms/form-error-text";
import { Select, SelectProps } from "antd";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> extends SelectProps {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const ControlledSelect = <T extends object>({
  control,
  label,
  name,
  ...rest
}: Props<T>) => {
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
