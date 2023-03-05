import { useGetAllAssets } from "./use-get-all-assets";

export const useGetAssetsByUnit = (unitId: number) => {
  const response = useGetAllAssets({
    enabled: !!unitId,
  });

  const data = response.data?.filter((asset) => asset.unitId === unitId);

  return {
    ...response,
    data,
  };
};
