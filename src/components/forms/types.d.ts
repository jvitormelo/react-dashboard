export type BaseModalFormProps<T> = {
  onSubmitHandler: (data: T) => void;
  defaultValues?: Partial<T>;
  buttonLabel?: string;
};
