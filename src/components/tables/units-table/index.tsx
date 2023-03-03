import { StatusTag } from "@/components/atoms/status-tag";
import { defaultActionCol } from "@/components/tables/common/base-table-actions";
import { Unit } from "@/types/entities/unit";
import { dateUtils } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { Link } from "react-router-dom";
import { BaseTableActions } from "../common/base-table-actions/types";
import { BaseTableProps, DataTable } from "../common/data-table";

export type IUnitTable = {
  numberOfAssets: number;
  averageHealthScore: number;
  averageUptime: number;
  numberOfUsers: number;
} & Unit;

interface Props extends BaseTableProps, BaseTableActions<IUnitTable> {
  units?: IUnitTable[];
  companyId: number;
}

export const UnitsTable = memo(
  ({
    units,
    loading,
    onSelect,
    onDelete,
    onEdit,
    companyId,
    ...rest
  }: Props) => {
    const columns: ColumnsType<IUnitTable> = [
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
            onClick={() => onSelect && onSelect(unit)}
            to={`/companies/${companyId}/units/${unit.id}`}
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
        render: (text) => <StatusTag status={text} text={`${text}%`} />,
      },
      {
        title: "Average uptime",
        dataIndex: "averageUptime",
        key: "averageUptime",
        render: (text) => dateUtils.formatHoursDistance(text as number),
      },
      {
        title: "Number of Users",
        dataIndex: "numberOfUsers",
        key: "numberOfUsers",
      },
      defaultActionCol<IUnitTable>({
        onDelete,
        onEdit,
      }),
    ];

    return (
      <DataTable<IUnitTable>
        dataSource={units}
        columns={columns}
        loading={loading}
        {...rest}
      />
    );
  }
);
