import { useTheme } from "@/hooks/use-theme";
import { AssetHeader } from "./components/asset-header";
import { AssetInfo } from "./components/asset-info";
import { AssetSkeleton } from "./components/asset-skeleton";
import { AssetAssignedUsers } from "./components/assigned-users";
import { AssetHealthTimeline } from "./components/health-timeline";
import { WorkOrderInfo } from "./components/work-order";
import { useAssetView } from "./hooks/use-asset-view";
import styles from "./styles.module.scss";

export const AssetView = () => {
  const { assetWithUser, workOrdersWithUsers = [], isLoading } = useAssetView();

  const { theme } = useTheme();

  if (isLoading || !assetWithUser.id) return <AssetSkeleton />;

  return (
    <div>
      <AssetHeader asset={assetWithUser} />

      <div
        className={styles.content}
        style={{
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
            className={styles.assignedUsers}
            style={{
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
