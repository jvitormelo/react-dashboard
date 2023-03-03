import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ComponentProps, useMemo } from "react";
import { BaseTableHeader } from "../common/base-table-header";

interface BaseItem {
  id: string | number;
}

export type BaseTableProps = {
  loading?: boolean;
  header?: React.ReactNode;
  headerProps?: ComponentProps<typeof BaseTableHeader>;
};

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource?: T[];
} & BaseTableProps;

export const DataTable = <T extends BaseItem>({
  columns,
  dataSource = [],
  loading,
  headerProps,
  header = headerProps && <BaseTableHeader {...headerProps} />,
}: Props<T>) => {
  const items = useMemo(
    () =>
      dataSource.map((item) => ({
        ...item,
        key: item.id,
      })),
    [dataSource]
  );

  return (
    <Card>
      {header}
      <Table loading={loading} dataSource={items} columns={columns} />
    </Card>
  );
};
