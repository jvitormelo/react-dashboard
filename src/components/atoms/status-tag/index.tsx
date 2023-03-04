import { AssetStatus } from "@/constants/asset-status";
import { useFeedbackColors } from "@/hooks/use-feedback-colors";
import { Tag } from "antd";

interface Props {
  status: AssetStatus | number;
  text?: string;
}

export const StatusTag = ({ status, text }: Props) => {
  const { healthScoreToColor, assetStatusToColor } = useFeedbackColors();
  const styles: React.CSSProperties =
    typeof status === "number" ? { fontWeight: "bold" } : {};

  const color = (() => {
    if (typeof status === "number") {
      return healthScoreToColor(status, "name");
    }
    return assetStatusToColor(status, "name");
  })();

  return (
    <Tag style={styles} color={color}>
      {text}
    </Tag>
  );
};
