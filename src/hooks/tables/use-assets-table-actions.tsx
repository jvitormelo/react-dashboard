import { setAssetCache } from "@/api/asset/use-get-asset";
import { AssetForm } from "@/components/forms/asset-form";
import { AssetsTableProps } from "@/components/tables/assets-table/types";
import { Asset } from "@/types/entities/asset";
import { useModal } from "../use-modal";

type Hook = () => Omit<AssetsTableProps, "loading" | "assets">;

export const useAssetsTable: Hook = () => {
  const { openModal } = useModal();
  const onSelect = (asset: Asset) => {
    setAssetCache(asset);
  };

  const onEdit = (asset: Asset) => {
    openModal({
      title: "Edit Asset",
      body: <AssetForm defaultValues={asset} />,
    });
  };

  return {
    onSelect,
    onEdit,
  };
};
