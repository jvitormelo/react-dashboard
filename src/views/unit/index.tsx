import { useGetAssetsByUnit } from "@/api/asset/use-get-assets-by-unit";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { useAssetsTable } from "@/hooks/tables/use-assets-table";
import { useParamsId } from "@/hooks/use-params-id";
import { AssetsTable } from "../../components/tables/assets-table";

export const UnitView = () => {
  const { unitId } = useParamsId();

  const { data, isLoading } = useGetAssetsByUnit(unitId);

  const tableProps = useAssetsTable();

  return (
    <div>
      <section style={{ display: "flex", marginBottom: "1rem" }}>
        <AssetsStatusPieChart assets={data} title="Recent Assets Status" />
      </section>
      <AssetsTable assets={data} loading={isLoading} {...tableProps} />
    </div>
  );
};
