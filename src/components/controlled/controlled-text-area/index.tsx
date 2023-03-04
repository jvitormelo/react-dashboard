import { FormErrorText } from "@/components/atoms/form-error-text";
import { Input } from "antd";
import { Control, Controller, Path } from "react-hook-form";
const { TextArea } = Input;

type TextFieldProps = React.ComponentProps<typeof TextArea>;

interface Props<T extends object> extends TextFieldProps {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const ControlledTextField = <T extends object>({
  name,
  control,
  label,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <TextArea {...field} {...props} />
          <FormErrorText error={fieldState.error}></FormErrorText>
        </div>
      )}
    />
  );
};
