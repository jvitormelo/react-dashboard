import { httpClient } from "@/infra/http-client";
import { Asset } from "@/types/entities";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const getAllAssets = async (): Promise<Asset[]> => httpClient.get("/assets");

type Options = UseQueryOptions<Asset[]>;

export const useGetAllAssets = (options?: Options) => {
  return useQuery<Asset[]>(["assets"], getAllAssets, options);
};
