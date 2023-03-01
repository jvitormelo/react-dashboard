import { Asset } from "@/types/entities/asset";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { memo } from "react";
import { useAssetsStatusChart } from "./hooks/useAssetsStatusChart";

interface Props {
  assets?: Asset[];
  title: string;
}

const AssetStatusChartComponent = ({ assets, title }: Props) => {
  const { formattedAssets } = useAssetsStatusChart({ assets: assets ?? [] });

  const options: Highcharts.Options = {
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

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export const AssetStatusChart = memo(AssetStatusChartComponent);
