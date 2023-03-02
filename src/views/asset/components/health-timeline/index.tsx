import { AssetStatus } from "@/constants/asset-status";
import { HealthHistory } from "@/types/entities/asset";
import { CloseCircleFilled } from "@ant-design/icons";
import { Card, Timeline, Typography } from "antd";

interface Props {
  healthHistory: HealthHistory[];
}

export const AssetHealthTimeline = ({ healthHistory }: Props) => {
  const items = healthHistory.map((history) => ({
    children: history.timestamp,
    color: history.status === AssetStatus.InOperation ? "green" : "red",
    dot:
      history.status === AssetStatus.InOperation ? (
        <CloseCircleFilled />
      ) : undefined,
  }));

  return (
    <Card style={{ width: "fit-content" }}>
      <Typography.Title>Health History</Typography.Title>
      <Timeline items={items} />
    </Card>
  );
};
