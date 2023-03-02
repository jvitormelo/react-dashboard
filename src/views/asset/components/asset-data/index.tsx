import { Asset } from "@/types/entities/asset";
import { Card, Image, Typography } from "antd";

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
      <Typography.Title>
        #{asset.id} {asset.name}
      </Typography.Title>

      <Image height={500} src={asset.image} alt={asset.name}></Image>

      {baseInfo.map((info, index) => (
        <div key={index}>
          {info.label}: {info.value}
        </div>
      ))}

      <div>Max Temp: {asset.specifications.maxTemp}</div>
      <div>Power: {asset.specifications.power ?? "Unknown"}</div>
      <div>RPM: {asset.specifications.rpm ?? "Unknown"}</div>
    </Card>
  );
};
