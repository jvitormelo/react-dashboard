import { useGetCompany } from "@/api/company/use-get-company";
import { setUnitCache } from "@/api/unit/use-get-unit";
import { CompanyInfoCard } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { ResourcesBarChart } from "@/components/charts/resources-bar-chart";
import { AssetsTable } from "@/components/tables/assets-table";
import { UsersTable } from "@/components/tables/users-table";
import { useAssetsTable } from "@/hooks/tables/use-assets-table";
import { useParamsId } from "@/hooks/use-params-id";
import { useTheme } from "@/hooks/use-theme";
import { Unit } from "@/types/entities/unit";
import { Tabs } from "antd";
import { UnitTable } from "./components/unit-table";
import { useGetCompanyResources } from "./hooks/use-get-company-resources";
import { useGetUnitsTableData } from "./hooks/use-get-units-table-data";

export const CompanyView = () => {
  const { companyId } = useParamsId();

  const { theme } = useTheme();

  const { data: company, isLoading: isCompanyLoading } =
    useGetCompany(companyId);

  const {
    unitsTable,
    assets,
    users,
    isAssetsLoading,
    isUnitsLoading,
    isUsersLoading,
  } = useGetUnitsTableData(companyId);

  const { chartData } = useGetCompanyResources(companyId);

  const onUnitSelect = (unit: Unit) => {
    setUnitCache(unit);
  };

  const assetTableProps = useAssetsTable();

  const tabsItems = [
    {
      key: "1",
      label: `Units (${unitsTable?.length ?? 0})`,
      children: (
        <UnitTable
          onSelect={onUnitSelect}
          units={unitsTable}
          loading={isUnitsLoading}
        />
      ),
    },

    {
      key: "2",
      label: `Users (${users?.length ?? 0})`,
      children: (
        <UsersTable
          onDelete={async () => {
            console.log("delete");
          }}
          onEdit={() => {
            console.log("delete");
          }}
          users={users}
          loading={isUsersLoading}
        />
      ),
    },
    {
      key: "3",
      label: `Assets (${assets?.length ?? 0})`,
      children: (
        <AssetsTable
          loading={isAssetsLoading}
          assets={assets}
          {...assetTableProps}
        />
      ),
    },
  ];

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
        <CompanyInfoCard
          company={company}
          assets={assets}
          loading={isAssetsLoading || isCompanyLoading}
        />
        <AssetsStatusPieChart title={"Assets Status"} assets={assets} />
        <ResourcesBarChart {...chartData} />
      </section>

      <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
    </div>
  );
};
