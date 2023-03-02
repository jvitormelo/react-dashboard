import { Asset } from "@/types/entities/asset";
import { Card, Image } from "antd";

interface Props {
  asset?: Asset;
}

export const AssetInfo = ({ asset }: Props) => {
  if (!asset) return <div>Loading...</div>;

  const baseInfo = [
    {
      label: "Model",
      value: asset.model,
    },
    {
      label: "Sensors",
      value: asset.sensors.join(", "),
    },
  ];

  return (
    <Card>
      <h1>
        {asset.id} - {asset.name}
      </h1>
      <Image height={500} src={asset.image} alt={asset.name}></Image>

      {baseInfo.map((info, index) => (
        <div key={index}>
          {info.label}: {info.value}
        </div>
      ))}
    </Card>
  );
};
