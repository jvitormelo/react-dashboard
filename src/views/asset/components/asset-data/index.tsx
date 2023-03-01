import { Asset } from "@/types/entities/asset";
import { Card, Image } from "antd";

interface Props {
  asset?: Asset;
}

export const AssetInfo = ({ asset }: Props) => {
  if (!asset) return <div>Loading...</div>;

  const baseInfo = [
    {
      label: "ID",
      value: asset.id,
    },
    {
      label: "Name",
      value: asset.name,
    },
    {
      label: "Model",
      value: asset.model,
    },
    {
      label: "Health score",
      value: asset.healthscore,
    },
    {
      label: "Status",
      value: asset.status,
    },
  ];

  return (
    <Card>
      <Image src={asset.image} alt={asset.name}></Image>

      {baseInfo.map((info, index) => (
        <div key={index}>
          {info.label}: {info.value}
        </div>
      ))}
    </Card>
  );
};
