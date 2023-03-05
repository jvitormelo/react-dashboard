import { useGetAllAssets } from "./use-get-all-assets";

export const useGetAssetsByCompany = (companyId: number) => {
  const response = useGetAllAssets({
    enabled: !!companyId,
  });

  const data = response.data?.filter((asset) => asset.companyId === companyId);
  return {
    ...response,
    data,
  };
};
