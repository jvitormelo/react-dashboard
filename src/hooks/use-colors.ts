import { AssetStatus } from "@/constants/asset-status";
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

  return {
    healthScoreToColor,
    assetStatusToColor,
  };
};
