export interface DefaultActionColProps<T> {
  onEdit?: (value: T) => Promise<void> | void;
  onDelete?: (value: T) => Promise<void>;
  deleteOptions?: {
    description?: (value: T) => string;
    title?: (value: T) => string;
  };
}
