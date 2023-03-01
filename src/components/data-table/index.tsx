import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props<T> {
  columns: ColumnsType<T>;
  dataSource?: T[];
  loading?: boolean;
}

export const DataTable = <T extends object>({
  columns,
  dataSource,
  loading,
}: Props<T>) => {
  return <Table loading={loading} dataSource={dataSource} columns={columns} />;
};
