import { FormErrorText } from "@/components/atoms/form-error-text";
import { Input } from "antd";
import { Control, Controller, Path } from "react-hook-form";
const { TextArea } = Input;

type TextAreaProps = React.ComponentProps<typeof TextArea>;

interface Props<T extends object> extends TextAreaProps {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const ControlledTextArea = <T extends object>({
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
