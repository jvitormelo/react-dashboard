import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const { asset, isAssetLoading } = useAssetView();

  if (isAssetLoading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex" }}>
      <div>{JSON.stringify(asset)}</div>

      <div></div>
    </div>
  );
};
