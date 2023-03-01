import { BaseTableProps, DataTable } from "@/components/data-table";
import { Unit } from "@/types/entities/unit";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface Props extends BaseTableProps {
  units?: Unit[];
  onSelect: (unit: Unit) => void;
}

export const UnitTable = ({ units, loading, onSelect }: Props) => {
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
        <Link
          onClick={() => onSelect(unit)}
          to={`/companies/1/units/${unit.id}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Number of assets",
      dataIndex: "numberOfAssets",
      key: "numberOfAssets",
    },
    {
      title: "Average health score",
      dataIndex: "averageHealthScore",
      key: "averageHealthScore",
    },
    {
      title: "Average uptime",
      dataIndex: "averageUptime",
      key: "averageUptime",
    },
    {
      title: "Number of Users",
      dataIndex: "numberOfUsers",
      key: "numberOfUsers",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>edit</a>
          <a>delete</a>
        </Space>
      ),
    },
  ];

  return (
    <DataTable<Unit> dataSource={units} columns={columns} loading={loading} />
  );
};
