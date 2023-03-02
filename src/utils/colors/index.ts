import { assetsStatusColorMapper, AssetStatus } from "@/constants/asset-status";

const getAssetHealthColor = (value: AssetStatus) => {
  return assetsStatusColorMapper[value];
};

export const colorsUtils = {
  getAssetHealthColor,
};
