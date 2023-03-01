import { CustomStatistic } from "@/components/atoms/custom-statistic";
import { Card, Col, Row } from "antd";
import { ComponentProps, memo } from "react";

type CustomStatisticProps = ComponentProps<typeof CustomStatistic>;

interface Props {
  rowProps?: ComponentProps<typeof Row>;
  colProps?: ComponentProps<typeof Col>;
  statistics: CustomStatisticProps[] | CustomStatisticProps;
}

export const StatisticsCard = memo(
  ({ statistics, colProps, rowProps }: Props) => {
    const items = Array.isArray(statistics) ? statistics : [statistics];

    return (
      <Card>
        <Row {...rowProps}>
          {items.map((statistic, index) => (
            <Col {...colProps} key={index}>
              <CustomStatistic {...statistic} />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
);
