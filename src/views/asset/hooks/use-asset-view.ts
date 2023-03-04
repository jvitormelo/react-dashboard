import { useGetAsset } from "@/api/asset/use-get-asset";
import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useGetWorkOrdersByAsset } from "@/api/work-orders/use-get-work-orders-by-asset";
import { useParamsId } from "@/hooks/use-params-id";
import { toast } from "@/infra/toast";
import { Routes } from "@/router/routes";
import { AssetWithUsers } from "@/types/entities/asset";
import { UserWithUnit } from "@/types/entities/user";
import { WorkOrdersWithUsers } from "@/types/entities/workorders";
import { useNavigate } from "react-router-dom";
import { useGetUnitsByCompany } from "@/api/unit/use-get-units-by-company";

export const useAssetView = () => {
  const { assetId, companyId, unitId } = useParamsId();
  const navigate = useNavigate();

  const { data: units = [] } = useGetUnitsByCompany(companyId);

  const { data: asset, isLoading: isAssetLoading } = useGetAsset(assetId, {
    onError: () => {
      toast.error("Could not load asset");
      navigate(Routes.unit(companyId, unitId));
    },
  });

  const { data: workOrders = [], isLoading: isWorkOrdersLoading } =
    useGetWorkOrdersByAsset(assetId);

  // TODO - add the relation inside the API
  const { data: users = [], isLoading: isUsersLoadings } =
    useGetUsersByCompany(companyId);

  const assetUsers: UserWithUnit[] = users
    .filter((user) => asset?.assignedUserIds.includes(user.id))
    .map((user) => ({
      ...user,
      unit: units.find((unit) => unit.id === user.unitId) || {
        id: 0,
        companyId: 0,
        name: "",
      },
    }));

  const workOrdersWithUsers: WorkOrdersWithUsers[] = workOrders.map(
    (workOrder) => ({
      ...workOrder,
      users: users.filter((user) =>
        workOrder.assignedUserIds.includes(user.id)
      ),
    })
  );

  const assetWithUser: AssetWithUsers = {
    ...asset,
    users: assetUsers,
  } as AssetWithUsers;

  return {
    assetWithUser,
    workOrdersWithUsers,
    isAssetLoading,
    isWorkOrdersLoading: isWorkOrdersLoading || isUsersLoadings,
  };
};
