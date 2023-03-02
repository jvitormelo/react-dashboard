import { HealthHistory } from "@/types/entities/asset";
import { chartUtils } from "@/utils/charts";
import { colorsUtils } from "@/utils/colors";
import { namesUtils } from "@/utils/names";
import { memo } from "react";
import { BaseChart, ChartOptions } from "../base-chart";
import { BaseChartItem } from "../base-chart/types";

interface Props {
  healthHistory: HealthHistory[];
}

type FormattedItem = {
  status: HealthHistory["status"];
} & BaseChartItem;

export const AssetHealthHistoryChart = memo(({ healthHistory }: Props) => {
  const data = chartUtils.groupData<HealthHistory, FormattedItem>(
    healthHistory ?? [],
    (value, item) => value.status === item.status,
    (value) => ({
      status: value.status,
      color: colorsUtils.getAssetHealthColor(value.status),
      name: namesUtils.getAssetStatusName(value.status),
      y: 1,
    }),
    (value) => value.y + 1
  );

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
        data: data,
      },
    ],
  };

  return <BaseChart options={options} />;
});
