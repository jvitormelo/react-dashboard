import { User } from "@/types/entities/user";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { DataTable } from "../data-table";
import { UsersTableProps } from "./types";

export const UsersTable = memo(({ users = [], ...rest }: UsersTableProps) => {
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
  ];

  return <DataTable<User> columns={columns} {...rest} dataSource={users} />;
});
