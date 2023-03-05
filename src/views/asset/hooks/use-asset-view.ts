import { useGetAsset } from "@/api/asset/use-get-asset";
import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useGetWorkOrdersByAsset } from "@/api/work-orders/use-get-work-orders-by-asset";
import { useParamsId } from "@/hooks/use-params-id";
import { toast } from "@/utils/feedback";
import { Routes } from "@/router/routes";
import { AssetWithUsers } from "@/types/entities/asset";
import { UserWithUnit } from "@/types/entities/user";
import { WorkOrdersWithUsers } from "@/types/entities/work-order";
import { useNavigate } from "react-router-dom";

export const useAssetView = () => {
  const { assetId, companyId, unitId } = useParamsId();

  const navigate = useNavigate();

  const { data: asset, isLoading: isAssetLoading } = useGetAsset(assetId, {
    onError: () => {
      toast.error("Could not load asset");
      navigate(Routes.unit(companyId, unitId));
    },
  });

  const { data: workOrders = [], isLoading: isWorkOrdersLoading } =
    useGetWorkOrdersByAsset(assetId);

  const { data: users = [], isLoading: isUsersLoadings } =
    useGetUsersByCompany(companyId);

  const assetUsers: UserWithUnit[] = users.filter((user) =>
    asset?.assignedUserIds.includes(user.id)
  );

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

  const isLoading = isAssetLoading || isWorkOrdersLoading || isUsersLoadings;

  return {
    assetWithUser,
    workOrdersWithUsers,
    isLoading,
  };
};
