import { useTheme } from "@/hooks/use-theme";
import { AssetHeader } from "./components/asset-header";
import { AssetInfo } from "./components/asset-info";
import { AssetSkeleton } from "./components/asset-skeleton";
import { AssetAssignedUsers } from "./components/assigned-users";
import { AssetHealthTimeline } from "./components/health-timeline";
import { WorkOrderInfo } from "./components/work-order";
import { useAssetView } from "./hooks/use-asset-view";

export const AssetView = () => {
  const {
    assetWithUser,
    workOrdersWithUsers = [],
    isAssetLoading,
    isWorkOrdersLoading,
  } = useAssetView();

  const { theme } = useTheme();

  if (isAssetLoading || isWorkOrdersLoading || !assetWithUser.id)
    return <AssetSkeleton />;

  return (
    <div>
      <AssetHeader asset={assetWithUser} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: theme.marginMD,
          marginTop: theme.marginMD,
        }}
      >
        <AssetInfo asset={assetWithUser} />

        <div
          style={{
            display: "flex",
            gap: theme.marginMD,
            flexDirection: "column",
          }}
        >
          <WorkOrderInfo
            asset={assetWithUser}
            workOrders={workOrdersWithUsers}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: theme.marginMD,
            }}
          >
            <AssetAssignedUsers asset={assetWithUser} />

            <AssetHealthTimeline
              healthHistory={assetWithUser.healthHistory ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
