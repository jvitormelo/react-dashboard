import { useGetAllWorkOrders } from "./use-get-all-work-orders";

export const useGetWorkOrdersByAssets = (assetsId: number[]) => {
  const response = useGetAllWorkOrders({
    enabled: !!assetsId.length,
  });

  const data = response.data?.filter((workOrder) =>
    assetsId.includes(workOrder.assetId)
  );

  return {
    ...response,
    data,
  };
};
