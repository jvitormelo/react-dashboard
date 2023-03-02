import { useGetAssetsByCompany } from "@/api/asset/use-get-assets-by-company";
import { setUnitCache } from "@/api/unit/use-get-unit";
import { useGetUnitsByCompany } from "@/api/unit/use-get-units-by-company";
import { AssetsInfo } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { useParamsId } from "@/hooks/use-params-id";
import { Unit } from "@/types/entities/unit";
import { UnitTable } from "./components/unit-table";

export const CompanyView = () => {
  const { companyId } = useParamsId();

  const { data: units, isLoading: isUnitsLoading } =
    useGetUnitsByCompany(companyId);

  const { data: assets, isLoading: isAssetsLoading } =
    useGetAssetsByCompany(companyId);

  const title = `Unit teste: Assets Status`;

  const onUnitSelect = (unit: Unit) => {
    setUnitCache(unit);
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

      <UnitTable
        onSelect={onUnitSelect}
        units={units}
        loading={isUnitsLoading}
      />
    </div>
  );
};
