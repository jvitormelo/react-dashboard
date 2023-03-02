import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export type BaseTableProps = {
  loading?: boolean;
};

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource?: T[];
} & BaseTableProps;

export const DataTable = <T extends object>({
  columns,
  dataSource,
  loading,
}: Props<T>) => {
  return (
    <Card>
      <Table loading={loading} dataSource={dataSource} columns={columns} />
    </Card>
  );
};
