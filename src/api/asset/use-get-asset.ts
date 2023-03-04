import { httpClient } from "@/infra/http-client";
import { Asset } from "@/types/entities/asset";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getAsset = async (id: number): Promise<Asset> =>
  httpClient.get(`/assets/${id}`);

export const useGetAsset = (
  assetId: number,
  options?: UseQueryOptions<Asset, AxiosError, Asset>
) => {
  return useQuery<Asset, AxiosError, Asset>(
    ["asset", assetId],
    () => getAsset(assetId),
    {
      enabled: !!assetId,
      ...options,
    }
  );
};
