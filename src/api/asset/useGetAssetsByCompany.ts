import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "./useGetAssets";

export const useGetAssetsByCompany = (companyId: number) => {
  const response = useQuery(["assets-by-company", companyId], getAllAssets, {
    enabled: !!companyId,
  });

  const data = response.data?.filter((asset) => asset.companyId === companyId);
  return {
    ...response,
    data,
  };
};
