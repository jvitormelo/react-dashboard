import { Table } from "antd";
import { ComponentProps } from "react";

type AntTable = ComponentProps<typeof Table>;

interface Props {
  columns: AntTable["columns"];
  dataSource: AntTable["dataSource"];
}

export const DataTable = ({ columns, dataSource }: Props) => {
  return <Table dataSource={dataSource} columns={columns} />;
};
