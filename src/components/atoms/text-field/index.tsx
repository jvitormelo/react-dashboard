import { Input, InputRef } from "antd";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { FormErrorText } from "../form-error-text";

interface Props extends React.ComponentProps<typeof Input> {
  label: string;
  error?: FieldError;
}

export const TextField = forwardRef<InputRef, Props>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div>
        <label htmlFor={inputProps.name}>{label}</label>
        <Input ref={ref} {...inputProps} />
        <FormErrorText error={error} />
      </div>
    );
  }
);
