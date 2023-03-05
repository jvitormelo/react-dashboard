import { AssetsTable } from "@/components/tables/assets-table";
import { UsersTable } from "@/components/tables/users-table";
import { useAssetsTable } from "@/hooks/tables/use-assets-table-actions";
import { useUnitsTableActions } from "@/hooks/tables/use-units-table-actions";
import { useUserTableActions } from "@/hooks/tables/use-user-table-actions";
import { useParamsId } from "@/hooks/use-params-id";
import { Tabs } from "antd";
import { UnitsTable } from "../../components/tables/units-table";
import { CompanyViewHeader } from "./components/header";
import { useGetUnitsTableData } from "./hooks/use-get-units-table-data";

export const CompanyView = () => {
  const { companyId } = useParamsId();

  const {
    unitsTable,
    assets,
    users,
    isAssetsLoading,
    isUnitsLoading,
    isUsersLoading,
  } = useGetUnitsTableData(companyId);

  const assetTableProps = useAssetsTable();

  const unitsTableProps = useUnitsTableActions(companyId);

  const usersTableProps = useUserTableActions();

  const tabsItems = [
    {
      key: "1",
      label: `Units (${unitsTable?.length ?? 0})`,
      children: (
        <UnitsTable
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
      <CompanyViewHeader
        companyId={companyId}
        assets={assets}
        isAssetsLoading={isAssetsLoading}
      />

      <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
    </div>
  );
};
