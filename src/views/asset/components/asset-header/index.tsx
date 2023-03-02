import { StatisticsCard } from "@/components/cards/statistics-card";
import { AssetHealthHistoryChart } from "@/components/charts/asset-health-history-chart";
import { Asset } from "@/types/entities/asset";
import { AssetMetricCard } from "../asset-metric-card";

interface Props {
  asset: Asset | undefined;
}

export const AssetHeader = ({ asset }: Props) => {
  if (!asset) return null;

  return (
    <header
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "1rem",
          height: "100%",
        }}
      >
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
      </div>
      <AssetHealthHistoryChart healthHistory={asset.healthHistory} />

      <AssetMetricCard metrics={asset?.metrics}></AssetMetricCard>
    </header>
  );
};
