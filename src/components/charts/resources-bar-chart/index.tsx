import { SeriesOptionsType } from "highcharts";
import { BaseChart, ChartOptions } from "../base-chart";

export type ChartResource = {
  name: string;
  data: number[];
};

export interface ResourcesBarChartProps {
  entityNames: string[];
  resources: ChartResource[];
  title: string;
  xAxisTitle?: string;
}

export const ResourcesBarChart = ({
  entityNames: categories,
  resources,
  title,
  xAxisTitle,
}: ResourcesBarChartProps) => {
  const options: ChartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: title,
      align: "left",
    },
    xAxis: {
      categories,
      title: {
        text: xAxisTitle,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Quantity",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " units",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: resources as SeriesOptionsType[],
  };

  return <BaseChart options={options}></BaseChart>;
};
