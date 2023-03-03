export interface BaseTableActions<T> {
  onSelect?: (value: T) => void;
  onEdit?: (value: T) => Promise<void> | void;
  onDelete?: (value: T) => Promise<void>;
  deleteOptions?: {
    description?: (value: T) => string;
    title?: (value: T) => string;
  };
}
