import { AssetStatus } from "@/constants/asset-status";
import { useTheme } from "@/hooks/use-theme";
import { HealthHistory } from "@/types/entities/asset";
import { dateUtils } from "@/utils";
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { Card, Timeline, Typography } from "antd";

interface Props {
  healthHistory: HealthHistory[];
}

export const AssetHealthTimeline = ({ healthHistory }: Props) => {
  const { theme } = useTheme();
  const items = healthHistory.map((history) => ({
    children: dateUtils.formatDate(history.timestamp),
    // TODO refactor later
    color: history.status === AssetStatus.InOperation ? "green" : "red",
    dot:
      history.status === AssetStatus.InOperation ? (
        <CheckCircleFilled />
      ) : (
        <CloseCircleFilled />
      ),
  }));

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography.Title level={3} style={{ marginBottom: theme.marginMD }}>
        Health History
      </Typography.Title>
      <Timeline style={{ minWidth: 180 }} mode="alternate" items={items} />
    </Card>
  );
};
