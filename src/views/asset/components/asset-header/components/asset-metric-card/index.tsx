import { StatisticsCard } from "@/components/cards/statistics-card";
import { Asset } from "@/types/entities/asset";
import { dateUtils } from "@/utils/date";

type Props = {
  metrics: Asset["metrics"];
};

export const AssetMetricCard = ({ metrics }: Props) => {
  const { lastUptimeAt, totalCollectsUptime, totalUptime } = metrics;

  const data = [
    {
      title: "Total uptime",
      value: dateUtils.formatHoursDistance(totalUptime),
    },
    {
      title: "Total Collects Uptime",
      value: dateUtils.formatHoursDistance(totalCollectsUptime),
      suffix: "hours",
    },
    {
      title: "Last Uptime At",
      value: dateUtils.formatDistance(new Date(lastUptimeAt || Date.now())),
    },
  ];

  return (
    <StatisticsCard
      colProps={{ span: 24 }}
      rowProps={{ style: { gap: "1rem", width: "fit-content" } }}
      statistics={data}
    />
  );
};
