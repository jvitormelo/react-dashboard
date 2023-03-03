import { AssetStatus } from "@/constants/asset-status";
import { Tag, TagProps } from "antd";

interface Props {
  status: AssetStatus | number;
  text?: string;
}

const convertToTagColor = (status: AssetStatus | number): TagProps["color"] => {
  // TODO SEPARATE THIS LOGIC
  if (typeof status === "number") {
    if (status > 70) return "success";
    if (status > 50) return "warning";
    return "error";
  }
  const tagColorMap: Record<AssetStatus, TagProps["color"]> = {
    [AssetStatus.InOperation]: "success",
    [AssetStatus.InAlert]: "error",
    [AssetStatus.UnplannedStop]: "warning",
    [AssetStatus.InDowntime]: "default",
    [AssetStatus.PlannedStop]: "blue",
  };

  return tagColorMap[status];
};

export const StatusTag = ({ status, text }: Props) => {
  const styles: React.CSSProperties =
    typeof status === "number" ? { fontWeight: "bold" } : {};

  return (
    <Tag style={styles} color={convertToTagColor(status)}>
      {text}
    </Tag>
  );
};
