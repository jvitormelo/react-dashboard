import { SkeletonCard } from "@/components/cards/skeleton-card";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { AssetHealthHistoryChart } from "@/components/charts/asset-health-history-chart";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { colorsUtils } from "@/utils/colors";
import { namesUtils } from "@/utils/names";
import { AssetMetricCard } from "./components/asset-metric-card";

interface Props {
  asset: Asset | undefined;
}

export const AssetHeader = ({ asset }: Props) => {
  const { theme } = useTheme();

  const headerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.marginMD,
  };

  if (!asset)
    return (
      <header style={{ ...headerStyle, minHeight: 300 }}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </header>
    );

  return (
    <header style={headerStyle}>
      <div
        style={{
          display: "grid",
          gap: theme.marginMD,
          height: "100%",
        }}
      >
        <StatisticsCard
          statistics={{
            title: "Health Score",
            value: asset.healthscore,
            precision: 2,
            suffix: "%",
            valueStyle: {
              color: colorsUtils.getAssetHealthColor(asset.healthscore),
              fontWeight: "bold",
            },
          }}
        />
        <StatisticsCard
          statistics={{
            title: "Status",
            valueStyle: {
              color: colorsUtils.getAssetHealthColor(asset.status),
              fontWeight: "bold",
            },
            value: namesUtils.getAssetStatusName(asset.status),
          }}
        />
      </div>
      <AssetHealthHistoryChart healthHistory={asset.healthHistory} />

      <AssetMetricCard metrics={asset.metrics}></AssetMetricCard>
    </header>
  );
};
