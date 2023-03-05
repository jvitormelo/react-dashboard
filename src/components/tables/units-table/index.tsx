import { StatusTag } from "@/components/atoms/status-tag";

import { Unit } from "@/types/entities/unit";
import { dateUtils } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { Link } from "react-router-dom";
import { addBaseTableActions } from "../common/add-base-table-actions";
import { BaseTableActions } from "../common/add-base-table-actions/types";
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
        sorter: (a, b) => a.numberOfAssets - b.numberOfAssets,
      },
      {
        title: "Average health score",
        dataIndex: "averageHealthScore",
        key: "averageHealthScore",
        render: (text) => <StatusTag status={text} text={`${text}%`} />,
        //  TODO > think Maybe create a sort utils to handle all the sort?
        sorter: (a, b) => a.averageHealthScore - b.averageHealthScore,
      },
      {
        title: "Average uptime",
        dataIndex: "averageUptime",
        key: "averageUptime",
        render: (text) => dateUtils.formatHoursDistance(text as number),
        sorter: (a, b) => a.averageUptime - b.averageUptime,
      },
      {
        title: "Number of Users",
        dataIndex: "numberOfUsers",
        key: "numberOfUsers",
        sorter: (a, b) => a.numberOfUsers - b.numberOfUsers,
      },
      addBaseTableActions<IUnitTable>({
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
