import { nameUtils } from "@/utils";
import { useGetAllAssets } from "../asset/use-get-all-assets";

export const useGetAllAssetModels = () => {
  const response = useGetAllAssets();

  const allModels = response.data?.map((asset) => asset.model) || [];

  const uniqueModels = new Set(allModels);

  const uniqueModelsArray = Array.from(uniqueModels).map((model) => ({
    value: model,
    label: nameUtils.getAssetModelName(model),
  }));

  return {
    ...response,
    data: uniqueModelsArray,
  };
};
