import { Asset } from "@/types/entities/asset";
import { memo } from "react";
import { BaseChart, ChartOptions } from "../base-chart";
import { useAssetsStatusChart } from "./hooks/useAssetsStatusChart";

interface Props {
  assets?: Asset[];
  title: string;
}

export const AssetsStatusPieChart = memo(({ assets, title }: Props) => {
  const { formattedAssets } = useAssetsStatusChart({
    assets: assets ?? [],
  });

  const options: ChartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: title ?? "Asset Status",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Asset Status",
        type: "pie",
        data: formattedAssets,
      },
    ],
  };

  return <BaseChart options={options} />;
});
