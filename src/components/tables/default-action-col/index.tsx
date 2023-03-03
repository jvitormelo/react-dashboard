import { DeleteIconPop } from "@/components/icons/delete-icon-pop";
import { EditIcon } from "@/components/icons/edit-icon";
import { Space } from "antd";
import { DefaultActionColProps } from "./types";

export const defaultActionCol = <T extends object>(
  params: DefaultActionColProps<T>
) => {
  const getDeleteDescription =
    params.deleteOptions?.description ||
    (() => `Are you sure you want to delete?`);

  const getDeleteTitle = params.deleteOptions?.title || (() => `Delete?`);

  return {
    title: "Actions",
    key: "action",
    render: (_: undefined, record: T) => (
      <Space size="middle">
        <EditIcon onClick={() => params.onEdit(record)} />
        <DeleteIconPop
          onConfirm={async () => {
            await params.onDelete(record);
          }}
          title={getDeleteTitle(record)}
          description={getDeleteDescription(record)}
        />
      </Space>
    ),
  };
};
