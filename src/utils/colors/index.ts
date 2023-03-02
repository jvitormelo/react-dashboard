import { assetsStatusColorMapper, AssetStatus } from "@/constants/asset-status";

const numberToAssetStatus = (value: number) => {
  if (value < 50) {
    return AssetStatus.UnplannedStop;
  }

  if (value < 75) {
    return AssetStatus.InAlert;
  }

  return AssetStatus.InOperation;
};

const getAssetHealthColor = (value: AssetStatus | number) => {
  if (typeof value === "number") {
    return assetsStatusColorMapper[numberToAssetStatus(value)];
  }

  return assetsStatusColorMapper[value];
};

export const colorsUtils = {
  getAssetHealthColor,
};
