import { AssetStatusCard } from "@/components/cards/asset-status-card";
import { assetStatusArray } from "@/constants/asset-status";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";

interface Props {
  assets: Asset[];
  loading?: boolean;
}

export const UnitHeader = ({ assets, loading }: Props) => {
  const { theme } = useTheme();

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
          count={assets.filter((asset) => asset.status === status).length ?? 0}
          status={status}
        />
      ))}
    </header>
  );
};
