import { DeleteIconPopProps } from "@/components/molecules/delete-icon-pop/types";

export interface BaseTableActions<T> {
  onCreate?: () => Promise<void> | void;
  onSelect?: (value: T) => void;
  onEdit?: (value: T) => Promise<void> | void;
  onDelete?: (value: T) => Promise<void>;
  deleteOptions?: {
    description?: (value: T) => string;
    title?: (value: T) => string;
    placement?: DeleteIconPopProps["placement"];
  };
}
