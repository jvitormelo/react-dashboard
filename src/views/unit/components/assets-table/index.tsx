import { BaseTableProps, DataTable } from "@/components/data-table";
import { getAssetStatusName } from "@/constants/asset-status";
import { Asset } from "@/types/entities/asset";
import { Image, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props extends BaseTableProps {
  assets: Asset[];
}

const columns: ColumnsType<Asset> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image, asset) => (
      <Image src={image} width={100} alt={asset.name} />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Health Score",
    dataIndex: "healthscore",
    key: "healthscore",
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    // TODO convert status to color
    render: (status) => <Tag color={"green"}>{getAssetStatusName(status)}</Tag>,
  },
];

export const AssetsTable = ({ assets, ...props }: Props) => {
  return <DataTable<Asset> dataSource={assets} columns={columns} {...props} />;
};
