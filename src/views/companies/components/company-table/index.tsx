import { DataTable } from "@/components/data-table";
import { Company } from "@/types/entities/company";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { ComponentProps } from "react";

type TableProps = ComponentProps<typeof DataTable>;
interface Props {
  companies?: Company[];
  isLoading: TableProps["loading"];
}

const columns: ColumnsType<Company> = [
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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export const CompanyTable = ({ companies, isLoading }: Props) => {
  return (
    <DataTable<Company>
      dataSource={companies}
      loading={isLoading}
      columns={columns}
    />
  );
};
