import { httpClient } from "@/infra/http-client";
import { WorkOrder } from "@/types/entities/workorders";
import { useQuery } from "@tanstack/react-query";

const getWorkOrders = (): Promise<WorkOrder[]> => httpClient.get("/workorders");

export const useGetWorkOrdersByAsset = (assetId: number) => {
  const response = useQuery(["workorders"], () => getWorkOrders(), {
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
