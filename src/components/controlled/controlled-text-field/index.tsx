import { Controller } from "react-hook-form";
import { TextField } from "../../atoms/text-field";
import { ControlledInput } from "../types";

type TextFieldProps = React.ComponentProps<typeof TextField>;

export const ControlledTextField = <T extends object>({
  name,
  control,
  label,
  ...props
}: ControlledInput<T, TextFieldProps>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          label={label}
          error={fieldState.error}
        />
      )}
    />
  );
};
