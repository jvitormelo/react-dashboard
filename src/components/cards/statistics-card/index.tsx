import { CustomStatistic } from "@/components/atoms/custom-statistic";
import { Card, Col, Row } from "antd";
import { ComponentProps, memo } from "react";

type CustomStatisticProps = ComponentProps<typeof CustomStatistic> & {
  colProps?: ComponentProps<typeof Col>;
};

interface Props {
  rowProps?: ComponentProps<typeof Row>;
  colProps?: ComponentProps<typeof Col>;
  statistics: CustomStatisticProps[] | CustomStatisticProps;
  header?: React.ReactNode;
}

export const StatisticsCard = memo(
  ({ statistics, colProps, rowProps, header }: Props) => {
    const items = Array.isArray(statistics) ? statistics : [statistics];

    return (
      <Card>
        {header}
        <Row {...rowProps}>
          {items.map((statistic, index) => (
            <Col {...colProps} {...statistic.colProps} key={index}>
              <CustomStatistic {...statistic} />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
);
