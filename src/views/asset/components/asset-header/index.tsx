import { SkeletonCard } from "@/components/cards/skeleton-card";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { AssetHealthHistoryChart } from "@/components/charts/asset-health-history-chart";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { nameUtils } from "@/utils/name";
import { AssetMetricCard } from "./components/asset-metric-card";
import styles from "./styles.module.scss";

interface Props {
  asset: Asset | undefined;
}

export const AssetHeader = ({ asset }: Props) => {
  const { theme } = useTheme();
  const { assetStatusToColor, healthScoreToColor } = useFeedbackColors();

  const headerStyle = {
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
    <header style={headerStyle} className={styles.header}>
      <div
        style={{
          display: "grid",
          gap: theme.marginMD,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: theme.marginMD,
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <StatisticsCard
            statistics={{
              title: "Id",
              value: asset.id,
              valueStyle: {
                color: theme.colorPrimary,
                fontWeight: "bold",
              },
            }}
          />

          <StatisticsCard
            statistics={{
              title: "Health Score",
              value: asset.healthscore,
              precision: 2,
              suffix: "%",
              valueStyle: {
                color: healthScoreToColor(asset.healthscore),
                fontWeight: "bold",
              },
            }}
          />
        </div>
        <StatisticsCard
          statistics={{
            title: "Status",
            valueStyle: {
              color: assetStatusToColor(asset.status),
              fontWeight: "bold",
            },
            value: nameUtils.getAssetStatusName(asset.status),
          }}
        />
      </div>
      <AssetHealthHistoryChart healthHistory={asset.healthHistory} />

      <AssetMetricCard metrics={asset.metrics}></AssetMetricCard>
    </header>
  );
};
