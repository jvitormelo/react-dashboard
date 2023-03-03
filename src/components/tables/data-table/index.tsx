import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

interface BaseItem {
  id: string | number;
}

export type BaseTableProps = {
  loading?: boolean;
};

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource?: T[];
} & BaseTableProps;

export const DataTable = <T extends BaseItem>({
  columns,
  dataSource = [],
  loading,
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
      <Table loading={loading} dataSource={items} columns={columns} />
    </Card>
  );
};
