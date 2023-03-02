import { useQuery } from "@tanstack/react-query";
import { getWorkOrders } from "./get-work-orders";

export const useGetWorkOrdersByAssets = (assetsId: number[]) => {
  const response = useQuery(["workorders"], getWorkOrders, {
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
