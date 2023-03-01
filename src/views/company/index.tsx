import { useGetAssetsByUnit } from "@/api/asset/useGetAssetsByUnit";
import { useGetUnitsByCompany } from "@/api/unit/useGetUnitsByCompany";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { useParams } from "react-router-dom";
import { UnitTable } from "./components/unit-table";

export const CompanyView = () => {
  const { companyId } = useParams();

  const { data: units, isLoading: isUnitsLoading } = useGetUnitsByCompany(
    Number(companyId)
  );

  const { data: assets } = useGetAssetsByUnit(Number(companyId));

  const title = `Unit teste: Assets Status`;

  return (
    <div>
      <AssetsStatusPieChart title={title} assets={assets} />

      <div>3 cards with Info about the company</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div>Maybe some content in left</div>
        <div style={{ flex: 1 }}>
          <UnitTable units={units} loading={isUnitsLoading} />
        </div>
      </div>
    </div>
  );
};
