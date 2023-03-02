import { useTheme } from "@/hooks/use-theme";
import { Input, InputRef } from "antd";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface Props extends React.ComponentProps<typeof Input> {
  label: string;
  error?: FieldError;
}

export const TextField = forwardRef<InputRef, Props>(
  ({ label, error, ...inputProps }, ref) => {
    const { theme } = useTheme();
    return (
      <div>
        <label htmlFor={inputProps.name}>{label}</label>
        <Input ref={ref} {...inputProps} />
        {error && (
          <span
            style={{
              color: theme.colorError,
            }}
          >
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
