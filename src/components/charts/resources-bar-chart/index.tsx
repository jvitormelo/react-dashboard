import { SeriesOptionsType } from "highcharts";
import { BaseChart, ChartOptions } from "../base-chart";

export type ChartResource = {
  name: string;
  data: number[];
};

export interface ResourcesBarChartProps {
  entityNames: string[];
  resources: ChartResource[];
}

export const ResourcesBarChart = ({
  entityNames: categories,
  resources,
}: ResourcesBarChartProps) => {
  console.log("resources", resources);

  const options: ChartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Units",
      align: "left",
    },
    xAxis: {
      categories,
      title: {
        text: "Unit",
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
      x: -40,
      y: 80,
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
