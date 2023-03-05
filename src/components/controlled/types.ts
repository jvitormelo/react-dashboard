import { Control, Path } from "react-hook-form";

export type ControlledInput<T extends object, I> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
} & I;
