import { useGetAsset } from "@/api/asset/use-get-asset";
import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { useGetWorkOrdersByAsset } from "@/api/work-orders/use-get-work-orders-by-asset";
import { WorkOrdersWithUsers } from "@/types/entities/workorders";
import { useParams } from "react-router-dom";

export const useAssetView = () => {
  const params = useParams();

  const assetId = Number(params.assetId);
  const companyId = Number(params.companyId);

  const { data: asset, isLoading: isAssetLoading } = useGetAsset(assetId);

  const { data: workOrders, isLoading: isWorkOrdersLoading } =
    useGetWorkOrdersByAsset(assetId);

  const { data: users, isLoading: isUsersLoadings } =
    useGetUsersByCompany(companyId);

  const workOrdersWithUsers: WorkOrdersWithUsers[] =
    workOrders?.map((workOrder) => ({
      ...workOrder,
      users:
        users?.filter((user) => workOrder.assignedUserIds.includes(user.id)) ||
        [],
    })) || [];

  return {
    asset,
    workOrdersWithUsers,
    isAssetLoading,
    isWorkOrdersLoading: isWorkOrdersLoading || isUsersLoadings,
  };
};
