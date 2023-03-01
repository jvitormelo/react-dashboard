import { useGetAssetsByUnit } from "@/api/asset/useGetAssetsByUnit";
import { useParams } from "react-router-dom";
import { AssetsTable } from "./components/assets-table";

export const UnitView = () => {
  const params = useParams();
  const unitId = Number(params.unitId);

  const { data, isLoading } = useGetAssetsByUnit(unitId);

  return (
    <div>
      <AssetsTable assets={data ?? []} loading={isLoading}></AssetsTable>
    </div>
  );
};
