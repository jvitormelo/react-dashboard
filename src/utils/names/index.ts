import { AssetModels, assetModelsNameMap } from "@/constants/asset-models";
import { assetsStatusNameMapper, AssetStatus } from "@/constants/asset-status";

const getAssetStatusName = (status: AssetStatus | string) => {
  if (status in assetsStatusNameMapper) {
    return assetsStatusNameMapper[status as AssetStatus];
  }

  return status;
};

const getAssetModelName = (model: AssetModels) => {
  return assetModelsNameMap[model];
};

export const namesUtils = {
  getAssetStatusName,
  getAssetModelName,
};
