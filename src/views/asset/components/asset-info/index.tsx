import { StatisticsCard } from "@/components/cards/statistics-card";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { namesUtils } from "@/utils";
import { Card, Image } from "antd";

interface Props {
  asset: Asset;
}

// TODO - need to find a place to show the ID of the asset
export const AssetInfo = ({ asset }: Props) => {
  const { theme } = useTheme();

  const items = [
    {
      title: "Name",
      value: asset.name,
    },
    {
      title: "Model",
      value: namesUtils.getAssetModelName(asset.model),
    },

    {
      title: "Sensors",
      value: namesUtils.getSensorNames(asset.sensors),
    },
    {
      title: "Max Temp",
      value: namesUtils.getSpecificationName(
        asset.specifications.maxTemp,
        "maxTemp"
      ),
    },
    {
      title: "Power",
      value: namesUtils.getSpecificationName(
        asset.specifications.power,
        "power"
      ),
    },
    {
      title: "RPM",
      value: namesUtils.getSpecificationName(asset.specifications.rpm, "rpm"),
    },
  ];

  return (
    <div>
      <Card
        style={{
          marginBottom: theme.marginSM,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image height={500} src={asset.image} alt={asset.name} />
      </Card>

      <StatisticsCard
        rowProps={{
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: theme.marginMD,
          },
        }}
        statistics={items}
      />
    </div>
  );
};
