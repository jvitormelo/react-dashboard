import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { HealthHistory } from "@/types/entities/asset";
import { chartUtils } from "@/utils/chart";
import { nameUtils } from "@/utils/name";
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
  const { assetStatusToColor } = useFeedbackColors();

  const data = chartUtils.groupData<HealthHistory, FormattedItem>(
    healthHistory ?? [],
    (value, item) => value.status === item.status,
    (value) => ({
      status: value.status,
      color: assetStatusToColor(value.status, "hex"),
      name: nameUtils.getAssetStatusName(value.status),
      y: 1,
    }),
    (value) => (value.y += 1)
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
        name: "Status",
        type: "pie",
        data: data,
      },
    ],
  };

  return <BaseChart options={options} />;
});
