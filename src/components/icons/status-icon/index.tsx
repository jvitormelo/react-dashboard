import { AssetStatus } from "@/constants/asset-status";
import { useFeedbackColors } from "@/hooks/use-colors";

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
interface Props {
  status: AssetStatus;
  style?: React.CSSProperties;
}

const iconsMapper = {
  [AssetStatus.InOperation]: CheckCircleOutlined,
  [AssetStatus.InAlert]: ExclamationCircleOutlined,
  [AssetStatus.UnplannedStop]: PauseCircleOutlined,
  [AssetStatus.PlannedStop]: PauseCircleOutlined,
  [AssetStatus.InDowntime]: StopOutlined,
};

export const StatusIcon = ({ status, style }: Props) => {
  const Icon = iconsMapper[status];

  const { assetStatusToColor } = useFeedbackColors();

  return (
    <Icon
      color="cyan"
      style={{
        fontSize: 36,
        ...style,
        color: assetStatusToColor(status, "hex"),
      }}
    />
  );
};
