import { queryClientHelpers } from "@/infra/query-client";
import { Asset } from "@/types/entities";

const arrayKey = ["assets"];

const itemKey = (id: number) => ["asset", id];

const selectAsset = (asset: Asset) => {
  queryClientHelpers.select(itemKey(asset.id), asset);
};

const addAsset = (asset: Asset) => {
  queryClientHelpers.add<Asset>({
    arrayKey: arrayKey,
    item: asset,
    itemKey: itemKey(asset.id),
  });
};

const updateAsset = (asset: Asset) => {
  queryClientHelpers.update<Asset>({
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

// TODO - create interface for all cache actions
export const assetCacheActions = {
  addAsset,
  updateAsset,
  deleteAsset,
  assetsKey: arrayKey,
  assetKey: itemKey,
  selectAsset,
};
