import { AssetStatusCard } from "@/components/cards/asset-status-card";
import { AssetStatus, assetStatusArray } from "@/constants/asset-status";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { memo } from "react";

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
      style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: theme.marginMD,
        margin: "0 auto",
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
