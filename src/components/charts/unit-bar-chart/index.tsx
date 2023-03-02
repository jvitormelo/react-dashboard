import { SeriesOptionsType } from "highcharts";
import { BaseChart, ChartOptions } from "../base-chart";

type Unit = {
  name: string;
  users: number;
  assets: number;
  workOrders: number;
};

const mockedData: Unit[] = [
  {
    name: "Unit 1",
    users: 10,
    assets: 20,
    workOrders: 30,
  },
  {
    name: "Unit 2",
    users: 20,
    assets: 30,
    workOrders: 40,
  },
  {
    name: "Unit 3",
    users: 30,
    assets: 40,
    workOrders: 50,
  },
];
export const UnitBarChart = () => {
  const options: ChartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Units",
      align: "left",
    },
    xAxis: {
      categories: mockedData.map((unit) => unit.name),
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
    series: [
      {
        name: "Users",
        data: mockedData.map((unit) => unit.users),
      },
      {
        name: "Assets",
        data: mockedData.map((unit) => unit.assets),
      },
      {
        name: "Work Orders",
        data: mockedData.map((unit) => unit.workOrders),
      },
    ] as SeriesOptionsType[],
  };

  return <BaseChart options={options}></BaseChart>;
};
