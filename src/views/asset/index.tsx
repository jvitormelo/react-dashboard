import { Card } from "antd";
import { AssetInfo } from "./components/asset-data";
import { AssetMetricCard } from "./components/asset-metric-card";
import { AssetAssignedUsers } from "./components/assigned-users";
import { WorkOrderInfo } from "./components/work-order";
import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const { asset, workOrdersWithUsers, assetUsers } = useAssetView();

  return (
    <div>
      <section style={{ marginBottom: "1rem", display: "flex" }}>
        <Card>
          <span>HealtScore</span>
          <h4>{asset?.healthscore}</h4>
        </Card>

        <Card>
          <span>Status</span>
          <h4>{asset?.status}</h4>
        </Card>
        <AssetMetricCard metrics={asset?.metrics}></AssetMetricCard>
      </section>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}
      >
        <div>
          <AssetInfo asset={asset} />
        </div>

        <div>
          <WorkOrderInfo workOrders={workOrdersWithUsers} />

          <AssetAssignedUsers users={assetUsers} />
        </div>
      </div>
    </div>
  );
};
