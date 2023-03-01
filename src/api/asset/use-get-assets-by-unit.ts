import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "./get-assets";

export const useGetAssetsByUnit = (unitId: number) => {
  const response = useQuery(["assets"], getAllAssets, {
    enabled: !!unitId,
  });

  const data = response.data?.filter((asset) => asset.unitId === unitId);
  return {
    ...response,
    data,
  };
};
