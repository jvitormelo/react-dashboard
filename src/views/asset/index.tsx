import { AssetInfo } from "./components/asset-data";
import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const { asset, isAssetLoading, workOrdersWithUsers } = useAssetView();

  if (isAssetLoading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex" }}>
      <div>
        <AssetInfo asset={asset} />
      </div>

      <div></div>
    </div>
  );
};
