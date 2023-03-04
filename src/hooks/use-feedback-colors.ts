import { AssetStatus } from "@/constants/asset-status";
import { WorkOrderPriority } from "@/constants/work-order-priority";
import { WorkOrderStatus } from "@/constants/work-order-status";
import { TagProps } from "antd/es";
import { useTheme } from "./use-theme";

const breakPoints = {
  success: 70,
  warning: 50,
};

type ReturnType = "hex" | "name";

type Colors = "success" | "error" | "warning" | "info" | "default";

export const useFeedbackColors = () => {
  const { theme } = useTheme();

  const colorsMap: Record<Colors, { hex: string; name: TagProps["color"] }> = {
    success: {
      hex: theme.colorSuccess,
      name: "success",
    },
    error: {
      hex: theme.colorError,
      name: "error",
    },
    warning: {
      hex: theme.colorWarning,
      name: "warning",
    },
    info: {
      hex: theme["cyan-3"],
      name: "cyan",
    },
    default: {
      hex: "#BBBBBB",
      name: "default",
    },
  };

  const numberToColor = (value: number) => {
    if (value > breakPoints.success) {
      return colorsMap.success;
    }
    if (value > breakPoints.warning) {
      return colorsMap.warning;
    }

    return colorsMap.error;
  };

  const healthScoreToColor = (
    value: number,
    returnType: ReturnType = "hex"
  ) => {
    const color = numberToColor(value);

    return color[returnType];
  };

  const assetStatusToColor = (
    value: AssetStatus,
    returnType: ReturnType = "hex"
  ): string => {
    const mapper = {
      [AssetStatus.InOperation]: colorsMap.success,
      [AssetStatus.InAlert]: colorsMap.error,
      [AssetStatus.UnplannedStop]: colorsMap.warning,
      [AssetStatus.PlannedStop]: colorsMap.info,
      [AssetStatus.InDowntime]: colorsMap.default,
    };

    return mapper[value][returnType] as string;
  };

  const workOrderStatusToColor = (
    status: WorkOrderStatus,
    returnType: ReturnType = "hex"
  ) => {
    const mapper = {
      [WorkOrderStatus.COMPLETED]: colorsMap.success,
      [WorkOrderStatus.IN_PROGRESS]: colorsMap.warning,
    };

    const color = mapper[status];

    if (!color) {
      return colorsMap.default[returnType];
    }

    return mapper[status][returnType];
  };

  const workOrderPriorityToColor = (
    priority: WorkOrderPriority,
    returnType: ReturnType = "hex"
  ) => {
    const map = {
      [WorkOrderPriority.LOW]: colorsMap.info,
      [WorkOrderPriority.MEDIUM]: colorsMap.warning,
      [WorkOrderPriority.HIGH]: colorsMap.error,
    };

    const color = map[priority];

    if (!color) {
      return colorsMap.default[returnType];
    }

    return map[priority][returnType];
  };

  return {
    healthScoreToColor,
    assetStatusToColor,
    workOrderStatusToColor,
    workOrderPriorityToColor,
  };
};
