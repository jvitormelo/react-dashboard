import { useGetAssetsByUnit } from "@/api/asset/use-get-assets-by-unit";
import { useGetUsersByUnit } from "@/api/user/use-get-users-by-unit";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { UsersTable } from "@/components/tables/users-table";
import { useAssetsTable } from "@/hooks/tables/use-assets-table";
import { useParamsId } from "@/hooks/use-params-id";
import { Tabs } from "antd";
import { AssetsTable } from "../../components/tables/assets-table";

export const UnitView = () => {
  const { unitId } = useParamsId();

  const { data, isLoading } = useGetAssetsByUnit(unitId);

  const { data: users, isLoading: isUsersLoading } = useGetUsersByUnit(unitId);

  const tableProps = useAssetsTable();

  const tabsItems = [
    {
      key: "1",
      label: `Assets (${data?.length ?? 0})`,
      children: (
        <AssetsTable assets={data} loading={isLoading} {...tableProps} />
      ),
    },
    {
      key: "2",
      label: `Users (${users?.length ?? 0})`,
      children: <UsersTable users={users} loading={isUsersLoading} />,
    },
  ];

  return (
    <div>
      <section style={{ display: "flex", marginBottom: "1rem" }}>
        <AssetsStatusPieChart assets={data} title="Recent Assets Status" />
      </section>

      <Tabs type="card" items={tabsItems} />
    </div>
  );
};
