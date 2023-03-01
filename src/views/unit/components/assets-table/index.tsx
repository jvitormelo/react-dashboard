import { DataTable } from "@/components/data-table";
import { Asset } from "@/types/entities/asset";
import { ColumnsType } from "antd/es/table";

interface Props {
  assets: Asset[];
  isLoading: boolean;
}

const columns: ColumnsType<Asset> = [];

export const AssetsTable = ({ assets }: Props) => {
  return <DataTable<Asset> dataSource={assets} columns={columns} />;
};
