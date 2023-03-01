import { StatisticsCard } from "@/components/cards/statistics-card";
import { Asset } from "@/types/entities/asset";
import { dateUtils } from "@/utils/date";

type Props = {
  metrics?: Asset["metrics"];
};

export const AssetMetricCard = ({ metrics }: Props) => {
  if (!metrics) return null;

  const { lastUptimeAt, totalCollectsUptime, totalUptime } = metrics;

  const data = [
    {
      title: "Total uptime",
      value: totalUptime,
      suffix: "hours",
      precision: 2,
    },
    {
      title: "Total Collects Uptime",
      value: totalCollectsUptime,
      suffix: "hours",
    },
    {
      title: "Last Uptime At",
      value: dateUtils.formatDistance(new Date(lastUptimeAt || Date.now())),
    },
  ];

  return (
    <StatisticsCard
      colProps={{ span: 8 }}
      rowProps={{ gutter: 12 }}
      statistics={data}
    />
  );
};
