import { useGetAssetsByCompany } from "@/api/asset/useGetAssetsByCompany";
import { selectUnit } from "@/api/unit/useGetUnit";
import { useGetUnitsByCompany } from "@/api/unit/useGetUnitsByCompany";
import { AssetsInfo } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { Unit } from "@/types/entities/unit";
import { useParams } from "react-router-dom";
import { UnitTable } from "./components/unit-table";

export const CompanyView = () => {
  const { companyId } = useParams();

  const { data: units, isLoading: isUnitsLoading } = useGetUnitsByCompany(
    Number(companyId)
  );

  const { data: assets, isLoading: isAssetsLoading } = useGetAssetsByCompany(
    Number(companyId)
  );

  const title = `Unit teste: Assets Status`;

  const onUnitSelect = (unit: Unit) => {
    selectUnit(unit);
  };

  return (
    <div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          marginBottom: "1rem",
        }}
      >
        <AssetsInfo assets={assets} loading={isAssetsLoading} />
        <AssetsStatusPieChart title={title} assets={assets} />

        <div>
          <h2>Number of users: 10</h2>

          <h2>Unfinisheds workorders: 30</h2>
        </div>
      </section>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div>Maybe some content in left</div>
        <div style={{ flex: 1 }}>
          <UnitTable
            onSelect={onUnitSelect}
            units={units}
            loading={isUnitsLoading}
          />
        </div>
      </div>
    </div>
  );
};
