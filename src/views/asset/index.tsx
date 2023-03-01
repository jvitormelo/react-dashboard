import { AssetInfo } from "./components/asset-data";
import { AssetHeader } from "./components/asset-header";
import { AssetAssignedUsers } from "./components/assigned-users";
import { WorkOrderInfo } from "./components/work-order";
import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const { asset, workOrdersWithUsers, assetUsers } = useAssetView();

  return (
    <div>
      <AssetHeader asset={asset} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <AssetInfo asset={asset} />

        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          <WorkOrderInfo workOrders={workOrdersWithUsers} />

          <AssetAssignedUsers users={assetUsers} />
        </div>
      </div>
    </div>
  );
};
