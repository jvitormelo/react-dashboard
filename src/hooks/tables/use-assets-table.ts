import { setAssetCache } from "@/api/asset/use-get-asset";
import { AssetsTableProps } from "@/components/tables/assets-table/types";
import { Asset } from "@/types/entities/asset";

type Hook = () => Omit<AssetsTableProps, "loading" | "assets">;

export const useAssetsTable: Hook = () => {
  const onSelect = (asset: Asset) => {
    setAssetCache(asset);
  };

  return {
    onSelect,
  };
};
