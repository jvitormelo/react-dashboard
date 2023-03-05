export type BaseModalFormProps<S, D = S> = {
  onSubmitHandler: (data: S) => Promise<void>;
  defaultValues?: Partial<D>;
  buttonLabel?: string;
};
