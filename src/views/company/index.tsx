import { useGetAssetsByCompany } from "@/api/asset/use-get-assets-by-company";
import { setUnitCache } from "@/api/unit/use-get-unit";
import { useGetUnitsByCompany } from "@/api/unit/use-get-units-by-company";
import { AssetsInfo } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { ResourcesBarChart } from "@/components/charts/resources-bar-chart";
import { useParamsId } from "@/hooks/use-params-id";
import { useTheme } from "@/hooks/use-theme";
import { Unit } from "@/types/entities/unit";
import { UnitTable } from "./components/unit-table";
import { useGetCompanyResources } from "./hooks/use-get-company-resources";

export const CompanyView = () => {
  const { companyId } = useParamsId();

  const { theme } = useTheme();

  const { data: units, isLoading: isUnitsLoading } =
    useGetUnitsByCompany(companyId);

  const { data: assets, isLoading: isAssetsLoading } =
    useGetAssetsByCompany(companyId);

  const { chartData } = useGetCompanyResources(companyId);

  const title = `Unit teste: Assets Status`;

  const onUnitSelect = (unit: Unit) => {
    setUnitCache(unit);
  };

  return (
    <div>
      <section
        style={{
          display: "grid",
          gap: theme.marginMD,
          gridTemplateColumns: "1fr 1fr 1fr",
          marginBottom: theme.marginMD,
        }}
      >
        <AssetsInfo assets={assets} loading={isAssetsLoading} />
        <AssetsStatusPieChart title={title} assets={assets} />
        <ResourcesBarChart {...chartData} />
      </section>

      <UnitTable
        onSelect={onUnitSelect}
        units={units}
        loading={isUnitsLoading}
      />
    </div>
  );
};
