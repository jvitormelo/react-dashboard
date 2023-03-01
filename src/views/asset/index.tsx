import { AssetInfo } from "./components/asset-data";
import { WorkOrderInfo } from "./components/work-order";
import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const { asset, isAssetLoading, workOrdersWithUsers } = useAssetView();

  if (isAssetLoading) return <div>Loading...</div>;

  console.log(workOrdersWithUsers);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <AssetInfo asset={asset} />
      </div>

      <div>
        <WorkOrderInfo workOrders={workOrdersWithUsers} />
      </div>
    </div>
  );
};
