import { BaseTableProps, DataTable } from "@/components/tables/data-table";
import { defaultActionCol } from "@/components/tables/common/default-action-col";
import { DefaultActionColProps } from "@/components/tables/common/default-action-col/types";
import { Unit } from "@/types/entities/unit";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { Link } from "react-router-dom";

export type UnitTable = {
  numberOfAssets: number;
  averageHealthScore: number;
  averageUptime: number;
  numberOfUsers: number;
} & Unit;

interface Props extends BaseTableProps, DefaultActionColProps<UnitTable> {
  units?: UnitTable[];
  onSelect: (unit: Unit) => void;
}

export const UnitTable = memo(
  ({ units, loading, onSelect, onDelete, onEdit }: Props) => {
    const columns: ColumnsType<UnitTable> = [
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

      defaultActionCol<UnitTable>({
        onDelete,
        onEdit,
      }),
    ];

    return (
      <DataTable<UnitTable>
        dataSource={units}
        columns={columns}
        loading={loading}
      />
    );
  }
);
