import { StatusIcon } from "@/components/icons/status-icon";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { useTheme } from "@/hooks/use-theme";
import { HealthHistory } from "@/types/entities/asset";
import { dateUtils } from "@/utils";
import { Card, Timeline, TimelineItemProps, Typography } from "antd";

interface Props {
  healthHistory: HealthHistory[];
}

export const AssetHealthTimeline = ({ healthHistory }: Props) => {
  const { theme } = useTheme();
  const { assetStatusToColor } = useFeedbackColors();
  const items: TimelineItemProps[] = healthHistory.map((history) => ({
    children: dateUtils.formatDate(history.timestamp),
    color: assetStatusToColor(history.status),
    style: {
      marginBlock: theme.marginXS,
    },
    dot: (
      <StatusIcon
        style={{
          fontSize: 20,
        }}
        status={history.status}
      />
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
