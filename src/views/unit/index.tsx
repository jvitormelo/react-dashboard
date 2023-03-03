import { useGetAssetsByUnit } from "@/api/asset/use-get-assets-by-unit";
import { useGetUsersByUnit } from "@/api/user/use-get-users-by-unit";
import { UsersTable } from "@/components/tables/users-table";
import { useAssetsTable } from "@/hooks/tables/use-assets-table";
import { useParamsId } from "@/hooks/use-params-id";
import { Tabs } from "antd";
import { AssetsTable } from "../../components/tables/assets-table";
import { UnitHeader } from "./components/header";

export const UnitView = () => {
  const { unitId } = useParamsId();

  const { data: assets = [], isLoading: isAssetsLoading } =
    useGetAssetsByUnit(unitId);

  const { data: users, isLoading: isUsersLoading } = useGetUsersByUnit(unitId);

  const tableProps = useAssetsTable();

  const tabsItems = [
    {
      key: "1",
      label: `Assets (${assets?.length ?? 0})`,
      children: (
        <AssetsTable
          assets={assets}
          loading={isAssetsLoading}
          {...tableProps}
        />
      ),
    },
    {
      key: "2",
      label: `Users (${users?.length ?? 0})`,
      children: <UsersTable users={users} loading={isUsersLoading} />,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UnitHeader assets={assets} loading={isAssetsLoading} />

      {/* TODO - Add Cards for each status */}
      <Tabs type="card" items={tabsItems} />
    </div>
  );
};
