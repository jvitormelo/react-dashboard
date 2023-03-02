import { useGetAssetsByCompany } from "@/api/asset/use-get-assets-by-company";
import { useGetUnitsByCompany } from "@/api/unit/use-get-units-by-company";
import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useGetWorkOrdersByAssets } from "@/api/work-orders/use-get-work-order-by-assets";
import { ResourcesBarChartProps } from "@/components/charts/resources-bar-chart";
import { useMemo } from "react";

export const useGetCompanyResources = (companyId: number) => {
  const { data: units = [], isLoading: isUnitsLoading } =
    useGetUnitsByCompany(companyId);
  const { data: users = [], isLoading: isUsersLoading } =
    useGetUsersByCompany(companyId);
  const { data: assets = [], isLoading: isAssetsLoading } =
    useGetAssetsByCompany(companyId);
  const { data: workOrders = [], isLoading: isWorkOrdersLoading } =
    useGetWorkOrdersByAssets(assets.map((asset) => asset.id));

  const loading =
    isUnitsLoading || isUsersLoading || isAssetsLoading || isWorkOrdersLoading;

  const chartData: ResourcesBarChartProps = useMemo(() => {
    return {
      entityNames: units.map((unit) => unit.name),
      resources: [
        {
          name: "Users",
          data: units.map((unit) => {
            const unitUsers = users.filter((user) => user.unitId === unit.id);
            return unitUsers.length;
          }),
        },
        {
          name: "Assets",
          data: units.map((unit) => {
            const unitAssets = assets.filter(
              (asset) => asset.unitId === unit.id
            );
            return unitAssets.length;
          }),
        },
        {
          name: "Work Orders",
          data: units.map((unit) => {
            const unitAssets = assets.filter(
              (asset) => asset.unitId === unit.id
            );
            const assetsId = unitAssets.map((asset) => asset.id);

            const unitWorkOrders = workOrders.filter((workOrder) =>
              assetsId.includes(workOrder.assetId)
            );
            return unitWorkOrders.length;
          }),
        },
      ],
    };
  }, [assets, units, users, workOrders]);

  return {
    loading,
    chartData,
  };
};
