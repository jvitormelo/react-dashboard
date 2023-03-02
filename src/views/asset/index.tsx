import { useTheme } from "@/hooks/use-theme";
import { AssetHeader } from "./components/asset-header";
import { AssetInfo } from "./components/asset-info";
import { AssetAssignedUsers } from "./components/assigned-users";
import { AssetHealthTimeline } from "./components/health-timeline";
import { WorkOrderInfo } from "./components/work-order";
import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const { asset, workOrdersWithUsers, assetUsers } = useAssetView();

  const { theme } = useTheme();

  return (
    <div>
      <AssetHeader asset={asset} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: theme.marginMD,
          marginTop: theme.marginMD,
        }}
      >
        <AssetInfo asset={asset} />

        <div
          style={{
            display: "flex",
            gap: theme.marginMD,
            flexDirection: "column",
          }}
        >
          <WorkOrderInfo workOrders={workOrdersWithUsers} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: theme.marginMD,
            }}
          >
            <AssetAssignedUsers users={assetUsers} />

            <AssetHealthTimeline healthHistory={asset?.healthHistory ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};
