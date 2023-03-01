import { Table } from "antd";
import { ComponentProps } from "react";

type AntTable = ComponentProps<typeof Table>;

interface Props {
  columns: AntTable["columns"];
  dataSource: AntTable["dataSource"];
  loading?: boolean;
}

export const DataTable = ({ columns, dataSource, loading }: Props) => {
  return <Table loading={loading} dataSource={dataSource} columns={columns} />;
};
