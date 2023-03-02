import { Control, Controller, Path } from "react-hook-form";
import { TextField } from "../../atoms/text-field";

interface Props<T extends object> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const ControlledTextField = <T extends object>({
  name,
  control,
  label,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField {...field} label={label} error={fieldState.error} />
      )}
    />
  );
};
