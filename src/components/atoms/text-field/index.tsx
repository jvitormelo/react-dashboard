import { useTheme } from "@/hooks/use-theme";
import { Input } from "antd";
import { FieldError } from "react-hook-form";

interface Props extends React.ComponentProps<typeof Input> {
  label: string;
  error?: FieldError;
}

export const TextField = ({ label, error, ...inputProps }: Props) => {
  const { theme } = useTheme();
  return (
    <div>
      <label htmlFor={inputProps.name}>{label}</label>
      <Input {...inputProps} />
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
};
