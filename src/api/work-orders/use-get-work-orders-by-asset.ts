import { useGetAllWorkOrders } from "./use-get-all-work-orders";

export const useGetWorkOrdersByAsset = (assetId: number) => {
  const response = useGetAllWorkOrders({
    enabled: !!assetId,
    relations: true,
  });

  const data = response.data?.filter(
    (workOrder) => workOrder.assetId === assetId
  );
  return {
    ...response,
    data,
  };
};
