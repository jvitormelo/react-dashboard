import { useQuery } from "@tanstack/react-query";
import { getWorkOrders } from "./get-work-orders";

export const useGetWorkOrdersByAsset = (assetId: number) => {
  const response = useQuery(["workorders"], getWorkOrders, {
    enabled: !!assetId,
  });

  const data = response.data?.filter(
    (workOrder) => workOrder.assetId === assetId
  );
  return {
    ...response,
    data,
  };
};
