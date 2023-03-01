import { Statistic } from "antd";

interface Props {
  precision?: number;
  prefix?: string;
  suffix?: string;
  title?: string;
  value: number | string;
}

export const CustomStatistic = (props: Props) => {
  return <Statistic {...props} />;
};
