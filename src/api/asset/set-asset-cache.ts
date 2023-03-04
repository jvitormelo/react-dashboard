import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";

// TODO - find a better place
export const setAssetCache = (asset: Asset) => {
  queryClient.setQueryData(["asset", asset.id], asset);
};
