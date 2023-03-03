import { User } from "@/types/entities/user";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { DataTable } from "../data-table";
import { defaultActionCol } from "../common/default-action-col";
import { UsersTableProps } from "./types";

export const UsersTable = memo(
  ({
    users = [],
    onDelete,
    onEdit,
    deleteOptions,
    ...rest
  }: UsersTableProps) => {
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
      defaultActionCol<User>({
        onDelete,
        onEdit,
        deleteOptions,
      }),
    ];

    return <DataTable<User> columns={columns} {...rest} dataSource={users} />;
  }
);
