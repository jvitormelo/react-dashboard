import { assetsStatusColorMapper, AssetStatus } from "@/constants/asset-status";

// REFACTOR THIS TO USE FROM THE THEME
const numberToAssetStatus = (value: number) => {
  if (value > 70) {
    return assetsStatusColorMapper.inOperation;
  }
  if (value > 50) {
    return assetsStatusColorMapper.unplannedStop;
  }
  return assetsStatusColorMapper.inAlert;
};

const getAssetHealthColor = (value: AssetStatus | number) => {
  if (typeof value === "number") {
    return numberToAssetStatus(value);
  }

  return assetsStatusColorMapper[value];
};

export const colorsUtils = {
  getAssetHealthColor,
};
