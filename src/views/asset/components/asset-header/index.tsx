import { StatisticsCard } from "@/components/cards/statistics-card";
import { Asset } from "@/types/entities/asset";
import { AssetMetricCard } from "../asset-metric-card";

interface Props {
  asset: Asset | undefined;
}

export const AssetHeader = ({ asset }: Props) => {
  if (!asset) return null;

  return (
    <header style={{ display: "flex", gap: "1rem" }}>
      <StatisticsCard
        statistics={{
          title: "Health Score",
          value: asset.healthscore,
          precision: 2,
          suffix: "%",
        }}
      />
      <StatisticsCard
        statistics={{
          title: "Status",
          value: asset.status,
        }}
      />

      <AssetMetricCard metrics={asset?.metrics}></AssetMetricCard>
    </header>
  );
};
