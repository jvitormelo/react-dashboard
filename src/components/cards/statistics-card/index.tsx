import { CustomStatistic } from "@/components/atoms/custom-statistic";
import { Card, Col, Row } from "antd";
import { ComponentProps, memo } from "react";

type CustomStatisticProps = ComponentProps<typeof CustomStatistic>;

interface Props {
  rowProps?: ComponentProps<typeof Col>;
  colProps?: ComponentProps<typeof Col>;
  statistics: CustomStatisticProps[];
}

export const StatisticsCard = memo(
  ({ statistics, colProps, rowProps }: Props) => {
    return (
      <Card>
        <Row {...rowProps}>
          {statistics.map((statistic, index) => (
            <Col span={8} {...colProps} key={index}>
              <CustomStatistic {...statistic} />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
);
