import { useGetCompany } from "@/api/company/use-get-company";
import { CompanyInfoCard } from "@/components/cards/assets-info";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { ResourcesBarChart } from "@/components/charts/resources-bar-chart";
import { AssetsTable } from "@/components/tables/assets-table";
import { UsersTable } from "@/components/tables/users-table";
import { useAssetsTable } from "@/hooks/tables/use-assets-table";
import { useUnitsTableActions } from "@/hooks/tables/use-units-table-actions";
import { useUserTableAction } from "@/hooks/tables/use-user-table-action";
import { useParamsId } from "@/hooks/use-params-id";
import { useTheme } from "@/hooks/use-theme";
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

  const assetTableProps = useAssetsTable();

  const unitsTableProps = useUnitsTableActions(companyId);

  const usersTableProps = useUserTableAction();

  const tabsItems = [
    {
      key: "1",
      label: `Units (${unitsTable?.length ?? 0})`,
      children: (
        <UnitTable
          units={unitsTable}
          loading={isUnitsLoading}
          companyId={companyId}
          {...unitsTableProps}
        />
      ),
    },

    {
      key: "2",
      label: `Users (${users?.length ?? 0})`,
      children: (
        <UsersTable
          users={users}
          loading={isUsersLoading}
          {...usersTableProps}
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
