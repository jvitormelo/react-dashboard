import { assetsStatusNameMapper, AssetStatus } from "@/constants/asset-status";

export const getAssetStatusName = (status: AssetStatus | string) => {
  if (status in assetsStatusNameMapper) {
    return assetsStatusNameMapper[status as AssetStatus];
  }

  return status;
};

export const namesUtils = {
  getAssetStatusName,
};
