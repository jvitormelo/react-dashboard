import { DeleteIconPop } from "@/components/molecules/delete-icon-pop";
import { EditIcon } from "@/components/icons/button-icons/edit-icon";
import { Space } from "antd";
import { BaseTableActions } from "./types";

export const addBaseTableActions = <T extends object>({
  deleteOptions,
  onDelete,
  onEdit,
}: BaseTableActions<T>) => {
  const getDeleteDescription =
    deleteOptions?.description || (() => `Are you sure you want to delete?`);

  const getDeleteTitle = deleteOptions?.title || (() => `Delete?`);

  if (!onDelete && !onEdit) return {};

  return {
    title: "Actions",
    key: "action",
    render: (_: undefined, record: T) => (
      <Space size="middle">
        {onEdit && (
          <EditIcon
            onClick={() => {
              onEdit?.(record);
            }}
          />
        )}

        {onDelete && (
          <DeleteIconPop
            placement={deleteOptions?.placement}
            onConfirm={async () => onDelete?.(record)}
            title={getDeleteTitle(record)}
            description={getDeleteDescription(record)}
          />
        )}
      </Space>
    ),
  };
};
