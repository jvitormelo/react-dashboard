import { Control, Controller, Path } from "react-hook-form";
import { TextField } from "../../atoms/text-field";

type TextFieldProps = React.ComponentProps<typeof TextField>;

interface Props<T extends object> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type?: TextFieldProps["type"];
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
