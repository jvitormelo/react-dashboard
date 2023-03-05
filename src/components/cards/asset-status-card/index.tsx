import { StatusIcon } from "@/components/icons/status-icon";
import { AssetStatus } from "@/constants/asset-status";
import { useTheme } from "@/hooks/use-theme";
import { nameUtils } from "@/utils";
import { Card, Typography } from "antd";
import { SkeletonCard } from "../skeleton-card";

interface Props {
  status: AssetStatus;
  count: number;
  loading?: boolean;
}

const baseCardStyle = {
  padding: 8,
  width: 200,
};

export const AssetStatusCard = ({ count, status, loading }: Props) => {
  const { theme } = useTheme();

  if (loading) return <SkeletonCard style={baseCardStyle} />;

  return (
    <Card style={baseCardStyle}>
      <Typography.Title
        level={4}
        style={{
          textAlign: "center",
          color: theme.colorTextTertiary,
          marginBottom: theme.marginSM,
        }}
      >
        {nameUtils.getAssetStatusName(status)}
      </Typography.Title>
      <div
        style={{
          textAlign: "center",
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StatusIcon style={{ marginRight: theme.marginXS }} status={status} />
        <Typography.Title level={1}>{count}</Typography.Title>
      </div>
    </Card>
  );
};
