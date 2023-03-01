import { Asset } from "@/types/entities/asset";
import { dateUtils } from "@/utils/date";
import { Card, Col, Row, Statistic } from "antd";

type Props = {
  metrics?: Asset["metrics"];
};

export const AssetMetricCard = ({ metrics }: Props) => {
  if (!metrics) return null;

  const { lastUptimeAt, totalCollectsUptime, totalUptime } = metrics;

  return (
    <Card>
      <Row>
        <Col span={8}>
          <Statistic
            title="Total uptime"
            value={totalUptime}
            suffix="hours"
            precision={2}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Collects Uptime"
            value={totalCollectsUptime}
            suffix="hours"
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Last Uptime At"
            value={dateUtils.formatDistance(
              new Date(lastUptimeAt || Date.now())
            )}
          />
        </Col>
      </Row>
    </Card>
  );
};
