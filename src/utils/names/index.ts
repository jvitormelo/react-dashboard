import { AssetModels, assetModelsNameMap } from "@/constants/asset-models";
import { assetsStatusNameMapper, AssetStatus } from "@/constants/asset-status";
import { Specifications } from "@/types/entities/asset";

const getAssetStatusName = (status: AssetStatus | string) => {
  if (status in assetsStatusNameMapper) {
    return assetsStatusNameMapper[status as AssetStatus];
  }

  return status;
};

const getAssetModelName = (model: AssetModels) => {
  return assetModelsNameMap[model];
};

const getSpecificationName = (
  value: number | undefined,
  type: keyof Specifications
) => {
  if (typeof value !== "number") return "N/A";

  if (type === "maxTemp") return `${value} °C`;

  if (type === "power") return `${value} kWh`;

  return `${value} rpm`;
};

const getSensorNames = (sensor: string[]) => {
  return sensor.join(", ");
};

export const namesUtils = {
  getAssetStatusName,
  getAssetModelName,
  getSpecificationName,
  getSensorNames,
};
