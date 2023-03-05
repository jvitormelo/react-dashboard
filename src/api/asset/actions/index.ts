import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities";
import { arrayUtils } from "@/utils/array";

const assetsKey = ["assets"];

const assetKey = (id: number) => ["asset", id];

const selectAsset = (assets: Asset) => {
  queryClient.setQueryData(assetKey(assets.id), assets);
};

const setAsset = (asset: Asset) => {
  queryClient.setQueryData(assetKey(asset.id), asset);

  queryClient.setQueryData<Asset[]>(assetsKey, (assets) => {
    return arrayUtils.updateOrCreate<Asset>({
      array: assets,
      item: asset,
      key: "id",
    });
  });
};

const deleteAsset = (id: number) => {
  queryClient.invalidateQueries(assetKey(id), {
    exact: true,
  });

  queryClient.setQueryData<Asset[]>(assetsKey, (assets) => {
    return arrayUtils.remove<Asset>({
      array: assets,
      item: { id } as Asset,
      key: "id",
    });
  });
};

export const assetCacheActions = {
  setAsset,
  deleteAsset,
  assetsKey,
  assetKey,
  selectAsset,
};
