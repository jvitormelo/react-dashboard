import { Statistic } from "antd";

interface Props {
  precision?: number;
  prefix?: string;
  suffix?: string;
  title?: string;
  value: number | string;
  valueStyle?: React.CSSProperties;
}

export const CustomStatistic = (props: Props) => {
  return <Statistic {...props} />;
};
