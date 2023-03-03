import { setAssetCache } from "@/api/asset/use-get-asset";
import { useGetAssetsByUnit } from "@/api/asset/use-get-assets-by-unit";
import { CompanyInfoCard } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { useParamsId } from "@/hooks/use-params-id";
import { Asset } from "@/types/entities/asset";
import { AssetsTable } from "./components/assets-table";

export const UnitView = () => {
  const { unitId } = useParamsId();

  const { data, isLoading } = useGetAssetsByUnit(unitId);

  const onAssetSelect = (asset: Asset) => {
    setAssetCache(asset);
  };

  return (
    <div>
      <section style={{ display: "flex", marginBottom: "1rem" }}>
        <CompanyInfoCard assets={data} />
        <AssetsStatusPieChart assets={data} title="Recent Assets Status" />
      </section>
      <AssetsTable
        assets={data ?? []}
        onSelect={onAssetSelect}
        loading={isLoading}
      />
    </div>
  );
};
