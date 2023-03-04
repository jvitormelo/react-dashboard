import { namesUtils } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "../asset/get-assets";

export const useGetAllAssetModels = () => {
  const response = useQuery(["assets"], getAllAssets);

  const allModels = response.data?.map((asset) => asset.model) || [];

  const uniqueModels = new Set(allModels);

  const uniqueModelsArray = Array.from(uniqueModels).map((model) => ({
    value: model,
    label: namesUtils.getAssetModelName(model),
  }));

  return {
    ...response,
    data: uniqueModelsArray,
  };
};
