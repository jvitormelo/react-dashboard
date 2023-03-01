import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "./useGetAssets";

export const useGetAssetsByUnit = (unitId: number) => {
  const response = useQuery(["assets-by-unit", unitId], getAllAssets, {
    enabled: !!unitId,
  });

  const data = response.data?.filter((asset) => asset.unitId === unitId);
  return {
    ...response,
    data,
  };
};
