import { httpClient } from "@/infra/http-client";
import { Asset } from "@/types/entities/asset";
import { useQuery } from "@tanstack/react-query";

export const getAllAssets = async (): Promise<Asset[]> =>
  httpClient.get("/assets");

export const useGetAssets = () => {
  return useQuery(["assets"], getAllAssets);
};
