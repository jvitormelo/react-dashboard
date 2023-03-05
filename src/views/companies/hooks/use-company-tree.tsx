import { useGetAllAssets } from "@/api/asset/use-get-all-assets";
import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { useGetAllUnits } from "@/api/unit/use-get-all-units";
import { useGetAllUsers } from "@/api/user/use-get-all-users";
import { useGetAllWorkOrders } from "@/api/work-orders/use-get-all-work-orders";
import { AssetLink } from "@/components/molecules/asset-link";
import { UserLink } from "@/components/molecules/user-link";
import {
  DatabaseOutlined,
  HomeOutlined,
  SettingFilled,
  ToolFilled,
  UserOutlined,
} from "@ant-design/icons";
import { DataNode } from "antd/es/tree";
import { useCallback, useMemo } from "react";

// Icons for each entity in the tree
const companyIcon = <HomeOutlined />;
const unitIcon = <DatabaseOutlined />;
const assetIcon = <SettingFilled />;
const userIcon = <UserOutlined />;
const workOrderIcon = <ToolFilled />;

export const useCompanyTree = () => {
  const { data: companiesData = [], isLoading: isCompanyLoading } =
    useGetAllCompanies();

  const { data: unitsData = [], isLoading: isUnitsLoading } = useGetAllUnits();

  const { data: assetsData = [], isLoading: isAssetsLoading } =
    useGetAllAssets();

  const { data: usersData = [], isLoading: isUsersLoading } = useGetAllUsers();

  const { data: workOrdersData = [], isLoading: isWorkOrdersLoading } =
    useGetAllWorkOrders();

  const companies = companiesData.map((company) => ({
    ...company,
    icon: companyIcon,
  }));

  const units = unitsData.map((unit) => ({
    ...unit,
    icon: unitIcon,
  }));

  const assets = assetsData.map((asset) => ({
    ...asset,
    icon: assetIcon,
    name: <AssetLink asset={asset}></AssetLink>,
  }));

  const users = usersData.map((user) => ({
    ...user,
    name: (
      <UserLink
        {...user}
        unit={units.find((unit) => unit.id === user.unitId)}
      />
    ),
    icon: userIcon,
  }));

  const workOrders = workOrdersData.map((workOrder) => ({
    ...workOrder,
    icon: workOrderIcon,
  }));

  const filterAssetsByUnit = useCallback(
    (unitId: number) => {
      return assets.filter((asset) => asset.unitId === unitId);
    },
    [assets]
  );

  const filterWorkOrdersByAsset = useCallback(
    (assetId: number) => {
      return workOrders.filter((workOrder) => workOrder.assetId === assetId);
    },
    [workOrders]
  );

  const tree: DataNode[] = useMemo(
    () =>
      companies.map((company, companyIndex) => ({
        key: `0-${companyIndex}`,
        icon: company.icon,
        title: company.name,
        children: units
          .filter((unit) => unit.companyId === companies[companyIndex].id)
          .map((unit, unitIndex) => ({
            key: `0-${companyIndex}-${unitIndex}`,
            title: unit.name,
            icon: unit.icon,
            children: [
              ...filterAssetsByUnit(unit.id).map((asset, assetIndex) => ({
                key: `0-${companyIndex}-${unitIndex}-${assetIndex}`,
                title: asset.name,
                icon: asset.icon,
                children: [
                  ...filterWorkOrdersByAsset(asset.id).map(
                    (workOrder, workOrderIndex) => ({
                      key: `0-${companyIndex}-${unitIndex}-${assetIndex}-${workOrderIndex}`,
                      title: workOrder.title,
                      icon: workOrder.icon,
                      children: users
                        .filter((user) =>
                          workOrder.assignedUserIds.includes(user.id)
                        )
                        .map((user, userIndex) => ({
                          key: `0-${companyIndex}-${unitIndex}-${assetIndex}-${workOrderIndex}-${userIndex}`,
                          title: user.name,
                          icon: user.icon,
                        })),
                    })
                  ),
                  ...users
                    .filter((user) => asset.assignedUserIds.includes(user.id))
                    .map((user, userIndex) => ({
                      key: `0-${companyIndex}-${unitIndex}-${assetIndex}-${
                        filterWorkOrdersByAsset(asset.id).length + userIndex
                      }`,
                      title: user.name,
                      icon: user.icon,
                    })),
                ],
              })),

              ...users
                .filter((user) => user.unitId === unit.id)
                .map((user, userIndex) => ({
                  key: `0-${companyIndex}-${unitIndex}-${
                    filterAssetsByUnit(unit.id).length + userIndex
                  }`,
                  title: user.name,
                  icon: user.icon,
                })),
            ],
          })),
      })) as DataNode[],
    [companies, units, filterAssetsByUnit, users, filterWorkOrdersByAsset]
  );

  const isLoading =
    isCompanyLoading ||
    isUnitsLoading ||
    isAssetsLoading ||
    isUsersLoading ||
    isWorkOrdersLoading;

  return {
    isLoading,
    tree,
  };
};
