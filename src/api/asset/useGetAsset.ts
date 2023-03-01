import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";
import { useQuery } from "@tanstack/react-query";

const getAsset = async (id: number): Promise<Asset> =>
  httpClient.get(`/assets/${id}`);

export const useGetAsset = (assetId: number) => {
  return useQuery(["asset", assetId], () => getAsset(assetId), {
    enabled: !!assetId,
  });
};

export const selectAsset = (asset: Asset) => {
  queryClient.setQueryData(["asset", asset.id], asset);
};
