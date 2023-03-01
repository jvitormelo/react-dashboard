import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "./useGetAssets";

export const useGetAssetsByCompany = (companyId: number) => {
  // The correct would be create one key per query, but its the same
  const response = useQuery(["assets"], getAllAssets, {
    enabled: !!companyId,
  });

  const data = response.data?.filter((asset) => asset.companyId === companyId);
  return {
    ...response,
    data,
  };
};
