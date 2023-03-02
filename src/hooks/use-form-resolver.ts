import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

export const useFormResolver = <T extends object>(
  schema: ZodType,
  options: UseFormProps<T>
) => {
  return useForm<T>({
    resolver: zodResolver(schema),
    mode: "onChange",
    ...options,
  });
};
