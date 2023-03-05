import { useGetAllAssets } from "@/api/asset/use-get-all-assets";
import { useGetAllCompanies } from "@/api/company/use-get-all-companies";
import { useGetAllUnits } from "@/api/unit/use-get-all-units";
import { useGetAllUsers } from "@/api/user/use-get-all-users";
import { useGetAllWorkOrders } from "@/api/work-orders/use-get-all-work-orders";
import { UserLink } from "@/components/molecules/user-link";
import {
  DatabaseOutlined,
  HomeOutlined,
  SettingFilled,
  ToolFilled,
  // UserOutlined,
} from "@ant-design/icons";
import { DataNode } from "antd/es/tree";

// Icons for each entity in the tree
const companyIcon = <HomeOutlined />;
const unitIcon = <DatabaseOutlined />;
const assetIcon = <SettingFilled />;
// const userIcon = <UserOutlined />;
const workOrderIcon = <ToolFilled />;

export const useCompanyTree = () => {
  const { data: companiesData = [] } = useGetAllCompanies();

  const { data: unitsData = [] } = useGetAllUnits();

  const { data: assetsData = [] } = useGetAllAssets();

  const { data: usersData = [] } = useGetAllUsers();

  const { data: workOrdersData = [] } = useGetAllWorkOrders();

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
  }));

  const users = usersData.map((user) => ({
    ...user,
    name: (
      <UserLink
        {...user}
        unit={units.find((unit) => unit.id === user.unitId)}
      />
    ),
    icon: null,
  }));

  const workOrders = workOrdersData.map((workOrder) => ({
    ...workOrder,
    icon: workOrderIcon,
  }));

  const filterAssetsByUnit = (unitId: number) => {
    return assets.filter((asset) => asset.unitId === unitId);
  };

  const filterWorkOrdersByAsset = (assetId: number) => {
    return workOrders.filter((workOrder) => workOrder.assetId === assetId);
  };

  const tree: DataNode[] = companies.map((company, companyIndex) => ({
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
  }));

  return {
    tree,
  };
};
