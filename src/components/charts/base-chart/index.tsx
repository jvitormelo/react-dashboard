import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";

interface Props {
  options: Highcharts.Options;
}

export type ChartOptions = Highcharts.Options;

export const BaseChart = ({ options }: Props) => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
