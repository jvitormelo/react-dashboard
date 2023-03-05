import { StatisticsCard } from "@/components/cards/statistics-card";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { nameUtils } from "@/utils";
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
      value: nameUtils.getAssetModelName(asset.model),
    },

    {
      title: "Sensors",
      value: nameUtils.getSensorNames(asset.sensors),
    },
    {
      title: "Max Temp",
      value: nameUtils.getSpecificationName(
        asset.specifications.maxTemp,
        "maxTemp"
      ),
    },
    {
      title: "Power",
      value: nameUtils.getSpecificationName(
        asset.specifications.power,
        "power"
      ),
    },
    {
      title: "RPM",
      value: nameUtils.getSpecificationName(asset.specifications.rpm, "rpm"),
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
