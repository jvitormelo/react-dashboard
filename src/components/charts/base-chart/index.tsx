import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { Card } from "antd";

interface Props {
  options: Highcharts.Options;
}

export type ChartOptions = Highcharts.Options;

export const BaseChart = ({ options }: Props) => {
  return (
    <Card>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
};
