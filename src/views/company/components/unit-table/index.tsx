import { DataTable } from "@/components/data-table";
import { Unit } from "@/types/entities/unit";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

const columns: ColumnsType<Unit> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, unit) => (
      <Link to={`/companies/1/units/${unit.id}`}>{text}</Link>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>edit</a>
        <a>delete</a>
      </Space>
    ),
  },
];

interface Props {
  units?: Unit[];
  loading: boolean;
}

export const UnitTable = ({ units, loading }: Props) => {
  return (
    <DataTable<Unit> dataSource={units} columns={columns} loading={loading} />
  );
};
