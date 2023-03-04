import { useGetAssetsByUnit } from "@/api/asset/use-get-assets-by-unit";
import { useGetUsersByUnit } from "@/api/user/use-get-users-by-unit";
import { UsersTable } from "@/components/tables/users-table";
import { useAssetsTable } from "@/hooks/tables/use-assets-table-actions";
import { useUserTableActions } from "@/hooks/tables/use-user-table-action";
import { useParamsId } from "@/hooks/use-params-id";
import { Tabs } from "antd";
import { AssetsTable } from "../../components/tables/assets-table";
import { UnitHeader } from "./components/header";
import { useCreateAsset } from "./hooks/use-create-asset";

export const UnitView = () => {
  const { unitId, companyId } = useParamsId();

  const { data: assets = [], isLoading: isAssetsLoading } =
    useGetAssetsByUnit(unitId);

  const { data: users, isLoading: isUsersLoading } = useGetUsersByUnit(unitId);

  const assetTableProps = useAssetsTable();

  const userTableProps = useUserTableActions();

  const { onCreateAssetClick } = useCreateAsset({
    companyId,
    unitId,
  });

  const tabsItems = [
    {
      key: "1",
      label: `Assets (${assets?.length ?? 0})`,
      children: (
        <AssetsTable
          assets={assets}
          loading={isAssetsLoading}
          headerProps={{
            buttonLabel: "Create Asset",
            onButtonClick: onCreateAssetClick,
          }}
          {...assetTableProps}
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
          {...userTableProps}
        />
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UnitHeader assets={assets} loading={isAssetsLoading} />

      <Tabs type="card" items={tabsItems} />
    </div>
  );
};
