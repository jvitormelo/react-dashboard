import { queryClientHelpers } from "@/infra/query-client";
import { Asset } from "@/types/entities";

const arrayKey = ["assets"];

const itemKey = (id: number) => ["asset", id];

const selectAsset = (asset: Asset) => {
  queryClientHelpers.select(itemKey(asset.id), asset);
};

const addOrUpdateAsset = (asset: Asset) => {
  queryClientHelpers.addOrUpdate<Asset>({
    arrayKey: arrayKey,
    item: asset,
    itemKey: itemKey(asset.id),
  });
};

const deleteAsset = (id: number) => {
  queryClientHelpers.removeFromCache<Asset>({
    id,
    arrayKey,
    itemKey: itemKey(id),
  });
};

export const assetCacheActions = {
  addOrUpdateAsset: addOrUpdateAsset,
  deleteAsset,
  assetsKey: arrayKey,
  assetKey: itemKey,
  selectAsset,
};
