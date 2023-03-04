import { User } from "@/types/entities/user";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { BaseTableProps, DataTable } from "../common/data-table";
import { addBaseTableActions } from "../common/add-base-table-actions";
import { BaseTableActions } from "../common/add-base-table-actions/types";

interface Props extends BaseTableProps, BaseTableActions<User> {
  users: User[] | undefined;
}

export const UsersTable = memo(
  ({ users = [], onDelete, onEdit, deleteOptions, ...rest }: Props) => {
    const columns: ColumnsType<User> = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      addBaseTableActions<User>({
        onDelete,
        onEdit,
        deleteOptions,
      }),
    ];

    return <DataTable<User> columns={columns} {...rest} dataSource={users} />;
  }
);
