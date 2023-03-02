import { HealthHistory } from "@/types/entities/asset";
import { memo } from "react";
import { BaseChart, ChartOptions } from "../base-chart";

interface Props {
  healthHistory: HealthHistory[];
}
export const AssetHealthHistoryChart = memo(({ healthHistory }: Props) => {
  const options: ChartOptions = {
    chart: {
      type: "pie",
      height: 250,
    },
    title: {
      text: "Asset Health History",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Health Score",
      },
    },
    series: [
      {
        type: "pie",
        data: [{}],
      },
    ],
  };

  return <BaseChart options={options} />;
});
