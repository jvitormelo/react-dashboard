import { AssetStatusCard } from "@/components/cards/asset-status-card";
import { AssetStatus, assetStatusArray } from "@/constants/asset-status";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { memo } from "react";
import styles from "./styles.module.scss";

interface Props {
  assets: Asset[];
  loading?: boolean;
}

export const UnitHeader = memo(({ assets, loading }: Props) => {
  const { theme } = useTheme();

  const getCount = (status: AssetStatus) => {
    return assets.filter((asset) => asset.status === status).length ?? 0;
  };

  return (
    <header
      className={styles.header}
      style={{
        gap: theme.marginMD,
        marginBottom: theme.marginXL,
      }}
    >
      {assetStatusArray.map((status) => (
        <AssetStatusCard
          loading={loading}
          key={status}
          count={getCount(status)}
          status={status}
        />
      ))}
    </header>
  );
});
