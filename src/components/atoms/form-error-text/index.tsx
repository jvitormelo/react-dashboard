import { useTheme } from "@/hooks/use-theme";

interface Props {
  error:
    | {
        message?: string;
      }
    | undefined;
}

export const FormErrorText = ({ error }: Props) => {
  const { theme } = useTheme();

  if (!error?.message) return null;

  return (
    <span
      style={{
        color: theme.colorError,
      }}
    >
      {error.message}
    </span>
  );
};
