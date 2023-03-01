import { selectAsset } from "@/api/asset/useGetAsset";
import { useGetAssetsByUnit } from "@/api/asset/useGetAssetsByUnit";
import { AssetsInfo } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { Asset } from "@/types/entities/asset";
import { useParams } from "react-router-dom";
import { AssetsTable } from "./components/assets-table";

export const UnitView = () => {
  const params = useParams();
  const unitId = Number(params.unitId);

  const { data, isLoading } = useGetAssetsByUnit(unitId);

  const onAssetSelect = (asset: Asset) => {
    selectAsset(asset);
  };

  return (
    <div>
      <section style={{ display: "flex", marginBottom: "1rem" }}>
        <AssetsInfo assets={data} />
        <AssetsStatusPieChart assets={data} title="Test" />
        <div>
          <div>Total Users: 10 see all</div>
          <div>Work Orders</div>
        </div>
      </section>
      <AssetsTable
        assets={data ?? []}
        onSelect={onAssetSelect}
        loading={isLoading}
      />
    </div>
  );
};
